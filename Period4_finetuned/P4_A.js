//=======================================================================================================
//--------- Explain basic security terms like authentication, authorization, -----------------------
//---------    confidentiality, integrity, SSL/TLS and provide examples of how you have used them.  ------------

/*
    Authentication: ­​Confirming the identity of a client (via some kind of login procedure)
    
    Authorization: ­D​etermining whether an authenticated client is allowed to
                    receive a service or perform an operation
                    
    Confidentiality: ​­ Protection from disclosure to unauthorised persons
    
    Integrity: ​­ Maintaining data consistency (data cannot be modified)                
*/
/*
    SSL/TLS ­ ​the green chainlock in the browser:
            
            - Symmetric Key Encryption: ​­ An encryption system in which the sender and
                receiver of a message share a single, common key that is used to encrypt and
                decrypt the message. Contrast this with public ­key cryptology, which utilizes two
                keys ­ a public key to encrypt messages and a private key to decrypt them.
                Symmetric­ key systems are simpler and faster, but their main drawback is that the
                two parties must somehow exchange the key in a secure way. Public­ key
                encryption avoids this problem because the public key can be distributed in a
                non­secure way, and the private key is never transmitted.
            - Public Key Encryption: ​­ A cryptographic system that uses two keys ­­ a public
                key known to everyone and a private or secret key known only to the recipient of
                the message. When John wants to send a secure message to Jane, he uses
                Jane's public key to encrypt the message. Jane then uses her private key to
                decrypt it.An important element to the public key system is that the public and
                private keys are related in such a way that only the public key can be used to
                encrypt messages and only the corresponding private key can be used to decrypt
                them. Moreover, it is virtually impossible to deduce the private key if you know the
                public key  
                        
                        - Public­ key systems, such as Pretty Good Privacy (PGP), are
                        becoming popular for transmitting information via the Internet.
                        They are extremely secure and relatively simple to use. The only
                        difficulty with public ­key systems is that you need to know the recipient's
                        public key to encrypt a message for him or her. What's needed, therefore,
                        is a global registry of public keys, which is one of the promises of the new
                        LDAP technology.
                        
            - Digital signature: ​­ a mathematical technique used to validate the
                authenticity and integrity of a message, software or digital document
                    
                    Signing a Digest:​­ Signing the whole document is slow, and
                        produces an enormous volume of data—at least double the size of
                        the original information
                        An improvement is to sign only a digest of the message
                        using a one-­way hash function in the process. A one­way hash function 
                        takes variable ­length input—in this case, a message of any length, even thousands or
                        millions of bits—and produces a fixed­ length output; say 160­bits
                        The hash function ensures that, if the information is
                        changed in any way—even by just one bit—an entirely
                        different output value is produced

            - Digital certificate: A digital certificate is data that functions much like a
                physical certificate. A digital certificate is information included with a
                person’s public key that helps others verify that a key is genuine or valid.A
                digital certificate consists of three things:
                        - A public key
                        - Certificate information. (“Identity” information about the user, such
                            as name, user ID, and so on.
                        - One or more digital signatures
                        
                        
             - Public key Infrastructure ­ Hierarchical Trust:
                A public key infrastructure (PKI) is a set of roles, policies, and
                procedures needed to create, manage, distribute, use, store, and
                revoke digital certificates and manage public ­key encryption. The
                purpose of a PKI is to facilitate the secure electronic transfer of
                information for a range of network activities such as e­-commerce,
                internet banking and confidential email. It is required for activities
                where simple passwords are an inadequate authentication method
                and more rigorous proof is required to confirm the identity of the
                parties involved in the communication and to validate the
                information being transferred.
             
*/
/*
    How it is all combined to provide a secure TLS connections:
        - TLS includes two layers:
            - A Record Protocol and a Handshake Protocol, and these
                are layered above a transport protocol such as TCP/IP.
            - They both use asymmetric and symmetric cryptography
                techniques    

*/
//============================================================================================================
//------------  Explain, at a fundamental level, the technologies involved, and the steps required  -------------
//------    to initialize a SSL connection between a browser and a server and how to use SSL in a secure way. ----

//for openshift- http://js2016.azurewebsites.net/security1/security.html#1 
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http') {
        var tmp = 'https://' + req.headers.host + req.originalUrl;
        res.redirect(tmp);

    } else {
        return next();
    }
});

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
        
    -> DOS-attacks
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


//========================================================================================
//---------   Demonstrate, with focus on security, a proposal for an Express/Mongo+Angular-seed --------
//-------           with built in support for most of the basic security problems, SSL and ready to -------
//-------                       deploy on your favourite Cloud Hosting Service.  --------------

// ->>>> express_mongo_angular_seed folder


//=====================================================================================
//------------------  Express Security best practices

/*
    -> Don’t use deprecated or vulnerable versions of Express
    -> Use TLS
    -> In general, we recommend Nginx to handle TLS: https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations 
    -> handy tool to get a free TLS certificate: https://letsencrypt.org/about/
    -> Use Helmet:
        - Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
            ------------
            npm install --save helmet
            ...
            var helmet = require('helmet');
            app.use(helmet());
            ...
            ----------
        - At a minimum, disable X-Powered-By header: Attackers can use this header (which is enabled by default) to 
            detect apps running Express and then launch specifically-targeted attacks
            -------
            app.disable('x-powered-by');
            -------
        
      -> Use cookies securely:
                express-session -> stores session data on the server; it only saves the session ID in the cookie itself, not session data
                cookie-session -> implements cookie-backed storage: it serializes the entire session to the cookie, rather than just a session key. 
                    Only use it when session data is relatively small and easily encoded as primitive values (rather than objects).
            
            - Don’t use the default session cookie name  -       use generic cookie names
                --------------
                var session = require('express-session');
                app.set('trust proxy', 1) // trust first proxy
                app.use( session({
                    secret : 's3Cur3',
                    name : 'sessionId',
                })
                );
                ------------------------------------
            - Set cookie security options 
                --------------
                var session = require('cookie-session');
                var express = require('express');
                var app = express();

                var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
                app.use(session({
                    name: 'session',
                    keys: ['key1', 'key2'],
                    cookie: { secure: true, //Ensures the browser only sends the cookie over HTTPS.
                                httpOnly: true, //Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks
                                domain: 'example.com', //indicates the domain of the cookie; use it to compare against the domain of the server in which the URL is being requested. If they match, then check the path attribute next.
                                path: 'foo/bar', // indicates the path of the cookie; use it to compare against the request path. If this and domain match, then send the cookie in the request.
                                expires: expiryDate // use to set expiration date for persistent cookies
                            }
                    })
                );

      -> Ensure your dependencies are secure      
            - use: nsp and requireSafe
                - nsp - command-line tool that checks the Node Security Project vulnerability database to determine if your application uses packages with known vulnerabilities
                ---------
                >npm i nsp -g
                >nsp check
                ----------
                
                -requireSafe - audit your Node modules
                ----------
                > npm install -g requiresafe
                > requiresafe check
                ----------------
*/