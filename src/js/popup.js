(function () {
  // var extensionId = 'llhdjeloimohpfbkmboaepoidgpcgpbp'
  var app = new Vue({
    el: '#root',
    data: {
      self: null,
      query: '',
      extensions: []
    },
    computed: {
      filterExtensions () {
        var that = this
        if (!this.self) return this.extensions
        var list = this.extensions.filter(function (item) {
          // return item.id !== extensionId
          return item.id !== that.self.id
        })
        if (!this.query) return list

        list = list.filter(function (item) {
          return item.name.indexOf(that.query) > -1
        })

        return list
      }
    },
    methods: {
      enabledChange (index, item) {
        // console.log(index, item.enabled, item)
        chrome.management.setEnabled(item.id, item.enabled)
      },
      handleExec (index, item) {
        chrome.management.launchApp(item.id)
      }
    },
    created: function () {
      var that = this
      // 获取本扩展信息
      chrome.management.getSelf(function (ex) {
        that.self = ex
      })
      // 获取扩展列表
      chrome.management.getAll(function (list) {
        // console.log(list)
        that.extensions = list.sort(function (a, b) {
          if (a.enabled && b.enabled) {
            return 0
          } else if (!a.enabled && b.enabled) {
            return 1
          } else {
            return -1
          }
        })
      })
    }
  })

  Vue.config.devtools = true
  window.app = app

})()
