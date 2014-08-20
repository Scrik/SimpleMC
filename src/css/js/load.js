$(document).ready(function () {
    
    //set design settings
    $('.bg').css('-webkit-filter', 'blur(' + (config.backgroundBlur <= 0 || config.backgroundBlur == null ? 0 : config.backgroundBlur) +'px)');
    $('.bg').css('background-image', 'url( ' + config.backgroundImage + ' )');
    
    //load the images and other information
    var object = new SimpleMc();

    var runID = setInterval(function () {
        new SimpleMc();
    }, (config.refresh * 1000));

});