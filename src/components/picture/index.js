import MyPicture from './Picture.vue'
const Picture = {
  install:function(Vue){
    Vue.component('Picture',MyPicture);
  }
}
export default Picture
