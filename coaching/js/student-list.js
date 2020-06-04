$(document).ready(function() {
    // getAllEntries();
});

function getAllEntries() {
    $.ajax({
        url:"apis/get-all-students.php", //the page containing php script
        type: "get", //request type,
        dataType: 'json',
        success:function(result) {
            if(result.data) {
                renderTable(result.data);
            } else {
                console.error('Missing data field');
            }
        },
        error: function (error) {
            console.error(error);
            return false;
        }
    });
}

function renderTable(data) {

    /*var tbHeadBody = "<tr><th>First Name</th>\n" +
        "                        <th>Last Name</th>\n" +
        "                        <th>Email</th>\n" +
        "                        <th>Phone</th>\n" +
        "                        <th>Alternative phone</th>\n" +
        "                        <th>Address</th></tr>";


    $('#tb-head').html(tbHeadBody);*/

    var tbBodyStr = "";

    for(var i=0; i<data.length; i++) {
        var user = data[i];
        tbBodyStr += "<tr>";
        tbBodyStr += "<td>"+ user['firstname'] +"</td>";
        tbBodyStr += "<td>"+ user['lastname'] +"</td>";
        tbBodyStr += "<td>"+ user['email'] +"</td>";
        tbBodyStr += "<td>"+ user['phone'] +"</td>";
        tbBodyStr += "<td>"+ user['alternative'] +"</td>";
        tbBodyStr += "<td>"+ user['address'] +"</td>";
        tbBodyStr += "</tr>";

    }

    $('#tb-body').html(tbBodyStr);
}
