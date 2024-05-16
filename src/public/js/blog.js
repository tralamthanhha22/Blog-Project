const firebase=require('./libs/firebase')
// const fs = require('fs');
// const { JSDOM } = require('jsdom');
// const html = fs.readFileSync('src/public/html/editor.html', 'utf-8');
// const dom = new JSDOM(html);

const db=firebase.firestore()

const blog={
    // addCoverImg:(req,res,next)=>{
    //     const file=req.file
    //     if(!file){
    //         console.log('Not input cover image')
    //     }
    //     else if(!req.session.titleID){
    //         console.log('Không tồn tại titleID')
    //     }
    //     var data={
    //         titleID:req.session.titleID,
    //         coverImg:`/img/${file.filename}`,
    //     }
    //     const CoverImgCollection=db.collection('coverImg').add(data)
    //     console.log('Document written with ID:', CoverImgCollection.id);
    // },
    detailBlog:(req,res,next)=>{
        const blogID=req.params.blog
        const blogCollection = db.collection('blog');
        const coverImg=db.collection('coverImg')
        const query = blogCollection.where('titleID', '==', blogID)
        query.get().then((querySnapshot)=>{
            if (querySnapshot.size > 0) {
                querySnapshot.docs.forEach((doc) => {
                    var blogData=doc.data()
                    let blog={
                        title:blogData.title,
                        subtitle:blogData.subtitle,
                        content:blogData.content,
                        day:new Date(blogData.date).getDay(),
                        month:new Date(blogData.date).getMonth(),
                        year:new Date(blogData.date).getFullYear(),
                        bannerPath:blogData.bannerPath,
                        author:blogData.author,
                        type:blogData.type,
                    }
                    return res.render('blog',{blog:blog});
                })
            }
            else{
                return res.send('Bài blog không tồn tại')
            }
        })
    },

    createBlog:(req,res,next)=>{
        const {title,subtitle,type,content}=req.body
        const bannerPath=req.body.banner
        var data={
            titleID:'ha'+Date.now(),
            title:title,
            subtitle:subtitle,
            content:content,
            type:type,
            author:req.session.name,
            bannerPath:bannerPath,
            date:Date.now()
        }
        req.session.titleID=data.titleID
        const blogRef=db.collection('blog').add(data)
        // console.log(req.session.titleID)
        // console.log('Document written with ID:', blogRef.id);
        return res.redirect('/')
        // return res.status(200).send(`success created blog`)
    },
    
}
module.exports=blog