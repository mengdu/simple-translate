(function () {
  var privateKey = 'kZTxYGntfMjeGA_Lf42k'
  var http = new Request()
  var app = new Vue({
    el: '#root',
    data: {
      langs: langs,
      query: {
        q: '',
        from: 'auto',
        to: 'zh',
        appid: '20181011000218111',
        salt: '',
        sign: ''
      },
      isLoading: false,
      result: {
        bool: true,
        content: ''
      }
    },
    computed: {
      
    },
    methods: {
      handleTranslate () {
        var that = this
        this.query.salt = new Date().getTime() + '' + Math.random()
        this.query.sign = MD5(this.query.appid + this.query.q + this.query.salt + privateKey)
        // this.result = this.query
        // console.log(JSON.parse(JSON.stringify(this.query)))
        this.isLoading = true
        http.get('http://api.fanyi.baidu.com/api/trans/vip/translate', {
          query: this.query
        }).then(function (res) {
          that.isLoading = false
          if (res.error_code && res.error_code !== '52000') {
            that.result.bool = false
            that.result.content = 'Error code ' + res.error_code
          } else {
            that.result.bool = true
            that.result.content = res.trans_result[0].dst
          }
        })
      }
    },
    created: function () {
      var that = this
    }
  })

  Vue.config.devtools = true
  window.app = app

})()
