/*
	Author: Logan Knipp
	JavaScript to calculate the difference between today and a user's input date.
*/

//Creates compatibility with IE8 and older.
	if (document.getElementById("calculate").addEventListener) 
	{
		document.getElementById("calculate").addEventListener("click", takeDate, false);
	}
	else 
	{
		document.getElementById("calculate").attachEvent("onclick", takeDate);
	}

//function that takes the Date from the user's input and passes it to the calculation function.
function takeDate()
{
	//variables that store user field information.
	var fieldDay = document.forms["time"]["day"];               
    var fieldMonth = document.forms["time"]["month"];      
    var fieldYear =  document.forms["time"]["year"];
	
	//variables that store the values that the user inputs.
	var userDay = fieldDay.value;
	var userMonth = fieldMonth.value;
	var userYear = fieldYear.value;
	
	//Resets fields to white after error check
	fieldDay.style.background = "white"
    fieldMonth.style.background = "white"
    fieldYear.style.background = "white"
	
	//Displays error if the Day field is empty or contains anything other than numbers.
    if (userDay == "" || isNaN(userDay) || (userDay > 31))                               
    { 
        document.getElementById("message").innerHTML = "Please enter a valid numerical date."; 
        fieldDay.style.background = "rgb(255,233,233)"
		fieldDay.focus(); 
        return false; 
    } 
	
	//Displays error if the Month field is empty or contains anything other than numbers.
	if (userMonth == "" || isNaN(userMonth) || (userMonth > 12))                               
    { 
        document.getElementById("message").innerHTML = "Please enter a valid numerical month."; 
        fieldMonth.style.background = "rgb(255,233,233)"
		fieldMonth.focus(); 
        return false; 
    } 
	
	//Displays error if the Year field is empty or contains anything other than numbers.
	if (userYear == "" || isNaN(userYear))                               
    { 
        document.getElementById("message").innerHTML = "Please enter a valid numerical year."; 
        fieldYear.style.background = "rgb(255,233,233)"
		fieldYear.focus(); 
        return false; 
    } 
	
	//Subtracts 1 from the month because 0 = January instead of 1.
	userMonth = userMonth - 1;
	
	//Creates two new Date objects, one is today and the other is the userDate.
	today = new Date()
	userDate = new Date(userYear, userMonth, userDay)
	
	if (userDate > today)
	{
		document.getElementById("message").innerHTML = "Please enter a date before today."; 
        fieldDay.style.background = "rgb(255,233,233)"
		fieldDay.focus(); 
		fieldDay.value = "";
		fieldMonth.value = "";
		fieldYear.value = "";
        return false; 
	}
	
	//Passes the two dates to the calculation function.
	calcDate(today, userDate);
	
}

//Function that calculates the difference between two dates and displays it.
function calcDate(date1, date2) 
{
	//Variables for determining the difference between the year and the month
	var years = date1.getFullYear() - date2.getFullYear();
	var months = date1.getMonth() - date2.getMonth();
	
	//If the months are in the negatives, add 12 to the months and subtract 1 from the year
	//This is if a full year has not passed between the two dates.
	if (months < 0)
	{
		months = months + 12;
		years = years - 1;
	}
	
	//Variable for the difference between the days.
	var days = date1.getDate() - date2.getDate();
	
	//If the days are in the negatives, add 31 to the days and subtract 1 from the months
	//This is if a full month has not passed. 
	//This is not fully accurate, however, it does what the assignment says to do.
	if (days < 0)
	{
		days = days + 31;
		months = months - 1;
	}
	
	//Store the date in a string for usage of the message.
	var dateString = date2.toDateString();
	
	//displays the message telling the user how many years, months, and days have passed since the date entered.
	document.getElementById("message").innerHTML = "Since " + dateString + "   " + years + " years " + months + " months " + days + " days have passed.";
}