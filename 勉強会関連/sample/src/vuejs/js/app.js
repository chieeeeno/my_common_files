;(function(){

  var app = new Vue({
    el: '#app',     //対象の要素
    data: {
      // message:'',
      items:[]
    },
    methods: {
      load: function () {
        var _this = this;
        $.ajax({
          type: 'GET',
          url: './data/data.json'
        }).done(function( response ) {
          _this.items = response
        });
      },
      orderByAsc: function(){
        this.items.sort(function(a,b){
          if(a.number<b.number) return -1;
          if(a.number > b.number) return 1;
          return 0;
        });
      },
      orderByDesc: function(){
        this.items.sort(function(a,b){
          if(a.number>b.number) return -1;
          if(a.number < b.number) return 1;
          return 0;
        });
      }
    }
  })


})()
