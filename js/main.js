$(document).ready(function(){
 $('.header').height($(window).height());

 $(".navbar a").click(function(){
 	$("body,html").animate({
 		scrollTop:$("#" + $(this).data('value')).offset().top
 	},1000)
  
 });
 
var allData;
var loadJSONData = function(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4) {
		var myObj = JSON.parse(this.responseText);
		allData = myObj;
		loadData();
	  }
	};
	xmlhttp.open("GET", "json/jsonExample.json", true);
	xmlhttp.send();
}
loadJSONData();
 var daysBetween = function(d1, d2){
	 // One day Time in ms (milliseconds) 
    var one_day = 1000 * 60 * 60 * 24 
  
  
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
	var dateToDisable = new Date(2020,1,26);
	var dateTillDisable = new Date();
	var curDt = dateTillDisable;
$('#datetimepicker').datetimepicker({
	beforeShowDay: function(date) {
		if ((date.getTime()<=dateToDisable.getTime()) ||
			(date.getTime() >= dateTillDisable.getTime())) {
			return [false, ""]
		}

		return [true, ""];
	},
	defaultDate: new Date(),
	timepicker:false,
	format:'d M Y',
	formatDate:'d-M-Y',
	value:new Date()
});
 $("#datetimepicker").change(function(){
	 curDt = new Date($("#datetimepicker").val());
    loadData();
  });


})