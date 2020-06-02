jQuery(document).ready(function() {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    window.isForm1Valid = false;
    window.userDetails = {};
    window.userEduDetails = {};

    onPrevious();
    onFirstFormNext();
    onSecondFormNext();

    onBlurFirstName();
    onBlurLastName();
    onBlurEmail();
    onBlurPhoneNumber();
    onBlurAlternative();
    onBlurAddress();
    onBlurCountry();
    onBlurInterest();

    $('.radio-group .radio').click(function() {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function() {
        return false;
    })

});

function onSecondFormNext() {
    $('#btn-next-2').click(function () {

        userEduDetails['passingYear-10'] = $('#passingYear-10').val();
        userEduDetails['percentage-10'] = $('#percentage-10').val();
        userEduDetails['mathsMarks-10'] = $('#mathsMarks-10').val();
        userEduDetails['englishMarks-10'] = $('#englishMarks-10').val();

        userEduDetails['passingYear-12'] = $('#passingYear-12').val();
        userEduDetails['percentage-12'] = $('#percentage-12').val();
        userEduDetails['mathsbio'] = $('#mathsbio').val();
        userEduDetails['englishMarks-12'] = $('#englishMarks-12').val();
        userEduDetails['stream'] = $('#stream').val();
        userEduDetails['specialization'] = $('#specialization').val();

        userEduDetails['diploma-passing-year'] = $('#diploma-passing-year').val();
        userEduDetails['percentage-diploma'] = $('#percentage-diploma').val();
        userEduDetails['backlogs-diploma'] = $('#backlogs-diploma').val();
        userEduDetails['diploma-type'] = $('#diploma-type').val();

        userEduDetails['passing-year-bachelor'] = $('#passing-year-bachelor').val();
        userEduDetails['passing-year-bachelor'] = $('#passing-year-bachelor').val();
        userEduDetails['percentage-bachelor'] = $('#percentage-bachelor').val();
        userEduDetails['backlogs-bachelor'] = $('#backlogs-bachelor').val();
        userEduDetails['bachelor-degree-in'] = $('#bachelor-degree-in').val();


        userEduDetails['passing-year-pG'] = $('#passing-year-pG').val();
        userEduDetails['percentage-pG'] = $('#percentage-pG').val();
        userEduDetails['backlogs-pG'] = $('#backlogs-pG').val();
        userEduDetails['pg-degree-in'] = $('#pg-degree-in').val();

        userEduDetails['experience'] = $('#experience').val();
        userEduDetails['job-profile'] = $('#job-profile').val();

        save();


    });
}

function onFirstFormNext() {

    $('#btn-next-1').click(function() {

        userDetails['firstname'] =              $('#firstname').val();
        userDetails['lastname'] =               $('#lastname').val();
        userDetails['email'] =                  $('#email').val();
        userDetails['phoneNumber'] =            $('#phoneNumber').val();
        userDetails['alternativePhone'] =       $('#alternativePhone').val();
        userDetails['dateOfBirth'] =            $('#dateOfBirth').val();
        userDetails['address'] =                $('#address').val();
        userDetails['gender'] =                 $('input[name="Gender"]:checked').val();
        userDetails['passportIssued'] =         $('input[name="issued"]:checked').val();
        userDetails['maritalStatus'] =          $('input[name="maritalStatus"]:checked').val();
        userDetails['passpoertNumber'] =        $('#passportNumber').val();
        userDetails['interestedCountry'] =      $('#interestedCountry').val();
        userDetails['interestedInCoaching'] =   $('#interestedInCoaching').val();

        isForm1Valid = validateForm1();

        if(isForm1Valid) {
            onNext();
        } else {
            return false;
        }

    });
}

function onNext() {
    $(".next").click(function() {

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
                opacity: 0
            },
            {
                step: function(now) {
                    // for making fielset appear animation
                    opacity = 1 - now;

                    current_fs.css({
                        'display': 'none',
                        'position': 'relative'
                    });
                    next_fs.css({
                        'opacity': opacity
                    });
                },
                duration: 600
            });
    });
}

function onPrevious() {
    $(".previous").click(function() {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 600
        });
    });
}

function validateForm1() {
    var valid = true;

    if(((userDetails['firstname']).trim() === "") || ((userDetails['email']).trim() === "") || ((userDetails['phoneNumber']).trim() === "") || ((userDetails['dateOfBirth']).trim() === "") || ((userDetails['address']).trim() === "")) {
        console.log('something is empty');
        $('#err-general-bottom').html('Fields are empty.');
        $('#err-general-bottom').addClass('display-block');
        valid = false;
    } else if(!isEmailValid((userDetails['email']).trim())) {
        console.log('invalid email');
        valid = false;
    } else if(!isPhoneNumberValid((userDetails['phoneNumber']).trim()) || !isPhoneNumberValid((userDetails['alternativePhone']).trim())) {
        console.log('invalid phone');
        valid = false;
    } else if ((userDetails['interestedCountry']) === "null" || (userDetails['interestedInCoaching']) === "null") {
        console.log('something is null');
        valid = false;
    } else {
        valid = true;
    }

    return valid;
}

function onBlurFirstName() {
    $('#firstname').blur(function () {
        if(this.value.trim() === "") {
            $('#err-firstname').html('First name is required');
            $('#err-firstname').addClass('display-block');
        } else {
            $('#err-firstname').removeClass('display-block');
        }
    });
}

function onBlurEmail() {
    $('#email').blur(function () {
        if(this.value.trim() === "") {
            $('#err-email').html('Email is required');
            $('#err-email').addClass('display-block');
        } else if(!isEmailValid(this.value.trim())) {
            $('#err-email').html('Invalid email');
            $('#err-email').addClass('display-block');
        } else {
            $('#err-email').removeClass('display-block');
        }
    });
}

function onBlurLastName() {
    $('#lastname').blur(function () {
        if(this.value.trim() === "") {
            $('#err-lastname').html('Last name is required');
            $('#err-lastname').addClass('display-block');
        } else {
            $('#err-lastname').removeClass('display-block');
        }
    });
}

function onBlurPhoneNumber() {
    $('#phoneNumber').blur(function () {
        if(this.value.trim() === "") {
            $('#err-phone').html('Phone is required');
            $('#err-phone').addClass('display-block');
        } else if(!isPhoneNumberValid(this.value.trim())) {
            $('#err-phone').html('Invalid Phone');
            $('#err-phone').addClass('display-block');
        } else {
            $('#err-phone').removeClass('display-block');
        }
    });
}

function onBlurAlternative() {
    $('#alternativePhone').blur(function () {
        if(this.value.trim() === "") {
            $('#err-alternative').html('Phone is required');
            $('#err-alternative').addClass('display-block');
        } else if(!isPhoneNumberValid(this.value.trim())) {
            $('#err-alternative').html('Invalid Phone');
            $('#err-alternative').addClass('display-block');
        } else {
            $('#err-alternative').removeClass('display-block');
        }
    });
}

function onBlurAddress() {
    $('#address').blur(function () {
        if(this.value.trim() === "") {
            $('#err-address').html('Address is required');
            $('#err-address').addClass('display-block');
        } else {
            $('#err-address').removeClass('display-block');
        }
    });
}


function onBlurCountry() {
    $('#interestedCountry').blur(function () {
        if(this.value === "null") {
            $('#err-country').html('Select country');
            $('#err-country').addClass('display-block');
        } else {
            $('#err-country').removeClass('display-block');
        }
    });
}

function onBlurInterest() {
    $('#interestedInCoaching').blur(function () {
        if(this.value === "null") {
            $('#err-interest').html('Select interest');
            $('#err-interest').addClass('display-block');
        } else {
            $('#err-interest').removeClass('display-block');
        }
    });
}

function disableBtnNext1() {
    $('#btn-next-1').prop('disabled', true);
    $('#btn-next-1').addClass('cursor-notallowed');
}

function isEmailValid(email) {
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    return pattern.test(email);
}

function isPhoneNumberValid(phone) {
    var pattern = /^[789]\d{9}$/;
    return pattern.test(phone);
}

function save() {

    $.ajax({
        url:"CRUD.php", //the page containing php script
        type: "post", //request type,
        dataType: 'json',
        data: {
            userDetails,
            userEduDetails
        },
        success:function(result) {
            console.log(result.abc);
        }
    });

}
