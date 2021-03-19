$(document).ready(function() {
    let gender = $("#input3").val();
    if (gender == "male")
        $("select").append(`<option value="female">female</option>`)
    else
        $("select").append(`<option value="male">male</option>`)

    $("#logout").click(function() {
        let username = $("#input1").val();
        let uid = (window.location.pathname).substring(9);;
        let user = { username: username, uid: uid }
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/login/logout",
            data: user,
            async: false,
            success: function() {
                window.location.href = 'http://localhost:3000/login'
            },
            error: function(xhr, status, error) {
                alert("something went wrong")
            }
        });
    })
    $("button").click(function() {
        let username = $("#input1").val();
        let email = $("#input2").val();
        let gender = $("#input3").val();
        let currentPass = $("#input4").val();
        let pass1 = $("#input5").val();
        let pass2 = $("#input6").val();
        if (email == "")
            $("#error1").html("الزامی")
        else
            $("#error1").html("")

        if (currentPass != "" || pass1 != "" || pass2 != "") {
            if (currentPass == "")
                $("#error2").html("الزامی")
            else
                $("#error2").html("")
            if (pass1 == "")
                $("#error3").html("الزامی")
            else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(pass1))
                $("#error3").html("پسوورد باید حداقل 8 کاراکتر شامل حداقل 1 حرف و 1 عدد باشد")
            else
                $("#error3").html("")

            if (pass2 == "")
                $("#error4").html("الزامی")
            else if (pass1 != pass2)
                $("#error4").html("پسوورد های وارد شده یکسان نیست")
            else
                $("#error4").html("")
        }
        if (!checkErrors()) {
            let user = { username: username, email: email, gender: gender, password: currentPass, newpass: pass1 }
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/register/modify",
                data: user,
                async: false,
                success: function() {
                    alert("اطلاعات با موفقیت ذخیره شد");
                    if (currentPass == "")
                        location.reload();
                    else
                        window.location.href = 'http://localhost:3000/login'
                },
                error: function(xhr, status, error) {
                    $("#error2").html("پسوورد اشتباه")
                }
            });
        }
    })
})

function checkErrors() {
    if ($("#error1").html() == "" && $("#error2").html() == "" && $("#error3").html() == "" && $("#error4").html() == "")
        return false
    return true
}