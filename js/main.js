$(document).ready(function(){
 $('.header').height($(window).height());

 $(".navbar a").click(function(){
 	$("body,html").animate({
 		scrollTop:$("#" + $(this).data('value')).offset().top
 	},1000)
  
 });

var allData;
var loadJSONData = function(){
//		$.getJSON( "json/jsonExample.json", function( data ) {
//			alert('success');
//		});
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(this.responseText);
		allData = myObj;
		loadData();
	  }
	};
	xmlhttp.open("GET", "json/jsonExample.json", true);
	xmlhttp.send();
}
    var one_day = 1000 * 60 * 60 * 24 
loadJSONData();

 var daysBetween = function(d1, d2){
	 // One day Time in ms (milliseconds) 

  
  
// To Calculate next year's Christmas if passed already. 

  
// To Calculate the result in milliseconds and then converting into days 
var Result = Math.round(d2.getTime() - d1.getTime()) / (one_day); 
  
// To remove the decimals from the (Result) resulting days value 
var Final_Result = Result.toFixed(0); 
return Final_Result;
}
var loadData = function(){
	var ind = daysBetween(dateToDisable ,curDt);
	if(allData !== undefined){
		var data = allData;
		var objDat = data[parseInt(ind)];
		$('#pDayNum').text("You are on Day : "+(parseInt(ind)+1)+" / 40");
		for(var nameVar in objDat){
			if($('#'+nameVar) !=null){
				
				if(nameVar == "pMorning")
					$('#'+nameVar).html('<a class="bibleref" target="_BLANK" href="https://www.biblegateway.com/passage/?search='+objDat[nameVar]+'&amp;version=NRSV&amp;src=tools">'+objDat[nameVar]+'</a>');
				else if(nameVar == "pAfternoon")
					$('#'+nameVar).html('<a class="bibleref" target="_BLANK" href="https://www.biblegateway.com/passage/?search='+objDat[nameVar]+'&amp;version=NRSV&amp;src=tools">'+objDat[nameVar]+'</a>');
				else if(nameVar == "pEvening")
					$('#'+nameVar).html('<a class="bibleref" target="_BLANK" href="https://www.biblegateway.com/passage/?search='+objDat[nameVar]+'&amp;version=NRSV&amp;src=tools">'+objDat[nameVar]+'</a>');
				
				else if(nameVar == "pImage" && objDat[nameVar] !=""){
					document.getElementById("prayFor").className  = 'portF';
				}
				else
					$('#'+nameVar).text(objDat[nameVar]);
			}
		}
		BGLinks.linkVerses();
	}
	else{loadJSONData()}
}

$.datetimepicker.setLocale('en');
	var dateToDisable = new Date(2020,1,26,0,0,0);
	var today = new Date();
	var dateTillDisable = new Date(today.getFullYear(),today.getMonth(),today.getDate());
	var curDt = dateTillDisable;
$('#datetimepicker').datetimepicker({
	beforeShowDay: function(date) {
		var dateTillDisable = new Date(today.getFullYear(),today.getMonth(),today.getDate());
		if (((date.getTime()>=dateToDisable.getTime()) &&
			(date.getTime()<=(dateTillDisable.getTime()+one_day-1))) || (window.user == 'FCreach@27220')) {
			return [true, ""]
		}

		return [false, ""];
	},
	timepicker:false,
	format:'d M Y',
	formatDate:'d-M-Y',
	value:dateTillDisable
});
 $("#datetimepicker").change(function(){
	 curDt = new Date($("#datetimepicker").val());
    loadData();
  });

 $("#login").click(function(){
	 
	 window.user = prompt("Please enter your Secret name!", "");
  });

})
