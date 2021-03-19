$(document).ready(function() {
    $("#login").click(function() {
        let username = $("#input1").val();
        let password = $("#input2").val();
        if (username == "") {
            $("#error1").html("الزامی")
            $("#input1").css("border", "solid red")
        } else {
            $("#input1").css("border", "solid")
            $("#error1").html("")
        }
        if (password == "") {
            $("#error2").html("الزامی")
            $("#input2").css("border", "solid red")
        } else {
            $("#input2").css("border", "solid")
            $("#error2").html("")
        }
        if (username != "" && password != "") {
            let user = { username: username, password: password }
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/login/authentication",
                data: user,
                async: false,
                success: function(result) {
                    alert("ورود موفقیت آمیز");
                    window.location.href = `http://localhost:3000/profile/${result.uuid}`
                },
                error: function() {
                    alert("کاریر یافت نشد");
                }
            });
        }
    })
})