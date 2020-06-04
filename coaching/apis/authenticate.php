<?php

require_once('db-connection.php');

if($_POST['email'] && $_POST['password']) {
    $qry1 = "SELECT * FROM `role-by-user` where `email` = '" . $_POST['email'] . "' and `password` = '" . $_POST['password'] . "'";
    $result = $conn -> query($qry1);
    $user = $result -> fetch_all(MYSQLI_ASSOC);
    $resObj = new stdClass();
    $resObj->error = boolval(!count($user));
    $resObj->isAuthenticated = boolval(count($user));
    $resObj->user = $user;
    echo json_encode($resObj);
} else {
    $obj = new stdClass();
    $obj->error = true;
    $obj->message = 'id and text is missing';
    echo json_encode($obj);
}
die();
