$(document).ready(function () {
    
    //set design settings
    /*var blur = 'blur(' + (config.backgroundBlur <= 0 || config.backgroundBlur == null ? 0 : config.backgroundBlur) + 'px)';
    $('.bg')
		.css('filter', blur)
		.css('-webkit-filter', blur)
		.css('-moz-filter', blur)
		.css('-o-filter', blur)
		.css('-ms-filter', blur);*/
    
    $('.bg').css('background-image', 'url( ' + config.backgroundImage + ' )');
    
    //load the images and other information
    var object = new SimpleMc();

    var runID = setInterval(function () {
        new SimpleMc();
    }, (config.refresh * 1000));

});