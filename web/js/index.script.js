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
	const chartWrapper = $('#chartWrapper');
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
	const divChart1 = $('.chart1');
	const divChart2 = $('.chart2');
	const divChart3 = $('.chart3');
	const divChart4 = $('.chart4');

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

    /*const socket = io.connect('http://localhost:5485');

	socket.on('connect', (data) => {
	    console.log('check',socket.connected);
	    socket.emit('weatherData');
    });
	
	socket.on('weatherData', (data) => {
      //console.log(data);

      let obj = JSON.parse(data);
      console.log(obj);

		$('#stat1').text(obj[0].Temperature);
		$('#stat2').text(obj[0].AirHumidity);
		$('#stat3').text(obj[0].SoilHumidity);
		$('#stat4').text(obj[0].WaterSurface);
		
		stat1.text(obj[0].Temperature);
		stat2.text(obj[0].AirHumidity);
		stat3.text(obj[0].SoilHumidity);
		stat4.text(obj[0].WaterSurface);


		//chart for Temperature data
		Chart.defaults.global.maintainAspectRatio = false;
		let chartTemp = document.getElementById("chartTemp").getContext("2d");
		let Chart1 = new Chart(chartTemp, {
			//maintainAspectRatio : 'false',
			responsive: 'true',
			type: 'line',
			data: {
				labels: ["Temperature"],
				datasets: [{
					label: '# of Votes',
					data: [obj[0].Temperature],
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
				labels: ["Temperature"],
				datasets: [{
					label: '# of Votes',
					data: [obj[0].Temperature],
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
				labels: ["Temperature"],
				datasets: [{
					label: '# of Votes',
					data: [obj[0].Temperature],
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
				labels: ["Temperature"],
				datasets: [{
					label: '# of Votes',
					data: [obj[0].Temperature],
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

    });*/

	onoff.click(() => {
		colorChange.toggleClass('-darkmode');
		heading.toggleClass('-darkmode');
		nameWrapper.toggleClass('-darkmode');
		middleWrapper.toggleClass('-darkmode');
		statsBox1.toggleClass('-darkmode');
		statsBox2.toggleClass('-darkmode');
		statsBox3.toggleClass('-darkmode');
		statsBox4.toggleClass('-darkmode');
		chartWrapper.toggleClass('-darkmode');
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
		slider1.value;
		slider2.value;
		slider3.value;
		slider4.value;
		slider5.value;
		slider6.value;
		slider7.value;
		slider8.value;
		middleWrapper.css('display','flex');
		middleSettings.css('display','none');
	});

  	/*$('#onoffSwitch').click(() => {

  		$('.colorChange').toggleClass('-darkmode');
		$('.heading').toggleClass('-darkmode');
		$('#nameWrapper').toggleClass('-darkmode');
		$('#middleWrapper').toggleClass('-darkmode');
	    $('.statsBox').toggleClass('-darkmode');
		$('#chartWrapper').toggleClass('-darkmode');
	
	});*/

	water.click(() => {
		console.log("test");
		socket.emit('water');
	});




});