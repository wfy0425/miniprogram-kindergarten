module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1569139721008, function(require, module, exports) {
const database = require('@cloudbase/database').Db
const storage = require('./src/storage')
const functions = require('./src/functions')
const auth = require('./src/auth')
const wx = require('./src/wx')
const Request = require('./src/utils/dbRequest')

function Tcb(config) {
  this.config = config ? config : this.config
}

Tcb.prototype.init = function({
  secretId,
  secretKey,
  sessionToken,
  env,
  proxy,
  timeout,
  serviceUrl,
  isHttp
} = {}) {
  if ((secretId && !secretKey) || (!secretId && secretKey)) {
    throw Error('secretId and secretKey must be a pair')
  }

  this.config = {
    get secretId() {
      return this._secretId ? this._secretId : process.env.TENCENTCLOUD_SECRETID
    },
    set secretId(id) {
      this._secretId = id
    },
    get secretKey() {
      return this._secretKey
        ? this._secretKey
        : process.env.TENCENTCLOUD_SECRETKEY
    },
    set secretKey(key) {
      this._secretKey = key
    },
    get sessionToken() {
      if (this._sessionToken === undefined) {
        //默认临时密钥
        return process.env.TENCENTCLOUD_SESSIONTOKEN
      } else if (this._sessionToken === false) {
        //固定秘钥
        return undefined
      } else {
        //传入的临时密钥
        return this._sessionToken
      }
    },
    set sessionToken(token) {
      this._sessionToken = token
    },
    envName: env,
    proxy: proxy,
    isHttp
  }

  this.config.secretId = secretId
  this.config.secretKey = secretKey
  this.config.timeout = timeout || 15000
  this.config.serviceUrl = serviceUrl
  this.config.sessionToken = sessionToken
    ? sessionToken
    : secretId && secretKey
    ? false
    : undefined

  return new Tcb(this.config)
}

Tcb.prototype.database = function(dbConfig) {
  database.reqClass = Request
  return new database({ ...this, ...dbConfig })
}

/**
 * @returns string
 */
Tcb.prototype.getCurrentEnv = function() {
  return process.env.TCB_ENV || process.env.SCF_NAMESPACE
}

function each(obj, fn) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      fn(obj[i], i)
    }
  }
}

function extend(target, source) {
  each(source, function(val, key) {
    target[key] = source[key]
  })
  return target
}

extend(Tcb.prototype, functions)
extend(Tcb.prototype, storage)
extend(Tcb.prototype, wx)
extend(Tcb.prototype, auth)

module.exports = new Tcb()

}, function(modId) {var map = {"./src/storage":1569139721009,"./src/functions":1569139721013,"./src/auth":1569139721014,"./src/wx":1569139721015,"./src/utils/dbRequest":1569139721016}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721009, function(require, module, exports) {
const request = require('request')
const fs = require('fs')
const httpRequest = require('../utils/httpRequest')
const { parseString } = require('xml2js')

async function parseXML(str) {
  return new Promise((resolve, reject) => {
    parseString(str, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

/*
 * 上传文件
 * @param {string} cloudPath 上传后的文件路径
 * @param {fs.ReadStream} fileContent  上传文件的二进制流
 */
async function uploadFile({ cloudPath, fileContent }) {
  const {
    data: { url, token, authorization, fileId, cosFileId }
  } = await getUploadMetadata.call(this, { cloudPath })

  const formData = {
    Signature: authorization,
    'x-cos-security-token': token,
    'x-cos-meta-fileid': cosFileId,
    key: cloudPath,
    file: fileContent
  }

  let body = await new Promise((resolve, reject) => {
    request.post({ url, formData: formData }, function(err, res, body) {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })

  body = await parseXML(body)
  if (body && body.Error) {
    const {
      Code: [code],
      Message: [message]
    } = body.Error
    if (code === 'SignatureDoesNotMatch') {
      return {
        code: 'SYS_ERR',
        message
      }
    }
    return {
      code: 'STORAGE_REQUEST_FAIL',
      message
    }
  }

  return {
    fileID: fileId
  }
}

/**
 * 删除文件
 * @param {Array.<string>} fileList 文件id数组
 */
async function deleteFile({ fileList }) {
  if (!fileList || !Array.isArray(fileList)) {
    return {
      code: 'INVALID_PARAM',
      message: 'fileList必须是非空的数组'
    }
  }

  for (let file of fileList) {
    if (!file || typeof file != 'string') {
      return {
        code: 'INVALID_PARAM',
        message: 'fileList的元素必须是非空的字符串'
      }
    }
  }

  let params = {
    action: 'storage.batchDeleteFile',
    fileid_list: fileList
  }

  return httpRequest({
    config: this.config,
    params,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    if (res.code) {
      return res
    } else {
      return {
        fileList: res.data.delete_list,
        requestId: res.requestId
      }
    }
  })
}

/**
 * 获取文件下载链接
 * @param {Array.<Object>} fileList
 */
async function getTempFileURL({ fileList }) {
  if (!fileList || !Array.isArray(fileList)) {
    return {
      code: 'INVALID_PARAM',
      message: 'fileList必须是非空的数组'
    }
  }

  let file_list = []
  for (let file of fileList) {
    if (typeof file === 'object') {
      if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
        return {
          code: 'INVALID_PARAM',
          message: 'fileList的元素必须是包含fileID和maxAge的对象'
        }
      }

      file_list.push({
        fileid: file.fileID,
        max_age: file.maxAge
      })
    } else if (typeof file === 'string') {
      file_list.push({
        fileid: file
      })
    } else {
      return {
        code: 'INVALID_PARAM',
        message: 'fileList的元素必须是字符串'
      }
    }
  }

  let params = {
    action: 'storage.batchGetDownloadUrl',
    file_list
  }
  // console.log(params);

  return httpRequest({
    config: this.config,
    params,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    // console.log(res);
    if (res.code) {
      return res
    } else {
      return {
        fileList: res.data.download_list,
        requestId: res.requestId
      }
    }
  })
}

async function downloadFile({ fileID, tempFilePath }) {
  let tmpUrl,
    self = this
  try {
    const tmpUrlRes = await this.getTempFileURL({
      fileList: [
        {
          fileID,
          maxAge: 600
        }
      ]
    })
    // console.log(tmpUrlRes);
    const res = tmpUrlRes.fileList[0]

    if (res.code != 'SUCCESS') {
      return res
    }

    tmpUrl = res.tempFileURL
    tmpUrl = encodeURI(tmpUrl)
  } catch (e) {
    throw e
  }

  let req = request({
    url: tmpUrl,
    encoding: null,
    proxy: self.config.proxy
  })

  return new Promise((resolve, reject) => {
    let fileContent = Buffer.alloc(0)
    req.on('response', function(response) {
      if (response && +response.statusCode === 200) {
        if (tempFilePath) {
          response.pipe(fs.createWriteStream(tempFilePath))
        } else {
          response.on('data', data => {
            fileContent = Buffer.concat([fileContent, data])
          })
        }
        response.on('end', () => {
          resolve({
            fileContent: tempFilePath ? undefined : fileContent,
            message: '文件下载完成'
          })
        })
      } else {
        reject(response)
      }
    })
  })
}

async function getUploadMetadata({ cloudPath }) {
  let params = {
    action: 'storage.getUploadMetadata',
    path: cloudPath
  }

  const res = await httpRequest({
    config: this.config,
    params,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  })

  if (res.code) {
    throw new Error('get upload metadata failed: ' + res.code)
  } else {
    return res
  }
}

exports.uploadFile = uploadFile
exports.deleteFile = deleteFile
exports.getTempFileURL = getTempFileURL
exports.downloadFile = downloadFile
exports.getUploadMetadata = getUploadMetadata

}, function(modId) { var map = {"../utils/httpRequest":1569139721010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721010, function(require, module, exports) {
var request = require('request')
var auth = require('./auth.js')
const version = require('../../package.json').version

module.exports = function(args) {
  var config = args.config,
    params = args.params,
    method = args.method || 'get',
    protocol = config.isHttp === true ? 'http' : 'https'

  let seqId = process.env.TCB_SEQID || ''

  const eventId =
    new Date().valueOf() +
    '_' +
    Math.random()
      .toString()
      .substr(2, 5)

  seqId = seqId ? `${seqId}${new Date().getTime()}` : eventId
  params = Object.assign({}, params, {
    envName: config.envName,
    timestamp: new Date().valueOf(),
    eventId
  })

  for (let key in params) {
    if (params[key] === undefined) {
      delete params[key]
    }
  }
  // file 和 wx.openApi带的requestData 需避开签名
  let file = null
  if (params.action === 'storage.uploadFile') {
    file = params['file']
    delete params['file']
  }

  let requestData = null
  if (params.action === 'wx.openApi') {
    requestData = params['requestData']
    delete params['requestData']
  }

  if (!config.secretId || !config.secretKey) {
    if (process.env.TENCENTCLOUD_RUNENV === 'SCF') {
      throw Error('missing authoration key, redeploy the function')
    }
    throw Error('missing secretId or secretKey of tencent cloud')
  }

  // Note: 云函数被调用时可能调用端未传递SOURCE，TCB_SOURCE 可能为空
  const TCB_SOURCE = process.env.TCB_SOURCE || ''
  const SOURCE =
    process.env.TENCENTCLOUD_RUNENV === 'SCF'
      ? `${TCB_SOURCE},scf`
      : `${TCB_SOURCE},not_scf`

  const authObj = {
    SecretId: config.secretId,
    SecretKey: config.secretKey,
    Method: method,
    pathname: '/admin',
    Query: params,
    Headers: Object.assign(
      {
        'user-agent': `tcb-admin-sdk/${version}`,
        'x-tcb-source': SOURCE
      },
      args.headers || {}
    )
  }

  var authorization = auth.getAuth(authObj)

  params.authorization = authorization

  file && (params.file = file)
  requestData && (params.requestData = requestData)
  config.sessionToken && (params.sessionToken = config.sessionToken)
  params.sdk_version = version

  let url = protocol + '://tcb-admin.tencentcloudapi.com/admin'

  if (process.env.TENCENTCLOUD_RUNENV === 'SCF') {
    url = 'http://tcb-admin.tencentyun.com/admin'
  }

  if (params.action === 'wx.api' || params.action === 'wx.openApi') {
    url = protocol + '://tcb-open.tencentcloudapi.com/admin'
  }

  var opts = {
    url: config.serviceUrl || url,
    method: args.method || 'get',
    // 先取模块的timeout，没有则取sdk的timeout，还没有就使用默认值
    timeout: args.timeout || config.timeout || 15000,
    headers: authObj.Headers,
    proxy: config.proxy
  }

  opts.url = `${opts.url}?eventId=${eventId}&seqId=${seqId}`

  if (params.action === 'storage.uploadFile') {
    opts.formData = params
    opts.formData.file = {
      value: params.file,
      options: {
        filename: params.path
      }
    }
  } else if (args.method == 'post') {
    if (params.action === 'wx.openApi') {
      opts.formData = params
      opts.encoding = null
    } else {
      opts.body = params
      opts.json = true
    }
  } else {
    opts.qs = params
  }

  if (args.proxy) {
    opts.proxy = args.proxy
  }
  return new Promise(function(resolve, reject) {
    request(opts, function(err, response, body) {
      args && args.callback && args.callback(response)

      if (err === null && response.statusCode == 200) {
        let res
        try {
          res = typeof body === 'string' ? JSON.parse(body) : body
          // wx.openApi 调用时，需用content-type区分buffer or JSON
          if (params.action === 'wx.openApi') {
            const { headers } = response
            if (headers['content-type'] === 'application/json; charset=utf-8') {
              res = JSON.parse(res.toString()) // JSON错误时buffer转JSON
            }
          }
        } catch (e) {
          res = body
        }
        return resolve(res)
      } else {
        return reject(err)
      }
    })
  })
}

}, function(modId) { var map = {"./auth.js":1569139721011,"../../package.json":1569139721012}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721011, function(require, module, exports) {
var crypto = require('crypto')

function camSafeUrlEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
}
function map(obj, fn) {
  var o = isArray(obj) ? [] : {}
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = fn(obj[i], i)
    }
  }
  return o
}
function isArray(arr) {
  return arr instanceof Array
}

function clone(obj) {
  return map(obj, function(v) {
    return typeof v === 'object' && v !== undefined && v !== null ? clone(v) : v
  })
}
//测试用的key后面可以去掉
var getAuth = function(opt) {
  //   console.log(opt);
  opt = opt || {}

  var SecretId = opt.SecretId
  var SecretKey = opt.SecretKey
  var method = (opt.method || opt.Method || 'get').toLowerCase()
  var pathname = opt.pathname || '/'
  var queryParams = clone(opt.Query || opt.params || {})
  var headers = clone(opt.Headers || opt.headers || {})
  pathname.indexOf('/') !== 0 && (pathname = '/' + pathname)

  if (!SecretId) return console.error('missing param SecretId')
  if (!SecretKey) return console.error('missing param SecretKey')

  var getObjectKeys = function(obj) {
    var list = []
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === undefined) {
          continue
        }
        list.push(key)
      }
    }
    return list.sort()
  }

  var obj2str = function(obj) {
    var i, key, val
    var list = []
    var keyList = getObjectKeys(obj)
    for (i = 0; i < keyList.length; i++) {
      key = keyList[i]
      if (obj[key] === undefined) {
        continue
      }
      val = obj[key] === null ? '' : obj[key]
      if (typeof val !== 'string') {
        val = JSON.stringify(val)
      }
      key = key.toLowerCase()
      key = camSafeUrlEncode(key)
      val = camSafeUrlEncode(val) || ''
      list.push(key + '=' + val)
    }
    return list.join('&')
  }

  // 签名有效起止时间
  var now = parseInt(new Date().getTime() / 1000) - 1
  var exp = now

  var Expires = opt.Expires || opt.expires
  if (Expires === undefined) {
    exp += 900 // 签名过期时间为当前 + 900s
  } else {
    exp += Expires * 1 || 0
  }

  // 要用到的 Authorization 参数列表
  var qSignAlgorithm = 'sha1'
  var qAk = SecretId
  var qSignTime = now + ';' + exp
  var qKeyTime = now + ';' + exp
  var qHeaderList = getObjectKeys(headers)
    .join(';')
    .toLowerCase()
  var qUrlParamList = getObjectKeys(queryParams)
    .join(';')
    .toLowerCase()

  // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
  // 步骤一：计算 SignKey
  var signKey = crypto
    .createHmac('sha1', SecretKey)
    .update(qKeyTime)
    .digest('hex')

  // console.log("queryParams", queryParams);
  // console.log(obj2str(queryParams));

  // 步骤二：构成 FormatString
  var formatString = [
    method,
    pathname,
    obj2str(queryParams),
    obj2str(headers),
    ''
  ].join('\n')

  // console.log(formatString);
  formatString = Buffer.from(formatString, 'utf8')

  // 步骤三：计算 StringToSign
  var sha1Algo = crypto.createHash('sha1')
  sha1Algo.update(formatString)
  var res = sha1Algo.digest('hex')
  var stringToSign = ['sha1', qSignTime, res, ''].join('\n')

  // console.log(stringToSign);
  // 步骤四：计算 Signature
  var qSignature = crypto
    .createHmac('sha1', signKey)
    .update(stringToSign)
    .digest('hex')

  // 步骤五：构造 Authorization
  var authorization = [
    'q-sign-algorithm=' + qSignAlgorithm,
    'q-ak=' + qAk,
    'q-sign-time=' + qSignTime,
    'q-key-time=' + qKeyTime,
    'q-header-list=' + qHeaderList,
    'q-url-param-list=' + qUrlParamList,
    'q-signature=' + qSignature
  ].join('&')

  return authorization
}

exports.getAuth = getAuth

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721012, function(require, module, exports) {
module.exports = {
  "_from": "tcb-admin-node@1.9.0",
  "_id": "tcb-admin-node@1.9.0",
  "_inBundle": false,
  "_integrity": "sha512-TYoBo66CEIIw1QzgK4Jq43G45zvBE6ZB35LbDV8wwLQvg6CiZHlmOTVZkgj2YZ8O87ELi+ZE3UBVNZM3nFa6lQ==",
  "_location": "/tcb-admin-node",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "tcb-admin-node@1.9.0",
    "name": "tcb-admin-node",
    "escapedName": "tcb-admin-node",
    "rawSpec": "1.9.0",
    "saveSpec": null,
    "fetchSpec": "1.9.0"
  },
  "_requiredBy": [
    "/wx-server-sdk"
  ],
  "_resolved": "https://registry.npmjs.org/tcb-admin-node/-/tcb-admin-node-1.9.0.tgz",
  "_shasum": "b48973c10133b8fbd2a78740dd603a1627a0dce1",
  "_spec": "tcb-admin-node@1.9.0",
  "_where": "D:\\小程序\\RssHub-master\\cloud-functions\\delete_post\\node_modules\\wx-server-sdk",
  "author": {
    "name": "jimmyzhang"
  },
  "bugs": {
    "url": "https://github.com/TencentCloudBase/tcb-admin-node/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "@cloudbase/database": "0.1.1",
    "is-regex": "^1.0.4",
    "lodash.merge": "^4.6.1",
    "request": "^2.87.0",
    "xml2js": "^0.4.19"
  },
  "deprecated": false,
  "description": "tencent cloud base admin sdk for node.js",
  "devDependencies": {
    "@types/jest": "^23.1.4",
    "@types/mocha": "^5.2.4",
    "@types/node": "^10.12.12",
    "dumper.js": "^1.3.0",
    "eslint": "^5.16.0",
    "eslint-config-prettier": "^4.1.0",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-typescript": "^0.14.0",
    "espower-typescript": "^8.1.4",
    "husky": "^1.3.1",
    "inquirer": "^6.3.1",
    "jest": "^23.3.0",
    "lint-staged": "^8.1.5",
    "mocha": "^5.2.0",
    "power-assert": "^1.5.0",
    "prettier": "^1.17.0",
    "semver": "^6.0.0",
    "ts-jest": "^23.10.4",
    "tslib": "^1.7.1",
    "typescript": "^3.4.3",
    "typescript-eslint-parser": "^22.0.0"
  },
  "engines": {
    "node": ">=8.6.0"
  },
  "homepage": "https://github.com/TencentCloudBase/tcb-admin-node#readme",
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "keywords": [
    "tcb-admin"
  ],
  "license": "MIT",
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "git add"
    ]
  },
  "main": "index.js",
  "name": "tcb-admin-node",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/TencentCloudBase/tcb-admin-node.git"
  },
  "scripts": {
    "coverage": "jest --verbose false --coverage",
    "eslint": "eslint \"./**/*.js\" \"./**/*.ts\"",
    "eslint-fix": "eslint --fix \"./**/*.js\" \"./**/*.ts\"",
    "test": "jest --verbose false -i",
    "tsc": "tsc -p tsconfig.json",
    "tsc:w": "tsc -p tsconfig.json -w",
    "tstest": "mocha --timeout 5000 --require espower-typescript/guess test/**/*.test.ts"
  },
  "version": "1.9.0"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721013, function(require, module, exports) {
const httpRequest = require('../utils/httpRequest')

/**
 * 调用云函数
 * @param {String} name  函数名
 * @param {Object} functionParam 函数参数
 * @return {Promise}
 */
function callFunction({ name, data }) {
  try {
    data = data ? JSON.stringify(data) : ''
  } catch (e) {
    return Promise.reject(e)
  }
  if (!name) {
    return Promise.reject(
      new Error({
        message: '函数名不能为空'
      })
    )
  }

  const wxCloudApiToken = process.env.WX_API_TOKEN || ''

  let params = {
    action: 'functions.invokeFunction',
    function_name: name,
    request_data: data,
    wxCloudApiToken
  }

  return httpRequest({
    config: this.config,
    params,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    // console.log(res);
    if (res.code) {
      return res
    } else {
      let result
      try {
        result = JSON.parse(res.data.response_data)
      } catch (e) {
        result = res.data.response_data
      }
      return {
        result,
        requestId: res.requestId
      }
    }
  })
}

exports.callFunction = callFunction

}, function(modId) { var map = {"../utils/httpRequest":1569139721010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721014, function(require, module, exports) {
function getUserInfo() {
  const openId = process.env.WX_OPENID || ''
  const appId = process.env.WX_APPID || ''
  const uid = process.env.TCB_UUID || ''

  return {
    openId,
    appId,
    uid
  }
}

exports.auth = function() {
  return { getUserInfo }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721015, function(require, module, exports) {
const httpRequest = require('../utils/httpRequest')

exports.callWxOpenApi = function({ apiName, requestData } = {}) {
  try {
    requestData = requestData ? JSON.stringify(requestData) : ''
  } catch (e) {
    throw Error(e)
  }

  const wxCloudApiToken = process.env.WX_API_TOKEN || ''

  const tcb_sessionToken = process.env.TCB_SESSIONTOKEN || ''

  let params = {
    action: 'wx.api',
    apiName,
    requestData,
    wxCloudApiToken,
    tcb_sessionToken
  }

  return httpRequest({
    config: this.config,
    params,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    if (res.code) {
      return res
    } else {
      let result
      try {
        result = JSON.parse(res.data.responseData)
      } catch (e) {
        result = res.data.responseData
      }
      return {
        result,
        requestId: res.requestId
      }
    }
  })
}

/**
 * 调用wxopenAPi
 * @param {String} apiName  接口名
 * @param {Buffer} requestData
 * @return {Promise} 正常内容为buffer，报错为json {code:'', message:'', resquestId:''}
 */
exports.callCompatibleWxOpenApi = function({ apiName, requestData } = {}) {
  const wxCloudApiToken = process.env.WX_API_TOKEN || ''
  const tcb_sessionToken = process.env.TCB_SESSIONTOKEN || ''

  let params = {
    action: 'wx.openApi',
    apiName,
    requestData,
    wxCloudApiToken,
    tcb_sessionToken
  }

  return httpRequest({
    config: this.config,
    params,
    method: 'post',
    headers: {}
  }).then(res => res)
}

}, function(modId) { var map = {"../utils/httpRequest":1569139721010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1569139721016, function(require, module, exports) {
const requestHandler = require('./httpRequest')

/**
 * 数据库模块的通用请求方法
 *
 * @author haroldhu
 * @internal
 */
class Request {
  /**
   * 初始化
   *
   * @internal
   * @param config
   */
  constructor(config) {
    this.config = config
  }

  /**
   * 发送请求
   *
   * @param api   - 接口
   * @param data  - 参数
   */
  async send(api, data) {
    const params = Object.assign({}, data, {
      action: api
    })

    const slowQueryWarning = setTimeout(() => {
      console.warn(
        'Database operation is longer than 3s. Please check query performance and your network environment.'
      )
    }, 3000)

    try {
      return await requestHandler({
        timeout: this.config.timeout,
        config: this.config.config,
        params,
        method: 'post',
        headers: {
          'content-type': 'application/json'
        }
      })
    } finally {
      clearTimeout(slowQueryWarning)
    }
  }
}

module.exports = Request

}, function(modId) { var map = {"./httpRequest":1569139721010}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1569139721008);
})()
//# sourceMappingURL=index.js.map