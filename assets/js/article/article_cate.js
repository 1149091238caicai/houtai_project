$(function(){
var layer = layui.layer;
var form = layui.form;
    initArticleCate();


function initArticleCate(){
    $.ajax({
        method:'GET',
        url:'/my/article/cates',
        success:function(res){
       var htmlStr =  template('tpl-table',res);
       $('tbody').html(htmlStr)
        }
    })
}

var indexAdd = null;

$('#btnAddCate').on('click',function(){
    indexAdd =   layer.open({
        type:1,
        area:['500px','250px'],
        title:'添加文章分类',
        content: $('#dialog-add').html()
    })
})

/* 通过代理的事件 */
$('body').on('submit','#form-add',function(e){
    e.preventDefault();
    $.ajax({
        method:'POST',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                layer.msg("新增分类失败")
            }
            initArticleCate();
            layer.msg("新增分类成功")
            layer.close(indexAdd);
        }
    })
})

/* 代理事件 */
var indexEdit = null;
$('tbody').on('click','.btn-edit',function(e){

    indexEdit =   layer.open({
        type:1,
        area:['500px','250px'],
        title:'修改文章分类',
        content: $('#dialog-edit').html()
    });
var id= $(this).attr('data-id')
/* 发送请求获取对应的数据 */
$.ajax({
    method:'GET',
    url:'/my/article/cates/'+ id,
    success:function(res){
        form.val('form-edit',res.data)
    }
})
})

/* 通过代理的形式，为修改分类的表单绑定submit事件 */

$('body').on('submit','#form-edit',function(e){
    e.preventDefault();
    $.ajax({
        method:'POST',
        url:'/my/article/updatecate',
        data:$(this).serialize(), 
        success:function(res){
            if(res.status !==0){
                return layer.msg("更新数据失败");
            }
            layer.msg('更新成功');
            layer.close(indexEdit);
            initArticleCate();
        }
    })
})

/* 通过代理 */
$('tbody').on('click','.btn-delete',function(){
    // console.log('ok')
    var id = $(this).attr('data-id');
    layer.confirm('是否删除？', {icon: 3, title:'提示'}, function(index){  
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                    if(res.status!==0){
                        return layer.msg("删除分类数据失败")
                    }
                layer.msg("删除分类数据成功");
                initArticleCate();
            }
        })      
    layer.close(index);
      });
})

})