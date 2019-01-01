const {mysql} = require('../qcloud')
const debug=require('debug')

async function getcomment(ctx,next) {

}

async function islove(ctx,next){
    const {userid,dishid}=ctx.request.query

    let res=await mysql('lovecollect').where({
        'dishid':dishid,
        'userid':userid,
        'type':'love'
    }).select('value')

    ctx.state.data={
        res
    }
}

async function iscollect(ctx,next){
    const {userid,dishid}=ctx.request.query

    let res=await mysql('lovecollect').where({
        'dishid':dishid,
        'userid':userid,
        'type':'collect'
    }).select('value')
    ctx.state.data={
        res
    }
}
async function love(ctx,next){
    const {userid,dishid,value}=ctx.request.query
    let value_old=await mysql('lovecollect').where({
        'dishid':dishid,
        'userid':userid,
        'type':'love'
    }).select('value')

    if(!value_old.length){
        await mysql('lovecollect').insert({
            'dishid':dishid,
            'userid':userid,
            'type':'love',
            'value':1
        })
        await mysql('dishesInfo').where('dishId',dishid).increment ('dishLike',1)
    }else{
        if(value_old[0].value){
            await mysql('lovecollect').where({
                'dishid':dishid,
                'userid':userid,
                'type':'love'
            }).update('value',0)
            await mysql('dishesInfo').where('dishId',dishid).decrement('dishLike',1)
        }else {
            await mysql('lovecollect').where({
                'dishid':dishid,
                'userid':userid,
                'type':'love'
            }).update('value',1)
            await mysql('dishesInfo').where('dishId',dishid).increment('dishLike',1)
        }
    }


    ctx.state.data={
        value_old
    }
}

async function collect(ctx,next){
    const {userid,dishid,value}=ctx.request.query
    let value_old=await mysql('lovecollect').where({
        'dishid':dishid,
        'userid':userid,
        'type':'collect'
    }).select('value')

    if(!value_old.length){
        await mysql('lovecollect').insert({
            'dishid':dishid,
            'userid':userid,
            'type':'collect',
            'value':1
        })
        await mysql('dishesInfo').where('dishId',dishid).increment('dishStar',1)
    }else{
        if(value_old[0].value){
            await mysql('lovecollect').where({
                'dishid':dishid,
                'userid':userid,
                'type':'collect'
            }).update('value',0)
            await mysql('dishesInfo').where('dishId',dishid).decrement('dishView',1)
        }else {
            await mysql('lovecollect').where({
                'dishid':dishid,
                'userid':userid,
                'type':'collect'
            }).update('value',1)
            await mysql('dishesInfo').where('dishId',dishid).increment('dishView',1)
        }
    }


    ctx.state.data={
        value_old
    }
}
module.exports =  {
    islove,
    love,
    collect,
    iscollect
}
