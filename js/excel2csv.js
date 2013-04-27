/*
    Author:     Sylvain Mauduit <swop@swop.io>
    License:    MIT
 */

function clearResults() {
    $('#data-export-zone').empty();
}

function getParams() {
    var params = {
        itemsPerLine: parseInt($('#paramsItemsPerLine').val()),
        deleteDuplicates: $('#paramsDeleteDuplicates').is(':checked'),
        itemsSeparator: $('#paramsItemsSeparator').val()
    };

    return params;
}

function computeResults(data, params) {
    results = [];

    var items = data.match(/[^\r\n]+/g);

    if (params.deleteDuplicates) {
        // Remove duplicates
        items = _.reduce(items, function(list, elem) {
            if (list.indexOf(elem) == -1) {
                list.push(elem);
            }
            return list;
        }, []);
    }

    var steps = Math.ceil(items.length / params.itemsPerLine);

    for (var i = 0; i < steps; i++) {
        results.push(
            items.slice(
                params.itemsPerLine * i,
                params.itemsPerLine * (i + 1)
            ).join(params.itemsSeparator)
        );
    }

    return results;
}

$(function() {
    $('#generate-button').click(function() {
        var data = $('#data-input').val();

        clearResults();
        var results = computeResults(data, getParams());

        var dataExportZone = $('#data-export-zone');
        var length = results.length, result = null;

        for (var i = 0; i < length; i++) {
            result = results[i];

            dataExportZone.append(
                '<div class="row-fluid">' +
                    '<div class="span1 rank">#'+(i+1)+'</div>' +
                    '<div class="span11"><input type="text" class="data-export-item" value="'+result+'"></div>' +
                '</div>'
            );
        }
    });
})
