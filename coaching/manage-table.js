var $table = $('#table')
var $enroll = $('#enroll')
var selections = []

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row['user-id'];
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
            field: 'user-id',
            values: [row['user-id']]
        })
    }
}

function totalTextFormatter(data) {
    return 'Total'
}

function totalNameFormatter(data) {
    return data.length
}

function totalPriceFormatter(data) {
    var field = this.field
    return '$' + data.map(function (row) {
        return +row[field].substring(1)
    }).reduce(function (sum, i) {
        return sum + i
    }, 0)
}


function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({

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
            // enable button as soon as row is checked
            // save your data, here just save the current page
            selections = getIdSelections()
            $enroll.prop('disabled', !$table.bootstrapTable('getSelections').length);
        })
    $table.on('all.bs.table', function (e, name, args) {
        console.log(name, args)
    })
    $enroll.click(function () {
        var ids = getIdSelections()
        // -- set enrolled flag in DB (API call)
        enrollSelected(ids);
        // disable button after operation finish
        $enroll.prop('disabled', true);
    })
}

$(function() {
    showSuccessToast();
    initTable();
});

function enrollSelected(ids) {
    $.ajax({
        url:"enroll-user.php", //the page containing php script
        type: "post", //request type,
        dataType: 'json',
        data: { ids: ids },
        success:function(result) {
            console.log(result);
            showSuccessToast();
        },
        error: function (error) {
            console.error(error);
            return false;
        }
    });
}

function showSuccessToast() {
    $('#success-toast').toast('show');
}
