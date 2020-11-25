// 入口函数
$(function () {
    // 1.点击按钮，显示隐藏
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            // 密码规则
            /^[\S]{6,16}$/,
            '密码必须6-16位，切不能输入空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        // 阻止表单提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            // data:$(this).serialize(), // username=zs&password=123
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                // 返回判断哪状态
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)

                }
                // 提交成功后处理代码
                // alert(res.message)
                layer.msg('注册成功，请登录！')
                // 手动切换到登录页面
                $('#link_login').click()
                // 重置form表单
                $('#form_reg')[0].reset()
            }
        })
    })
    // 4.登录功能
    $('#form_login').on('submit', function (e) {
        // 阻止表单提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                //校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息，保存token，跳转页面
                layer.msg('恭喜您，登录成功！')
                // 保存token,未来的接口要使用token
                localStorage.setItem('token', res.token)
                // 跳转
                location.href = '/index.html'
            }
        })
    })
})