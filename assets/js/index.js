// 入口函数
$(function () {
    // 获取用于信息
    getUserInof()
    // 退出
    var layer = layui.layer
    $('#btnLogout').on('click',function() {
        // 询问
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = '/login.html' 
            // 关闭询问框
            layer.close(index);
          });
    })
})
// 获取用于信息（封装到入口函数的外面）
// 原因：后面其他页面要调用
function getUserInof() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录，因为token过期事件12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功，调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
    // 封装用户头像渲染函数
    function renderAvatar(user) {
        // 用户名（昵称优先，没有用username
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 用户头像
        if (user.user_pic !== null) {
            // 有头像
            $('.layui-nav-img').show().attr('src', user.user_pic)
            $('.text-avatar').hide()
        } else {
            // 没有头像
            $('.layui-nav-img').hide()
            var text = name[0].toUpperCase()
            $('.text-avatar').show().html(text)
        }
    }
}