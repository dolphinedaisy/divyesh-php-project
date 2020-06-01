jQuery(document).ready(function() {

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;

    window.isForm1Valid = false;
    window.userDetails = {};
    onPrevious();
    onFirstFormNext();


    $('.radio-group .radio').click(function() {
        $(this).parent().find('.radio').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".submit").click(function() {
        return false;
    })

});

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
        }, {
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

    if(((userDetails['firstname']).trim() === "") || ((userDetails['lastname']).trim() === "") || ((userDetails['email']).trim() === "") || ((userDetails['phoneNumber']).trim() === "") || ((userDetails['dateOfBirth']).trim() === "") || ((userDetails['address']).trim() === "")) {
        console.log('something is empty');
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
