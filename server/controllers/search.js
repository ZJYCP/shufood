const {mysql} = require('../qcloud')

async function index(ctx,next){
    let res=await mysql('search').select('content').orderBy('amount','DESC').limit(8).offset(0)

    res=res.map(v=>{
        return v.content
    })

    ctx.state.data={
        res
    }
}

async function recordsearch(ctx,next){
    const {content}=ctx.request.query

    let res=await mysql('search').where('content',content)
    let act=''
    if (!res.length){
        await mysql('search').insert({
            'content':content,
            'amount':1,
            'time':'1'
        })

        act='insert'
    }else{
        let data=await mysql('search').select('amount').where('content',content)
        // let data={'amount':1}

        await mysql('search').update({
            'amount':data[0].amount+1
        }).where('content',content)

        act='update'
    }

    ctx.state.data={
        act
    }
}

module.exports={
    index,
    recordsearch
}
