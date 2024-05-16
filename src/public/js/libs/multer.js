const express=require('express')
const multer=require('multer')
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'src/public/img')
    },
    filename:function(req,file,cb){
        let extname=file.originalname.substring(file.originalname.lastIndexOf('.'))
        cb(null,file.fieldname+'-'+Date.now() +extname)
    }
})
upload=multer({storage:storage})
module.exports=upload
//lùi:ctrl+[