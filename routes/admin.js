var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  productHelper.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products});

  })
  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})
router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)

  productHelper.addProduct(req.body,(result)=>{
    let id=result
    let image=req.files.Image
    image.mv('./public/product-image/'+id+'.jpg',(err)=>{
      if(!err){
        res.render("admin/add-product",{admin:true})
      }else{
        console.log(err)
      }
    })
    
  })
})

module.exports = router;
