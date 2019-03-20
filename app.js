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
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
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
        console.log("Water the plant");
    });

    client.on('getSoilHumidity', ()=>{
        console.log("SENDINGHUMIDITY");
        database.getSoilHumidity(data =>{
            client.emit("soilHumidity", data);
        });
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
        dataAvarageByDays(data, rvalue =>{
            rvalue = JSON.stringify(rvalue);
            res.status(200).send(rvalue);
        });
    });
});

app.get('/weatherData30', (req, res) =>{
    database.getWeatherData("MONTH" , data =>{
        dataAvarageByDays(data, rvalue =>{
            rvalue = JSON.stringify(rvalue);
            res.status(200).send(rvalue);
        });
    });
});

app.put('/minmax', (req, res) =>{

    database.writeMinMax(req.body, issuccess =>{
        console.log(issuccess);
        if(issuccess)
        {
            res.send(req.body);
        }
        else
        {
            res.status(500).send();
        }
        
    });

}); 

app.get('/minmax', (req, res) =>{
    database.getMinMax(data =>{
        res.status(200).send(data);
    });
});
server.listen(1205);


function dataAvarageByDays(data, rvlaue)
{
    let rJSON = [];
    data = JSON.parse(data);
    let current = data[0].Date.substr(0, 10);
    let cdate
    let counter = 0;

    let temperature = 0;
    let airhumidity = 0;
    let soilhumidity = 0;
    let watersurface = 0;
    for(let i = 0; i<data.length; i++)
    {
        cdate = data[i].Date.substr(0, 10);
        if(current == cdate)
        {
            counter++;
            temperature += data[i].Temperature;
            airhumidity += data[i].AirHumidity;
            soilhumidity += data[i].SoilHumidity;
            watersurface += data[i].WaterSurface;
            if(i == data.length-1){pushToArray();}
        }
        else
        {
            pushToArray();
        }
    }
    function pushToArray()
    {
        temperature = Math.round(temperature/counter);
        airhumidity = Math.round(airhumidity/counter);
        soilhumidity = Math.round(soilhumidity/counter);
        watersurface = Math.round(watersurface/counter);

        rJSON.push({"Temperature":temperature, "AirHumidity": airhumidity, "SoilHumidity":soilhumidity, "WaterSurface":watersurface, "Date":current});

        counter = 0;
        current = cdate;
        temperature = 0;
        airhumidity = 0;
        soilhumidity = 0;
        watersurface = 0;
    }
    rvlaue(rJSON);
}