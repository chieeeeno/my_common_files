;(function(){

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!'
    },
    methods: {
      load: function () {
        alert(this.message);
      }
    }
  })


})()
