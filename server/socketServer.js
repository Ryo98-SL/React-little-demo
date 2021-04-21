const Koa = require('koa')
const koaBody = require('koa-body')
const KoaRouter = require('koa-router')
const socketIo = require('socket.io')
const http = require('http')
const KoaStaticCache = require ('koa-static-cache')
const app = new Koa()
const route = new KoaRouter()
let server = http.createServer(app.callback())
let io = socketIo(server)
io.on('connection',(onelink)=>{
    console.log('connected client')
    onelink.emit('test','every one','only you')

    onelink.on('message',(id,content)=>{
        console.log(id,content)
        
        onelink.broadcast.emit('showChats',{id,content,date:new Date().toLocaleDateString()})
        onelink.emit('showChats',{id,content,date:new Date().toLocaleDateString()})
    })
})

app.use(KoaStaticCache('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}))
app.use(route.routes())


server.listen(8888)

async function AccessControlAllowOrigin(ctx,next){
    ctx.set('Access-Control-Allow-Origin','*')
    ctx.set('Access-Control-Allow-Methods',' POST, GET, OPTIONS')
    ctx.set('Access-Control-Allow-Headers','content-type')
    ctx.set('Access-Control-Max-Age',' 86400')
     await next()
}