let database = require('./db');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

console.log("Server started");
io.on('connection', client =>{ 
    console.log("Client connected");
	   
	client.on('arduinoData', event =>{ 
        database.writeData(event);
        client.emit('weatherData', event);
    });
    
    client.on('disconnect', ()=>{
	    console.log('Client has disconnected');
    });
});

app.get('/weatherData7', (req, res) =>{
    database.getWeatherData("WEEK" , data =>{
        res.status(200).send(data);
    });
});

app.get('/weatherData30', (req, res) =>{
    database.getWeatherData("MONTH" , data =>{
        res.status(200).send(data);
    });
});
server.listen(5485);
