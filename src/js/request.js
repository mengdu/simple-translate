function queryString (obj, url) {
  var keys = []
  for (var key in obj) {
    keys.push(key + '=' + obj[key])
  }
  var query = url.split('?')
  if (query[1]) {
    keys.unshift(query[1].replace(/^[&=?]|[&=?]$/g, ''))
  }

  return query[0] + '?' + keys.join('&')
}

function Request () {
  if (this.constructor !== Request) {
    throw new Error('必须使用new创建')
  }
}

Request.prototype.interface = function (options) {
  var xhr = new XMLHttpRequest()
  return new Promise(function (resolve, reject) {
    
    xhr.open(options.method, options.url, options.async || true)

    xhr.addEventListener('load', function (response) {
      // console.log(response)
      resolve(JSON.parse(xhr.responseText))
    })

    xhr.addEventListener('error', function (err) {
      reject(err)
    })

    if (['POST'].indexOf(options.method) > -1) {
      xhr.send(options.body)
    } else {
      xhr.send()
    }
  })
}

Request.prototype.get = function (url, options) {
  if (!options) {
    options = {}
  }
  return this.interface({
    method: 'GET',
    url: queryString(options.query, url)
  })
}

Request.prototype.post = function (url, options) {
  if (!options) {
    options = {}
  }
  return this.interface({
    method: 'POST',
    url: queryString(options.query, url),
    body: options.body
  })
}

