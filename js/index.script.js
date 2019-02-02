// JavaScript Document

$(document).ready(function() {
	
	setInterval(function()
	{
    $.ajax({
        type: "post",
        url: "http://api.openweathermap.org/data/2.5/weather?q=Košice,sk&mode=HTML&appid=91d6e79307bb2126fb26e2d4f5e21bf7",
        success:function(data)
        {
            //console.log the response
            //console.log(data.base);
			/*document.getElementById("stat1").innerHTML=data.info.temperature;
			document.getElementById("stat2").innerHTML=data.info.humidityAir;
			document.getElementById("stat3").innerHTML=data.info.humiditySoil;
			document.getElementById("stat4").innerHTML=data.info.watersurface;*/
        }
    });
	}, 5000);
	
	
	const button = $("#onoffSwitch");
	
  	button.click(function() {

	$(".heading").toggleClass('-darkmode');
	$("#nameWrapper").toggleClass('-darkmode');
	$("#mainWrapper").toggleClass('-darkmode');
    $(".statsBox").toggleClass('-darkmode');
	$("#chartBox").toggleClass('-darkmode');
	console.log("test");
	
  });

});