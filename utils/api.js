const host = 'https://shufood.emx6.com/'
const wxRequest = (params, url) => {
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

const getdish_byhot=(params)=>wxRequest(params,host+'dish/getdish_byhot')
const getdish_bysearch=(params)=>wxRequest(params,host+'dish/getdish_bysearch?name='+ params.query.name+'&category='+params.query.category+'&sort='+params.query.sort+'&order='+params.query.order+'&price_mult='+params.query.price_mult+'&place_mult='+params.query.place_mult)
const getHotsearch = (params) => wxRequest(params, host + 'search')
const recordsearch = (params) => wxRequest(params, host + 'search/recordsearch?content=' + params.query.content)
const gettipkey = (params) => wxRequest(params, host + 'dish/gettipkey?name=' + params.query.name)
const getdish_byid = (params) => wxRequest(params, host + 'dish/getdish_byid?id=' + params.query.id)
const getdish_bycant = (params) => wxRequest(params, host + 'dish/getdish_byplace?place=' + params.query.place+'&floor='+params.query.floor)
const getcomment= (params) => wxRequest(params, host + 'comment/getcomment?dishid=' + params.query.dishid)
const addcomment = (params) => wxRequest(params, host + 'comment/addcomment?dishid=' + params.query.dishid +'&userid='+ params.query.userid + '&content='+params.query.content)

// const login = (params) => wxRequest(params, host + 'Comment/User?code=' + params.query.code)
const islove = (params) => wxRequest(params, host + 'job/islove?userid=' + params.query.userid+'&dishid='+params.query.dishid)
const love = (params) => wxRequest(params, host + 'job/love?userid=' + params.query.userid + '&dishid=' + params.query.dishid+'&value='+params.query.value)
const iscollect = (params) => wxRequest(params, host + 'job/iscollect?userid=' + params.query.userid + '&dishid=' + params.query.dishid)
const collect = (params) => wxRequest(params, host + 'job/collect?userid=' + params.query.userid + '&dishid=' + params.query.dishid + '&value=' + params.query.value)

const getdish_bylove = (params) => wxRequest(params, host + 'Job/getdish_bylove?userid=' + params.query.userid)
const getmycomment = (params) => wxRequest(params, host + 'Job/getmycomment?userid=' + params.query.userid)

const articlelist = (params) => wxRequest(params, host + 'article/getlist')
const articledetail = (params) => wxRequest(params, host + 'article/getdetail?uid=' + params.query.uid)


module.exports={
  getdish_byhot,
  getdish_bysearch,
  getHotsearch,
  recordsearch,
  gettipkey,
  getdish_byid,
  getdish_bycant,
  getcomment,
  addcomment,
  islove,
  love,
  iscollect,
  collect,
  getdish_bylove,
  getmycomment,
  articlelist,
  articledetail
}