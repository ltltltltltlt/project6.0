import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Game from '@/components/Game'
import Course from '@/components/Course'
import Personal from '@/components/Personal'
import Teacher from '@/components/Teacher.vue'
import Delete_Class from '@/components/Delete_Class.vue'
import Create_Class from '@/components/Create_Class.vue'
import Update_ClassName from '@/components/Update_ClassName.vue'
import Student_detail from '@/components/Student_detail.vue'



Vue.use(Router)


//当hashbang的值为true时，所有的路径都会被格式化已#!开头，new Router({hashbang: true,})


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requireAuth: false }     //false表示进入该路由不需要登录
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game,
      meta: { requireAuth: false }     //false表示进入该路由不需要登录
    },
  	{
      path: '/Course',
      name: 'Course',
      component: Course,
      meta: { requireAuth: true }     //true表示进入该路由需要登录
    },
  	{
      path: '/Personal',
      name: 'Personal',
      component: Personal,
      meta: { requireAuth: true }     //true表示进入该路由需要登录
    },
    {
      path: '/Teacher',
      name: 'Teacher',
      component: Teacher,
      meta: { requireAuth: true },     //true表示进入该路由需要登录
      children:[
        { path: '/Teacher/Create_Class', component: Create_Class},
		    { path: '/Teacher/Update_ClassName', component: Update_ClassName},
        { path: '/Teacher/Delete_Class', component: Delete_Class},
        { path: '/Teacher/Student_detail', component: Student_detail}
      ]
    }


  ]
})


  //获得cookie的值
function getCookie(cookie_name){
  //document.cookie获得的是字符串，要对字符串从cookie_name开始进行cut断判断
  if (document.cookie.length>0){
    var cookie_start = document.cookie.indexOf(cookie_name + "=");
    if (cookie_start != -1){
      cookie_start = cookie_start + cookie_name.length + 1;
      var cookie_end = document.cookie.indexOf(";",cookie_start);
      if (cookie_end == -1)
        cookie_end=document.cookie.length;
      return unescape(document.cookie.substring(cookie_start,cookie_end));
    }
  }
  //没有cookie就返回空字符串
  return "";
}


/**用于拦截页面进行页面跳转的 */
router.beforeEach((to, from, next) => {

  //当session不存在，但是cookie存在的时候就将cookie里面登录过并且还没过期的用户名写入到sessionStorage中
  if(sessionStorage.getItem('username') == null && getCookie('login_name') != '' && getCookie('login_role') != ''){
    //获得cookie已经登录过的login_name
    var login_name = getCookie('login_name');
    var login_role = getCookie('login_role');
    //就写入到session里面
    sessionStorage.setItem('username', login_name);
    sessionStorage.setItem('role', login_role);
    next({
      //要是cookie登录认证的话就直接定位回首页
      path: '/',
    })
  }else if (to.meta.requireAuth) { // 判断该路由是否需要登录权限,能检测出带参数的路由
      
      if (sessionStorage.getItem('username') != '') {  // 通过sessionStorage获取当前的用户是否存在
          //继续执行
          next()
      }else {
          //没有登录过，而且当前也没有登录的话直接跳转到首页
          next({
              //要是没有登录认证的话就直接在url输入地址就永远定位回首页
              path: '/',
              //query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  } else {
      //该路由不需要登录权限，直接继续执行
      next()
  }
})





export default router;
