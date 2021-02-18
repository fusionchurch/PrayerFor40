$(document).ready(function () {
	$('.header').height($(window).height());

	$(".navbar a").click(function () {
		$("body,html").animate({
			scrollTop: $("#" + $(this).data('value')).offset().top
		}, 1000)

	});

	var allData;
	var loadJSONData = function () {
		//		$.getJSON( "json/jsonExample.json", function( data ) {
		//			alert('success');
		//		});
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
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
	// var getSundayCountBetweenDates = function (startDate, endDate){
	// 	var totalSundays = 0;
	// 	for (var i = startDate; i <= endDate; i.setDate(i.getDate()+1)){
	// 		if (i.getDay() == 0) totalSundays++;
	// 	}
	// 	return totalSundays;
	//  }
	var daysBetween = function (d1, d2) {
		// One day Time in ms (milliseconds) 
		// To Calculate next year's Christmas if passed already. 
		// To Calculate the result in milliseconds and then converting into days 
		var Result = Math.round(d2.getTime() - d1.getTime()) / (one_day);
		// To remove the decimals from the (Result) resulting days value 
		var sundayCnt = Math.floor((Result+3)/7);//getSundayCountBetweenDates(d1, d2);
		var Final_Result = (Result - sundayCnt).toFixed(0);
		return Final_Result ;
	}
	var loadData = function () {
		var ind = daysBetween(dateToDisable, curDt);
		if (allData !== undefined) {
			var data = allData;
			var objDat = data[parseInt(ind)];
			$('#pDayNum').html("You are on <b>Day : " + (parseInt(ind) + 1))+"</b>";
			$('#normal').show();
			$('#spl').hide();
			for (var nameVar in objDat) {
				if ($('#' + nameVar) != null) {

					if (nameVar == "pMorning")
						$('#' + nameVar).html('<a class="bibleref" target="_BLANK" href="https://www.biblegateway.com/passage/?search=' + objDat[nameVar] + '&amp;version=NRSV&amp;src=tools">' + objDat[nameVar] + '</a>');
					else if (nameVar == "pAfternoon")
						$('#' + nameVar).html('<a class="bibleref" target="_BLANK" href="https://www.biblegateway.com/passage/?search=' + objDat[nameVar] + '&amp;version=NRSV&amp;src=tools">' + objDat[nameVar] + '</a>');
					else if (nameVar == "pEvening")
						$('#' + nameVar).html('<a class="bibleref" target="_BLANK" href="https://www.biblegateway.com/passage/?search=' + objDat[nameVar] + '&amp;version=NRSV&amp;src=tools">' + objDat[nameVar] + '</a>');

					else if (nameVar == "pImage" && objDat[nameVar] != "") {
						document.getElementById("prayFor").className = 'portF';
					}
					else if (nameVar == "pDataContent") {
						var contentObj = JSON.parse(objDat["pDataContent"])[0];
						$('#normal').hide();
						$('#spl').show();
						var conText = "";
						for (var contentObjItem in contentObj) {
							conText = conText + "<div> <p><h4><b>";
							conText = conText + contentObjItem + "</h4></b><div>";
							conText = conText + contentObj[contentObjItem].replace(/(?:\r\n|\r|\n)/g, '<br>') + "</div></p></div>"
						}
						$('#spl').html(conText);

						// for( var contentObjItem in contentObj){
						// 	$('#'+contentObjItem.replace(/ /g,'')).html(contentObj[contentObjItem]);
						// }

					}
					else if(nameVar == "parable" || nameVar == "miracle"){
						var splitSt = objDat[nameVar].split(',');
						var finalStr = '';
						for (i = 0; i < splitSt.length; i++) {
							finalStr = finalStr+'<b><a class="bibleref" target="_BLANK" href="https://www.biblegateway.com/passage/?search=' + splitSt[i] + '&amp;version=NRSV&amp;src=tools">' 
								+ splitSt[i] + '</a></b><br>'
						}
						$('#' + nameVar).html(finalStr);
					}
					else
						$('#' + nameVar).text(objDat[nameVar]);
				}
			}
			BGLinks.linkVerses();
		}
		else { loadJSONData() }
	}

	$.datetimepicker.setLocale('en');
	var dateToDisable = new Date(2021, 1, 17, 0, 0, 0);
	var dateToDisable1 = new Date(2021, 2, 27, 0, 0, 0);
	var today = new Date();
	var dateTillDisable = dateToDisable;
	var curDt = today;
	if(dateToDisable <= curDt)
		curDt = dateTillDisable
	$('#datetimepicker').datetimepicker({
		beforeShowDay: function (date) {
			if(date.toString().split(' ')[0] == 'Sun')
				return [false, ""];
			var dateTillDisable = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			if (((date.getTime() >= dateToDisable.getTime()) &&
				(date.getTime() <= (dateTillDisable.getTime() + one_day - 1))) || (window.user == 'issac')) {
				if ((date.getTime() <= dateToDisable1.getTime() + one_day - 1) && (date.getTime() >= dateToDisable.getTime())) {
					return [true, ""]
				}
			}

			return [false, ""];
		},
		timepicker: false,
		format: 'd M Y',
		formatDate: 'd-M-Y',
		value: dateToDisable
	});
	$("#datetimepicker").change(function () {
		curDt = new Date($("#datetimepicker").val());
		if ((curDt.getTime() > dateToDisable1.getTime() + one_day - 1) || (curDt.getTime() < dateToDisable.getTime())) {
			$("#datetimepicker").val('17 Feb 2021');
		}
		loadData();
	});

	$("#login").click(function () {

		window.user = prompt("Please enter your Secret name!", "");
	});

})
