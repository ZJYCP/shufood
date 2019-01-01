const {mysql} = require('../qcloud')


async function getcomment(ctx,next) {
    let {dishid}=ctx.request.query

    let res=await mysql('comment').where('dishId',dishid).select('comment.*','cSessionInfo.user_info').join('cSessionInfo','comment.userId','cSessionInfo.uid')

    if(res.length){
        res.forEach(function(value,index,array){

            array[index].user_info=JSON.parse(array[index].user_info)

        });

    }

    let count=await mysql('comment').where('dishId',dishid).count('uid as a')

    ctx.state.data={
        res,
        count
    }
}

async function addcomment(ctx,next){
    let {dishid,userid,content}=ctx.request.query

    let res=await mysql('comment').insert({
        'userId':userid,
        'dishId':dishid,
        'content':content
    })

    ctx.state.data={
        res
    }
}

async function getmycomment(ctx,next){
    let {userid}=ctx.request.query
    let res=await mysql('comment').where({
        'userId':userid,
    }).select('comment.content','dishesInfo.*').join('dishesInfo','comment.dishId','dishesInfo.dishId')

    ctx.state.data={
        res
    }
}
module.exports =  {
    getcomment,
    addcomment,
    getmycomment
}
