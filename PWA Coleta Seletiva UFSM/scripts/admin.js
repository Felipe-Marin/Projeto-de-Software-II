var map;
var markers = [];
function initMap() {
    var center = { lat: -29.714315714425528, lng: -53.71471834680483 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: center
    });
    var content = '<div>' + 
        '<h6>Adicionar Contêiner</h6>' +
        '<div class="input-field">' +
        '<input id="inputNome" type="text">' +
        '<label for="inputNome">Nome</label>' +
        '</div>' +
        '<img id="buttonLixeiraVerde" src="images/lixeiraverde.png" class="z-depth-1" style="width:30px;heigth:30px;margin-left:2px;"></img>' +
        '<img id="buttonTonelAzul" src="images/tonelazul.png" class="z-depth-1" style="width:30px;heigth:30px;margin-left:2px;"></img>' +
        '</div>';
    var infowindow = false;
    map.addListener('click', function(e){
        if(infowindow){
            infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({content:content});
        infowindow.setPosition(e.latLng);
        infowindow.open(map);
        $('#buttonLixeiraVerde').click(function(){
            var icon = 'images/mapicon_reciclavel.png';
            var marker = newMarker(map, e.latLng.lat(), e.latLng.lng(), $('#inputNome').val(), icon);
            insertMarker(marker);
        });
    });

}
function getSheet() {
    var data = {};
    $.ajax({
        url: 'https://sheets.googleapis.com/v4/spreadsheets/1CNFUNPva91WPsoD2Yr0n3KQ4BjZcNkBRFhsYub1ClpA/values/Coletores!A2:D1000?key=APIKEY',
        data: data,
        dataType: 'json',
        success: function (data) {
            console.log(data.values);
            $.each(data.values, function (index, row) {
                var icon;
                if (row[3] == 'reciclavel') {
                    icon = 'images/mapicon_reciclavel.png'
                }
                else {
                    icon = 'images/mapicon_eletronico.png'
                }
                var marker = newMarker(map, parseFloat(row[1]), parseFloat(row[2]), row[0], icon);
                insertMarker(marker);
            });
        }
    });
}

function newMarker(map, lat, lng, title, icon){
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: title,
        icon: icon
    });
    contentString = '<div>' + '<a class="waves-effect waves-light btn-floating"><i class="material-icons">delete</i></a>' + '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function(){
        infowindow.open(map, marker);
    });
    return marker;
}

function insertMarker(marker){
    marker.set('id', markers.length);
    markers.push(marker);
}


function removeMarker(id){
    markers[id] = null;
}
var values = [];
function updateSheet(){
    
    $.each(markers, function(index, marker){
        var row = [marker.getTitle(), marker.getPosition().lat(), marker.getPosition().lng()];
        values.push(row);
    });
    gapi.auth2.getAuthInstance().signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"})
    .then(function() {
        console.log("Sign-in successful");
        gapi.load('client').then(function(){
            gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest").then(function(){
                gapi.client.sheets.spreadsheets.values.update({
                    "spreadsheetId": "19DJ2k7LogUwtaXR-tEP3HSYknJLgc58NchJNGEjwPUs",
                    "range": "A1:D1000",
                    "includeValuesInResponse": "false",
                    "responseDateTimeRenderOption": "FORMATTED_STRING",
                    "responseValueRenderOption": "FORMATTED_VALUE",
                    "valueInputOption": "RAW",
                    "resource": {
                      "values": values
                    }
                })
                    .then(function(response) {
                        // Handle the results here (response.result has the parsed body).
                        console.log("Response", response);
                    }, function(error) {
                        console.error("Execute error", error);
                });
            });  
        });
       
    });
    
}