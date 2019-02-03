// JavaScript Document

$(document).ready(function() {
	
	const socket = () => { io('http://localhost:5485') };
	socket();
	
  	$('#onoffSwitch').click(() => {
	$('.heading').toggleClass('-darkmode');
	$('#nameWrapper').toggleClass('-darkmode');
	$('#middleWrapper').toggleClass('-darkmode');
    $('.statsBox').toggleClass('-darkmode');
	$('#chartBox').toggleClass('-darkmode');
	
  });

});