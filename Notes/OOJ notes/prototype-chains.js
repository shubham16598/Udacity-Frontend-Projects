/* 
prototype-chains-notes.js
Olivia Chang
August 4 2016
Notes from Udacity's Object-Oriented Javascript course
NOTICE: not run-able
*/

// Prototype chains are a mechanism for having objects resemble other objects
// It makes an object behave as if it has all the properties of the other

var gold = {a:1};
log(gold.a); // Property lookup, logs 1 // We know that this object has this property
// Interpreter kicks off investigation to see if there's a property a in obj gold
log(gold.z); // Another property lookup, but we know that it doesn't have this property
// Intepreter acknowledges that z doesn't exist by logging the value undefined

var blue = {};
// var blue = extend({}, gold); // Example of a helper function for copying
// However, copying does not keep the products in sync because it only copies one time:
// Known as one time property copying
var blue = extend({}, gold);
blue.b = 2
log(blue.a); // 1
log(blue.b); // 2
log(blue.z); // undefined

var rose = Object.create(gold); // This is the second method for copying properties
rose.b = 2 // However, the copy operation is ongoing: ongoing lookup-time delegation
log(rose.a) // We never made the property a for the object rose
// However, gold has a property a. So the interpreter falls through
// to the object gold and finds the property a. In this case, the log would return 1.

// Let's demonstrate the differences between the two ways of copying.
gold.z = 3 // Assign the "parent" object gold to have a property z
log(blue.z) // blue was created through the one time property copying, so it doesn't
// continuously udpate. Even though gold was updated, blue wasn't.
// So the log will show undefined.
log(rose.z) // This is different, because rose was created through ongoing lookup-time delegation.
// Meaning that since the interpreter will not find property z on rose
// it will fall through to gold, and find the property z there.

// There is a top-level object that every Javascript object delegates to.
// This is called the protopye object.
// This is how every object gets functions such as .toString()
// Note that when we call rose.toString(), the this keyword refers to rose,
// even though toString was defined in the top-level object,
// the toString function is called on rose, and thus rose is left of the dot.
