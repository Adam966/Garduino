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


	//socket connection
    const socket = io.connect('http://localhost:5485');

    //socket connection and data emit
	socket.on('connect', (data) => {
	    console.log('check',socket.connected);
	    socket.emit('weatherData');
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

		let temp = obj[1].temperature;
		let airH = obj[1].humidityAir;
		let soilH = obj[1].humiditySoil;
		let water = obj[1].watersurface;
		let date = obj[2].date;

		/*socketTemp = socketTemp.concat(temp);
		console.log("dd");
		console.log(socketTemp);*/

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

		//myChartData.datasets[0].data = myChartData.datasets[0].data.concat(result);
		/*socketTemp = obj.filter(item => typeof item.temperature === 'string').map(item => item.temperature);
		socketAirh = obj.filter(item => typeof item.humidityAir === 'string').map(item => item.humidityAir);
		socketSoilh = obj.filter(item => typeof item.humiditySoil === 'string').map(item => item.humiditySoil);
		socketWater = obj.filter(item => typeof item.watersurface === 'string').map(item => item.watersurface);
		socketDate = obj.filter(item => typeof item.date === 'string').map(item => item.date);*/

		/*
		console.log(temp);
		console.log(airH);
		console.log(soilH);
		console.log(water);
		console.log(date);*/

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

		//chart for Temperature data
		Chart.defaults.global.maintainAspectRatio = false;
		let chartTemp = document.getElementById("chartTemp").getContext("2d");
		let Chart1 = new Chart(chartTemp, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: '# of Votes',
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
		Chart.defaults.global.maintainAspectRatio = false;
		let chartAirh = document.getElementById("chartAirh").getContext("2d");
		let Chart2 = new Chart(chartAirh, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: '# of Votes',
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
		Chart.defaults.global.maintainAspectRatio = false;
		let chartSoilh = document.getElementById("chartSoilh").getContext("2d");
		let Chart3 = new Chart(chartSoilh, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: '# of Votes',
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
		Chart.defaults.global.maintainAspectRatio = false;
		let chartWater = document.getElementById("chartWater").getContext("2d");
		let Chart4 = new Chart(chartWater, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: '# of Votes',
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
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});	


	today.click(() => {

		console.log("testToday");

		Chart1.data.datasets[0].data = socketTemp;
    	Chart1.data.labels = socketDate;
    	Chart1.update();

    	Chart2.data.datasets[0].data = socketAirh;
    	Chart2.data.labels = socketDate;
    	Chart2.update();

    	Chart3.data.datasets[0].data = socketSoilh;
    	Chart3.data.labels = socketDate;
    	Chart3.update();

    	Chart4.data.datasets[0].data = socketWater;
    	Chart4.data.labels = socketDate;
    	Chart4.update();

	});

	lastWeek.click(() => {

	let req = 'http://localhost:5485/weatherData7';
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let obj = JSON.parse(this.responseText);
       console.log(obj);

      /*  $('#stat1').text(obj[0].Temperature);
		$('#stat2').text(obj[0].AirHumidity);
		$('#stat3').text(obj[0].SoilHumidity);
		$('#stat4').text(obj[0].WaterSurface);
		
		stat1.text(obj[0].Temperature);
		stat2.text(obj[0].AirHumidity);
		stat3.text(obj[0].SoilHumidity);
		stat4.text(obj[0].WaterSurface); 

		barTemp.height(obj[0].Temperature+'%');
		barAir.height(obj[0].AirHumidity+'%');
		barSoil.height(obj[0].SoilHumidity+'%');
		barWater.height(obj[0].WaterSurface+'%'); */

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

		/*let context1 = document.querySelector('#chartTemp').getContext('2d');
    	new Chart(context1).Line(tempToChart);*/

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

   	/*	$('#stat1').text(obj[0].Temperature);
		$('#stat2').text(obj[0].AirHumidity);
		$('#stat3').text(obj[0].SoilHumidity);
		$('#stat4').text(obj[0].WaterSurface);
		
		stat1.text(obj[0].Temperature);
		stat2.text(obj[0].AirHumidity);
		stat3.text(obj[0].SoilHumidity);
		stat4.text(obj[0].WaterSurface); 

		barTemp.height(obj[0].Temperature+'%');
		barAir.height(obj[0].AirHumidity+'%');
		barSoil.height(obj[0].SoilHumidity+'%');
		barWater.height(obj[0].WaterSurface+'%'); */

		let tempToChart = obj.map(item => item.Temperature);
		let airhToChart = obj.map(item => item.AirHumidity);
		let soilhToChart = obj.map(item => item.SoilHumidity);
		let waterToChart = obj.map(item => item.WaterSurface);
		//TODO replace pre regex hodnotu
		const searchStr = '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])';
		const regex = new RegExp(searchStr,'i');
		let date = obj.map(item => regex.test(item.Date));
		//let date = obj.map(item => item.Date);
		console.log(tempToChart);
		console.log(airhToChart);
		console.log(soilhToChart);
		console.log(waterToChart);
		console.log(date);

		/*let context1 = document.querySelector('#chartTemp').getContext('2d');
    	new Chart(context1).Line(tempToChart);*/

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

	/*let test = [2]; 

	Chart1.data.datasets[0].data = test;
    Chart1.update();*/

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
		/*slider1.value;*/
		let sliderArr = [];
		sliderArr.push(slider1.value,slider2.value,slider3.value,slider4.value,slider5.value,slider6.value,slider7.value,slider8.value);

		console.log(sliderArr);
		middleWrapper.css('display','flex');
		middleSettings.css('display','none');
	});

});