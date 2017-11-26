var map;
var markers = [];

$(document).ready(function(){
    $('.modal').modal();
});

function onSignIn(googleUser) {
    // user data
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    // Id token
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);
    $('#signoutLink').html(profile.getName() + '<a class="teal darken-4 waves-effect waves-light btn" onclick="signOut();"><i class="material-icons right">exit_to_app</i>Sair</a>');
    $('#signoutLink').show();
    gapi.load('client');
    $('#loginDiv').hide();
    getSheet();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        $('#signoutLink').html('');
        $('#signoutLink').hide();
        $('#loginDiv').show();
    });
}

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
        '<div class="input-field">' +
        '<select id="tipoRes">' +
        '<option value="" disabled selected>Escolha um tipo de resíduo</option>' +
        '<option value="reciclavel" data-icon="images/lixeiraverde.png" class"left">Resíduo reciclável</option>' +
        '<option value="eletronico" data-icon="images/tonelazul.png" class"left">Resíduo eletrônico</option>' +
        '</select>' +
        '</div>' +
        '<div class="center-align">' +
        '<a id="btnAddCont" class="teal darken-4 waves-effect waves-light btn">Adicionar contêiner</a>' +
        '</div>' +
        '</div>';
    var infowindow = false;
    map.addListener('click', function(e){
        if(infowindow){
            infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({content:content});
        infowindow.setPosition(e.latLng);
        infowindow.open(map);
        $('#tipoRes').material_select();
        $('#btnAddCont').click(function(){
            var tipo = $('#tipoRes').val();
            var marker = newMarker(map, e.latLng.lat(), e.latLng.lng(), $('#inputNome').val(), tipo);
            insertMarker(marker);
        });
        
    });

}



function getSheet() {
    var data = {};
    $.ajax({
        url: 'https://sheets.googleapis.com/v4/spreadsheets/19DJ2k7LogUwtaXR-tEP3HSYknJLgc58NchJNGEjwPUs/values/Coletores!A2:D1000?key=AIzaSyC6QEqPesjp59dV_Iqa0T56y_NcnTMSbjw',
        data: data,
        dataType: 'json',
        success: function (data) {
            console.log(data.values);
            $.each(data.values, function (index, row) {
                var marker = newMarker(map, parseFloat(row[1]), parseFloat(row[2]), row[0], row[3]);
                insertMarker(marker);
            });
        }
    });
}

function newMarker(map, lat, lng, title, tipo){
    var icon = getIcon(tipo);
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: title,
        icon: icon,
        draggable: true
    });
    marker.set('tipo', tipo);
    marker.set('id', markers.length);
    var content = '<div>' + 
    '<h6>Modificar Contêiner</h6>' +
    '<div class="input-field">' +
    '<input id="inputNome" type="text">' +
    '<label for="inputNome">Nome</label>' +
    '</div>' +
    '<div class="input-field">' +
    '<select name="tipoRes" id="tipoRes">' +
    '<option value="reciclavel" data-icon="images/lixeiraverde.png" class"left">Resíduo reciclável</option>' +
    '<option value="eletronico" data-icon="images/tonelazul.png" class"left">Resíduo eletrônico</option>' +
    '</select>' +
    '</div>' +
    '<div class="center-align">' +
    '<a id="btnModCont" class="teal darken-4 waves-effect waves-light btn" style="margin-right:2px;"><i class="material-icons left">edit</i>Modificar</a>' +
    '<a id="btnRemCont" class="teal darken-4 waves-effect waves-light btn"><i class="material-icons left">delete</i>Remover</a>' +
    '</div>' +
    '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: content
    });
    marker.addListener('click', function(){
        infowindow.open(map, marker);
        $('#inputNome').val(marker.getTitle());
        Materialize.updateTextFields();
        $('#tipoRes').val(marker.get('tipo'));
        $('#tipoRes').material_select();
        $('#btnModCont').click(function(){
            console.log('Modificar: ' + marker.get('id'));
            marker.setTitle($('#inputNome').val());
            marker.set('tipo', $('#tipoRes').val());
            marker.setIcon(getIcon($('#tipoRes').val()));
        });
        var cancel = false;
        $('#btnRemCont').click(function(){
            console.log('Remover: ' + marker.get('id'));
            removeMarker(marker.get('id'));
        });
    });
    return marker;
}

function insertMarker(marker){
    markers.push(marker);
}

function updateMarker(id, lat, lng, title, tipo){
    markers[id].setPosition({lat: lat, lng: lng});
    markers[id].setTitle(title);
    markers[id].set('tipo', tipo);
}

function removeMarker(id){
    markers[id].setMap(null);
}

function getIcon(tipo){
    if (tipo == 'reciclavel') {
        return 'images/mapicon_reciclavel.png';
    }
    else if(tipo == 'eletronico'){
        return 'images/mapicon_eletronico.png';
    }
}

function updateSheet(){
    $('#modalAt').modal('open');
    var values = [];
    var empty_row = ['', '', '', ''];
    var n_removed = 0;
    $.each(markers, function(index, marker){
        if(marker.getMap() != null){
            var row = [marker.getTitle(), marker.getPosition().lat(), marker.getPosition().lng(), marker.get('tipo')];
            values.push(row);
        }
        else{
            n_removed++;
        }
    });
    for(var i = 0; i<n_removed; i++){
        values.push(empty_row);
    }
    gapi.client.load('https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest').then(function(){
        gapi.client.sheets.spreadsheets.values.update({
            'spreadsheetId': '19DJ2k7LogUwtaXR-tEP3HSYknJLgc58NchJNGEjwPUs',
            'range': 'Coletores!A2:D1000',
            'includeValuesInResponse': 'false',
            'responseDateTimeRenderOption': 'FORMATTED_STRING',
            'responseValueRenderOption': 'FORMATTED_VALUE',
            'valueInputOption': 'RAW',
            'resource': {
                'values': values
            }
        })
            .then(function(response) {
                $('#modalAt').modal('close');
                console.log('Response', response);
                $('#modalSuccess').modal('open');
            }, function(error) {
                $('#modalAt').modal('close');
                $('#modalFail').modal('open');
                console.error('Execute error', error);
            });
    });      
}