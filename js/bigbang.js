var localGift = {};
var giftID = "";
var isCompleted = true;
var mode = "";
var img1_url = "";
var video1_url = "";
var curSlideNumber;
var totalSlide = 3;
var tolalInputs = 7;
$(document).ready(function()
{
	init();
	/*Image*/
	$("#wrapper_input6").click(function(){
		$("#img-input-modal").modal("show");
	})

	$("#img-input-modal .done").click(function(){
		
		img1_url = $("#img-input-modal input").val();
		if (!checkImgURL(img1_url)){
			alert("Invalid image URL")
			return;
		}
		$("#img-input-modal").modal("hide");
		$("#wrapper_input6").css({ 'background-color':"rgba(255, 0, 0, 0)" })
		.css({"border":"none"})
		$("#wrapper_input6 #output6").attr('src', img1_url).show();
		$("#wrapper_input6 #input6_img").hide();
		
	})

	$("#img-input-modal .cancel").click(function(){
		$("#img-input-modal").modal("hide");
	})

	/*Video*/
	$("#wrapper_input9").click(function(){
		$("#video-input-modal").modal("show");
	})

	$("#video-input-modal .done").click(function(){
		
		video1_url = $("#video-input-modal input").val();
		
		if (!checkVideoURL(video1_url)){
			alert("Invalid video URL")
			return;
		}
		$("#video-input-modal").modal("hide");
		
		$("#wrapper_input9").css({ 'background-color':"rgba(255, 0, 0, 0)" })
		.css({"border":"none"})
		$("#wrapper_input9 source").attr('src', video1_url);
		$("#wrapper_input9 video").show();
		$("#wrapper_input9 img").hide();
	})

	$("#video-input-modal .cancel").click(function(){
		$("#video-input-modal").modal("hide");
	})


	if ($( "#hand" ).length > 0){
		$("#hand").mouseover(function(){
			$(".speech-bubble").hide();
		});
		$( "#hand" ).draggable({
			stop: function( event, ui ) {
		        var offset = $(this).offset();
		        var left = offset.left + $(this).width() / 2;
		        var top = offset.top + $(this).height() / 2;
		        
		        var img = $("#panel1_body img");
		        var leftImg = img.offset().left;
		        var topImg = img.offset().top;
		        var widthImg = img.width();
		        var heightImg = img.height();
		        
		        if (leftImg < left && left < leftImg + widthImg
		        &&  topImg < top && top < topImg + heightImg){
		        	console.log("Inside img");
		        	showSlide(2);
		        }
		        $(".speech-bubble").show();
			}
		});
	}
	

	if ($( "#needle" ).length > 0){
		$("#needle").mouseover(function(){
			$(".speech-bubble").hide();
		});
		$( "#needle" ).draggable({
			stop: function( event, ui ) {
		        var offset = $(this).offset();
		        var left = offset.left + $(this).width() / 2;
		        var top = offset.top + $(this).height() / 2;
		        
		        var img = $("#panel2_body img");
		        var leftImg = img.offset().left;
		        var topImg = img.offset().top;
		        var widthImg = img.width();
		        var heightImg = img.height();
		        
		        if (leftImg < left && left < leftImg + widthImg
		        &&  topImg < top && top < topImg + heightImg){
		        	console.log("Inside img");
		        	showSlide(3);
		        }
		        console.log("speech-bubble bye bye!!");
			}
		});
	}
	


	
	function showHand(){
		if (mode === "editing") return;
		console.log("showhand")
		$( "#hand" ).show();
		$( "#hand" )
		.css({"position": "fixed"})
		.css({"top":"250px"})
		.css({"right":"100px", "left": "auto"})
		// var offset = $("#panel1_body img").offset();
  //       var leftPos = offset.left + $("#panel1_body img").width() + 20;
  //       var topPos = offset.top + $("#panel1_body img").height() / 2;
  //       $( "#hand" ).offset({top: topPos, left:leftPos})
	}

	function showNeedle(){
		if (mode === "editing") return;
		$( "#needle" ).show();
		$( "#needle" )
		.css({"top":"300px"})
		.css({"right":"200px", "left": "auto"})
		// var offset = $("#panel2_body img").offset();
  //       var leftPos = offset.left + $("#panel2_body img").width() + 70;
  //       var topPos = offset.top + $("#panel2_body img").height() / 2;
  //       console.log("====");
  //       console.log(leftPos, topPos);
  //       $( "#needle" ).offset({top: topPos, left:leftPos})
	}
	
	/*SLIDE 2*/

	var curImgHeight = $("#balloon-img").height();
	var curImgWidth = $("#balloon-img").width();

	function adjustInput567() {
		console.log("adjustInput567");
		var topImg = $("#balloon-img").offset().top;
		var leftImg = $("#balloon-img").offset().left;
		var newImgHeight = $("#balloon-img").height();
		var newImgWidth = $("#balloon-img").width();
		var ratio = newImgWidth / curImgWidth;
		//Input 5
		var input5 = $("#wrapper_input5");
		input5.height(newImgHeight * 0.3);
		input5.width(newImgWidth * 0.3);
		input5.offset({top: topImg + 0.2 * newImgHeight, left: leftImg + -0.06 * newImgWidth})
		$("#wrapper_input5 textarea").width(input5.width());
		$("#wrapper_input5 textarea").height(input5.height());


		//Input 6
		var input6 = $("#wrapper_input6");
		input6.height(newImgHeight * 0.5);
		input6.width(newImgWidth * 0.5);
		input6.offset({top: topImg + 0.05 * newImgHeight, left: leftImg + 0.27 * newImgWidth})

		//Input 7
		var input7 = $("#wrapper_input7");
		input7.height(newImgHeight * 0.3);
		input7.width(newImgWidth * 0.3);
		input7.offset({top: topImg + 0.2 * newImgHeight, left: leftImg + 0.8 * newImgWidth})
		$("#wrapper_input7 textarea").width(input7.width());
		$("#wrapper_input7 textarea").height(input7.height());

		curImgHeight = $("#balloon-img").height();
		curImgWidth = $("#balloon-img").width();
	}

	afterResize(function(){
		console.log("Resize on panal 2")
		if ($('#panel2').css('display') != 'none'){
			adjustInput567();	
		}
		
	})

	/*SLIDE 3*/
	var curCardHeight = $("#gift_card_panel3").height();
	var curCardWidth = $("#gift_card_panel3").width();
	
	function adjustInput9() {

		var topImg = $("#gift_card_panel3").offset().top;
		var leftImg = $("#gift_card_panel3").offset().left;
		var newCardHeight = $("#gift_card_panel3").height();
		var newCardWidth = $("#gift_card_panel3").width();

		//Input 9
		var input9 = $("#wrapper_input9");
		input9.height(newCardHeight * 0.3 );
		input9.width(newCardHeight * 0.6 );
		input9.offset({top: topImg + 0.47 * newCardHeight, left: leftImg + 0.35 * newCardHeight})

		

		curCardHeight = $("#gift_card_panel3").height();
		curCardWidth = $("#gift_card_panel3").width();
	}

	afterResize(function(){
		console.log("Resize on panal 3")
		if ($('#panel3').css('display') != 'none'){
			adjustInput9();	
		}
		
	})

	function afterResize(callback){
		var delta = 10;
		var id;
		$(window).resize(function() {
			clearTimeout(id);
		    id = setTimeout(resizeend, delta);
		});

		function resizeend() {
		    callback();              
		}
	}

	$("#slide1").click(function(){
		showSlide(1);
		
	})

	$("#slide2").click(function(){
		showSlide(2);
	})

	$("#slide3").click(function(){
		
		showSlide(3);
		
	})

	$("#panel_next").click(function(){
		if (curSlideNumber < totalSlide){
			showSlide(curSlideNumber + 1);	
		} else {
			uploadGiftToFibrebase();
		}
		
	})

	$("#panel_prev").click(function(){
		showSlide(curSlideNumber - 1);	
		
	})

	$("#save-to-cloud-btn").click(function(){
		uploadGiftToFibrebase(false);
	})

	$("#preview-btn").click(function(){
		uploadGiftToFibrebase();
	})



	

	function showSlide(slideNumber, totalSlide = 3){
		curSlideNumber = slideNumber;
		if ($('#panel' + slideNumber).css('display') != 'none') {
			return;
		}

		if (slideNumber === 1){
			$("#panel_prev").hide();
			$("#panel_next").removeClass("btn-success").addClass("btn-info").html("Next").show();
		} else if (slideNumber === totalSlide) {
			$("#panel_prev").show();
			$("#panel_next").removeClass("btn-info").addClass("btn-success").html("Save & Preview").show();
		} else {
			$("#panel_prev").show();
			$("#panel_next").removeClass("btn-success").addClass("btn-info").html("Next").show();
		}
		if (mode == "preview" || mode == "receiving"){
			$(".navi-button").hide();
			$("#panel3_startover").show();
		} else {
			$(".navi-button").show();
			$("#panel3_startover").hide();
		}

		for (var i = 1; i < totalSlide + 1; i++){
			if (i == slideNumber){
				$("#panel" + i).show();	
				$("#slide" + i).addClass("current-slide");
			} else {
				$("#panel" + i).hide();	
				$("#slide" + i).removeClass("current-slide");
			}
			
		}

		if (slideNumber == 3){
			adjustInput9();	
			if (mode === "preview" || mode === "receiving"){
				$("#panel3_save").remove();	
			}
			
		} else if (slideNumber == 2){
			adjustInput567();
		}

		if (slideNumber === 1){
			$("#needle").hide();
			showHand();
		}
		if (slideNumber === 2){
			
			$("#hand").hide();
			showNeedle();
		}
		if (slideNumber === 3){
			$("#needle").hide();
			$("#hand").hide();
		}
	}
	
	$("#panel1_next").click(function()
	{
		showSlide(2);
	});

	$("#panel2_prev").click(function()
	{
		showSlide(1);
	});
	$("#panel2_next").click(function()
	{
		showSlide(3);
	});

	$("#panel3_prev").click(function()
	{
		showSlide(2);
	});
	$("#panel3_save").click(function()
	{
		uploadGiftToFibrebase();
	});
	$("#panel3_startover").click(function()
	{
		showSlide(1);
	});

	$("#back-to-edit").click(function(){
		window.location.href = "../Editing/Bigbang.html?mode=editing&giftid=" +giftID;
	})

	$("#back-to-home").click(function(){
		window.location.href = "../index.html";
	})

	function IsValidImageUrl(url) {

		$("<img>", {
		    src: url,
		    error: function() { alert("Invalid image url"); },
		    load: function() { alert(url + ': ' + true); }
		});
	}

	function checkImgURL(url) {
	    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	}

	function checkVideoURL(url) {
	    return(url.match(/\.(mp4|webm|webm)$/) != null);
	}

	$("#gift-name-edit").focusout(function(e){
		if ($(this).html() == ""){
        	$(this).html("Untitled gift")
        }
        var newTitle = $.trim($(this).text());
        localGift.giftTitle = newTitle;
        sendToFirebase(false);
	})

	$("#gift-name-edit").keypress(function(e){ 
		if (e.which === 13) {
	        e.preventDefault();
	        
	        $(this).blur();
	        
	    }

		// console.log(e.which);
		// if (e.which != 13){
		// 	console.log("aa")
		// }
		
		// return e.which != 13; 
	});


	function autoUpdate(){
		if (mode != "editing") return;
		setInterval(function(){
			uploadGiftToFibrebase(false, false);
		}, 1000)
	}

	/*INIT*/
	
	function init(){

		/*0. Get mode*/
		var localUrl = window.location.href;
		// if (localUrl.indexOf("Preview") > -1 || localUrl.indexOf("preview") > -1){
		// 	mode = "Preview"
		// } else if (localUrl.indexOf("Editing") > -1 || localUrl.indexOf("editing") > -1) {
		// 	mode = "Editing"
		// } else if (localUrl.indexOf("gifts") > -1|| localUrl.indexOf("Preview") > -1){
		// 	mode = "Receiving"
		// }
		/*1. Get giftid*/
		giftID = getParameterByName("giftid");
		mode = getParameterByName("mode");



		if (mode === "receiving"){
			$("#back-to-edit").hide();
			$("#back-to-home").hide();
		}

		//console.log("giftID " + giftID )
		/*2. Get gift from firebase*/
		database.ref("gifts/" + giftID).once("value").then(function(snapshot){
			localGift = snapshot.val();
			displayCurrentStatus(function(){
				$("#gift-name-edit").html(localGift.giftTitle);
				checkPercentCompleted();
				showSlide(1);

			});
		});

		autoUpdate();
		
		
	}

	function displayEachInput(inputKey, inputType, defaultValue = "Your message"){
		var value = localGift.inputs[inputKey];
		var hasValue = !(value == "" || value == undefined);
		if (mode === "preview" || mode === "receiving"){
			if (!hasValue) {
				if (inputType === "video"){

				} else if (inputType === "image"){

				} else {
					if (inputType == "text"){
						$("#wrapper_" + inputKey + " h2").hide();
						$("#wrapper_" + inputKey + " input").show();
						$("#wrapper_" + inputKey).css({"background-color":"#fff; font-family: 'Noto Sans', sans-serif;"});
						$("#wrapper_" + inputKey + " input").attr("placeholder", defaultValue);
					}

					if (inputType == "textarea"){
						console.log("---> " + inputKey);
						$("#wrapper_" + inputKey + " h2").hide();
						$("#wrapper_" + inputKey + " div").hide();
						$("#wrapper_" + inputKey + " textarea").show();
						$("#wrapper_" + inputKey + " textarea").focus();
						$("#wrapper_" + inputKey + " textarea").attr("placeholder", defaultValue);
						$("#wrapper_" + inputKey).css({"background-color":"#fff; font-family: 'Noto Sans', sans-serif;"});

					}
				}
			} else {
				if (inputType === "video") {
					$("#wrapper_input9").css({ 'background-color':"rgba(255, 0, 0, 0)" })
					.css({"border":"none"})
					$("#wrapper_input9 source").attr('src', value);
					$("#wrapper_input9 video").show();
					$("#wrapper_input9 img").hide();
					return;
				} else if (inputType === "image"){
					console.log("Preview input6")
					$("#wrapper_input6").css({ 'background-color':"rgba(255, 0, 0, 0)" })
					.css({"border":"none"})
					$("#wrapper_input6 #output6").attr('src', value).show();
					$("#wrapper_input6 #input6_img").hide();
					return
				}
				$("#"+inputKey).hide();
				$("#"+inputKey +"-outer").show();
				$("#"+inputKey +"-outer").html(localGift.inputs[inputKey])
				console.log($("#"+inputKey +"-outer").closest(".wrapper_input"));
				$("#"+inputKey +"-outer").closest(".wrapper_input")
				// .css({"background-color": "#fff"})
				// .css({"text-align":"left"})
				.css({"min-width": "0%"})
				.css({"margin-left": "5px"})
				.css({"margin-right": "5px"})
				
				if (inputKey === "input5" || inputKey === "input7"){
					
				} else {
					console.log("aaaa");
					$("#"+inputKey +"-outer").closest(".wrapper_input")
					.css({"background-color": "#fff"})
				}
			}
			
			
			return;
		}
		// Editing mode
		if(inputType === "video") {
			if (hasValue){
				$("#video-input-modal input").val(value);
				$("#wrapper_input9").css({ 'background-color':"rgba(255, 0, 0, 0)" })
				.css({"border":"none"})
				$("#wrapper_input9 source").attr('src', value);
				$("#wrapper_input9 video").show();
				$("#wrapper_input9 img").hide();
			}
		}else if (inputType === "image"){
			if (hasValue){
				$("#img-input-modal input").val(value);
				$("#wrapper_input6").css({ 'background-color':"rgba(255, 0, 0, 0)" })
				.css({"border":"none"})
				$("#wrapper_input6 #output6").attr('src', value).show();
				$("#wrapper_input6 #input6_img").hide();
			}
		} else {
			if (inputType == "text"){
				$("#wrapper_" + inputKey + " h2").hide();
				$("#wrapper_" + inputKey + " input").show();
				$("#wrapper_" + inputKey).css({"background-color":"#fff"});
				if (!hasValue){
					$("#wrapper_" + inputKey + " input").attr("placeholder", defaultValue);	
				} else {
					$("#wrapper_" + inputKey + " input").val(value);
				}
				
			}

			if (inputType == "textarea"){
				console.log("---> " + inputKey);
				$("#wrapper_" + inputKey + " h2").hide();
				$("#wrapper_" + inputKey + " div").hide();
				$("#wrapper_" + inputKey + " textarea").show();
				$("#wrapper_" + inputKey + " textarea").focus();
				
				if (!hasValue){
					$("#wrapper_" + inputKey + " textarea").attr("placeholder", defaultValue);
				} else {
					$("#wrapper_" + inputKey + " textarea").html(value);
				}
				$("#wrapper_" + inputKey).css({"background-color":"#fff"});

			}
		}

		
		// console.log("Displaying " +inputKey + " " + value)
		
		// if (value == "" || value == undefined) return;

		// if (inputKey === "input6"){
		// 			$("#wrapper_input6").css({ 'background-color':"rgba(255, 0, 0, 0)" })
		// 			$("#wrapper_input6 img").attr('src', value).show();
		// 			$("#wrapper_input6 h2").hide();
		// 			return
		// 		}

		// $("#wrapper_" + inputKey).css({"background-color":"#fff"});
		// $("#"+inputKey).show();
		// console.log($("#"+inputKey +"-outer"));
		// $("#"+inputKey +"-outer").hide();
		// $("#"+inputKey).val(localGift.inputs[inputKey])
	}

	function displayCurrentStatus(callback) {
		displayEachInput("input1", "text", "Receiver's name");
		displayEachInput("input2", "text");
		displayEachInput("input8", "text");

		displayEachInput("input5", "textarea");
		displayEachInput("input6", "image");
		displayEachInput("input7", "textarea");

		displayEachInput("input9", "video");
		callback();
	}

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}



	/*GETTING INPUT*/
	function showInputField(inputNumber, inputType){
		if (inputType == "text"){
			$("#wrapper_input" + inputNumber).click(function(){
				$("#wrapper_input" + inputNumber + " h2").hide();
				$("#wrapper_input" + inputNumber + " input").show();
				$("#wrapper_input" + inputNumber).css({"background-color":"#fff"});
			})
		}

		if (inputType == "textarea"){
			$("#wrapper_input" + inputNumber).click(function(){
				$("#wrapper_input" + inputNumber + " h2").hide();
				$("#wrapper_input" + inputNumber + " textarea").show();
				$("#wrapper_input" + inputNumber + " textarea").focus();
				$("#wrapper_input" + inputNumber).css({"background-color":"#fff"});
			})

		}
	}

	function showInputFieldsAfterClick(){
		if (mode === "preview" || mode === "receiving") return;
		showInputField(1, "text");
		showInputField(2, "text");
		showInputField(5, "textarea");
		showInputField(7, "textarea");
		showInputField(8, "text");
	}
	
	showInputFieldsAfterClick();

	function checkPercentCompleted(){
		var inputs = localGift.inputs;
		var completed = 0;
		var inputKeys = Object.keys(inputs);
		
		for (var index = 0; index < inputKeys.length; index++){
			if (inputs[inputKeys[index]] == undefined || inputs[inputKeys[index]] == ""){
			} else {
				if (inputKeys[index] === "input6"){
					if (checkImgURL(inputs[inputKeys[index]])){
						completed++;
					}
				} else if (inputKeys[index] === "input9"){
					if (checkVideoURL(inputs[inputKeys[index]])){
						completed++;
					}
				} else {
					completed++;
				}
			}
		}
		var percent = Math.round(100.0 * completed / tolalInputs);
		$(".progress-bar")
		.attr("aria-valuenow",percent)
		.css({"width": percent + "%"})
		.text(percent + "%")
		if (percent === 100){
			$(".progress-bar").css({"background-color":"#4CAF50"}).html("Completed")
		}
		return (percent === 100);
	}


	function uploadGiftToFibrebase(redirect = true, blink = true){
		updateEachInput("input1", "text");
		updateEachInput("input2", "text");
		updateEachInput("input5", "textarea");
		updateEachInput("input6", "image");
		updateEachInput("input7", "textarea");
		updateEachInput("input8", "text");
		updateEachInput("input9", "video");
		isCompleted = checkPercentCompleted();
		sendToFirebase(redirect, blink);
	}

	function updateEachInput(inputKey, inputType){
		if ($("#"+inputKey).val() == ""){
			isCompleted = false;
		}

		/*Update localGift*/
		
		if (inputType === "video") {
			if (!$('#video-input-modal').hasClass('in')){
				console.log("hehe");
				localGift.inputs[inputKey] = $("#video-input-modal input").val();
				
			} 
		} else if (inputType == "image"){
			if (!$('#img-input-modal').hasClass('in')){
				localGift.inputs[inputKey] = $("#img-input-modal input").val();
				
			} 
			
		} else {
			localGift.inputs[inputKey] = $("#"+inputKey).val();
		}

	}

	function sendToFirebase(redirect = true, blink) {
		var updates = {};
		if (isCompleted){
			localGift.status = "Completed"
		} else {
			localGift.status = "Incompleted"
		}
		localGift.priority = -Date.now();
		if (blink){
			$("#save-to-cloud-btn").css({"color":"#5bc0de"})	
		}
		
		updates["/gifts/" + giftID] = localGift;
		return database.ref().update(updates, function(err){
			if (blink){
				$("#save-to-cloud-btn").css({"color":"#000"})	
			}
			
			if (redirect){
				window.location.href = "../Preview/Bigbang.html?mode=preview&giftid=" + giftID;		
			}
			
		});
		
	}


});