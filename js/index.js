function setBtnSecondary()
{
	$("#birthdayCategory").toggleClass('btn-primary', false);
	$("#birthdayCategory").toggleClass('btn-secondary', true);
	$("#anniversaryCategory").toggleClass('btn-primary', false);
	$("#anniversaryCategory").toggleClass('btn-secondary', true);
	$("#valentineCategory").toggleClass('btn-primary', false);
	$("#valentineCategory").toggleClass('btn-secondary', true);
}
$(document).ready(function()
{
	$("#birthdayCategory").click(function()
	{
		setBtnSecondary();
		$(this).toggleClass('btn-primary');
		$("#birthdayPreview").show();
		$("#anniversaryPreview").hide();
		$("#valentinePreview").hide();
	});
	$("#anniversaryCategory").click(function()
	{
		setBtnSecondary();
		$(this).toggleClass('btn-primary');
		$("#birthdayPreview").hide();
		$("#anniversaryPreview").show();
		$("#valentinePreview").hide();
	});
	$("#valentineCategory").click(function()
	{
		setBtnSecondary();
		$(this).toggleClass('btn-primary');
		$("#birthdayPreview").hide();
		$("#anniversaryPreview").hide();
		$("#valentinePreview").show();
	});


	$("#bigbang-img, #to-bigbang-btn").click(function(){
		createNewGift(function(giftID){
			window.location.href = "Editing/Bigbang.html?mode=editing&giftid=" + giftID;	
		},"Bigbang")

	})

	$("#mygirl-img, #to-mygirl-btn").click(function(){
		createNewGift(function(giftID){
			window.location.href = "Editing/MyGirl.html?mode=editing&giftid=" + giftID;	
		}, "MyGirl")

	})

	$(".unavailable").click(function(){
		alert("Coming soon");
	})



	function createNewGift(callback, templateName){
		var newGift = {
			templateName: templateName,
			giftTitle: "Untitled gift",
			inputs: {
				input1: "",
				input2: ""
			},
			status: "Incompleted",
			priority: -Date.now()
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
		

	}
});