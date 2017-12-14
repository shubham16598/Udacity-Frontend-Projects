/* 
obj-decorator-pattern.js
Olivia Chang
August 4 2016
Notes from Udacity's Object-Oriented Javascript course
NOTICE: not run-able
*/

// Code reuse is writing generalized software to make it into reusable library code.
// Whenever two pieces of code seem similar, it may be an opportunity to refactor
// so you don't have to repeat yourself in both places.
// This is one of the reasons why functions exist.

// run.js
var amy = {loc:1}; // The code is rather similar, is it not?
amy.loc++; // Which is where we start asking ourselves, what parts are similar?
var ben = loc{loc:9}; // Which parts can we take out and refactor?
ben.loc++;
// There are two places we could potentially factor out code.

// library.js
// This is where we'll write generalized code
// General code that is useful across may situations.

var move = function(car){
	car.loc++
}

// run.js, lines 2 and 4
move(amy); // Now that we've added the code to library.js, 
move(ben); // We are able to call this

// It might seem that there is far more code now, not less.
// But there are good reasons for refactoring code.

// 1. It's rarely the case that we have such simple code.
// 2. If we want to change how cars move, we only have to change one thing - the move function.
//	  Which is far more convenient than going through the code and replacing all of them.

// Let's refactor out something again.
// library.js (inserted before move)
var carlike = function(obj, loc){ // It's common to use adj for names of obj decorator functions
	// Some other code
	obj.loc = loc
}

// run.js, line 1
var amy = carlike({}, 1); // This would be how we could create amy after our refactor.

// But what if we wanted to be able to call amy.move() instead of move(amy)?
// Let's refactor the code again.

// library.js
var carlike = fucntion(obj, loc) {
	obj.loc = loc;
	obj.move = move; // referring to the move function below
	return obj;
}

var move = function() { // Notice how we don't take in any pos. parameters.
	this.loc++; // That's due to the this keyword, where we can access the "left of the dot" object.
} // Just looking at library.js, it's not clear which object this refers to.

// run.js, line 2
amy.move() // But now we can tell what is left of the dot.

// It's a bit wasteful to create a function for move.
// Here, another opportunity to refactor appears.
// library.js
var carlike = function(obj, loc) {
	obj.loc = loc;
    obj.move = function(){this.loc++}; // instead of calling a move function, we simply moved the function here.
    return obj;
} // run.js doesn't need to be modified, but still works as normal.

// However, this isn't so great.
// Previously, with the move function existing by itself, there was only one move function.
// But now, every time carlike is run, a new move function is created.
// Why is this the case?
// Well, consider the following:
var makeAnObject = function(){
	return {example: 'property'}; // The two objects, ob1 and ob2, use the exact same line of code when created.
}
var ob1 = makeAnObject();
var ob2 = makeAnObject();
log(ob1 === ob2) // But will this return true?
// No, because having the same properties does not give two objects the same identity.
// They are completely separate - so a change to one object will not change the other.
// This could be compared to identical twins - look the same, but have differing identities.

// This may seem obvious. However, what would happen if the makeAnObject function returned a function, not an object?
var makeAnObject = function(){
	return function(){};
}
var func1 = makeAnObject();
var func2 = makeAnObject();
log(func1 === func2) 
// Obviously, they are still different, and have different identities.
// This explains why the method move in carlike is generated each time. This could take a lot of memory.
// But there's a slight advantage to doing this.
// Since the .move function is created every time,
// each time we invoke the carlike function it creates its own closure scope.
// This means that we don't need the keyword this anymore.
// library.js
var carlike = function(obj, loc) {
	obj.loc = loc;
    obj.move = function(){obj.loc++}; // instead of calling a move function, we simply moved the function here.
    return obj;
}