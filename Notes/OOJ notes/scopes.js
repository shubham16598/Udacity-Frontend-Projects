/* 
scopes-notes.js
Olivia Chang
July 27 2016
Notes from Udacity's Object-Oriented Javascript course
NOTICE: not run-able
*/

/* 
Lexical Scopes
==============
New lexical scope is created every time you define a function
By default, there is one lexical scope: global scope
Variables in global scope can be accessed by functions
However variables within the lexical scope of a function cannot be accessed outside
*/

var hero = aHero();
var newSaga = function() {
	foil = afoil(); // foil has not been declared anywhere in this program
					// this means that it can be accessed anywhere in the global scope
					// however, this is bad practice
					// oftentimes, this is confusing for other coders
					// and most will assume you have made a mistake
	var foil = aFoil();
	var saga = function(){
		var deed = aDeed();
		log(hero+deed+foil);
	}
}

log(foil); // foil would be available if a var was left out


if ( checkSomething () ) { // If statements do not create lexical scopes
	var foil = afoil(); // so this will be available to global scope
}

/* 
Execution Contexts
==================
When a program runs, builds storage systems for holding variables and values
In memory scope structures - called execution contexts
Built as the code runs, not as it's typed (lexical scopes)
As a program runs, it builds up internal data stores for keeping track of scopes/variables.

A new execution scope is created every time a function is run.
So there may be many, or none at all, per each lexical scope.

Contexts are similar to objects in that they are
Key-value data constucts.
However, they are not the same thing.
Contexts have much less functionality than objects,
And you interact with the two in completely different ways.
*/
var hero = aHero(); // hero = "Gal"
var newSaga = function() { // newSaga = {f} - at this point, the following function has not yet run, so current context is the global
	var foil = aFoil(); // foil = "Cow" - now, we are in a new execution context, which will store the following variables
	var saga = function(){
		var deed = aDeed();
		log(hero+deed+foil);
	}
	saga(); // Now, the interpreter checks the scope of the current execution context, and finds the saga function.
	saga(); // Running the saga function creates a new execution context.
	/*
	The first line adds a new variable deed = "Eyes"
	The second line looks for 3 different variables.
	First, it looks for hero, from the current context outwards.
	It is not there, so it falls through to the newSaga context.
	It is not there either, so it falls through to the final context, the global context.
	There, it finds the hero variable with a value of "Gal".
	Next, it looks for the deed variable, which is in the current context.
	That makes it easy for the interpreter. The value/output is "Eyes".
	Finally, it looks for foil, which is in the middle context.
	The output of log will be "GalEyesCow".
	Finally, the interpreter goes back to the middle context of newSaga.
	*/
	/*
	In Memory Scopes vs In Memory Context:
	Where it becomes more obvious of the difference is when saga() is called for a second time.
	This creates a new execution context, accomodating for storage of different bindings. (new variables)
	*/
}
newSaga();
newSaga(); // Running this a second time creates another context,
			// However they are completely different, and values are different
			// They will fail a === test.
var makeArray = function(){
	return [];
}
var array1 = makeArray();
var array2 = makeArray();
/* Similar to execution contexts,
array1 === array2 would return false,
even though they technically have the same value.
They are different array objects.
*?