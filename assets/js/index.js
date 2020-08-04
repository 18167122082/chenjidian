$(function () {
    var layer = layui.layer
    //获取用户信息
    getUserInfo()

    //退出登录
    //引入 layer
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //3.1 提示
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //关闭提示框
            layer.close(index);
            //3.2 删除本地 token
            localStorage.removeItem('token')
            //3.3 页面跳转
            location.href = '/login.html'
          });
    })
})

//获取用户信息封装
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            //调用用户渲染 函数
            renderUser(res.data)
        }
    })
}

//封装用户渲染函数
function renderUser(user) {
    //如果有用户名就添加用户名,没有就添加登录名,所以要获取到两个用户名
    var uname = user.username || user.nickname
    console.log(uname);
    //渲染用户名
    $('#welcome').html("欢迎&nbsp;&nbsp;" + uname)
    //渲染用户头像
    //判断,用户头像信息,如果有就渲染图片,没有就渲染文字
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avater').hide();
    } else {
        $('.layui-nav-img').hide()
        $('.text-avater').show().html(uname[0].toUpperCase());
    }
}