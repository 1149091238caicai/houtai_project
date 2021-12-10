/* 每次发送ajax  */
$.ajaxPrefilter(function(options){
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url;
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {Authorization:window.localStorage.getItem('token') || ''}
    }
    /* 全局统一挂载 */
    options.complete = function(res){
          if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
              localStorage.removeItem('token');
              location.href='/大事件后台管理系统/login.html'
          }
    }
  
})  