/**
 * Created by tiedan on 2017/7/19.
 */
const express = require("express");
const static = require("express-static");
const mysql = require("mysql");
const server=express();
server.listen(3000);
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123',
    database:'haha'
});
//注册 add?username=xxx&&password=xxx
server.get(`/add`,(req,res)=>{
    let username = req.query.username;
    let password = req.query.password;
    db.query(`select * from users where username='${username}'`,(err,data)=>{
        if(err){
            res.send({err:1,msg:`数据库查询错误`});
            res.end();
        }else{
            if(data.length>0){
                res.send({err:1,msg:`用户名已存在`});
                res.end();
            }else{
                db.query(`insert into users values ('${username}','${password}')`,(err,data)=>{
                    if(err){
                        res.send({err:1,msg:`注册失败`});
                        res.end();
                    }else{
                        res.send({err:0});
                        res.end();
                    }
                })
            }
        }
    })
});
//登陆 login?username=xxx&&password=xxx
server.get(`/login`,(req,res)=>{
    db.query(`select * from users where username='${req.query.username}'`,(err,data)=>{
        if(err){
            res.send({err:1,msg:'查询数据库失败'});
            res.end();
        }else{
            if(data.length==0){
                res.send({err:1,msg:`没这哥们`});
                res.end();
            }else{
                if(data[0].password==req.query.password){
                    res.send({err:0});
                    res.end();
                }else{
                     res.send({err:1,msg:`用户名或者密码失败`});
                     res.end();
                }

            }
        }
    })
});
server.use(static('www'));


















