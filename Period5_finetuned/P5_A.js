//<=======   Name attributes of HTTP protocol that makes it difficult to use for real time systems =========>
//    --------------------------------------------------------------------------------------------------------------------

/*

    ->  requires a new connection to be established for each client to server message
    ->  Half duplex - In a half-duplex system, there are still two clearly defined paths/channels, and each party 
        can communicate to the other but not simultaneously; the communication is one direction at a time
    ->  Stateless - A stateless protocol does not require the server to retain information or status about each user for the duration of multiple requests
    ->  Big overhead (HTTP headers, cookies) - Your 48 byte HTTP handshake is not realistic for real-world HTTP browser connections where there is often several kilobytes of data sent as part of the request (in both directions) 
        including many headers and cookie data
        
        - request - response example:
        
            GET / HTTP/1.1                  -> Example request (2800 bytes including cookie data, 490 bytes without cookie data):
            Host: www.cnn.com
            Connection: keep-alive
            Cache-Control: no-cache
            Pragma: no-cache
            Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*//*;q=0.8
            User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.68 Safari/537.17
            Accept-Encoding: gzip,deflate,sdch
            Accept-Language: en-US,en;q=0.8
            Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3
            Cookie: [[[2428 byte of cookie data]]]
            
            HTTP/1.1 200 OK            -> Example response (355 bytes):
            Server: nginx
            Date: Wed, 13 Feb 2013 18:56:27 GMT
            Content-Type: text/html
            Transfer-Encoding: chunked
            Connection: keep-alive
            Set-Cookie: CG=US:TX:Arlington; path=/
            Last-Modified: Wed, 13 Feb 2013 18:55:22 GMT
            Vary: Accept-Encoding
            Cache-Control: max-age=60, private
            Expires: Wed, 13 Feb 2013 18:56:54 GMT
            Content-Encoding: gzip

*/

//==============================================================================================================
//<======    Explain polling and long-polling strategies, their pros and cons  ====================>
//------------------------------------------------------------------------------------------------------------------
/*
Regular HTTP:
    - A client requests a webpage from a server.
    - The server calculates the response
    - The server sends the response to the client.

 1)  Polling ->
      -  A client requests a webpage from a server using regular HTTP
      -  The requested webpage executes JavaScript which requests a file from the server at regular intervals
      -  The server calculates each response and sends it back

    Pros and Cons:
      -  The main goal of using polling is to keep clients up-to-date with data arriving or changing on the server side
         As an example, a chat based application will poll the server every 10 seconds to see if new chat messages are available.
         Technically, it means the browser will open a connection to the server every time data are required
      -  The number of requests made to the server can be extremely high if the frequency of polling is set to a small value
         This will lead to really bad performance when handling many users.
      -  if there is no data on the server, the response will not contain any data.
         Doing such “void” request overload the server for nothing

  2) Long Polling ->
      -  A client requests a webpage from a server using regular HTTP
      -  The requested webpage executes JavaScript which requests a resource from the server
      -  The server does not immediately respond but waits until there's new information available
      -  When there's new information available, the server responds with the new information
      -  The client receives the new information and immediately sends another request to the server.

    Pros and Cons:
      - With long polling, you open a persistent connection and wait for the server to push data when available.
      - If your server support asynchronous request processing, then you are possibly in a good shape.
        If not, then long polling might give extremely bad results. Why?
        if 10 000 AJAX applications open one long polled connection, that means 10 000 threads will blocks waiting for data to come.
      - If the server can’t push data fast enough, the AJAX application might not be updated as fast as you expect.
      - if the server receives a lot of update, you might ends up in a situation where your are mostly doing the polling technique
        as your request is never parked because the server always execute pushes

    Long Polling Example:
          // Long Polling (Recommened Technique - Creates An Open Connection To Server ∴ Fast)
          (function poll(){
              $.ajax({ url: "server", success: function(data){
                //Update your dashboard gauge
                salesGauge.setValue(data.value);
              }, dataType: "json", complete: poll, timeout: 30000 });
          })();

    Traditional Polling Example:
          // The setInterval Technique (Not Recommended - Creates Queues of Requests ∴ Can Be Slow)
              setInterval(function(){
                  $.ajax({ url: "server", success: function(data){
                      //Update your dashboard gauge
                      salesGauge.setValue(data.value);
                  }, dataType: "json"});
              }, 30000);
*/
//<===========   What is HTTP streaming, SSE (Server sent events)?  ========================>
//--------------------------------------------------------------------------------------------------------------------
/*
    - A client requests a webpage from a server using regular HTTP
    - The requested webpage executes javascript which opens a connection to the server
    - The server sends an event to the client when there's new information available

    Pros and Cons:
      - Real-time traffic from server to client, mostly that's what you'll need
      - Not possible to connect with a server from another domain /CORS/
      - SSE not supported in IE and Edge
      - If your real-time data is sourced from your web site,
        and the user doesn’t interact in real-time, it’s likely you need Server-Sent Events
    Example:
        //generate an EventSource object
        //!!!!  EventSource is not supported by all browsers
            var evtSource = new EventSource("//api.example.com/ssedemo.php", { withCredentials: true } );
                //listens for incoming messages
             evtSource.onmessage = function(e) {
                    var newElement = document.createElement("li");

                    newElement.innerHTML = "message: " + e.data;
                    eventList.appendChild(newElement);
            }
*/
//<=======   What is WebSocket protocol, how is it different from HTTP communication, what advantages it has over  HTTP?  ========>
//-------------------------------------------------------------------------------------------------------------------------------
/*
  1) Why do we need web sockets?
      - We need a better way for web applications running on a client browser to communicate in real time with their servers

  2) What is it?
      - It uses its own protocol
      - it also has an API which can be used by web applications to open and close connections and to send and receive messages
      - With WebSockets you can have full duplex bi-directional communication between
        the server and the client with less overhead than traditional HTTP based methods
      - it could reduce the size of HTTP header traffic and reduce network latency
      - Server and client are equal
      - No request -> response pattern.
    3) How does it work?
      - Before the client and the server start sending and receiving messages, they need to establish a connection first
      - This is done by establishing a ‘handshake’, where the client sends out a request to connect,
        and if the server wants, it will send out a response accepting the connection

    //https://nodesource.com/blog/understanding-socketio/ 
    
    Example: 
                Server                                                        Client
        var app = require('express')();                         <body>
        var http = require('http').Server(app);                     <ul id="messages"></ul>
        var io = require("socket.io")(server);                      <form action="">
        app.get('/', function(req, res){                              <input id="m" autocomplete="off" /><button>Send</button>
          res.sendFile(__dirname + '/index.html');                  </form>
        });                                                         <script src="/socket.io/socket.io.js"></script> //  client sends out a request to connect  
        io.on("connection", handleClient);                          <script> var socket = io(); </script>
        http.listen(3000, function(){                           </body>
          console.log('listening on *:3000');
        });


*/
//<========  Explain what the WebSocket Protocol brings to the Web-world.  ==================>
//--------------------------------------------------------------------------------------------------------------

/*

    its own protocol over TCP
    API
    bi-directional communication
    reduce HTTP header size
    

*/



//<========  What's the advantage of using libraries like Socket.IO, Sock.JS, WS, over pure WebSocket 
//              libraries in the backend and standard APIs on frontend? Which problems do they solve  ==================>
//--------------------------------------------------------------------------------------------------------------

/*
    Socket.io
        no CORS
        bi-directional communication
        API
        
    WS  
         probably the fastest WebSocket library for node.js
         it is easy to use, blazing fast
         it can send and receive typed arrays (ArrayBuffer, Float32Array, et al.) as binary data.
         
         Client >>>>>>
         var WebSocket = require('ws')
            , ws = new WebSocket('ws://www.host.com/path');
            ws.on('open', function() {
                ws.send('something');
            });
            ws.on('message', function(message) {
                console.log('received: %s', message);
            });
         Server >>>>>>>>   
         var WebSocketServer = require('ws').Server
            , wss = new WebSocketServer({port: 8080});
            wss.on('connection', function(ws) {
                ws.on('message', function(message) {
                    console.log('received: %s', message);
                });
                ws.send('something');
            });  
             
*/

//<=========  Explain and demonstrate the process of WebSocket communication - From connecting client to server,  ==============>
//                            through sending messages, to closing connection
//  ----------------------------------------------------------------------------------------------------------------------------



