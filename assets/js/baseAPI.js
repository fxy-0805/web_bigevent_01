//1.开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//2.测试环境服务器地址
//var baseURL = 'http://ajax.frontend.itheima.net'
//3.生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
// 拦截所有ajax请求：get/post/ajax
$.ajaxPrefilter(function(params) {
    //拼接对应环境的服务器地址
    params.url=baseURL + params.url
    console.log(params.url);
})