const Koa = require('koa')
const koaBody = require('koa-body')
const jwt = require('jsonwebtoken')
const KoaRouter = require('koa-router')
const mysql = require('mysql2')
const KoaJwt = require('koa-jwt')
const app = new Koa()
const route = new KoaRouter()

let KoaBodyOptions = {multipart:true,formidable:{ uploadDir:'./attachments',keepExtensions:true }}
let secret = 'sdlveryGoodMan90'

app.use(KoaJwt({secret}).unless({path:[/^\/public/,/\/user/]}))
route.post('/attachment',koaBody(KoaBodyOptions),async (ctx,next)=>{
    let { attachment:{name,size,type,path} } = ctx.request.files
    console.log(name,size,type,path);
    let point = path.lastIndexOf('\\')
    let uploadName = path.substring(point+1)
    console.log('uploadName',uploadName);
    try{
        let sqlRes =  await query('insert into `attachments` (`name`,`type`,`size`,`path`) values(?,?,?,?)',[name,type,size,uploadName])
        console.log(sqlRes);
        ctx.body = '上传成功'
    }catch(e){
        console.log(e);
        ctx.body = '上传失败'
    }
    
    
})


//jwt
route.post('/user',koaBody(),async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin','*')
    console.log(ctx.get('content-type'));
    console.log(ctx.request.body);
    let {username,password} = ctx.request.body
    let res = await query('select * from `user` where `username`=?',[username])
    let [user] = res
    
    if(user.length){
        console.log('用户存在');
        if(user[0].password === password){
            let token = jwt.sign({username:user[0].username},secret,{expiresIn:'7days'})
        
            ctx.body={
                statusCode:1,
                status:true,
                token
            }
        }else{
            ctx.body={
                statusCode:-1,
                status:false,
                reason:'密码不正确'
            }
        }
        
    }else{
        
        ctx.body={statusCode:0,status:false,reason:'用户不存在'}
    }
    
    
    
    
    
})
route.options('/user',AccessControlAllowOrigin,(ctx)=>{
 ctx.body='ok'
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'123456',
    database: 'attachment',
    port:'3306'
  })
app.use(route.routes())

app.listen(8888,()=>{
    console.log('server loaded');
})



function query(sql,data){

    return new Promise((resolve,reject)=>{
        connection.query(sql,data,(err,...args)=>{
            if(err) reject(err)
            resolve(args)
        })
    })
    
}

async function AccessControlAllowOrigin(ctx,next){
    ctx.set('Access-Control-Allow-Origin','*')
    ctx.set('Access-Control-Allow-Methods',' POST, GET, OPTIONS')
    ctx.set('Access-Control-Allow-Headers','content-type')
    ctx.set('Access-Control-Max-Age',' 86400')
     await next()
}