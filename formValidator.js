/*
	Author: Logan Knipp
	JavaScript to validate the fields on my Contact form.
*/

var usageArray = [];

//variable to store regular expression used to find malicious characters
var maliciousRemoval = /[\])}[{(<>]/g;

//Creates compatibility with IE8 and older.
	if (document.getElementById("submit").addEventListener) 
	{
		document.getElementById("submit").addEventListener("click", formSubmit, false);
	}
	else 
	{
		document.getElementById("submit").attachEvent("onclick", formSubmit);
	}
	
//Creates the EventListeners for the checkboxes, with IE8 support
	var usages = document.getElementsByName("pcUsage");
	if (usages[0].addEventListener) 
	{
      for (var i = 0; i < usages.length; i++) 
	  {
         usages[i].addEventListener("change", usageToArray, false);
      }
	} else if (usages[0].attachEvent) 
		{
			for (var i = 0; i < usages.length; i++) 
			{
				usages[i].attachEvent("onchange", usageToArray);
			}
		}
//The main function that runs when you click the Submit button. Submits form if validation is passed.
function formSubmit()
{
	formValidity();
	if (formValidity() )
	{
		document.getElementById("errorText").innerHTML = "Submitted!"; 
		//if user did not select a usage type, display appropriate message.
		if (usageArray === undefined || usageArray == 0)
		{
			document.getElementById("arrayDisplay").innerHTML = "You selected no usage type.";
		}
		//else, if user did select a usage type, display the array converted to a string.
		else
		{
			document.getElementById("arrayDisplay").innerHTML = "You selected " + usageArray.toString();
		}
		document.forms["contact"].submit();
	}
}

//The function that validates all fields of the form.
function formValidity()
{
	//declares variables that store field information for ease of use.
	var name = document.forms["contact"]["name"];               
    var email = document.forms["contact"]["email"];      
    var age =  document.forms["contact"]["age"];  
    var comment = document.forms["contact"]["comments"];
   
   //Resets all fields to default color
   name.style.background = "white"
   email.style.background = "white"
   age.style.background = "white"
   comment.style.background = "white"
   
   
   //Displays error if Name field contains potentially malicious characters
   if (maliciousRemoval.test(name.value) == true)
   {
		document.getElementById("errorText").innerHTML = "Please enter your name."; 
        name.style.background = "rgb(255,233,233)"
		name.focus(); 
        return false; 
   }
 
   //Displays error if Email field contains potentially malicious characters
   if (maliciousRemoval.test(email.value) == true)
   {
		document.getElementById("errorText").innerHTML = "Please enter a valid e-mail address."; 
        email.style.background = "rgb(255,233,233)"
		email.focus(); 
        return false; 
   }
   
   //Displays error if Comment field contains potentially malicious characters
   if (maliciousRemoval.test(comment.value) == true)
   {
		document.getElementById("errorText").innerHTML = "Please enter a comment, suggestion, or question."; 
        comment.style.background = "rgb(255,233,233)"
		comment.focus(); 
        return false; 
   }
   
   //Displays error if the Name field is empty.
    if (name.value == "")                                  
    { 
        document.getElementById("errorText").innerHTML = "Please enter your name."; 
        name.style.background = "rgb(255,233,233)"
		name.focus(); 
        return false; 
    } 
	
	//Displays error if the Email field is empty.
	if (email.value == "")                                   
    { 
        document.getElementById("errorText").innerHTML = "Please enter a valid e-mail address."; 
		email.style.background = "rgb(255,233,233)"
        email.focus(); 
        return false; 
    } 
	
	//Displays error if the Email field does not contain an @ symbol.
    if (email.value.indexOf("@", 0) < 0)                 
    { 
        document.getElementById("errorText").innerHTML = "Please enter a valid e-mail address."; 
		email.style.background = "rgb(255,233,233)"
        email.focus(); 
        return false; 
    } 
	
	//Displays error if the Email field does not contain a dot symbol.
    if (email.value.indexOf(".", 0) < 0)                 
    { 
        document.getElementById("errorText").innerHTML = "Please enter a valid e-mail address."; 
		email.style.background = "rgb(255,233,233)"
        email.focus(); 
        return false; 
    } 
   
	//Displays error if the Age field is empty or contains anything other than numbers.
    if (age.value == "" || isNaN(age.value))                               
    { 
        document.getElementById("errorText").innerHTML = "Please enter your age."; 
        age.style.background = "rgb(255,233,233)"
		age.focus(); 
        return false; 
    } 
	
	//Displays error if the Age field is under 13 years old.
	if (age.value < 13)
	{
		document.getElementById("errorText").innerHTML = "You must be at least 13";
		age.style.background = "rgb(255,233,233)"
		age.focus();
		return false;
	}
	
	//Displays error if the Comments field is empty.
	if (comment.value == "")                        
    { 
        document.getElementById("errorText").innerHTML = "Please enter a comment, suggestion, or question."; 
		comment.style.background = "rgb(255,233,233)"
        comment.focus(); 
        return false; 
    }
	
	return true;
}

//The function that handles the array of the checkboxes.
function usageToArray(event) 
{
   if (event === undefined) 
   { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var usageName = callerElement.value;
   if (callerElement.checked) 
   { //if a box was checked
	usageArray.push(callerElement.value);
   } 
   else //if a box was unchecked
   { 
		//for loop that goes through the array and removes elements that were unchecked
      for (var i = 0; i < usageArray.length; i++) {
         if (usageName === usageArray[i].toString()) 
		 {
			usageArray.splice(i, 1);
         }
      }
   }
}