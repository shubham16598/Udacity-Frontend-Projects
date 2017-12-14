/* 
this-notes.js
Olivia Chang
August 2 2016
Notes from Udacity's Object-Oriented Javascript course
NOTICE: not run-able
*/

/* this is an identifier that gets a value bound to it
It is bound to the correct object automatically
The rules are similar to positional function parameters 
Positional function paramters: function(--> a, b <--) 
Indicated by arrows
*/

// What this is not bound to
// ========================

var fn = function(a, b) { // When this function is run, it creates a {f} obj in memory
	log(this); // then you may conclude that this rerfers to the {f} obj
}; // however, that is not true
/

/* You then might conclude it is bound to the instance of the function object
and in some cases, that it true. Unfortunately these cases not yet detailed. */

var ob2 = {method: fn}; 
/* Then you might conclude that it has to be within a function that's contained
within another object as a property of the object. This is a popular misconception.
The easiest way to think about this - what if fn was a property of two objects, ob1 and ob2?
var ob1 = {method: fn}; 
var ob2 = {method: fn}; 
How would the keyword this choose between the two objects? */ 

/* If the above paragraph were true, we could then claim that the keyword this will
appear inside a function, and function must appear inside an object literal. The object literal
would then create a in memory object, and that could be what we're referring to with this.
However, this is not correct. */

// So, none of these five following are what this is bound to:
var obj = { // 1. the object created by the literal this appears within 
	fn : function(a, b) { // 2. the function object this appears within
		log(this); // 3. a new instance of the function this appears within *generally speaking*
	}
};

var ob2 = {method: obj.fn} // 4. an object that happens to have that function as a property

obj.fn(3,4) // 5. an execution context or scope of that function call */

// What this is bound to
// =====================

obj.fn(3, 4) // the object found to the left of the dot where the containing function is called

// Looking at the below code, what is expected to be bound to the second pos. parameter, two?
var fn = function(one, two) {
	log(one, two);
};
// Trick question! There is no binding to any pos. parameters before it is called.
// Pos. parameters only have bindings when their function is being called.
var fn = function(one, two) {
	log(one, two);
};
var r={}, g={}, b={}

fn(g,b) // When this is called, one is temporarily bound to g, and two is temporarily bound to b
// The this keyword behaves like a parameter in most of the important ways. 

// Now, we enter a scenario with this.
var fn = function(one, two) {
	log(this, one, two);
};
var r={}, g={}, b={}
r.method = fn; // Using the previous satement that this is bound to 
// the object found to the left of the dot where the containing function is called,
// we can conclude that the following call
r.method(g,b) // will output r, which is {}, g, and b (which are also both {}).
// Obviously, r['method'](g,b) would work as well.

// Here is another harder scenario.
var fn = function(one, two) {
	log(this, one, two);
};
var r={}, g={}, b={}
r.method = fn;
fn(g, b) // If there is nothing "left of the dot", what will be outputted?
/* The answer is in the scope that fn was defined.
Since fn is global, calling fn(g,b) would result in an output of global. */

/* Say we want to call a function and it wasn't stored as a property of the
obj we want this to be bound to.
The way we can accomplish this is with call() */
fn.call( ,g,b) // When we call this line, we need to pass in an extra value in the beginning
// We pass in whatever we want to access with this.
fn.call(r,g,b)
// This can "override" the left of the dot rule.
r.method.call(y,g,b) // So if we called this, assuming that y was defined earlier,
// What would be returned **would not** be r - it would be y.

// A bit unrelated: When no values are passed to a function invocation,
// the params get bound to undefined.

// When there is no property access being done to get access to a function,
// this becomes the scope that the function being called was defined in.

// Timers.js, or something like that where setTimeout is defined
var setTimout = function(cb, ms){
	waitSomehow(ms);
	cb();
}

setTimeout(r.method, 1000) // A hypothetical situation, but what would be the output?
// It's tempting to say that it will output r, because there's a left of the dot right there
// However, the only thing that matters is the actual line of code that calls fn.
// Therefore, the output of this is still the global context.

// In older aspects of the JS language, calling
log(this); // will output the global scope.

// 
