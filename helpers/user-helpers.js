var db=require("../config/connection")
const collection=require('../config/collections')
const bcrypt=require('bcrypt')

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            userData._id = data.insertedId;
            resolve(userData);
                
            })
            
        })
       
    },
    doLogin:(loginData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}        
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:loginData.Email})        
            if(user){
                
                bcrypt.compare(loginData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("success")
                        response.user=user;
                        response.status=true;
                        resolve(response)
                    }else{
                        console.log("failed");
                        resolve({status:false});
                    }
                })
            }else{
                console.log("no email");
                resolve({status:false});
            }
        })
    }

}