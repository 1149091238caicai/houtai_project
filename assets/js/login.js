$(function () {
    /* 点击去注册账号 */
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    /* 点击去登录 */
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        /* 密码是否相同 */
        repwd: function (value) {
            /* value 是确认密码框的值 */
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }

        }
    })

  
    /* 注册功能 */
    $('#form_reg').on('submit', function (e) {
     
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
        };
        console.log(data);
        $.post( '/api/reguser',
        data,
            function (res) {
                if (res.status !== 0) {
                    // console.log(res);
                    layer.msg('用户名被占用');
                }
                layer.msg('注册成功，请登录');
                $('#link_login').click();

            })
    })
    /* 登录功能 */
    $('#form_login').submit(function(e){
            e.preventDefault();
            $.ajax({
                url:'/api/login',
                method:'POST',
                /* 快速获取表单中的数据 */
                data:$(this).serialize(),
                success:function(res){
                    // console.log(res);
                    if(res.status !==0){
                        return layer.msg("登录失败");
                    }
                    /* 登陆成功 */
                    layer.msg("登录成功");
                    /* 将获取的的token 值，存入到localStorage */
                    window.localStorage.setItem('token',res.token)
                    window.location.href = '/index.html'
                }
            })
    })  
})

