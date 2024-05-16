const express=require('express')
const app=express();
const path=require('path')
// const bodyParser = require('body-parser');

const blog=require('./public/js/blog')
const account=require('./public/js/account')

const handlebars=require('express-handlebars')

const session=require('express-session')
const cookieParser=require('cookie-parser')
const fileupload=require('express-fileupload')

// const upload=require('./public/js/libs/multer')

const firebase=require('./public/js/libs/firebase')

let initial_path = path.join(__dirname, "public");

const db=firebase.firestore()
app.set('views',path.join(__dirname,'views'))

app.use(express.static(initial_path));
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:false}))

app.use(fileupload())

app.use(cookieParser('ahihi'))
app.use(session({cookie:{maxAge:30000000}}))


app.set('view engine','hbs')

app.engine('hbs',handlebars.engine({
    defaultLayout: 'main',
    extname:'hbs'
}))

app.get('/', (req, res) => {
    let data={
        email:req.session.email,
        name:req.session.name,
    }
    const blogCollection = db.collection('blog');
    var blogs = []; // Array to store retrieved student data

    // Get all documents in the "blog" collection
    blogCollection.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const blogData=doc.data(); // Add each document data to the array
            blogs.push({
                title:blogData.title,
                subtitle:blogData.subtitle,
                type:blogData.type,
                content:blogData.content,
                banner:blogData.bannerPath,
                id:blogData.titleID
            })
        });
        console.log('blog:', blogs); // Print all blog data
        return res.render("home",{data,blog:blogs});
    })
    .catch((error) => {
        console.error('Error fetching blog:', error);
        return res.render("home",{error});
    });
})
// Định nghĩa route POST "/upload" để xử lý tải lên tệp tin và trả về đường dẫn của tệp đã tải lên
app.post('/upload',(req,res)=>{
    let file = req.files.image
    let date=new Date()
    let imagename=date.getDate() + date.getTime()+ file.name
    let path='src/public/uploads/'+imagename
    file.mv(path,(err,result)=>{
        if(err){
            throw err
        }
        else{
            res.json(`uploads/${imagename}`)
        }
    })

})

// Thêm bài blog
app.get('/add-blog', (req, res) => {
    return res.sendFile(path.join(initial_path, "html/editor.html"));
})
// app.post('/add-blog',upload.array('contentImg',4),blog.createBlog)
app.post('/add-blog',blog.createBlog)


//Đăng nhập account
app.get('/login',(req,res)=>{
    return res.sendFile(path.join(initial_path, "html/login.html"));
})
app.post('/login',account.login)

//Đăng ký account
app.get('/register',(req,res)=>{
    return res.sendFile(path.join(initial_path, "html/signUp.html"));
})
app.post('/register',account.registerAcc)

//Đăng xuất account
app.get('/logout',account.logout)


// Hiển thị thông tin chi tiết bài Blog
app.get('/:blog',blog.detailBlog)
// app.get('/:blog',(req,res)=>{
//     return res.sendFile(path.join(initial_path, "html/blog.html"));
// })

app.listen(process.env.PORT || 3000, () => {
    console.log('connected to website');
})