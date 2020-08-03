//设置路径(测试)
var baseURL = 'http://ajax.frontend.itheima.net'

//拦截 每过一次ajax请求,都会先调用ajaxPrefilter
$.ajaxPrefilter(function (options) {
     options.a = baseURL + options.ulr;
    // console.log(options.url);
})