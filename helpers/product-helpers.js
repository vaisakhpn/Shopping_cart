var db=require("../config/connection")
var collection=require('../config/collections')


module.exports={
    addProduct:(product,callback)=>{

      db.get().collection("product").insertOne(product).then((data)=>{
      callback(data.insertedId)
      })
    },
    getAllProducts:()=>{
      return new Promise(async(resolve,reject)=>{
        try {
          let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
          resolve(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          reject(error);
        }
      })

    }
  }