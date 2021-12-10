$(function(){
    /* 定义一个查询的参数对象  将来请求数据的时候 */
    /* 将去请求参数对象提交到服务器 */
    var layer = layui.layer;
    var form = layui.form
    var laypage = layui.laypage
    /* 定义美化时间过滤器 */
    template.defaults.imports.dataFormat = function(date){
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d= dt.getDate();
        var hh = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSeconds();

        return y + '-'+m + '-'+d + ''+hh + ':'+mm + ':'+ss
    }

    var q = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }
    initTable();
    initCate();
    /* 获取文章列表数据的方法 */
function initTable(){
    $.ajax({
        method:'GET',
        url:'/my/article/list',
        data:q,
        success:function(res){
            if(res.status!==0){
               return  layer.msg("获取文章列表数据失败")
            }
           var htmlStr =  template('tpl-table',res);
           renderPage(res.total);
           $('tbody').html(htmlStr);
        }
    })
}

/* 获取文章分类的方法 */
function initCate(){
    $.ajax({
        method:'GET',
        url:'/my/article/cates',
        success:function(res){
            if(res.status!==0){
                layer.msg('获取分类数据失败')
            }
        var htmlStr =  template('tpl-cate',res);
        console.log(res);
        console.log(htmlStr);
        $('[name=cate_id]').html(htmlStr);
        form.render();
        }

    })
}

/* 为筛选表单绑定submit 事件 */
$('#form-search').on('submit',function(e){
    e.preventDefault();
    var state = $('[name=state]').val();
    var cate_id = $('[name=cate_id]').val();
    q.cate_id = cate_id;
    q.state = state;
    console.log(q.cate_id);
    console.log(state);
    initTable();
})



/* 定义渲染分页的方法 */
    function renderPage(total){
    /* 调用渲染分页的方法 */
    laypage.render({
        elem:'pageBox',
        count:total,
        limit:q.pagesize,
        curr:q.pagenum,
        jump:function(obj,first){
            /* 分页发生切换触发的回调函数 */
            // console.log(obj.curr); 
            q.pagenum = obj.curr;   
            if(first){
                initTable();
            }
            

        }

    })

    }
})