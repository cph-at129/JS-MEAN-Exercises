//http://bonsaiden.github.io/JavaScript-Garden/ 

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

//-----------  Explain the use of: "use strict"  ---------------------
/*
    Strict mode applies to entire scripts or to individual functions
    It doesn't apply to block statements enclosed in {} braces
    
    Strict mode for scripts:
            "use strict";
            var v = "Hi!  I'm a strict mode script!";
            
    Strict mode for functions
            function strict(){
                // Function-level strict mode syntax
                'use strict';
                 function nested() { return "And so am I!"; }
                 return "Hi!  I'm a strict mode function!  " + nested();
            }
            function notStrict() { return "I'm not strict."; }        
        
    Changes in strict mode:
            Strict mode changes both syntax and runtime behavior
            Changes generally fall into these categories:
                - changes converting mistakes into errors (as syntax errors or at runtime)
                - changes simplifying how the particular variable for a given use of a name is computed
                - changes simplifying eval and arguments
                - changes making it easier to write "secure" JavaScript
                - changes anticipating future ECMAScript evolution
*/
function useStrictRefErr() {
    "use strict";
    // Assuming a global variable mistypedVariable exists
    var mistypedVariable = 16;
    mistypedVaraible = 17;// this line throws a ReferenceError due to the misspelling of variable
}
console.log("Use strict reference error");
//useStrictRefErr();

function useStrictTypeErr() {
    // Assignment to a non-writable property
    var obj1 = {};
    Object.defineProperty(obj1, "x", { value: 42, writable: false });
    obj1.x = 9; // throws a TypeError
}
console.log("Use strict type error");
//useStrictTypeErr();
//========================================================================

//--------  Variable/function-Hoisting  -----------------------------
console.log("==============================");
console.log("Variable/function hoisting");
function funcHoisting() {//myFunc is fully hoisted
    myFunc();
    function myFunc() {
        console.log("I am fully hoisted");
    }
}
console.log("Function Hoisting");
funcHoisting();

function varHoisting() {
    console.log(myVar);//myVar is undefined 
    var myVar = "Now I am defined";
    console.log(myVar);
}
console.log("=============================================");
console.log("Variable hoisting");
varHoisting();

function hoistingDemo1() {
    console.log("Value of myCoolObject: " + myCoolObject); //undefined

    if (!myCoolObject) {
        var myCoolObject = { value: "Wau, I'm cool" };
        console.log(myCoolObject.value); //Wau, I'm cool
    }
}
console.log("==============================");
console.log("Hoisting demo 1");
hoistingDemo1();

function hoistingDemo2() {
    f1();
    //f2(); //f2 is not a function error

    function f1() {
        console.log("I'm f1");
    }
    var f2 = function () {
        console.log("Yes, but I'm f2");
    }
}
console.log("Hoisting demo 2");
hoistingDemo2();

function betterDegignedCode() {
    //better design - declare all variables on top
    var myVar1,
        myVar2;

    //..... some code in here

    myVar1 = "Assigned value";

    //..... some more code in here

    myVar2 = "Assigned value 2";
}
//========================================================================
console.log("==================================================");
console.log("This in Javascript");
//-----------  this in JavaScript and how it differs from what we know from Java/.net. --------------
/**
 *  Whenever a function is contained in the global scope, the value of this inside 
    of that function will be the global object (window in a browser) or undefined if 
    in strict mode 
 *  Whenever a function is called by a preceding dot, the object before 
    that dot is this.
 *  Whenever a constructor function is used, this refers to the specific 
    instance of the object that is created and returned by the constructor function.
    
 *   Whenever JavaScript’s call or apply method is used, this is explicitly defined.
 */
//-----------------------------
console.log("Forgetting new example");
function thisForgettingNew() {

    function Car(make, model) {
        this.make = make;
        this.model = model;
    }
    var car = Car("Volvo", "V70"); //Forgot new
    console.log(car === undefined); //true
    console.log(make); //Volvo, global Scope has been poluted
}
thisForgettingNew();
//-----------------------------------
console.log("Losing this when extracting a method");
function losingThis() {
    
    var counter = {
        count: 0,
        inc: function () {
            this.count++;
        }
    };
    var func = counter.inc; //Store "reference" to inc
    func();
    console.log(counter.count);  // 0, does not work
}
losingThis();
//----------------------------
console.log("Shadowing this example");
function shadowingThis() {
    function Car(make, model) {
        this.make = make;
        this.model = model;
        this.show = function () {
            setTimeout(function () { //This function gets it's own "this"
                console.log(this.make + ", " + this.model);
            }, 0);
        };
        var car = new Car("Volvo", "V70");
        car.show(); //undefined, undefined
    }
}
shadowingThis();
//===================================================================
//----------  Immediately-Invoked Function Expressions (IIFE)  --------------------

//purpose - introduce new scope

var data = "myData";

if (data) {
    var temp = "tempvar";//temp is in the global scope!!
    console.log(temp);
} else {
    var temp = "tempvar";//and here again 
    console.log(temp);
}
//=================================

if (data) {
    (function () {
        var temp = "tempVar";//now temp exists only between the iife scope
        //.. do sth with temp here
    } ());
} else {
    //............
}

//=============================================================================
//----------------  User defined Callback Functions ----------------------------

var myArr = ['Aleksandar', 19, 'Ola', 21, 'Nela', 21];

//filter custom implementation
function customFilter() {

    function myFilter(arr, callback) {//returns a new (filtered) array according to the code provided in the callback
        var newArr = [];
        arr.forEach(function (item) {
            if (callback(item)) {
                newArr.push(item);
            }
        });
        return newArr;
    }
    //----------- usage of myFilter
    var myArrUserFiltered = myFilter(myArr, function (item) {
        if (typeof item === 'string') {
            if (item.length <= 3) {
                return item;
            }
        }
    });
    console.log("===============================");
    console.log("My filter: ");
    console.log(myArrUserFiltered.join(", "));

}
customFilter();

//map custom implementation
function customMap() {
    
    function myMap(arr, callback) {//returns a new array according to the code provided in the callback
        var output = [];
        arr.forEach(function (item) {
            output.push(callback(item));
        });
        return output;
    }
//----------------
    var myArrUserMapped = myMap(myArr, function (item) {
        if (typeof item === 'string') {
            return item.toUpperCase();
        } else {
            return item;
        }
    });
    console.log("========================================");
    console.log("My mapping: ");
    console.log(myArrUserMapped.join(", "));
}

customMap();