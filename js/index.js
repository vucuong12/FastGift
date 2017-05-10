$(document).ready(function()
{
	$("#birthdayCategory").click(function()
	{
		$("#birthdayPreview").show();
		$("#anniversaryPreview").hide();
		$("#valentinePreview").hide();
	});
	$("#anniversaryCategory").click(function()
	{
		$("#birthdayPreview").hide();
		$("#anniversaryPreview").show();
		$("#valentinePreview").hide();
	});
	$("#valentineCategory").click(function()
	{
		$("#birthdayPreview").hide();
		$("#anniversaryPreview").hide();
		$("#valentinePreview").show();
	});


	$("#bigbang-img, #to-making-btn").click(function(){
		createNewGift(function(giftID){
			window.location.href = "Editing/Bigbang.html?mode=editing&giftid=" + giftID;	
		})

	})



	function createNewGift(callback){
		var newGift = {
			inputs: {
				input1: "",
				input2: ""
			},
			status: "Incompleted"
		}

		var something;
		something = giftsDatabase.push(newGift, function(err){
			if(err) {
				alert(err);
			} else {
				var newGiftKey = something.key;
				callback(newGiftKey);	
			}
		})

		
		

		// /*Retrieving*/

		// ref.on("value", gotData, errData);

		// function gotData(data){
		// 	console.log("gotdata ");
		// 	console.log(data.val());
		// }

		// function errData(err){
		// 	console.log("Error !");
		// 	console.log(err);
		// }

	}
});