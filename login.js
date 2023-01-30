(function () {
    var login = document.getElementById("login")
    $("#login").on('click', function () {
        var user = $("#username").val()
        var pass = $("#password").val()
        if ($("#username").val().trim() == '' || $("#password").val().trim() == '') {
            alert("用户名或密码不能为空")
            return
        }
        $.ajax({
            type: 'post',
            url: "http://127.0.0.1:2000/user",
            data: JSON.stringify({
                username: user,
                password: pass,
            }),
            contentType: "application/json",
            success: function (data) {
                alert(data.message)
                if (data.status == 200) {
                    // window.location.href = "./register.html"
                    window.location.href = "public/home.html"
                }
            }
        })
    })
})();