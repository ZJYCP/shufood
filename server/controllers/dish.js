const {mysql} = require('../qcloud')

async function getdish_byhot (ctx,next) {
    const hotdish=await mysql('dishesInfo').select('*').limit(8).offset(0)
        .orderBy('dishView','DESC')
    ctx.state.data={
        hotdish
    }
}


async function getdish_bysearch(ctx,next){
    let {name,sort,order,category,price_mult,place_mult}=ctx.request.query

    let place={}

    if (name=='null')
        name=''
    let dishType=''
    if (category == 'null') {

     }else{
        place.dishType=category
    }
    if (place_mult=='null') {

    }else{
        place.dishPlace=place_mult
    }

    let price=[]
    if (price_mult=='null') {

        price=[0,1000]
    }else{
        price_mult=parseInt(price_mult);

        if (price_mult==1) {

            price=[0,2]
        }else if (price_mult==5){

            price=[5,1000]
        }else{

            price=[price_mult,price_mult+1]
        };

    }

    let orderquery=''
    if (sort=='null'){
        orderquery='RAND()'
    }else{
      orderquery=sort+' '+order

    }

    const res=await mysql('dishesInfo').where('dishName','like','%'+name+'%').andWhere(place).whereBetween('dishPrice',price).select('*').orderByRaw(orderquery)

    ctx.state.data={
        'search__res':res
    }

}

async function getdish_byid(ctx,next){
    let {id}=ctx.request.query
    const res=await mysql('dishesInfo').where('dishId',id)
    ctx.state.data={
        res
    }
}

async function getdish_byplace(ctx,next){
    let {place,floor}=ctx.request.query
    const res=await mysql('dishesInfo').where({'dishPlace':place,'dishFloor':floor})
    ctx.state.data={
        res
    }
}

async function gettipkey(ctx,next){
    let {name}=ctx.request.query

    let res=await mysql('dishesInfo').where('dishName','like','%'+name+'%').limit(5).offset(0).select('dishName')
    res=res.map(v=>{
        return v.dishName
    })
    ctx.state.data={
        res
    }
}

async function getdish_bylove(ctx,next){
    let {userid}=ctx.request.query
    let res=await mysql('lovecollect').where({
        'type':'collect',
        'userid':userid,
        'value':1
    }).select('dishesInfo.*').join('dishesInfo','lovecollect.dishid','dishesInfo.dishId')

    ctx.state.data={
        res
    }
}

module.exports = {
    getdish_byhot,
    getdish_bysearch,
    getdish_byid,
    getdish_byplace,
    gettipkey,
    getdish_bylove
}
