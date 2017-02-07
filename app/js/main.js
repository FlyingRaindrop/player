(function () {
	function include(path) {
		$('body').append('<script src="'+path+'"></script>');
	}
	include('js/secondPage.js');
	include('js/firstPage.js');
})();