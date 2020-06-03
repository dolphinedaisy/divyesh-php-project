<?php

require_once('db-connection.php');

if($_POST['ids']) {
    $IDs = $_POST['ids'];
    $resArray = array();
    foreach ($IDs as $key => $val) {
        $qry1 = "UPDATE `user-detail` SET `is-enrolled`= 1 WHERE `user-id` = ". $val;
        $resObj = new stdClass();
        $resObj->operation_on_id = $val;
        $resObj->operation_status = ($conn->query($qry1) === TRUE);
        array_push($resArray, $resObj);
    }
    echo json_encode($resArray);
} else {
    $obj = new stdClass();
    $obj->error = true;
    $obj->message = 'ids are missing';
    echo json_encode($obj);
}
die();
