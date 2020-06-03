var $table = $('#table')
var $remove = $('#remove')
var selections = []

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
    })
}

function responseHandler(res) {
    $.each(res, function (i, row) {
        row.state = $.inArray(row['user-id'], selections) !== -1
    });
    return res;
}

function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({
        height: 550,
        columns: [
            {
                field: 'state',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'firstname',
                title: 'First Name',
                sortable: true,
                align: 'center'
            },
            {
                field: 'lastname',
                title: 'Last Names',
                sortable: true,
                align: 'center'
            },
            {
                field: 'email',
                title: 'Email',
                align: 'center',
                clickToSelect: false,
            },
            {
                field: 'phone',
                title: 'Phone Number',
                align: 'center',
                clickToSelect: false,
            },
            {
                field: 'alternative',
                title: 'Alternative Number',
                align: 'center',
                clickToSelect: false,
            }
        ]
    })
    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table',
        function () {
            $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

            // save your data, here just save the current page
            selections = getIdSelections()
            // push or splice the selections if you want to save all data selections
        })
    $table.on('all.bs.table', function (e, name, args) {
        console.log(name, args)
    })
    $remove.click(function () {
        var ids = getIdSelections()
        $table.bootstrapTable('remove', {
            field: 'id',
            values: ids
        })
        $remove.prop('disabled', true)
    })
}

$(function() {
    initTable();
})
