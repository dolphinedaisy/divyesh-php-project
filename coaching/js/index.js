$(document).ready(function() {
    onLoginClick();

    $('#txt-login').blur(function () {
        if ($(this).val().trim() === '') {
            $('#err-email').html('Email is required');
        } else if(!isEmailValid($(this).val().trim())) {
            $('#err-email').html('Invalid Email');
        } else {
            $('#err-email').html('');
        }
    });

    $('#txt-password').blur(function () {
        if ($(this).val().trim() === '') {
            $('#err-password').html('Password is required');
        } else if($(this).val().length >= 10) {
            $('#err-password').html('Maximum 8 characters are allowed');
        } else {
            $('#err-password').html('');
        }
    });
});

function onLoginClick() {

    $('#btn-login').click(function () {
        // -- reset error text
        $('#err-password').html('');

        if($('#txt-login').val().trim() === '' || $('#txt-password').val().trim() === '') {
            console.error('Something is empty');
            $('#err-password').html('Something is empty');
        } else {
            $.ajax({
                url:"apis/authenticate.php", //the page containing php script
                type: "post", //request type,
                dataType: 'json',
                data: {
                    email: $('#txt-login').val().trim(),
                    password: $('#txt-password').val().trim()
                },
                success:function(result) {
                    console.log(result);
                    if(result.isAuthenticated && result.isAuthenticated === true) {
                        localStorage.setItem('loggedInUser', JSON.stringify(result.user));
                        window.location.replace('http://localhost/divyesh-project/coaching/student-details-form.html');
                    } else {
                        console.error('Unauthenticated access');
                        $('#err-password').html('Invalid email or password');
                    }
                },
                error: function (error) {
                    console.error(error);
                    return false;
                }
            });
        }
    });

}

function isEmailValid(email) {
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    return pattern.test(email);
}
