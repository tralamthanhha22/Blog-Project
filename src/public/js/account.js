const firebase=require('./libs/firebase')
const {getFirestore}=require('firebase-admin/firestore')
const {getAuth}=require('firebase-admin/auth')
// let ui = new firebaseui.auth.AuthUI(auth);
const db=firebase.firestore()
const auth=firebase.auth()
const account={
    login:(req,res,next)=>{
        let {email,password}=req.body
        const accountCollection = db.collection('account');

        const query = accountCollection.where('email', '==', email)
                                    .where('password','==',password);
        query.get()
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                let a={}
                console.log('Login success');
                querySnapshot.docs.forEach((doc) => {
                    a=doc.data()
                    req.session.email=a.email
                    req.session.name=a.name
                    req.session.password=a.password
                    console.log(req.session.email)
                    console.log(req.session.name)
                    console.log(doc.id, '=>', doc.data()); // Print document data
                });
                return res.send('login success '+JSON.stringify(a))
            } else {
                console.log('Wrong password or email.');
                return res.send('Wrong password or email')
            }
        })
        .catch((error) => {
            console.error('Error fetching documents:', error);
        });
    },

    registerAcc:async(req,res,next)=>{
        const {name, email, password}=req.body
        console.log(name)
        console.log(password)
        var data={
            name:name,
            password:password,
            email:email
        }
        const accountRef=db.collection('account').add(data)
        console.log('Document written with ID:', accountRef.id);

        return res.send('add success');

    },

    logout:(req,res,next)=>{
        req.session.email=''
        req.session.password=''
    },
}
module.exports=account  