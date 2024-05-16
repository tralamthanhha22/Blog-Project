const {initializeApp,cert}=require('firebase-admin/app')
const admin=require('firebase-admin')
const {getFirestore}=require('firebase-admin/firestore')
require('firebase-admin/auth');

const serviceAccount=require('./cred.json')
admin.initializeApp({
  credential:admin.credential.cert(serviceAccount)
})
// const db=getFirestore()
let db=admin.firestore()
// // module.exports={db}
module.exports=admin