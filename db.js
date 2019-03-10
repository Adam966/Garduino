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
      obj = JSON.parse(obj);
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
      con.query(query, (err, result) =>{
           if (err) throw err;
           data(JSON.stringify(result));
      });
    },

    writeMinMax(data)
    {
      console.log("Writing to database");
      //data = JSON.parse(data);
      const query = "INSERT INTO plantcare (ArduinoID, PlantName, TemperatureMin, TemperatureMax, AirHumidityMin, AirHumidityMax, SoilHumidityMin, SoilHumidityMax, WaterLevelMin) VALUES (\'"+data.identification.id+"\',\'"+ data.identification.plantname+"\',\'"+ data.optimalValues.TemperatureMin+"\',\'"+ data.optimalValues.TemperatureMax+"\',\'"+ data.optimalValues.AirHumidityMin+"\',\'"+  data.optimalValues.AirHumidityMax + "\',\'"+ data.optimalValues.SoilHumidityMin+"\',\'" + data.optimalValues.AirHumidityMax+"\',\'"+ data.optimalValues.WaterLevelMin+"\')";
      con.query(query, err => {
        if (err) throw err;
        console.log("Record successfully inserted");
      });
    },

    getMinMax(data)
    {
      const query = "SELECT * from plantcare";
      con.query(query, (err, result) =>{
           if (err) throw err;
           data(JSON.stringify(result));
      });
    },
};
