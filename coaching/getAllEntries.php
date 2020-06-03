<?php

require_once('db-connection.php');

$qry = "SELECT * FROM `user-detail`";

if ($result = $conn -> query($qry)) {
    $users = $result -> fetch_all(MYSQLI_ASSOC);
    $obj = new stdClass();
    $obj->error = false;
    $obj->rows = $users;
    $obj->total = count($users);
    $obj->totalNotFiltered = count($users);
    echo json_encode($obj);
} else {
    $obj = new stdClass();
    $obj->error = true;
    $obj->details = "Error: " . "Insert statement error" . "<br>" . $conn->error;
    $obj->message = 'detail fields are missing';
    echo json_encode($obj);
}

die();
