$(function(){
    getUserInfo();
    var layer = layui.layer
    $('#btnLogout').on('click',function(){
        // console.log("OK")
        /* 提示用户是否退出 */
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            /* 确定退出的回调函数 */  
        window.localStorage.removeItem('token');  
        window.location.href = "/大事件后台管理系统/login.html";
        layer.close(index);
        /* 清空本地存储的token */

          });
    })
})

/* 获取用户信息 */
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        /* header */
        // headers:{
        //     Authorization:window.localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !==0){
              return  layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        },
        // complete:function(res){
        //     /* 无论成功失败都会调用 */
        //     console.log("执行",res.responseJSON.status)
        //     if(res.responseJSON.status == 1){
        //         localStorage.removeItem('token');
        //         location.href='/大事件后台管理系统/login.html'

        //     }
        // }
    })
}
/* 渲染用户的信息 */
function renderAvatar(user){
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
    /*  按需渲染用户头像*/
    if(user.user_pic !==null){
        /* 渲染头像 */
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        /* 渲染文本头像 */
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }
}