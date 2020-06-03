<?php

require_once('db-connection.php');

if($_POST['reminderForId'] && $_POST['reminderText']) {
    $qry1 = "UPDATE `user-detail` SET `reminder`= '". $_POST['reminderText'] ."' WHERE `user-id` = ". $_POST['reminderForId'];
    $resObj = new stdClass();
    $resObj->error = false;
    $resObj->operation_on_id = $_POST['reminderForId'];
    $resObj->operation_status = ($conn->query($qry1) === TRUE);
    echo json_encode($resObj);
} else {
    $obj = new stdClass();
    $obj->error = true;
    $obj->message = 'id and text is missing';
    echo json_encode($obj);
}
die();
