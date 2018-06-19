
export default {
    data(){},
    methods:{
        //获得cookie的值
        getCookie: function(cookie_name){
            //document.cookie获得的是字符串，要对字符串从cookie_name开始进行cut断判断
            if (document.cookie.length>0){ 
                cookie_start = document.cookie.indexOf(cookie_name + "=");
                if (cookie_start != -1){ 
                    cookie_start = cookie_start + cookie_name.length + 1;
                    cookie_end = document.cookie.indexOf(";",cookie_start);
                    if (cookie_end == -1) 
                        cookie_end=document.cookie.length;
                    return unescape(document.cookie.substring(cookie_start,cookie_end));
                } 
            }
            //没有cookie就返回空字符串
            return "";
        },

        //判断是否存在cookie
        checkCookie: function(){
            alert("qwfrq");
            var login_name = getCookie('login_name');
            if (login_name != null && login_name != ""){
                alert('Welcome again ' + username + '!')
            }else{
                alert('快去登录吧！');
            }
        }
    }
}

