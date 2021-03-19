$(document).ready(function() {
    $("#login").click(function() {
        let username = $("#input1").val();
        let email = $("#input2").val();
        let gender = $("#input3").val();
        let pass1 = $("#input4").val();
        let pass2 = $("#input5").val();
        if (username == "")
            $("#error1").html("الزامی")
        else
            $("#error1").html("")

        if (email == "")
            $("#error2").html("الزامی")
        else
            $("#error2").html("")

        if (gender == null)
            $("#error3").html("الزامی")
        else
            $("#error3").html("")

        if (pass1 == "")
            $("#error4").html("الزامی")
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(pass1))
            $("#error4").html("پسوورد باید حداقل 8 کاراکتر شامل حداقل 1 حرف و 1 عدد باشد")
        else
            $("#error4").html("")

        if (pass2 == "")
            $("#error5").html("الزامی")
        else if (pass1 != pass2)
            $("#error5").html("پسوورد های وارد شده یکسان نیست")
        else
            $("#error5").html("")

        if (!checkErrors()) {
            let user = { username: username, email: email, gender: gender, password: pass1, isLoggedIn: false }
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/register/authentication",
                data: user,
                async: false,
                success: function() {
                    alert("ثبت نام موفقیت آمیز");
                    window.location.href = 'http://localhost:3000/login'
                },
                error: function(xhr, status, error) {
                    $("#error1").html("نام کاربری تکراری")
                }
            });
        }
    })
})

function checkErrors() {
    if ($("#error1").html() == "" && $("#error2").html() == "" && $("#error3").html() == "" && $("#error4").html() == "" && $("#error5").html() == "")
        return false
    return true
}