(function () {
  var privateKey = 'kZTxYGntfMjeGA_Lf42k'
  var app = new Vue({
    el: '#root',
    data: {
      query: {
        q: '',
        from: 'en',
        to: 'zh',
        appid: '20181011000218111',
        salt: '',
        sign: ''
      },
      result: "This is a test"
    },
    computed: {
      
    },
    methods: {
      handleTranslate () {
        this.query.salt = new Date().getTime() + '' + Math.random()
        this.query.sign = MD5(this.query.appid + this.query.q + this.query.salt + privateKey)
        this.result = this.query
        console.log(JSON.parse(JSON.stringify(this.query)))
      }
    },
    created: function () {
      var that = this
    }
  })

  Vue.config.devtools = true
  window.app = app

})()
