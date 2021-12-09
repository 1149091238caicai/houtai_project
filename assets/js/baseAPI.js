/* 每次发送ajax  */
$.ajaxPrefilter(function(options){
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url;
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {Authorization:window.localStorage.getItem('token') || ''}
    }
    /* 全局统一挂载 */
    options.complete = function(res){
          /* 无论成功失败都会调用 */
          console.log("执行",res.responseJSON.status)
          if(res.responseJSON.status == 1){
              localStorage.removeItem('token');
              location.href='/大事件后台管理系统/login.html'

          }
    }
  
})  