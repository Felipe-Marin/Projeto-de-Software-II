//Aviso quando estiver offline sobre limitação de uso do mapa
$(document).ready(function () {
    if (!navigator.onLine) {
        $('#offlineAviso').show();
    }
});
window.addEventListener('offline', function () {
    $('#offlineAviso').show();
});
window.addEventListener('online', function () {
    $('#offlineAviso').hide();
});

function initMap() {
    var center = { lat: -29.714315714425528, lng: -53.71471834680483 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center
    });
    var data = {};
    $.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/1CNFUNPva91WPsoD2Yr0n3KQ4BjZcNkBRFhsYub1ClpA/2/public/values?alt=json',
        cache: true,
        data: data,
        dataType: 'json',
        success: function (data) {
            $.each(data.feed.entry, function (index, item) {
                var icon;
                if (item.gsx$tipo.$t == 'reciclavel') {
                    icon = 'images/mapicon_reciclavel.png';
                }
                else {
                    icon = 'images/mapicon_eletronico.png';
                }
                new google.maps.Marker({
                    position: { lat: parseFloat(item.gsx$latitude.$t), lng: parseFloat(item.gsx$longitude.$t) },
                    map: map,
                    title: item.gsx$nome.$t,
                    icon: icon
                });
            });
        }
    });
}