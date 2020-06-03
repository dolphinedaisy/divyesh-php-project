var $table = $('#table');
var $enroll = $('#enroll');
var selections = [];

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
    return html.join('');
}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'user-id',
            values: [row['user-id']]
        });
    }
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
            },
            {
                field: 'is-enrolled',
                title: 'Enroll',
                align: 'center',
                clickToSelect: false,
                formatter : function(value, row, index) {
                    if(row['is-enrolled'] === '1')
                        return '<button class="btn btn-primary btn-enroll" data-custom-row-id="'+ row['user-id'] +'" disabled>Already Enrolled</button> ';
                    else
                        return '<button class="btn btn-primary btn-enroll" data-custom-row-id="'+ row['user-id'] +'">Enroll</button> ';
                }
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
    initTable();
    setTimeout(function () {
        onEnrollBtnClick();
    }, 3000);
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

function onEnrollBtnClick() {
    $('.btn-enroll').click(function () {
        var id = $(this).attr('data-custom-row-id');
        enrollSelected([id]);
    });
}
