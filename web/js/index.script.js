// JavaScript Document

$(document).ready(function() {
	
	/*const socket = () => { io('http://localhost:5485') };
	//socket();*/
	
    const socket = io.connect('http://localhost:5485');

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

		Chart.defaults.global.maintainAspectRatio = false;
		let chart = document.getElementById("chart").getContext("2d");
		let TestChart = new Chart(chart, {
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
    
    });
	

  	$('#onoffSwitch').click(() => {

  		$('.colorChange').toggleClass('-darkmode');
		$('.heading').toggleClass('-darkmode');
		$('#nameWrapper').toggleClass('-darkmode');
		$('#middleWrapper').toggleClass('-darkmode');
	    $('.statsBox').toggleClass('-darkmode');
		$('#chartWrapper').toggleClass('-darkmode');
	
	});

	
});