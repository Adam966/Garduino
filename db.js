const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "plantserver",
  password: "akademiasovy",
  database: "plant_database"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
  });

module.exports = {
    writeData(obj)
    {
      console.log("Writing to database");
      //let obj = JSON.parse(event);
      const query = "INSERT INTO weatherinfo (ArduinoID, Temperature, AirHumidity, SoilHumidity, WaterSurface, Date) VALUES (\'"+obj.identification.id+"\',\'"+ obj.info.temperature+"\',\'"+ obj.info.humidityAir+"\',\'"+ obj.info.humiditySoil+"\',\'"+ obj.info.watersurface+"\',\'"+ obj.date.date+"\')";
      con.query(query, err => {
        if (err) throw err;
        console.log("Record successfully inserted");
      });
      
    },
    
    getWeatherData(interval, data)
    {
      console.log(interval);
      const query = "SELECT Temperature, AirHumidity, SoilHumidity, WaterSurface, Date FROM WeatherInfo WHERE Date > (NOW() - INTERVAL 1 "+ interval + ")";
      console.log(query);
      con.query(query, (err, result) =>{
           if (err) throw err;
           data(JSON.stringify(result));
      });
    }
};
