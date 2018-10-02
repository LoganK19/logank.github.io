/*
	Author: Logan Knipp
	JavaScript to calculate the remaining funds after the user has spent their budget on a new PC.
*/

//Checks for exceptions when the Calculate button is clicked on the page.
function errorCheck()
{
	var budgetVal = document.getElementById("budget").value;
	/*
		This exception handling uses a try-catch method which will detect if the user input a zero or a negative number into the budget field. If so,
		it will throw a message which will then be displayed instead of the usual budget calculation. If there is no error, it will run the calculate() function.
	*/
	try { 
		if (budgetVal <= 0)
		{
			throw "Error: Must be greater than zero."
		}
		else
		{
			calculate();
		}
	}
	catch(budgetZero)
	{
		document.getElementById("minimumLabel").innerHTML = "";
		document.getElementById("remain").innerHTML = "";
		document.getElementById("budgetMessage").innerHTML = budgetZero;
	}
}

//Calculates the remainder after the budget, then displays appropriate text depending on whether the user is over or under-budget.	
function calculate()
{
		/* This if statement checks to make sure the number is not under-budget. If it is, it will display a message telling the user they do not have enough.
			The number $800 in the following statement comes from my personal research into PC parts and determining the minimum required to build a decent modern gaming PC that isn't too flashy. */
	if (document.getElementById("budget").value < 800)
		{
			var budgetVal = document.getElementById("budget").value;
			var remainVal = budgetVal - 800;
			document.getElementById("minimumLabel").innerHTML = "Minimum Money Remaining:";
			document.getElementById("remain").innerHTML = "$" + remainVal;
			document.getElementById("budgetMessage").innerHTML = "You do not have enough to build a mid-range gaming PC. Start saving up!";
		}
		//This else statement is run if the user has enough in their budget and displays a message congratulating the user.
		else
		{
			var budgetVal = document.getElementById("budget").value;
			var remainVal = budgetVal - 800;
			document.getElementById("minimumLabel").innerHTML = "Minimum Money Remaining:";
			document.getElementById("remain").innerHTML = "$" + remainVal;
			document.getElementById("budgetMessage").innerHTML = "You have enough to build a mid-range gaming PC! Congratulations!";
		}
}

//Modifies code for IE8 compatibility. Changes addEventListener to attachEvent if needed.
	if (document.getElementById("button").addEventListener) 
	{
		document.getElementById("button").addEventListener("click", errorCheck, false);
	}
	else 
	{
		document.getElementById("button").attachEvent("onclick", errorCheck);
	}