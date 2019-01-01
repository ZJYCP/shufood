const {mysql} = require('../qcloud')

async function getlist (ctx) {
    let res=await mysql('article').select('*')

    ctx.state.data={
        res
    }
}

async function getdetail(ctx){
    const {uid}=ctx.request.query

    let res=await mysql('article').select('content').where('uid',uid)

    ctx.state.data={
        res
    }
}

module.exports={
    getlist,
    getdetail
}
