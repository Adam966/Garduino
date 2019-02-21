// JavaScript Document

$(document).ready(() => {

	//divs for display data from server
	let stat1 = $('#stat1');
	let stat2 = $('#stat2');
	let stat3 = $('#stat3');
	let stat4 = $('#stat4');

	//div for dark mode onoffSwitch
	let onoff = $('#onoffSwitch');
	let colorChange = $('.colorChange');

	//div for settings button
	let settings = $('.settingsBtn');

	//divs for dark mode
	let heading = $('.heading');
	let nameWrapper = $('#nameWrapper');
	let middleWrapper = $('#middleWrapper');
	let statsBox1 = $('.statsBox1');
	let statsBox2 = $('.statsBox2');
	let statsBox3 = $('.statsBox3');
	let statsBox4 = $('.statsBox4');
	let chartWrapper = $('#chartWrapper');

	//divs for charts
	let divChart1 = $('.chart1');
	let divChart2 = $('.chart2');
	let divChart3 = $('.chart3');
	let divChart4 = $('.chart4');

	//div for settings
	let middleSettings = $('#middleSettings');

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
		middleSettings.css('display','block');
	});

  	/*$('#onoffSwitch').click(() => {

  		$('.colorChange').toggleClass('-darkmode');
		$('.heading').toggleClass('-darkmode');
		$('#nameWrapper').toggleClass('-darkmode');
		$('#middleWrapper').toggleClass('-darkmode');
	    $('.statsBox').toggleClass('-darkmode');
		$('#chartWrapper').toggleClass('-darkmode');
	
	});*/

});