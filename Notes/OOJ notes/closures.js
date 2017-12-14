/* 
closures-notes.js
Olivia Chang
July 27 2016
Notes from Udacity's Object-Oriented Javascript course
NOTICE: not run-able
*/
var hero = aHero();
var newSaga = function() {
	var foil = aFoil();
	var saga = function(){
		var deed = aDeed();
		log(hero+deed+foil);
	}
	saga(); 
	saga();
	/* 
	In order to retain access to the saga function objecs after newSaga calls have been returned,
	there are a few ways to accomplish this.
	- passing saga to setTimout
	- returning saga from newSaga
	- saving saga to a global var
	*/
	// If we wanted to do this, we could add them to array sagas
}
newSaga();
newSaga();


// To access the values after the newSaga function is called
var sagas = [];
var hero = aHero();
var newSaga = function() {
	var foil = aFoil();
	sagas.push(function(){ // For reference, let's call this the deed function
		var deed = aDeed();
		log(hero+deed+foil);
	});
	saga(); 
	saga();
	/* 
	In order to retain access to the saga function objecs after newSaga calls have been returned,
	there are a few ways to accomplish this.
	- passing saga to setTimout
	- returning saga from newSaga
	- saving saga to a global var
	*/
	// If we wanted to do this, we could add them to array sagas
}
newSaga();
sagas[0](); // What happens if we run this?
// The context of a function will always be created in the function it was created in.
// Therefore, the context is created within the deed function.
// And the variables within the deed function outwards are available to the global scope by calling sagas[0];
sagas[0](); // When the function is completed, the contexrt moves back out to the global scope.
/* Then, we run it again. This creates a second context within the deed function.
Here's a distinction:
NOTICE: By pushing the deed function into the sagas array, we are pushing the function, 
which has not yet been run.
So, though we have only called newSaga once,
it pushed the code for the function, and not the results of the function (the lexical scope)
which is why if you run sagas[0] twice, it yields two deed variables.
NOTICE: It does not yield two foil variables, because sagas[0] only contains the deed function,
not the newSaga function.
*/

newSaga(); // This will create a new newSaga context.
// Therefore, there will be a new foil variable.
sagas[0](); // This does the same thing as the two sagas[0] calls above
sagas[1](); // However, when we call this, a new execution context is created within the second newSaga context.
// This will create a new deed variable.
sagas[0](); // When this is run, it will appear inside the first newSaga context.
// To conclude, there is no effect on calling sagas[0] one final time, whether or not sagas[1] has been called.

