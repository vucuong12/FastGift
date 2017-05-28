$(document).ready(function() {
	$("#test div").sort(function(a,b)
	{
		var A = parseInt($(a).attr('data-priority'));
		var B = parseInt($(b).attr('data-priority'));
		console.log(A,B);
		if(A > B) return 1;
		return A<B?-1:0;
	}).each(function()
	{
		var u = $(this);
		u.remove();
		$(u).appendTo('#test');
	});
});