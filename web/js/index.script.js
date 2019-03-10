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
	const slider8 = $('#myRange8')[0];
	let output1 = $('#output1')[0];
	let output2 = $('#output2')[0];
	let output3 = $('#output3')[0];
	let output4 = $('#output4')[0];
	let output5 = $('#output5')[0];
	let output6 = $('#output6')[0];
	let output7 = $('#output7')[0];
	let output8 = $('#output8')[0];

	//div for water plant
	const water = $('#water');

	//progress bars for stats
	let barTemp = $('#barTemp');
	let barAir = $('#barAir');
	let barSoil = $('#barSoil');
	let barWater = $('#barWater');

	//variable for socket data (charts)
	let socketTemp = [];
	let socketAirh = [];
	let socketSoilh = [];
	let socketWater = [];
	let socketDate = [];

	//barTemp.height('100%');
	//barTemp.height('100'+'%');

	//test 
	/*barTemp.height('82%');
	barAir.height('90%');
	barSoil.height('21%');
	barWater.height('95%');*/

	//request for load min max values to range inputs
	let req = 'http://localhost:5485/minmax';
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let obj = JSON.parse(this.responseText);
       console.log(obj);

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

      let obj = JSON.parse(data);
      console.log(obj);
      obj = Object.values(obj);
      console.log(obj);

		$('#stat1').text(obj[1].temperature);
		$('#stat2').text(obj[1].humidityAir);
		$('#stat3').text(obj[1].humiditySoil);
		$('#stat4').text(obj[1].watersurface);
		
		stat1.text(obj[1].temperature);
		stat2.text(obj[1].humidityAir);
		stat3.text(obj[1].humidtySoil);
		stat4.text(obj[1].watersurface);

		barTemp.height(obj[1].temperature+'%');
		barAir.height(obj[1].humidityAir+'%');
		barSoil.height(obj[1].humiditySoil+'%');
		barWater.height(obj[1].watersurface+'%');


		let tempHeight = barTemp.height() / barTemp.parent().height()*100;
		let airHeight = barAir.height() / barAir.parent().height()*100;
		let soilHeight = barSoil.height() / barSoil.parent().height()*100;
		let waterHeight = barWater.height() / barWater.parent().height()*100;

		//under 20%
		if(tempHeight < 20 ) barTemp.css('background-color', '#eab70c');
		if(airHeight < 20 ) barAir.css('background-color', '#eab70c');
		if(soilHeight < 20 ) barSoil.css('background-color', '#eab70c');
		if(waterHeight < 20 ) barWater.css('background-color', '#eab70c');

		//under 10%
		if(tempHeight < 10 ) barTemp.css('background-color', '#e54242');
		if(airHeight < 10 ) barAir.css('background-color', '#e54242')
		if(soilHeight < 10 ) barSoil.css('background-color', '#e54242');
		if(waterHeight < 10 ) barWater.css('background-color', '#e54242');

		//between 20 and 90
		if(tempHeight > 20 && tempHeight < 90 ) barTemp.css('background-color', '#3ce578');
		if(airHeight > 20 && airHeight < 90 ) barAir.css('background-color', '#3ce578');
		if(soilHeight > 20 && soilHeight < 90 ) barSoil.css('background-color', '#3ce578');
		if(waterHeight > 20 && waterHeight < 90 ) barWater.css('background-color', '#3ce578');

		//between 20 and 90
		if(tempHeight > 90 ) barTemp.css('background-color', '#e54242');
		if(airHeight > 90 ) barAir.css('background-color', '#e54242');
		if(soilHeight > 90 ) barSoil.css('background-color', '#e54242');
		if(waterHeight > 90 ) barWater.css('background-color', '#e54242');

		let temp = obj[1].temperature;
		let airH = obj[1].humidityAir;
		let soilH = obj[1].humiditySoil;
		let water = obj[1].watersurface;
		let date = obj[2].date;

		//push data to socket variables for Today chart use
		socketTemp.push(temp);
		socketAirh.push(airH);
		socketSoilh.push(soilH);
		socketWater.push(water);
		socketDate.push(date);

		console.log(socketTemp);
		console.log(socketAirh);
		console.log(socketSoilh);
		console.log(socketWater);
		console.log(socketDate);

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
					display: false
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
					display: false
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
					display: false
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
					display: false
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
       	console.log(obj);

		let tempToChart = obj.map(item => item.Temperature);
		let airhToChart = obj.map(item => item.AirHumidity);
		let soilhToChart = obj.map(item => item.SoilHumidity);
		let waterToChart = obj.map(item => item.WaterSurface);
		let date = obj.map(item => item.Date);
		console.log(tempToChart);
		console.log(airhToChart);
		console.log(soilhToChart);
		console.log(waterToChart);
		console.log(date);

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
       console.log(obj);

		let tempToChart = obj.map(item => item.Temperature);
		let airhToChart = obj.map(item => item.AirHumidity);
		let soilhToChart = obj.map(item => item.SoilHumidity);
		let waterToChart = obj.map(item => item.WaterSurface);
		let date = obj.map(item => item.Date.slice(0,10));
		console.log(tempToChart);
		console.log(airhToChart);
		console.log(soilhToChart);
		console.log(waterToChart);
		console.log(date);

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

		let tempToChart = obj.map(item => item.Temperature);
		let airhToChart = obj.map(item => item.AirHumidity);
		let soilhToChart = obj.map(item => item.SoilHumidity);
		let waterToChart = obj.map(item => item.WaterSurface);
		//TODO replace pre regex hodnotu
		/*const searchStr = '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])';
		const regex = new RegExp(searchStr,'i');*/
		let date = obj.map(item => item.Date.slice(0,10));
		//let date = obj.map(item => Date.parse(item.Date));
		//let date = obj.map(item => item.Date);
		console.log(tempToChart);
		console.log(airhToChart);
		console.log(soilhToChart);
		console.log(waterToChart);
		console.log(date);

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
	});


	output1.innerHTML = slider1.value;
	output2.innerHTML = slider2.value;
	output3.innerHTML = slider3.value;
	output4.innerHTML = slider4.value;
	output5.innerHTML = slider5.value;
	output6.innerHTML = slider6.value;
	output7.innerHTML = slider7.value;
	output8.innerHTML = slider8.value;

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

	slider8.oninput = function() {
	  output8.innerHTML = this.value;
	}

	submitBtn.click(() => {

	//$('input[type=range]').val(20);

	/*slider1.value;*/
	let sliderArr = JSON.stringify({
		"identification":{
			"id": "sdf256s5df63", "plantname": "MyPlant1"
		},
			"optimalValues":{
				"TemperatureMax":slider1.value,
				"TemperatureMin":slider2.value,
				"AirHumidityMax":slider3.value,
				"AirHumidityMin":slider4.value,
				"SoilHumidityMax":slider5.value,
				"SoilHumidityMin":slider6.value, 
				"WaterLevelMin":slider7.value
			}
		});
	//console.log(sliderArr[0].TemperatureMin);
	console.log(sliderArr);
	//sliderArr.push(slider1.value,slider2.value,slider3.value,slider4.value,slider5.value,slider6.value,slider7.value,slider8.value);
	//let valuesToSend = JSON.stringify({ ...[slider1.value,slider2.value,slider3.value,slider4.value,slider5.value,slider6.value,slider7.value,slider8.value] });
	//console.log(valuesToSend);
	//let test = JSON.parse(valuesToSend);

	let req = 'http://localhost:5485/minmax';
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       /*let obj = JSON.parse(this.responseText);
       console.log(obj);*/

	   }
	};

	xhttp.open("POST", req , true);
	xhttp.send(sliderArr);

	middleWrapper.css('display','flex');
	middleSettings.css('display','none');

	});

});