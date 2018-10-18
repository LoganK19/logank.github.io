/*
	Author: Logan Knipp
	JavaScript to calculate the remaining funds after the user has spent their budget on a new PC.
*/

//Checks for exceptions when the Calculate button is clicked on the page.
function eventListener()
{
if (document.getElementById("submit").addEventListener) 
	{
		document.getElementById("submit").addEventListener("click", formSubmit, false);
	}
	else 
	{
		document.getElementById("submit").attachEvent("onclick", formSubmit);
	}
}

function formSubmit()
{
	if (formValidity() == false)
	{
		
	}
	else {
		document.forms["contact"].submit();
	}
}
function formValidity()
{
	var name = document.forms["contact"]["name"];               
    var email = document.forms["contact"]["email"];      
    var age =  document.forms["contact"]["age"];  
    var comment = document.forms["contact"]["comments"];    
   
   name.style.background = "white"
   email.style.background = "white"
   age.style.background = "white"
   comment.style.background = "white"
   
    if (name.value == "")                                  
    { 
        document.getElementById("errorText").innerHTML = "Please enter your name."; 
        name.style.background = "rgb(255,233,233)"
		name.focus(); 
        return false; 
    } 
	
	if (email.value == "")                                   
    { 
        document.getElementById("errorText").innerHTML = "Please enter a valid e-mail address."; 
		email.style.background = "rgb(255,233,233)"
        email.focus(); 
        return false; 
    } 
   
    if (email.value.indexOf("@", 0) < 0)                 
    { 
        document.getElementById("errorText").innerHTML = "Please enter a valid e-mail address."; 
		email.style.background = "rgb(255,233,233)"
        email.focus(); 
        return false; 
    } 
   
    if (email.value.indexOf(".", 0) < 0)                 
    { 
        document.getElementById("errorText").innerHTML = "Please enter a valid e-mail address."; 
		email.style.background = "rgb(255,233,233)"
        email.focus(); 
        return false; 
    } 
   
    if (age.value == "" || isNaN(age.value))                               
    { 
        document.getElementById("errorText").innerHTML = "Please enter your age."; 
        age.style.background = "rgb(255,233,233)"
		age.focus(); 
        return false; 
    } 
	
	if (age.value < 13)
	{
		document.getElementById("errorText").innerHTML = "You must be at least 13";
		age.style.background = "rgb(255,233,233)"
		age.focus();
		return false;
	}
	
	if (comment.value == "")                        
    { 
        document.getElementById("errorText").innerHTML = "Please enter a comment, suggestion, or question."; 
		comment.style.background = "rgb(255,233,233)"
        comment.focus(); 
        return false; 
    }
	
	return true;
}