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
      if(validJSON(obj))
      {
        writeArduinoData();
      }
      else
      {
        console.log("BAD DATA");
      }

      function writeArduinoData()
      {
        const query = "INSERT INTO weatherinfo (ArduinoID, Temperature, AirHumidity, SoilHumidity, WaterSurface, Date) VALUES (\'"+obj.identification.id+"\',\'"+ obj.info.temperature+"\',\'"+ obj.info.humidityAir+"\',\'"+ obj.info.humiditySoil+"\',\'"+ obj.info.watersurface+"\',\'"+ obj.date.date+"\')";
        con.query(query, err => {
          if (err)
          {
            console.log(err);
          }
          else
          {
            console.log("Record successfully inserted");
          }
        });
      }

      function validJSON(data)
      {
        if(!data.identification.hasOwnProperty('id'))
        {
          return false;
        }
        if(!data.info.hasOwnProperty('temperature'))
        {
          return false;
        }
        if(!data.info.hasOwnProperty('humidityAir'))
        {
          return false;
        }
        if(!data.info.hasOwnProperty('humiditySoil'))
        {
          return false;
        }
        if(!data.date.hasOwnProperty('date'))
        {
          return false;
        }
        return true;
      }

    },

    getWeatherData(interval, data)
    {
      console.log(interval);
      const query = "SELECT Temperature, AirHumidity, SoilHumidity, WaterSurface,  Date FROM WeatherInfo WHERE Date > (NOW() - INTERVAL 1 "+ interval + ")";
      con.query(query, (err, result) =>{
           if (err)
           {
             console.log(err);
             data("Error");
           }
           else
           {
             data(JSON.stringify(result));
           }
      });
    },

    writeMinMax(data) //writes the minimal and maximal values to the database what the webclient sent
    {
      console.log("Writing to database");
      if(checkJSON(data))
      {
        console.log("PASSED");
        getIDs(arduinoID =>{   //compares if the current arduinoID matches with the ones from the database if matches, updates with the new values, if not writes the values to the database
          let count = 0;
          arduinoID = JSON.parse(arduinoID);
          for(let i = 0; i<=Object.keys(arduinoID).length-1; i++)
          {
            if(data.identification.id == arduinoID[i].ArduinoID)
            {
              console.log("MATCH");
              count++;
            }
          }
          if(count > 0)
          {
            updateDataMinMax();
            console.log("Data updated");
          }
          else
          {
            writeDataMinMax();
            console.log("Data writed");
          }

        });
      }
      else
      {
        console.log("BAD DATA");
      }

      function getIDs(arduinoID) //Getting Arduino IDs from database
      {
          const query = "SELECT ArduinoID from plantcare";
          con.query(query, (err, result) =>{
            if (err)
            {
              console.log(err);
            }
            arduinoID(JSON.stringify(result));
           });
      }

      function writeDataMinMax() //writes the minimal and maximal values to the database
      {
        const query = "INSERT INTO plantcare (ArduinoID, PlantName, TemperatureMin, TemperatureMax, AirHumidityMin, AirHumidityMax, SoilHumidityMin, SoilHumidityMax, WaterLevelMin, ContainerSize) VALUES (\'"+data.identification.id+"\',\'"+ data.identification.plantname+"\',\'"+ data.optimalValues.TemperatureMin+"\',\'"+ data.optimalValues.TemperatureMax+"\',\'"+ data.optimalValues.AirHumidityMin+"\',\'"+  data.optimalValues.AirHumidityMax + "\',\'"+ data.optimalValues.SoilHumidityMin+"\',\'" + data.optimalValues.AirHumidityMax+"\',\'"+ data.optimalValues.WaterLevelMin+"\',\'"+data.optimalValues.ContainerSize+"\')";
        con.query(query, err => {
          if (err)
          {
            console.log(err);
          }
          else
          {
            console.log("Record successfully inserted");
          }
        });
      }

      function updateDataMinMax() //updates the minimal and maximal values of a given arduino in the database
      {
        const query = "UPDATE plantcare SET PlantName=\'"+data.identification.plantname+"\',TemperatureMin=\'"+data.optimalValues.TemperatureMin+"\', TemperatureMax=\'"+data.optimalValues.TemperatureMax+"\', AirHumidityMin=\'"+data.optimalValues.AirHumidityMin+"\', AirHumidityMax=\'"+data.optimalValues.AirHumidityMax+"\', SoilHumidityMin=\'"+data.optimalValues.SoilHumidityMin+"\', SoilHumidityMax=\'"+data.optimalValues.SoilHumidityMax+"\', WaterLevelMin=\'"+data.optimalValues.WaterLevelMin+"\', ContainerSize=\'"+data.optimalValues.ContainerSize+"\'";
        con.query(query, function (err, result) {
          if (err)
          {
            console.log(err);
          }
          else
          {
            console.log("Record successfully updated");
          }
        });
      }

      function checkJSON(data)
      {
        if(!data.hasOwnProperty('identification'))
        {
          return false;
        }
        if(!data.hasOwnProperty('optimalValues'))
        {
          return false;
        }
        if(!data.identification.hasOwnProperty('id'))
        {
          return false;
        }
        if(!data.identification.hasOwnProperty('plantname'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('TemperatureMin'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('TemperatureMax'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('AirHumidityMin'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('AirHumidityMax'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('SoilHumidityMin'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('SoilHumidityMax'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('WaterLevelMin'))
        {
          return false;
        }
        if(!data.optimalValues.hasOwnProperty('ContainerSize'))
        {
          return false;
        }
        return true;
      }

    },

    getMinMax(data) //returns the minimal and maximal values
    {
      const query = "SELECT * from plantcare";
      con.query(query, (err, result) =>{
        if (err)
        {
          console.log(err);
          data("Error");
        }
        else
        {
          data(JSON.stringify(result));
        }
      });
    },

    getSoilHumidity(data) //returns soil gumidity min and max
    {
      const query = "SELECT SoilHumidityMin, SoilHumidityMax from plantcare";
      con.query(query, (err, result) =>{
           if (err)
           {
             console.log(err);
             data("Error");
           }
           else
           {
             data(JSON.stringify(result));
           }
      });
    },

};
