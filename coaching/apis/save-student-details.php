<?php

require_once('db-connection.php');

if($_POST['userDetails'] && $_POST['userEduDetails']) {

    $userDetails = $_POST['userDetails'];
    $userEduDetails = $_POST['userEduDetails'];
    $qry1 = "INSERT INTO `user-detail`(`firstname`, `lastname`, `email`, `phone`, `alternative`, `dob`, `address`, `gender`, `passportnumber`, `passportstatus`, `maritalstatus`, `country`, `coaching`, `passingYear-10`, `percentage-10`, `mathsMarks-10`, `englishMarks-10`, `passingYear-12`, `percentage-12`, `mathsbio`, `englishMarks-12`, `stream`, `specialization`, `diploma-passing-year`, `percentage-diploma`, `backlogs-diploma`, `diploma-type`, `passing-year-bachelor`, `percentage-bachelor`, `backlogs-bachelor`, `bachelor-degree-in`, `passing-year-pg`, `percentage-pg`, `backlogs-pg`, `pg-degree-in`, `experience`, `job-profile`) VALUES('". $userDetails['firstname'] ."', '". $userDetails['lastname'] ."', '". $userDetails['email'] ."', '".
        $userDetails['phoneNumber'] ."', '". $userDetails['alternativePhone'] ."', '". $userDetails['dateOfBirth'] ."', '". $userDetails['address'] ."', ". $userDetails['gender'] .", '". $userDetails['passpoertNumber'] ."', ". $userDetails['passportIssued'] .", ". $userDetails['maritalStatus'] .", '". $userDetails['interestedCountry'] ."', '". $userDetails['interestedInCoaching'] ."', '". $userEduDetails['passingYear-10'] ."', '". $userEduDetails['percentage-10'] ."', '". $userEduDetails['mathsMarks-10'] ."', '". $userEduDetails['englishMarks-10'] ."', '". $userEduDetails['passingYear-12'] ."', '". $userEduDetails['percentage-12'] ."', '". $userEduDetails['mathsbio'] ."', '". $userEduDetails['englishMarks-12'] ."', '". $userEduDetails['stream'] ."', '". $userEduDetails['specialization'] ."', '". $userEduDetails['diploma-passing-year'] ."', '". $userEduDetails['percentage-diploma'] ."', '".$userEduDetails['backlogs-diploma']."', '". $userEduDetails['diploma-type'] ."', '". $userEduDetails['passing-year-bachelor'] ."', '". $userEduDetails['percentage-bachelor'] ."', '". $userEduDetails['backlogs-bachelor'] ."', '". $userEduDetails['bachelor-degree-in'] ."', '". userDea
        ['passing-year-pG']."', '". $userEduDetails['percentage-pG'] ."', '". $userEduDetails['backlogs-pG'] ."', '".
        $userEduDetails['pg-degree-in'] ."', '". $userEduDetails['experience'] ."', '". $userEduDetails['job-profile'] ."')";

    if ($conn->query($qry1) === TRUE) {
        $obj = new stdClass();
        $obj->error = false;
        $obj->message = 'inserted successfully';
        echo json_encode($obj);
    } else {
        $obj = new stdClass();
        $obj->error = true;
        $obj->details = "Error: " . "Insert statement error" . "<br>" . $conn->error;
        $obj->message = 'detail fields are missing';
        echo json_encode($obj);
    }

} else {
    $obj = new stdClass();
    $obj->error = true;
    $obj->message = 'detail fields are missing';
    echo json_encode($obj);
}
die();
