//=========================================================================================================
//----------    Explain basic security threads like: Cross Site Scripting (XSS), SQL Injection and --------
//----------          whether something similar to SQL injection is possible with NoSQL databases --------
//---------            like MongoDB, and DOS-attacks. Explain/demonstrate ways to cope with these problems -----

/*
    -> Cross Site Scripting (XSS):
                    Cross-Site Scripting (XSS) attacks are a type of injection, in which 
                    malicious scripts are injected into otherwise benign and trusted web sites
                    XSS attacks occur when an attacker uses a web application to send malicious code, 
                    generally in the form of a browser side script, to a different end user.
                    An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser 
                    has no way to know that the script should not be trusted, and will execute the script. 
                    Because it thinks the script came from a trusted source, the malicious script can access any cookies, 
                    session tokens, or other sensitive information retained by the browser and used with that site. 
                    These scripts can even rewrite the content of the HTML page
                        Example: Cookie Grabber
                            <SCRIPT type="text/javascript">
                                var adr = '../evil.php?cakemonster=' + escape(document.cookie);
                            </SCRIPT>
                                - If the application doesn't validate the input data, the attacker can easily steal a cookie from an authenticated user
                                - The above code will pass an escaped content of the cookie to the evil.php script in "cakemonster" variable.
                                - The attacker then checks the results of his evil.php script (a cookie grabber script will usually write the cookie to a file) and use it. 
                
    -> SQL Injection
                    A SQL injection attack consists of insertion or "injection" of a SQL query via the input data from the client to the application.
                    A successful SQL injection exploit can read sensitive data from the database, modify database data (Insert/Update/Delete), 
                    execute administration operations on the database (such as shutdown the DBMS), 
                    recover the content of a given file present on the DBMS file system and in some cases 
                    issue commands to the operating system. SQL injection attacks are a type of injection attack, 
                    in which SQL commands are injected into data-plane input in order to effect the execution of predefined SQL commands
                        Example:
                            SELECT * FROM users WHERE name = '' OR '1'='1';
                            
    -> SQL injection to MongoDB
                                - NoSQL databases provide looser consistency restrictions than traditional SQL databases. 
                                By requiring fewer relational constraints and consistency checks, NoSQL databases often offer 
                                performance and scaling benefits. Yet these databases are still potentially vulnerable to injection attacks, 
                                even if they aren't using the traditional SQL syntax. Because these NoSQL injection attacks may execute 
                                within a procedural language , rather than in the declarative SQL language, the potential impacts are greater 
                                than traditional SQL injection
                                - Example: Testing for NoSQL injection vulnerabilities in MongoDB:
                                        - The MongoDB API expects BSON (Binary JSON) calls, and includes a secure BSON query assembly tool. 
                                        However, according to MongoDB documentation - unserialized JSON and JavaScript expressions are permitted 
                                        in several alternative query parameters. The most commonly used API call allowing arbitrary JavaScript input 
                                        is the $where operator. 
                                        ----------------
                                        db.myCollection.find( { $where: "this.credits == this.debits" } ); //simple filter or check, as it is within SQL.
                                        -----------------
                                        db.myCollection.find( { $where: function() { return obj.credits - obj.debits < 0; } } ); //more advanced conditions with JS                                             
                                
    -> DOS-attacks to MongoDB
                        - To exploit DOS attack ( Denial of Service ) in MongoDB, a hacker would need remote access to a MongoDB command line. 
                        MongoDB doesn’t require authentication by default and this attack works if authentication isn’t set up. 
                        In the more likely case that it is, an attacker could use any valid user credentials; the user does not need to be an administrator 
                        to execute the attack. Once the hacker had access, he would then submit a regular expression that met certain conditions; 
                        these conditions would cause a general system crash.
*/
/*           
    -> How to prevent these issues? 
            
                                - Enable Access Control and Enforce Authentication:   https://docs.mongodb.com/master/tutorial/enable-authentication/ 
                                - Configure Role-Based Access Control:  https://docs.mongodb.com/master/tutorial/enable-authentication/ 
                                - Encrypt Communication:  Configure MongoDB to use TLS/SSL for all incoming and outgoing connections     https://docs.mongodb.com/master/tutorial/configure-ssl/ 
                                - Limit Network Exposure:  https://docs.mongodb.com/master/core/security-hardening/ 
                                - Audit System Activity: Track access and changes to database configurations and data    https://docs.mongodb.com/master/core/auditing/ 
                                - Encrypt and Protect Data:  Encrypt MongoDB data on each host using file-system, device, or physical encryption  
                                - Run MongoDB with a Dedicated User:  Run MongoDB processes with a dedicated operating system user account
                                - Run MongoDB with Secure Configuration Options:  MongoDB supports the execution of JavaScript code for certain server-side operations: 
                                         >>>>       mapReduce, group, and $where.    <<<<<<
                                    If you do not use these operations, disable server-side scripting by using the --noscripting option on the command line.        
                   
*/

//======================================================================================================
//--------------- Explain and demonstrate ways to protect user passwords on our backend, and why this is necessary --------


/*
    -> protect user passwords on our backend:
                        saving passwords in plain text is BAD idea!
                            - you cant trust all people who have access to the database
                            - you cannot guarantee that you will not be hacked, which can leak all the passwords
                            - users can use the same password for many sites, so .....
        
        - The general workflow for account registration and authentication in a hash-based account system is as follows: 
                            1) The user creates an account.
                            2) Their password is hashed and stored in the database. At no point is the plain-text (unencrypted) password ever written to the hard drive.
                            3) When the user attempts to login, the hash of the password they entered is checked against the hash of their real password (retrieved from the database).
                            4) If the hashes match, the user is granted access. If not, the user is told they entered invalid login credentials.
            
        - use Cryptographic hashes / password hashing /
                        - One way hash functions:    A one-way hash function is an algorithm that turns messages or 
                            text into a fixed string of digits, called the Cryptographic hash value or the Digest). 
                            One way indicates that it's (almost) impossible to derive the original text given the digest  
                            
                       >>     BUT that is not enough !!  <<<<
                
                -> How Hashes are Cracked:  
                                - Dictionary and Brute Force Attacks: try to guess the password, hashing each guess, and checking if the guess's hash equals the hash being cracked
                                - Lookup Tables:   the general idea is to pre-compute the hashes of the passwords in a password dictionary and store them, and their corresponding password, 
                                                    in a lookup table data structure. A good implementation of a lookup table can process hundreds of hash lookups per second,         
                                                    even when they contain many billions of hashes  
                                - Rainbow Tables: Rainbow tables that can crack any md5 hash of a password up to 8 characters long exist. 
                    
       - SOLUTION: add salting to the one way hash functions:
              We can randomize the hashes by appending or prepending a random string, called a salt, to the password 
              before hashing. As shown in the example above, this makes the same password hash into a completely different string 
              every time. To check if a password is correct, we need the salt, so it is usually stored in the user account database 
              along with the hash, or as part of the hash string itself.
*/
// Example of using salting with hash functions
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

UserSchema.pre("save", function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) { //generate a salt in 10 rounds !!!!!!!!!!
            if (err) { return next(err); }
            bcrypt.hash(user.password, salt, function (err, hash) { //generate the hash with the salt !!!!!!!!!!
                if (err) { return next(err); }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {  //compare the hashed password in the Database
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};



//==========================================================================================================
//-------------   Explain about JSON Web Tokens (jwt) and why they are very suited for a REST-based API --------------

/*
    -> JWT:
            - JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
                This information can be verified and trusted because it is digitally signed.
                JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA
            - Benefits:
                Compact: Because of its smaller size, JWTs can be sent through an URL, POST parameter, or inside an HTTP header.
                The payload contains all the required information about the user, avoiding the need to query the database more than once
            - JWT token example: 
             eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
            .eyJhdWQiOiJPbmx5IE1lYW50IGZvciBhIEpXVCBkZW1vIiwiaXNzIjoibGFtQGNwaGJ1c2luZXNzLmRrIiwiaWF0IjoxNDYzNjcyMzAxLjQ1MiwiZXhwIjoxNDYzNjcyNjAxLjQ1Miwic3ViIjoibGFtIiwiYWRkaXRpb25hbCI6eyJhIjoiSGVsbG8gQ2xhc3MiLCJiIjoiSSBjYW4gYmFzaWNhbGx5IGFkZCAnd2hhdGV2ZXInIEkgbGlrZSBpbiBhIEpXVCJ9fQ
            .yAuSsj1KKxnN8rfopwHGFKGz09AiV7PfGuO155DRXm4    
                    
                    Section 1: Header:  The header typically consists of two parts: the type of the token (=JWT), and the hashing algorithm being used (HMAC SHA256 or RSA)
                                
                    Section 2: Payload The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and 
                    additional metadata. There are three types of claims: reserved, public, and private claims:
                        - Reserved Claims:  These is a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims
                            iss: (Issuer) Claim Identifies the principal that issued the JWT
                            sub: (Issuer) Claim Identifies the principal that is the subject of the JWT (often user id)
                            aud: (Audience) Claim Identifies the recipients that the JWT is intended
                            exp: (Expiration Time) Claim Identifies the expiration time on or after which the JWT MUST NOT be accepted for processing
                            nbf: (Not Before) Claim Identifies the time before which the JWT MUST NOT be accepted for processing
                            iat: (Issued At) Claim Identifies the time at which the JWT was issued
                            jti: (JWT ID) Claim Provides a unique identifier for the JWT. CAn be used to protect against replay attacks
                        - Public Claims: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.
                        - Private Claims: These are the custom claims created to share information between parties that agree on using them
                        
                    Section 3: Signature: The signature part is created by taking the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.
                                          The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way 
                                          
         https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/ 
         http://scytl.github.io/restguide/#_security  
         
      -> Are tokens secure? 
            - Everyone with access to the Token can read the content. Tokens does not encrypt your payload. Use TLS to solve this problem
      
      -> Main authentication flow when using JWTs  
            1)    sent login and password
            2)    server authenticates the user, the token is created and returned to caller with user information like, 
                    loginname, name or any parameter about client required by caller with an HTTP 200 code 
            3) Since then the only thing that client and server exchange regarding to authentication is the token
            4) Token is sent to front and back using the HTTP header attribute x-access-token
            
      -> Benefits of using a token-based approach?
            - Cross-domain / CORS: cookies + CORS don't play well across different domains. A token-based approach allows you to make AJAX calls to any server, 
            on any domain because you use an HTTP header to transmit the user information    
            
            - Stateless (a.k.a. Server side scalability): there is no need to keep a session store, the token is a self-contanined entity that conveys all the user information. 
            The rest of the state lives in cookies or local storage on the client side. 
             
            - CDN: you can serve all the assets of your app from a CDN (e.g. javascript, HTML, images, etc.), and your server side is just the API.
            
            - Decoupling: you are not tied to a particular authentication scheme. The token might be generated anywhere, 
            hence your API can be called from anywhere with a single way of authenticating those calls  
            
            - Mobile ready: when you start working on a native platform (iOS, Android, Windows 8, etc.) cookies are not ideal when 
            consuming a secure API (you have to deal with cookie containers). Adopting a token-based approach simplifies this a lot.  
            
            - CSRF: since you are not relying on cookies, you don't need to protect against cross site requests
            
            - Performance: network roundtrip (e.g. finding a session on database) is likely to take more time than calculating an HMACSHA256 to validate a token and parsing its contents.
            
            - Standard-based: your API could accepts a standard JSON Web Token (JWT). This is a standard and there are multiple backend libraries (.NET, Ruby, Java, Python, PHP) 
            and companies backing their infrastructure (e.g. Firebase, Google, Microsoft). As an example, Firebase allows their customers to use any authentication mechanism, 
            as long as you generate a JWT with certain pre-defined properties, and signed with the shared secret to call their API.                                                                                                                                      
*/  

//==============================================================================================================
//-------------        Explain and demonstrate a system using jwt's, focusing on both client and server side -----

//simple jwt app   ->>  jwt_demo


