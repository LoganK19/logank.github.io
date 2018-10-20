/*
	Author: Logan Knipp
	JavaScript to validate the fields on my Contact form.
*/

//Creates compatibility with IE8 and older.
	if (document.getElementById("submit").addEventListener) 
	{
		document.getElementById("submit").addEventListener("click", formSubmit, false);
	}
	else 
	{
		document.getElementById("submit").attachEvent("onclick", formSubmit);
	}

//The main function that runs when you click the Submit button. Submits form if validation is passed.
function formSubmit()
{
	formValidity();
	if (formValidity() )
	{
		document.getElementById("errorText").innerHTML = "Submitted!"; 
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