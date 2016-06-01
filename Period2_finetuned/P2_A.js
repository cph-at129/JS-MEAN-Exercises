//=========================================================================================================
//----------  Why would you consider a Scripting Language as JavaScript as your Backend Platform. ----

/*   NodeJS is faster on the server, than anyone has expected. Faster than Java or other options;

    when combined with a Documen DB such as MongoDB and JSON offers:
        - JS on the client
        - JS on the server
        - JS on the DB

    - quick requests for data thanks to Node.js ­ perfect for more dynamic pages
        
    - Node.js and JavaScript make it much easier to migrate code
*/

//===============================================================
//-----------  Explain Pros & Cons in using Node.js + Express to implement your ----------
//------------   Backend compared to a strategy using for example Java/JAX-RS/Tomcat ----

//---- NodeJs for backend

/*
    //Pros:
            //Non-­blocking API
            //high performance servers
            //when combined with a Documen DB such as MongoDB and JSON offers:JS on the client, on the server on the DB
            //Perfect for SPAs
   //Cons:
            //Not matured enough as Java or PHP
            //Node.js is far behind Java considering debugging and maintaining large enterprise applications
            //JS is lacking a solid and reliable tools such as Eclipse or Netbeans in Java
            //rapid changes of versions and packages
            //If one Node.js request runs too slowly, everything slows down. 
            //There's only one thread in Node.js, and it will get to your event when it's good and ready
            //unhandled errors will shutdown the server
*/

/*When to use it:
            //apps involving a lot of I/O
            //real time chat servers
            //web servers
            //streaming servers
            //games
*/

//=================================================================
//-----------    Compare, using relevant examples, the express strategy toward (server side) 
//-----------            templating with the one you used with Java on second semester 

//---->>> express strategy using ejs as a template engine  <<<------

app.set('view engine', 'ejs');// set the view engine to ejs

app.get('/', function (req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    res.render('index', { drinks: drinks }); //render the index.ejs page, with the JSON data
});

//in index.ejs file -->>>
// ...
// <h2>Loop</h2>
// <ul>
//     <% drinks.forEach(function(drink) { %>
//         <li><%= drink.name %> - <%= drink.drunkness %></li>
//     <% }); %>
// </ul>
// ...
//----------------------------------------------------------------------

//----->>> JSP templating using Servlets ----<<<<<<
// private void viewNewProjects(HttpServletRequest request, HttpServletResponse response, Controller con)
//         throws ServletException, IOException{

//         //get projects in a collection
//         ArrayList<Project> projectsList = con.getProjects();

//         request.setAttribute("projectsList", projectsList);

//         RequestDispatcher dispatcher = request.getRequestDispatcher("DellTemplate_ShowNewProjects.jsp");
//         dispatcher.forward(request, response);

// } 
//---  in DellTemplate_ShowNewProjects.jsp
//.......
// <h1>Here you can see your projects!</h1><br/>

//     <% ArrayList<Project> projectsList = (ArrayList<Project>) request.getAttribute("projectsList");%>
//     <div class="NewProjects">
//         <div class="container">
//             <form action="UIServlet">
//                 <ul>
//                     <% for (Project p : projectsList) {%>
//                     <li>
//                         <p>
//                             <%= p.getProjectName()%>
//                             <button type="button" name="openProjectDetailsButton">Open</button>
//                         </p>
//                     </li>
//                     <% }%>
//                 </ul>
//             </form>
//         </div>
//     </div>   

//=====================================================================
//-----------   Explain, using relevant examples, the Express concept; middleware. ------------
/*
    Express is a routing and middleware web framework that has minimal functionality of its own:
    An Express application is essentially a series of middleware function calls
*/
/*
    Middleware​ functions are functions that have access to the request object (req), the
    response object (res), and the next middleware function in the application’s
    request­ response cycle
*/
/*
    Since middleware are executed serially, their order of inclusion is important
*/
/*
    If the current middleware is not ending the request-response cycle, it is important to call next() 
    to pass on the control to the next middleware, else the request will be left hanging
*/
/*  The flexibility in Express comes from the use of middlewares and Node modules.
    Express middlewares and Node modules are pluggable JavaScript components, which
    make Express apps very modular, flexible, and extensible
*/
/*
Middleware functions can perform the following tasks:
    Execute any code.
    Make changes to the request and the response objects.
    End the request­ response cycle.
    Call the next middleware function in the stack.
*/

//There are four types of middleware

//Application-level middleware
//Router-level middleware
//Error-handling middleware
//Built-in middleware

/*     ==      Application-level middleware  ==    */
var express = require('express');
var app = express();//the main object of an Express app and the bulk of the functionality is built on it

//middleware function with no mount path
app.use(function (req, res, next) {//executed every time the app receives a request
    //.. do sth
    next();
});

//middleware function mounted on the /user/:id path
app.use('/user/:id', function (req, res, next) {//executed for any type of HTTP request on the /user/:id path
    //do sth....
    next();
});
//-----------------------------------------
/*              ===  Router-level middleware ===            */
var router = express.Router();
var app = express();

// a middleware function with no mount path. 
router.use(function (req, res, next) {//This code is executed for every request to the router
    // do sth ..
    next();
});
// a middleware sub-stack
router.use('/joke/:id', function (req, res, next) {// executed for any HTTP request to the /api/joke/:id path
    //do sth....
    next();
}, function (req, res, next) {
    //do sth ...
    next();
});
router.get('/joke/:id', function (req, res, next) { // executed for every GET request to the /api/joke/:id path
    //do sth...
    res.render('jokes', { joke: joke });
});
// mount the router on the app
app.use('/api', router);

/*   ----  Error-handling middleware -------   */
//Error-handling middleware always takes four arguments
//Even if you don’t need to use the next object, you must specify it to maintain the signature. 
//Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/*   ----  Built-in middleware -------   */
//The only built-in middleware function in Express is express.static
/*responsible for serving static assets such as HTML files, images, and so on*/
app.use(express.static(__dirname + '/public'));

/* -----  Third-party middleware  -------  */
//Use third-party middleware to add functionality to Express apps.
//npm install cookie-parser
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());

//===========================================================================
//----------   Explain, using relevant examples, how to implement sessions, and the legal implications of doing this ------

// express_session2 example


//There are two broad ways of implementing sessions in Express:
/* using cookies */
/* using a session store at the backend */
//Both of them add a new object in the request object named session, which contains the session variables

//---- Cookie-based Session    

/* Simple view counter example using cookie based session*/

var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.use(function (req, res, next) { //for every request 
    // Update views
    req.session.views = (req.session.views || 0) + 1

    // Write response
    res.end(req.session.views + ' views')
})

app.listen(3000)
//-----------------------------------------------
//-------- Session Store-based Session

/* Simple view counter example using session store-based session*/

var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(session({
    secret: 'keyboard rat',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    var views = req.session.views//get the views from the session object

    if (!views) {//if new session
        views = req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    views[pathname] = (views[pathname] || 0) + 1

    next()
});

app.get('/jokePage1', function (req, res, next) {
    res.send("You viewed this page: " + req.session.views['/jokePage1'] + " times");
});

app.get('/jokePage2', function (req, res, next) {
    res.send("You viewed this page: " + req.session.views['/jokePage2'] + " times");
});
//--------------------------------------------------------------
//when do we use sessions and cookies
        /*  identify users  */
        /*  remember users' custom preferences  */
        /*  help users complete tasks without having to re‑enter information  */
        /*  when browsing from one page to another or when visiting the site later  */

//types of cookies
        /* - session cookies */
            /*  A user's session for a website exists in temporary memory only while the user is reading and navigating the website */
        /* - persistent cookies  */
            /* remains on the user's computer/device for a pre­defined period of time  */
        /* - first-party cookies */
            /* set by the web server of the visited page and share the same domain */
        /* - third-party cookies  */
            /* stored by a different domain to the visited page's domain.
            This can happen when the webpage references a file, such
            as JavaScript, located outside its domain */

//EU legislation
    /* you must ask users if they agree to most cookies and similar
        technologies (e.g. web beacons, Flash cookies, etc.) before the
        site starts to use them */
    /* cookies that require informed consent!!!!!! */
                /* first‑party persistent cookies
                        Use only when strictly necessary. The expiry period must
                        not exceed one year 
                 */
                /* all third‑party session and persistent cookies */
    /* cookies that do NOT require informed consent  */
                /* user‑input cookies (session­id) such as first‑party cookies
                    to keep track of the user's input when filling online forms,
                    shopping carts, etc., for the duration of a session 
                 */
                /* authentication cookies, to identify the user once he has
                    logged in, for the duration of a session */
                /* user‑centric security cookies, used to detect authentication
                    abuses, for a limited persistent duration
                */
                /* multimedia content player cookies, used to store technical
                    data to playback video or audio content, for the duration of
                    a session 
                 */
                /* load‑balancing cookies, for the duration of session */
                /* user‑interface customisation cookies such as language or
                    font preferences, for the duration of a session (or slightly
                    longer) 
                 */
                /*third‑party social plug‑in content‑sharing cookies, for
                    logged‑in members of a social network 
                 */
    /* Before storing cookies, gain consent from the users (if required)
    by implementing the Cookie Consent Kit - http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm#section_4  in all the pages of any
    website using cookies that require informed consent */
    /* http://ec.europa.eu/ipg/docs/cookie-notice-template.zip */


