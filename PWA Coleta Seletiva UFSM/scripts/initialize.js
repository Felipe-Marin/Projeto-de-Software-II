if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function () { console.log('Service Worker Registered'); });
}

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();
    $('.carousel').carousel();
    $('#results').hide();
    
});