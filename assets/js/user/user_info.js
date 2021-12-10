$(function(){
   
    form.verify({
        nickname:function(value){
            if(value.length >6){
                return '长度必须在1到6之间'
            }
        }
    })
})

var form = layui.form;
var layer = layui.layer;
initUserInfo();
/* 初始化用户信息 */
function initUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !==0){
                layer.msg("获取用户信息失败！");
            }
            console.log(res);
            /* 赋值 调用layui 快速赋值 */
            form.val('formUserInfo',res.data)
        }
    })
}

/* 重置表单的形式 */
$('#btnReset').on('click',function(e){
    e.preventDefault();
    initUserInfo();
})

/* 提交事件 */
$(".layui-form").on('submit',function(e){
    e.preventDefault();
   $.ajax({
       method:'POST',
       url:'/my/userinfo',
       data:$(this).serialize(),
       success:function(res){
        console.log(res);
        if(res.status!==0){
            layer.msg("更新用户信息失败");
        }
        layer.msg('更新用户信息成功');
        /* 调用父页面的方法  重要 重中之重*/ 
        window.parent.getUserInfo();
       }
   }) 
})