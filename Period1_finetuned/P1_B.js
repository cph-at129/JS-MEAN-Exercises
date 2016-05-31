// ---------   Explain differences between Java and JavaScript -----------
/*             JAVA                                         JS
     Java is a compiled language       vs        Javascript is scripted language
     
     points to an object                         points to a function
     A myA = new A();                  vs        var f1 = function(){...}   
     
     pass objects as parameters                  pass functions as parameters  
     someFunction(myA);                vs        someFunction(f1);
     
     return objects from methods                 return functions from functions   
     A method(){ return new A(); }     vs        function someFunction(){ return function() {...}; }
 
     nested classes                              nested functions
     class A { class Inner { .. } }    vs        function someFunction(){ function anotherFunction()  {...}; }
          
                            JavaScript Functions are First Class Members
*/
//============================================================================

//-----------  Function Closures and the JavaScript Module Pattern  ---------------------
console.log("-----------  Function Closures and the JavaScript Module Pattern  ---------------------");
/**
 * A closure is a special kind of object that combines two things:
 *      - A function
 *      - The environment in which that function was created. The environment consists of 
 *      any local variables that were in-scope at the time that the closure was created
 *      - With closures, scopes always keep access to the outer scope, in which they were defined
 *      - Since the only scoping that JavaScript has is function scope, all functions, by default, act as closures
 * 
 * 
 */

//Emulating private variables example
console.log("============================");
console.log("closureExample1()");
function closureExample1() {

    function Counter(start) {//Counter returns two closures - increment and get
        var count = start;
        //keep a reference to the scope of Counter
        //keep access to the count variable
        return {
            increment: function () {
                count++;
            },

            get: function () {
                return count;
            }
        }
    }
    //---------
    var foo = Counter(4);
    //The only way to interact with is via the two closures
    foo.increment();
    foo.get(); // 5

    foo.hack = function () {//there is no way of accessing the variable count from the outside
        //will not change the variable count in the scope of Counter
        count = 1337;
        //It will instead create - or override - the global variable count
    };
}
closureExample1();

console.log("==========================================");
console.log("Closure example 2");
function closureExample2() {
    //the following will print i 10 times!!!
    for (var i = 0; i < 10; i++) {
        setTimeout(function () {//The anonymous function keeps a reference to i
            //at the time console.log gets called 
            // the for loop has already finished, and the value of i has been set to 10
            console.log(i);
        }, 1000);
    }
    //problem fixed with iife 
    for (var i = 0; i < 10; i++) {
        //The anonymous outer function gets called immediately with i as its first argument 
        //and will receive a copy of the value of i as its parameter e.
        (function (e) {
            setTimeout(function () {
                console.log(e);
            }, 1000);
        })(i);
    }
}
closureExample2();

/* Closures - The module pattern
 *      - provide a native way of creating private methods
 */
console.log("============================");
console.log("Closure module pattern");
function closureModulePattern() {
    
    var makeCounter = function () {
        var privateCounter = 0;
        function changeBy(val) {
            privateCounter += val;
        }
        return {
            increment: function () { changeBy(1); },
            decrement: function () { changeBy(-1); },
            value: function () { return privateCounter; }
        }
    };
    var counter1 = makeCounter();
    var counter2 = makeCounter();
    counter1.increment();
    counter1.increment();
    console.log("Counter 1: " + counter1.value()); // 2

    counter2.increment();
    counter2.increment();
    counter2.increment();
    console.log("Counter 2: " + counter2.value()); // 3
}
closureModulePattern();

//=====================================================
//--------------  JavaScript Prototyping --------------------
console.log("--------------  JavaScript Prototyping --------------------");

//All objects in JavaScript are descended from Object

/*      - All objects inherit methods and properties from Object.prototype, 
*      although they may be overridden. For example, other constructors' prototypes 
*      override the constructor property and provide their own toString() methods.
*/
/*      - The Object.create() method creates a new object with the object which 
*      should be the prototype of the newly-created object.
* 
*      - All objects inherit a constructor property from their prototype, 
*      which is the function that creates on objects prototype
*/
console.log("Prototype example1");
function prototypeClassicalInherritance() {
    var Person = function () {
        this.canTalk = true;
    };
    //----------
    Person.prototype.greet = function () {
        if (this.canTalk) {
            console.log('Hi, I am ' + this.name);
        }
    };
    //--------------    
    var Employee = function (name, title) {
        /*      Since all functions are Object they all inherit call() and apply() 
                which you can use to invoke the 
         *      function with your this value as argument
         */
        Person.call(this);//Using call to chain constructors for an object
        this.name = name;
        this.title = title;
    };

    // subclass extends superclass
    Employee.prototype = Object.create(Person.prototype);
    Employee.prototype.constructor = Employee;//inherit a constructor property from its prototype

    Employee.prototype.greet = function () {
        if (this.canTalk) {
            console.log('Hi, I am ' + this.name + ', the ' + this.title);
        }
    };

    var bob = new Employee('Bob', 'Builder');
    var rg = new Employee('Red Green', 'Handyman');

    bob.greet();
    // Hi, I am Bob, the Builder

    rg.greet();
    // Hi, I am Red Green, the Handyman

    console.log("Is bob an instance of Employee? " + bob instanceof Employee);//true
    console.log("Is bob an instance of Person? " + bob instanceof Person);//true
}
prototypeClassicalInherritance();



//===================================================================
//-------------- User defined Callback Functions ------------------------
console.log("-------------- User defined Callback Functions ------------------------");

var myArr = ['Aleksandar', 19, 'Ola', 21, 'Nela', 21];

//filter custom implementation
function customFilter() {

    Array.prototype.myFilter = function (callback) {//bad practice to add new behaviour to JavaScripts built in objects
        var out = [],
            i,
            len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (callback(this[i], i, this)) {
                out.push(this[i]);
            }

        };
        return out;
    }
    //-----------
    var myfilteredArr = myArr.myFilter(function (item, i, arr) {
        if (typeof item === 'string') {
            if (item.length <= 3) {
                return item;
            }
        }
    });

    console.log(myfilteredArr.join(", "));
    console.log("=========================");

}
customFilter();

//map custom implementation
function customMap() {
    Array.prototype.myMap = function (callback) {
        var out = [],
            i,
            len;
        for (i = 0, len = this.length; i < len; i += 1) {
            out.push(callback(this[i], i, this));
        }
        return out;
    }

    var myMappedArr = myArr.myMap(function (item, index, arr) {
        if (typeof item === 'string') {
            return item.toUpperCase();
        } else {
            return item;
        }
    });

    console.log(myMappedArr.join(", "));
}

customMap();

//======================================================
//--------  Explain generally about node.js and NPM. ---------------

//-----     NodeJS --------
//Based on Googles V8 Engine  -  Runs on a Virtual Machine (Googles V8 Engine)
//Runs on multiple platforms (Windows, Mac, Linux etc.)
//You must obtain packages not included in the base installation before you can use them
//Event Driven  
//Highly targetet against async programming
//Non-Blocking I/O 
//Easily Scalable

// ------  Why NodeJS ------
//Because of it's non blocking API (think CA-1)
//Builds high-performance servers
//Node, combined with a browser, a document DB (ex. MongoDB) and JSON offers a Unified JavaScript Development Stack
//JavaScript on the Client
//JavaScript on the Server
//JavaScript on the DataBase
//Perfect for Single Page Apps

//---- Problems with nodeJS ---
// Not a completely matured technology
// New packages pops up all the time
// Existing packages changes all the time (versioning is very important)
// Unhandled errors will shutdown the server

//---- when to choose it ----
// Applications involving a lot of IO
// Real Time chat Server
// Web servers
// REST servers
// Streaming servers
// Games

//--- NPM ------
// An online repository for publishing open-source Node.js projects;
// A command-line utility for interacting with this repository that aids in:
// package installation
// version management
// and dependency management
//npm install nodemon -g    -> installed globally
//npm install mongoose --save-dev  -> installed as a development dependency 



//=========================================================
//--------  Provide examples of user defined reusable modules implemented in Node.js ------

// -- bar.js --
// const square = require('./square.js');
// var mySquare = square(2);
// console.log(`The area of my square is ${mySquare.area()}`);

//--- square.js --
// module.exports = function (width) {
//     return {
//         area: function () {
//             return width * width;
//         }
//     };
// }



