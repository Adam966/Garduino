let database = require('./db');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

console.log("Server started");
io.on('connection', function(client){ 
    console.log("Client connected");
	   
	    client.on('arduinoData',function(event){ 
        database.writeData(event);
    });
        client.on('weatherData',function(event){ 
        let data = '{"identification":{"id": "sdf256s5df", "plantname": "MyPlant1"},"info":{"temperature": "24", "humidityAir": "25", "humiditySoil": "32", "watersurface": "53"},  "date":{"date": "2019.2.1"}}';
        client.emit('weatherData', data);
	});
     	client.on('disconnect',function(){
	  	console.log('Client has disconnected');
    });
});
server.listen(5485);
