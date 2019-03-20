// JavaScript Document

$(document).ready(() => {

	//divs for display data from server
	const stat1 = $('#stat1');
	const stat2 = $('#stat2');
	const stat3 = $('#stat3');
	const stat4 = $('#stat4');

	//div for dark mode onoffSwitch
	const onoff = $('#onoffSwitch');
	const colorChange = $('.colorChange');

	//div for settings button
	const settings = $('.settingsBtn');

	//divs for dark mode
	const heading = $('.heading');
	const nameWrapper = $('#nameWrapper');
	const middleWrapper = $('#middleWrapper');
	const statsBox1 = $('.statsBox1');
	const statsBox2 = $('.statsBox2');
	const statsBox3 = $('.statsBox3');
	const statsBox4 = $('.statsBox4');
	const conditionName = $('.conditionName');
	const today = $('.today');
	const lastWeek = $('.lastWeek');
	const lastMonth = $('.lastMonth');
	const setupWrapper1 = $('.setupWrapperUp');
	const setupWrapper2 = $('.setupWrapperB');
	const submitBtn = $('#submitSettings');
	const setupHeading = $('.setupHeading');
	const rangeText = $('.rangeText');

	//divs for charts
	const divChart1 = $('#chartWrapper1');
	const divChart2 = $('#chartWrapper2');
	const divChart3 = $('#chartWrapper3');
	const divChart4 = $('#chartWrapper4');

	//div for settings
	const middleSettings = $('#middleSettings');

	//settings range sliders
	const slider1 = $('#myRange1')[0];
	const slider2 = $('#myRange2')[0];
	const slider3 = $('#myRange3')[0];
	const slider4 = $('#myRange4')[0];
	const slider5 = $('#myRange5')[0];
	const slider6 = $('#myRange6')[0];
	const slider7 = $('#myRange7')[0];
	//const slider8 = $('#myRange8')[0];
	let output1 = $('#output1')[0];
	let output2 = $('#output2')[0];
	let output3 = $('#output3')[0];
	let output4 = $('#output4')[0];
	let output5 = $('#output5')[0];
	let output6 = $('#output6')[0];
	let output7 = $('#output7')[0];
	//let output8 = $('#output8')[0];

	//div for water plant
	const water = $('#water');

	//progress bars for stats
	let barTemp = $('#barTemp');
	let barAir = $('#barAir');
	let barSoil = $('#barSoil');
	let barWater = $('#barWater');

	//variables for min and max data from http
	let tempMax;
	let tempMin;

	let airhMax;
	let airhMin;

	let soilhMax;
	let soilhMin;

	let waterMin;
	let waterCapacity;

	//variable for socket data (charts)
	let socketTemp = [];
	let socketAirh = [];
	let socketSoilh = [];
	let socketWater = [];
	let socketDate = [];

	let usesValue = $('#usesValue');

	let health = $('.health');

	let plantName = $('.plantName');

	let conditionWrapper = $('#conditionWrapper');

	//barTemp.height('100%');
	//barTemp.height('100'+'%');

	//test 
	/*barTemp.height('82%');
	barAir.height('90%');
	barSoil.height('21%');
	barWater.height('95%');*/

	const calculateUses = (capacity) => {
	  return Math.round(capacity/70);
	}

	//todo
	const calculateCondition = (c1,c2,c3,c4) => {

		//rgb(229, 66, 66) - red
		let c1bool;
		let c2bool;
		let c3bool;
		let c4bool;

		if(c1 == "rgb(229, 66, 66)") { c1bool = false; }
		if(c2 == "rgb(229, 66, 66)") { c2bool = false; }
		if(c3 == "rgb(229, 66, 66)") { c3bool = false; }
		if(c4 == "rgb(229, 66, 66)") { c4bool = false; }

		if(c1 == "rgb(60, 229, 120)") { c1bool = true; }
		if(c2 == "rgb(60, 229, 120)") { c2bool = true; }
		if(c3 == "rgb(60, 229, 120)") { c3bool = true; }
		if(c4 == "rgb(60, 229, 120)") { c4bool = true; }

		let array = [];
		let falseCount=0;
		let trueCount=0;
		array.push(c1bool,c2bool,c3bool,c4bool);

		for(let i=0;i<4;i++){
			if(array[i] == true){
				trueCount++;
			}
			if(array[i] == false){
				falseCount++;
			}
		}

		if(trueCount == 4){	health.html("Perfect").css('color','#35CB6B'); }
		if(trueCount == 2 || trueCount == 3){ health.html("Good").css('color','#E59500'); }
		if(trueCount == 1){ health.html("Bad").css('color','#e54242'); }
		if(falseCount == 4){ health.html("Bad").css('color','#e54242'); }
	}
 
	//request for load min max values to range inputs and for get data to compare
	let req = 'http://localhost:5485/minmax';
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let obj = JSON.parse(this.responseText);
       console.log("data from http");
       console.log(obj);
       //console.log(obj[0].TemperatureMax);
       //console.log(slider1);

	       if(obj == 0){
	       		console.log("cannot get data http request");
	       }
	       else
	       {

	       //Temp Max range input
	       slider1.value = obj[0].TemperatureMax;
	       output1.innerHTML = obj[0].TemperatureMax;
	       //Temp Min range input
	       slider2.value = obj[0].TemperatureMin;
	       output2.innerHTML = obj[0].TemperatureMin;
	       //Air Humidity Max range input
	       slider3.value = obj[0].AirHumidityMax;
	       output3.innerHTML = obj[0].AirHumidityMax;
	       //Air Humidity Min range input
	       slider4.value = obj[0].AirHumidityMin;
	       output4.innerHTML = obj[0].AirHumidityMin;
	       //Soil Humidity Max range input
	       slider5.value = obj[0].SoilHumidityMax;
	       output5.innerHTML = obj[0].SoilHumidityMax;
	       //Soil Humidity Min range input
	       slider6.value = obj[0].SoilHumidityMin;
	       output6.innerHTML = obj[0].SoilHumidityMin;
	       //Water level range input
	       slider7.value = obj[0].WaterLevelMin;
	       output7.innerHTML = obj[0].WaterLevelMin;

	       //Water container capacity
	       capacity.value = obj[0].ContainerSize;
	       	//Temp Max to compare
	       tempMax = obj[0].TemperatureMax;
	       //Temp Max to compare
	       tempMin = obj[0].TemperatureMin;
	       //Air Max to compare
	       airhMax = obj[0].AirHumidityMax;
	       //Air Min to compare
	       airhMin = obj[0].AirHumidityMin;
	       //Soil Max to compare
	       soilhMax = obj[0].SoilHumidityMax;
	       //Soil Min to compare
	       soilhMin = obj[0].SoilHumidityMin;
	       //Water Min to compare
	       waterMin = obj[0].WaterLevelMin;
	       waterCapacity = obj[0].ContainerSize;

	       //calculation for water uses
	       let capacityResult = calculateUses(capacity.value);
	       usesValue.html(capacityResult);
	       console.log(capacityResult);

	       }
	   }
	};

	xhttp.open("GET", req , true);
	xhttp.send();

	//socket connection
    const socket = io.connect('http://localhost:5485');

    //socket connection and data emit
	socket.on('connect', (data) => {
	    console.log('check',socket.connected);
	    //socket.emit('weatherData');
	    socket.emit('join',"webclient");
	    console.log(data);
    });
	
	//when socket is on
	socket.on('weatherData', (data) => {
      console.log(data);

      let obj = data;
      console.log(obj);
      obj = Object.values(obj);
      console.log(obj);

      	plantName.html(obj[0].plantname);
		
		stat1.text(Math.round(obj[1].temperature)+"°C");
		stat2.text(Math.round(obj[1].humidityAir)+"%");
		stat3.text(Math.round(obj[1].humiditySoil)+"%");
		stat4.text(Math.round(obj[1].watersurface)+"%");

		barTemp.height(obj[1].temperature+'%');
		barAir.height(obj[1].humidityAir+'%');
		barSoil.height(obj[1].humiditySoil+'%');
		barWater.height(obj[1].watersurface+'%');

		let tempHeight = barTemp.height() / barTemp.parent().height()*100;
		let airHeight = barAir.height() / barAir.parent().height()*100;
		let soilHeight = barSoil.height() / barSoil.parent().height()*100;
		let waterHeight = barWater.height() / barWater.parent().height()*100;

		if(tempHeight < tempMin) barTemp.css('background-color', '#e54242');
		if(airHeight < airhMin) barAir.css('background-color', '#e54242');
		if(soilHeight < soilhMin) barSoil.css('background-color', '#e54242');
		if(waterHeight < waterMin) barWater.css('background-color', '#e54242');

		if(tempHeight > tempMax) barTemp.css('background-color', '#e54242');
		if(airHeight > airhMax) barAir.css('background-color', '#e54242');
		if(soilHeight > soilhMax) barSoil.css('background-color', '#e54242');

		if(tempHeight < tempMax && tempHeight > tempMin) barTemp.css('background-color', '#3ce578');
		if(airHeight < airhMax && airHeight > airhMin) barAir.css('background-color', '#3ce578');
		if(soilHeight < soilhMax && soilHeight > soilhMin) barSoil.css('background-color', '#3ce578');
		if(waterHeight > waterMin) barWater.css('background-color', '#3ce578');

		let temp = obj[1].temperature;
		let airH = obj[1].humidityAir;
		let soilH = obj[1].humiditySoil;
		let water = obj[1].watersurface;
		let date = obj[2].date;

		date = moment(date).format("hh:mm A");
		console.log(date)

		let c1 = document.getElementById("barTemp").style.backgroundColor;
		let c2 = document.getElementById("barAir").style.backgroundColor;
		let c3 = document.getElementById("barSoil").style.backgroundColor;
		let c4 = document.getElementById("barWater").style.backgroundColor;

		calculateCondition(c1,c2,c3,c4);

		//push data to socket variables for Today chart use
		socketTemp.push(temp);
		socketAirh.push(airH);
		socketSoilh.push(soilH);
		socketWater.push(water);
		socketDate.push(date);

		/*console.log(socketTemp);
		console.log(socketAirh);
		console.log(socketSoilh);
		console.log(socketWater);
		console.log(socketDate);*/

		//dataset update with concat function
		Chart1.data.datasets[0].data = Chart1.data.datasets[0].data.concat(temp);
		Chart1.data.labels = Chart1.data.labels.concat(date);
		Chart1.update();

		Chart2.data.datasets[0].data = Chart2.data.datasets[0].data.concat(airH);
		Chart2.data.labels = Chart2.data.labels.concat(date);
		Chart2.update();

		Chart3.data.datasets[0].data = Chart3.data.datasets[0].data.concat(soilH);
		Chart3.data.labels = Chart3.data.labels.concat(date);
		Chart3.update();

		Chart4.data.datasets[0].data = Chart4.data.datasets[0].data.concat(water);
		Chart4.data.labels = Chart4.data.labels.concat(date);
		Chart4.update();

    	});

		//global settings for charts
		Chart.defaults.global.maintainAspectRatio = false;
		Chart.defaults.global.defaultFontColor = '#97AFAD';

		//chart for Temperature data
		let chartTemp = document.getElementById("chartTemp").getContext("2d");
		let Chart1 = new Chart(chartTemp, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: 'Temperature',
					data: [],
					backgroundColor: [
						'#009E7F'
					],
					borderColor: [
						'#00846B',
					],
					borderWidth: 5
				}]
			},
			options: {
				legend:{
					display: true
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});

    	//chart for Air Humidity data
		let chartAirh = document.getElementById("chartAirh").getContext("2d");
		let Chart2 = new Chart(chartAirh, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: 'Air Humidity',
					data: [],
					backgroundColor: [
						'#009E7F'
					],
					borderColor: [
						'#00846B',
					],
					borderWidth: 5
				}]
			},
			options: {
				legend:{
					display: true
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
    
   
		//chart for Soil Humidity data
		let chartSoilh = document.getElementById("chartSoilh").getContext("2d");
		let Chart3 = new Chart(chartSoilh, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: 'Soil Humidity',
					data: [],
					backgroundColor: [
						'#009E7F'
					],
					borderColor: [
						'#00846B',
					],
					borderWidth: 5
				}]
			},
			options: {
				legend:{
					display: true
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
    	

		//chart for Water Surface data
		let chartWater = document.getElementById("chartWater").getContext("2d");
		let Chart4 = new Chart(chartWater, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: 'Water Level',
					data: [],
					backgroundColor: [
						'#009E7F'
					],
					borderColor: [
						'#00846B',
					],
					borderWidth: 5
				}]
			},
			options: {
				legend:{
					display: true
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});	

	//today data for charts
	today.click(() => {
		
		console.log("testToday");

    	let req = 'http://localhost:5485/weatherData1';
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
       	let obj = JSON.parse(this.responseText);
       	//console.log(obj);

		let tempToChart = obj.map(({ Temperature }) => Temperature);
		let airhToChart = obj.map(({ AirHumidity }) => AirHumidity);
		let soilhToChart = obj.map(({ SoilHumidity }) => SoilHumidity);
		let waterToChart = obj.map(({ WaterSurface }) => WaterSurface);
		let date = obj.map(({ Date }) => moment(Date).format("hh:mm A"));
		/*console.log(tempToChart);
		console.log(airhToChart);
		console.log(soilhToChart);
		console.log(waterToChart);
		console.log(date);*/

    	Chart1.data.datasets[0].data = tempToChart;
    	Chart1.data.labels = date;
    	Chart1.update();

    	Chart2.data.datasets[0].data = airhToChart;
    	Chart2.data.labels = date;
    	Chart2.update();

    	Chart3.data.datasets[0].data = soilhToChart;
    	Chart3.data.labels = date;
    	Chart3.update();

    	Chart4.data.datasets[0].data = waterToChart;
    	Chart4.data.labels = date;
    	Chart4.update();

		}
	};

	xhttp.open("GET", req , true);
	xhttp.send();

	});

	//last week data for charts
	lastWeek.click(() => {

	let req = 'http://localhost:5485/weatherData7';
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let obj = JSON.parse(this.responseText);
       //console.log(obj);

	   let tempToChart = obj.map(({ Temperature }) => Temperature);
	   let airhToChart = obj.map(({ AirHumidity }) => AirHumidity);
	   let soilhToChart = obj.map(({ SoilHumidity }) => SoilHumidity);
	   let waterToChart = obj.map(({ WaterSurface }) => WaterSurface);
	   //let date = obj.map(({ Date }) => Date.slice(0,10));
	   let date = obj.map(({ Date }) => moment(Date).format('DD-MMM-YYYY'));

	    /*console.log(tempToChart);
		console.log(airhToChart);
		console.log(soilhToChart);
		console.log(waterToChart);
		console.log(date);*/

    	Chart1.data.datasets[0].data = tempToChart;
    	Chart1.data.labels = date;
    	Chart1.update();

    	Chart2.data.datasets[0].data = airhToChart;
    	Chart2.data.labels = date;
    	Chart2.update();

    	Chart3.data.datasets[0].data = soilhToChart;
    	Chart3.data.labels = date;
    	Chart3.update();

    	Chart4.data.datasets[0].data = waterToChart;
    	Chart4.data.labels = date;
    	Chart4.update();

		}
	};

	xhttp.open("GET", req , true);
	xhttp.send();

	});

	lastMonth.click(() => {

	let req = 'http://localhost:5485/weatherData30';
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let obj = JSON.parse(this.responseText);
       console.log(obj);

	   let tempToChart = obj.map(({ Temperature }) => Temperature);
	   let airhToChart = obj.map(({ AirHumidity }) => AirHumidity);
	   let soilhToChart = obj.map(({ SoilHumidity }) => SoilHumidity);
	   let waterToChart = obj.map(({ WaterSurface }) => WaterSurface);
	   //let date = obj.map(({ Date }) => Date.slice(0,10));
	   let date = obj.map(({ Date }) => moment(Date).format('DD-MMM-YYYY'));

	   /*console.log(tempToChart);
	   console.log(airhToChart);
	   console.log(soilhToChart);
	   console.log(waterToChart);
	   console.log(date);*/

       Chart1.data.datasets[0].data = tempToChart;
       Chart1.data.labels = date;
       Chart1.update();

       Chart2.data.datasets[0].data = airhToChart;
       Chart2.data.labels = date;
       Chart2.update();

       Chart3.data.datasets[0].data = soilhToChart;
       Chart3.data.labels = date;
       Chart3.update();

       Chart4.data.datasets[0].data = waterToChart;
       Chart4.data.labels = date;
       Chart4.update();

	   }
	};

	xhttp.open("GET", req , true);
	xhttp.send();

	});

	onoff.click(() => {

		colorChange.toggleClass('-darkmode');
		heading.toggleClass('-darkmode');
		nameWrapper.toggleClass('-darkmode');
		middleWrapper.toggleClass('-darkmode');
		statsBox1.toggleClass('-darkmode');
		statsBox2.toggleClass('-darkmode');
		statsBox3.toggleClass('-darkmode');
		statsBox4.toggleClass('-darkmode');
		divChart1.toggleClass('-darkmode');
		divChart2.toggleClass('-darkmode');
		divChart3.toggleClass('-darkmode');
		divChart4.toggleClass('-darkmode');
		middleSettings.toggleClass('-darkmode');
		conditionName.toggleClass('-darkmode');
		today.toggleClass('-darkmode');
		lastWeek.toggleClass('-darkmode');
		lastMonth.toggleClass('-darkmode');
		setupWrapper1.toggleClass('-darkmode');
		setupWrapper2.toggleClass('-darkmode');
		submitBtn.toggleClass('-darkmode');
		setupHeading.toggleClass('-darkmode');
		rangeText.toggleClass('-darkmode');
	});
	
	statsBox1.click(() => {
		console.log("test1");
		divChart1.css('display','block');
		divChart2.css('display','none');
		divChart3.css('display','none');
		divChart4.css('display','none');
	});

	statsBox2.click(() => {
		console.log("test2");
		divChart1.css('display','none');
		divChart2.css('display','block');
		divChart3.css('display','none');
		divChart4.css('display','none');
	});

	statsBox3.click(() => {
		console.log("test3");
		divChart1.css('display','none');
		divChart2.css('display','none');
		divChart3.css('display','block');
		divChart4.css('display','none');
	});

	statsBox4.click(() => {
		console.log("test4");
		divChart1.css('display','none');
		divChart2.css('display','none');
		divChart3.css('display','none');
		divChart4.css('display','block');
	});

	settings.click(() => {
		console.log("test settings button");
		middleWrapper.css('display','none');
		middleSettings.css('display','flex');
		conditionWrapper.css('display','none');
	});

	output1.innerHTML = slider1.value;
	output2.innerHTML = slider2.value;
	output3.innerHTML = slider3.value;
	output4.innerHTML = slider4.value;
	output5.innerHTML = slider5.value;
	output6.innerHTML = slider6.value;
	output7.innerHTML = slider7.value;
	/*output8.innerHTML = slider8.value;*/

	slider1.oninput = function() {
	  output1.innerHTML = this.value;
	}

	slider2.oninput = function() {
	  output2.innerHTML = this.value;
	}

	slider3.oninput = function() {
	  output3.innerHTML = this.value;
	}

	slider4.oninput = function() {
	  output4.innerHTML = this.value;
	}

	slider5.oninput = function() {
	  output5.innerHTML = this.value;
	} 

	slider6.oninput = function() {
	  output6.innerHTML = this.value;
	}

	slider7.oninput = function() {
	  output7.innerHTML = this.value;
	}

	submitBtn.click(() => {

		console.log("test");
		console.log(capacity.value);

		let capacityResult = calculateUses(capacity.value);
	    usesValue.html(capacityResult);
	    console.log(capacityResult);

		$.ajax({
	    url: 'http://localhost:5485/minmax',
	    dataType: 'json',
	    type: 'put',
		headers:{"Content-Type":"application/json"},
	    data: JSON.stringify({

	    	"identification":{

	    	"id": "sdf256s5df63", 
	    	"plantname": "MyPlant1"

	    	},
	    	
	    	"optimalValues":{
	    		
	    	"TemperatureMax":slider1.value,
	    	"TemperatureMin":slider2.value,
	    	"AirHumidityMax":slider3.value,
	    	"AirHumidityMin":slider4.value,
	    	"SoilHumidityMax":slider5.value,
	    	"SoilHumidityMin":slider6.value, 
	    	"WaterLevelMin":slider7.value, 
	    	"ContainerSize":capacity.value

	    }}),

	    success: function( data, textStatus, jQxhr ){
			console.log("sent successfully");
			console.log(data);

		   //let obj = JSON.parse(data);
		   let obj = data;
	       console.log("data from http");
	       console.log(obj.optimalValues.TemperatureMax);
	       //console.log(obj[0].TemperatureMax);
	       //console.log(slider1);

	       if(obj == 0){
	       		console.log("cannot get data http request");
	       }
	       else
	       {

	       //Temp Max range input
	       slider1.value = obj.optimalValues.TemperatureMax;
	       output1.innerHTML = obj.optimalValues.TemperatureMax;
	       //Temp Min range input
	       slider2.value = obj.optimalValues.TemperatureMin;
	       output2.innerHTML = obj.optimalValues.TemperatureMin;
	       //Air Humidity Max range input
	       slider3.value = obj.optimalValues.AirHumidityMax;
	       output3.innerHTML = obj.optimalValues.AirHumidityMax;
	       //Air Humidity Min range input
	       slider4.value = obj.optimalValues.AirHumidityMin;
	       output4.innerHTML = obj.optimalValues.AirHumidityMin;
	       //Soil Humidity Max range input
	       slider5.value = obj.optimalValues.SoilHumidityMax;
	       output5.innerHTML = obj.optimalValues.SoilHumidityMax;
	       //Soil Humidity Min range input
	       slider6.value = obj.optimalValues.SoilHumidityMin;
	       output6.innerHTML = obj.optimalValues.SoilHumidityMin;
	       //Water level range input
	       slider7.value = obj.optimalValues.WaterLevelMin;
	       output7.innerHTML = obj.optimalValues.WaterLevelMin;

	       //Water container capacity
	       capacity.value = obj.optimalValues.ContainerSize;
	       	//Temp Max to compare
	       tempMax = obj.optimalValues.TemperatureMax;
	       //Temp Max to compare
	       tempMin = obj.optimalValues.TemperatureMin;
	       //Air Max to compare
	       airhMax = obj.optimalValues.AirHumidityMax;
	       //Air Min to compare
	       airhMin = obj.optimalValues.AirHumidityMin;
	       //Soil Max to compare
	       soilhMax = obj.optimalValues.SoilHumidityMax;
	       //Soil Min to compare
	       soilhMin = obj.optimalValues.SoilHumidityMin;
	       //Water Min to compare
	       waterMin = obj.optimalValues.WaterLevelMin;
	       waterCapacity = obj.optimalValues.ContainerSize;

	       //calculation for water uses
	       let capacityResult = calculateUses(capacity.value);
	       usesValue.html(capacityResult);
	       console.log(capacityResult);

	        let tempHeight = barTemp.height() / barTemp.parent().height()*100;
			let airHeight = barAir.height() / barAir.parent().height()*100;
			let soilHeight = barSoil.height() / barSoil.parent().height()*100;
			let waterHeight = barWater.height() / barWater.parent().height()*100;

 		    if(tempHeight < tempMin) barTemp.css('background-color', '#e54242');
			if(airHeight < airhMin) barAir.css('background-color', '#e54242');
			if(soilHeight < soilhMin) barSoil.css('background-color', '#e54242');
			if(waterHeight < waterMin) barWater.css('background-color', '#e54242');

			if(tempHeight > tempMax) barTemp.css('background-color', '#e54242');
			if(airHeight > airhMax) barAir.css('background-color', '#e54242');
			if(soilHeight > soilhMax) barSoil.css('background-color', '#e54242');

			if(tempHeight < tempMax && tempHeight > tempMin) barTemp.css('background-color', '#3ce578');
			if(airHeight < airhMax && airHeight > airhMin) barAir.css('background-color', '#3ce578');
			if(soilHeight < soilhMax && soilHeight > soilhMin) barSoil.css('background-color', '#3ce578');
			if(waterHeight > waterMin) barWater.css('background-color', '#3ce578');

			let c1 = document.getElementById("barTemp").style.backgroundColor;
			let c2 = document.getElementById("barAir").style.backgroundColor;
			let c3 = document.getElementById("barSoil").style.backgroundColor;
			let c4 = document.getElementById("barWater").style.backgroundColor;

			calculateCondition(c1,c2,c3,c4);

	       }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	    });

		middleWrapper.css('display','flex');
		middleSettings.css('display','none');
		conditionWrapper.css('display','flex');

	});

	water.click(() => {
		socket.emit('water');
		//console.log($('#usesValue').html());

	});

});