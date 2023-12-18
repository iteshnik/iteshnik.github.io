$(document).ready(function() {
	$('#myModal').on('show.bs.modal', function (e) {
		$("#main").addClass('blur');
		var link = $(e.relatedTarget);
		$(this).find(".modal-content").load(link.attr("href"));
	});
	
	$('#myModal').on('hidden.bs.modal', function (e) {
		$("#main").removeClass('blur');
	});
});
