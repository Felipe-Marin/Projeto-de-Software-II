//Busca de resíduos
$(document).ready(function () {
    var searchTable;
    var dataResiduos = {};
    $.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/1CNFUNPva91WPsoD2Yr0n3KQ4BjZcNkBRFhsYub1ClpA/od6/public/values?alt=json',
        cache: true,
        data: dataResiduos,
        dataType: 'json',
        success: function (data) {
            searchTable = $('#table1').DataTable({
                "responsive": true,
                "dom": 'tp',
                "data": data.feed.entry,
                "columns": [
                    { "data": "gsx$residuo.$t" },
                    { "data": "gsx$tipo.$t" }
                ]
            });
        }
    });
    $('#search').keyup(function () {
        if ($('#search').val() == '') {
            $('#results').hide();
        }
        else {
            $('#results').show();
            searchTable.search($(this).val()).draw();
        }
    });
});
