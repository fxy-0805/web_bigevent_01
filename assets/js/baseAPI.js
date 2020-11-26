//1.开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//2.测试环境服务器地址
//var baseURL = 'http://ajax.frontend.itheima.net'
//3.生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
// 拦截所有ajax请求：get/post/ajax
$.ajaxPrefilter(function (params) {
    //拼接对应环境的服务器地址
    params.url = baseURL + params.url
    // console.log(params.url);
    // 对需要权限的接口配置请求头信息
    // 必须以my开头
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 拦截所有响应，判断身份认证信息
    params.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = '/login.html'
        }
    }



    // 总结：$.ajaxPrefilter():里面写的逻辑是：
    // 1.所有ajax都要进行的配置
    // 2.大部分ajax都要进行操作
    // 3.有鬼考虑的ajax进行的特有操作！（规律可总结）
})