$(function () {
    var form = layui.form;
    var layer = layui.layer
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 定义 layui表单校验规则
    //     //利用form这个对象,创建规则
    form.verify({
        pwd: [/^\S{6,12}$/, '密码为6-12位,不能包含空格!'],
        repwd: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return '两次密码不一致!'
            }
        }
    })

    //注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //注册成功提示
                layer.msg(res.message)
                //触动切换到登录的a链接的点击行为
                $('#link_login').click()
                //清空表单
                $('.layui-form')[0].reset()
            }
        })
    })

    //登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        // console.log($("[name=username]").val())
        // console.log($("[name=password]").val())
        // console.log($(this).serialize())
        // return
        $.ajax({
            type: 'post',
            url: '/api/login',
            data:
                $(this).serialize(),
            // {
            //     username: $('#form_login [name=username]').val(),
            //     password: $('#form_reg [name=password]').val()
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //将登录成功得到 token 字符串保存到localStorage 中
                localStorage.setItem('token', res.token)
                //跳转到后台首页
                location.href = 'index.html'
            }
        })
    })
})