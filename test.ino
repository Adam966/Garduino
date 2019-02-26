#include <Arduino.h>
#include <SocketIoClient.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>

/////////////////////////////////////////////////////////////////////////////////////////////////////

#define interval 15000
unsigned long previousMillis = 0;

const char* ssid     = "MI";
const char* password = "heslo123456789";

//////////////////////////////////////////////// SENSOR PIN SETUP /////////////////////////////////////

#define waterSurface A0
#define wsPower 1


///////////////////////////////////////////////////////////////////////////////////////////////////////
SocketIoClient webSocket;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

////////////////////////////////////////////////// SETUP /////////////////////////////////////////////

void setup() {
    Serial.begin(115200);

    Serial.setDebugOutput(true);

    Serial.println();
    Serial.println();
    Serial.println();

      for(uint8_t t = 4; t > 0; t--) {
          Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
          Serial.flush();
          delay(1000);
      }

    //Connection to WIFI   
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    
    //setup OTA
    arduinoOTA();

    //establish time client
    timeClient.begin();
    timeClient.setTimeOffset(3600);

    //establish socketIO connection
    webSocket.begin("192.168.1.109", 5485, "/socket.io/?transport=websocket");
    webSocket.on("pourFlower", pourFlower);
    webSocket.on("disconnect", disconection);
    webSocket.on("connect", conection);

    //setup pinMode
    pinMode(wsPower, OUTPUT); //D4
}

/////////////////////////////////////////// WIFI reconection /////////////////////////////////////
void wifiConection() {
 if (WiFi.status() != WL_CONNECTED) {
    
    WiFi.begin(ssid, password);
    delay(500);
    Serial.print(".");
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("");
      Serial.println("WiFi connected.");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());

      timeClient.begin();
      timeClient.setTimeOffset(3600);
      
      webSocket.begin("192.168.1.109", 5485, "/socket.io/?transport=websocket");
      webSocket.on("pourFlower", pourFlower);
      webSocket.on("disconnect", disconection);
      webSocket.on("connect", conection);
    }
  }
}

//////////////////////////////////////////// OTA //////////////////////////////////////////////////

void arduinoOTA() {
  ArduinoOTA.setHostname("myesp32");
  
  ArduinoOTA.onStart([]() {
      String type;
      if (ArduinoOTA.getCommand() == U_FLASH)
        type = "sketch";
      else // U_SPIFFS
        type = "filesystem";

      // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
      Serial.println("Start updating " + type);
    })
    .onEnd([]() {
      Serial.println("\nEnd");
    })
    .onProgress([](unsigned int progress, unsigned int total) {
      Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
    })
    .onError([](ota_error_t error) {
      Serial.printf("Error[%u]: ", error);
      if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
      else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
      else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
      else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
      else if (error == OTA_END_ERROR) Serial.println("End Failed");
    });

  ArduinoOTA.begin();
}
////////////////////////////////////////// MEASURE DATA ////////////////////////////////////////////

void measureData() {
  String id = "kgj45as";
  float temperature = 50; 
  float humidityAir = 25.5;
  float humiditySoil = 65.5;
  float waterSurface = getWaterSurface();

  createJson(temperature, humidityAir, humiditySoil, waterSurface, id);
}

//////////////////////////////////////// SENSORS FUNCTIONS ////////////////////////////////////////

//WATER SURFACE
float getWaterSurface() {
  digitalWrite(wsPower, HIGH);
  float ws = analogRead(waterSurface);
  digitalWrite(wsPower, LOW);
  return ws;
}

//DATE
String getDate() {
  while(!timeClient.update()) {
    timeClient.forceUpdate();
  }
  
  String formattedDate = timeClient.getFormattedDate();
  int splitT = formattedDate.indexOf("T");
  String dayStamp = formattedDate.substring(0, splitT);
  String timeStamp = formattedDate.substring(splitT+1, formattedDate.length()-1);
  String date = dayStamp +" "+ timeStamp;

  return date;
}

//////////////////////////////////////// JSON Creation /////////////////////////////////////////////////

void createJson(float temperature, float humidityAir, float humiditySoil, float waterSurface, String id) {
    const size_t capacity = JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(3) + JSON_OBJECT_SIZE(4);
    DynamicJsonBuffer jsonBuffer(capacity);
    
    JsonObject& root = jsonBuffer.createObject();
    
    JsonObject& identification = root.createNestedObject("identification");
    identification["id"] = id;
    
    JsonObject& info = root.createNestedObject("info");
    info["temperature"] = temperature;
    info["humidityAir"] = humidityAir;
    info["humiditySoil"] = humiditySoil;
    info["watersurface"] = waterSurface;
    
    JsonObject& date = root.createNestedObject("date");
    date["date"] = getDate();
    
    char output[capacity];
    root.printTo(output);
    sendData(output);
}

//////////////////////////////////////////// SOCKETIO EVENTS //////////////////////////////////

void sendData(char* output) {
    webSocket.emit("arduinoData", output);
    Serial.println("Data sended.");
}

void pourFlower(const char * payload, size_t length) {
  Serial.println("Pour flower");
}

void conection(const char * payload, size_t length) {
  Serial.println("Client connected to server.");
}

void disconection(const char * payload, size_t length) {
   Serial.println("Client disconnected from server.");
   webSocket.begin("192.168.1.109", 5485, "/socket.io/?transport=websocket");
}

/////////////////////////////////////////////// LOOP ///////////////////////////////////////////

void loop() {
    webSocket.loop();
    wifiConection();
    ArduinoOTA.handle();
    
    if (millis() - previousMillis >= interval) {
      previousMillis = millis();    
      measureData();
    }
}
