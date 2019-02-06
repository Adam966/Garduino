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
    writeData(event)
    {
      console.log("Writing to database");
      let obj = JSON.parse(event);
      
      var data = "INSERT INTO weatherinfo (ArduinoID, Temperature, AirHumidity, SoilHumidity, WaterSurface, Date) VALUES (\'"+obj.identification.id+"\',\'"+ obj.info.temperature+"\',\'"+ obj.info.humidityAir+"\',\'"+ obj.info.humiditySoil+"\',\'"+ obj.info.watersurface+"\',\'"+ obj.date.date+"\')";
      con.query(data, function (err, result) {
        if (err) throw err;
        console.log("Record successfully inserted");
      });
      
    },
    
    getWeatherData(data)
    {
      con.query("SELECT * FROM weatherinfo order by ID DESC LIMIT 30", function (err, result, fields) {
        if (err) throw err;
        delete result[0].ID;
        data(JSON.stringify(result));
      });
    }
};
