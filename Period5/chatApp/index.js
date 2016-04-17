var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernames = [];

http.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('new user', function(data, callback){
        if(usernames.indexOf(data) !== -1){
            callback(false);
        }else{
            callback(true);
            socket.username = data;
            usernames.push(socket.username);
            updateUsernames();
        }
    });
    
    //update usernames
    function updateUsernames(){
        io.sockets.emit('usernames', usernames);
    }
    
    //send message
    socket.on('send message', function(data){
        console.log(data);
        io.emit('new message', {msg: data, user: socket.username});
    });
    
    //disconnect
    socket.on('disconnect', function(data){
        if(!socket.username)return;
        usernames.splice(usernames.indexOf(socket.username), 1);
        updateUsernames();
    });
});

