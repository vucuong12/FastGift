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

	$("#bigbang-img").click(function(){
		window.location.href = "Editing/Bigbang.html";
	})
});