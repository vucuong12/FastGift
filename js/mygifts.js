$( document ).ready(function() {

	$(document).on( "click",".gift-edit", function( event ) {
      alert("Edit");
    });

    // $('#gift-copylink-modal').on('shown.bs.modal', function() {
    //     $(".gift-url").select();
    //     document.execCommand('copy');
    //   })

	$(document).on( "click",".gift-copylink", function( event ) {
      $("#gift-copylink-modal").modal("show");

      
    });

    $(document).on( "click",".gift-remove", function( event ) {
      $("#gift-remove-modal").modal("show");
    });


    $(document).on( "click",".gift-url", function( event ) {
      $(".gift-url").select();
      document.execCommand('copy');
    });
    $(".url-wrapper").mousedown(function(e){ e.preventDefault(); });
    $(".url-wrapper").click(function(e){

    	$(".gift-url").select();
    	//alert("DM");
      document.execCommand('copy');
    })

    $("#copy-link-btn").click(function(e){

      $(".gift-url").select();
      document.execCommand('copy');
    })
})