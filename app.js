let database = require('./db');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");

app.use(bodyParser.json());

io.set('origins', '*:*');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  

console.log("Server started");
io.on('connection', client =>{ 
    console.log("Client connected");

    client.on('join', room => {
        client.join(room);
        console.log('client joined to ' + room);
    });
	   
	client.on('arduinoData', event =>{ 
        database.writeData(event);
        io.to('webclient').emit('weatherData', event);
        console.log("Latest data sent to client");
    });

    client.on('water', () => {
        io.to('arduinoclient').emit('water');
    });

    let webroom = io.of('/webclient');
        webroom.on('connection', socket =>{
    });

    let arduinoroom = io.of('/arduinoclient');
        arduinoroom.on('connection', socket =>{
    });
    
    client.on('disconnect', ()=>{
	    console.log('Client has disconnected');
    });
});

app.get('/weatherData1', (req, res) =>{
    database.getWeatherData("DAY" , data =>{
        res.status(200).send(data);
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

app.post('/minmax', (req, res) =>{
    database.writeMinMax(req.body);
    //console.log(req.body);
});

app.get('/minmax', (req, res) =>{
    database.getMinMax(data =>{
        res.status(200).send(data);
    });
});
server.listen(5485);