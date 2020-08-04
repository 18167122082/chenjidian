//设置路径(测试)
var baseURL = 'http://ajax.frontend.itheima.net'

//拦截 每过一次ajax请求,都会先调用ajaxPrefilter
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
    // console.log(options.url);


    //判断请求路径是否包含 /my/
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //无论成功还是失败都会执行complete 回调函数
    options.complete = function (res) {
        console.log(res);
        var data = res.responseJSON
        if (data.status == 1 && data.message == "身份认证失败！") {
            //1. 删除 token
            localStorage.removeItem('token')
            //2. 跳转页面
            location.href = '/login.html'
        }
    }

})
