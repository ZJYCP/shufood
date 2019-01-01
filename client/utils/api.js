const host = 'https://351750381.shuguide.org/'
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

const getdish_byhot=(params)=>wxRequest(params,host+'Dish')
const getdish_bysearch=(params)=>wxRequest(params,host+'Dish/getdish_bysearch?name='+ params.query.name+'&category='+params.query.category+'&sort='+params.query.sort+'&order='+params.query.order+'&price_mult='+params.query.price_mult+'&place_mult='+params.query.place_mult)
const getHotsearch = (params) => wxRequest(params, host + 'Search')
const recordsearch = (params) => wxRequest(params, host + 'Search/recordsearch?content=' + params.query.content)
const gettipkey = (params) => wxRequest(params, host + 'Dish/gettipkey?name=' + params.query.name)
const getdish_byid = (params) => wxRequest(params, host + 'Dish/getdish_byid?id=' + params.query.id)
const getdish_bycant = (params) => wxRequest(params, host + 'Dish/getdish_byplace?place=' + params.query.place+'&floor='+params.query.floor)
const getcomment= (params) => wxRequest(params, host + 'Comment/getcomment?dishid=' + params.query.dishid)
const addcomment = (params) => wxRequest(params, host + 'Comment/addcomment?dishid=' + params.query.dishid +'&userid='+ params.query.userid + '&content='+params.query.content)
const login = (params) => wxRequest(params, host + 'Comment/User?code=' + params.query.code)
const islove = (params) => wxRequest(params, host + 'Job/islove?userid=' + params.query.userid+'&dishid='+params.query.dishid)
const love = (params) => wxRequest(params, host + 'Job/love?userid=' + params.query.userid + '&dishid=' + params.query.dishid+'&value='+params.query.value)
const iscollect = (params) => wxRequest(params, host + 'Job/iscollect?userid=' + params.query.userid + '&dishid=' + params.query.dishid)
const collect = (params) => wxRequest(params, host + 'Job/collect?userid=' + params.query.userid + '&dishid=' + params.query.dishid + '&value=' + params.query.value)
const getdish_bylove = (params) => wxRequest(params, host + 'Job/getdish_bylove?userid=' + params.query.userid)
const getmycomment = (params) => wxRequest(params, host + 'Job/getmycomment?userid=' + params.query.userid)
const articlelist = (params) => wxRequest(params, host + 'Article/getlist?type=' + params.query.type)
const articledetail = (params) => wxRequest(params, host + 'Article/getdetail?uid=' + params.query.uid)


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
  login,
  islove,
  love,
  iscollect,
  collect,
  getdish_bylove,
  getmycomment,
  articlelist,
  articledetail
}