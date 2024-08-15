const mongoose=require('mongoose');
const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        require:true
    },
    is_drink:{
        type:Boolean,
        require:true
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const menuItem=mongoose.model('menuItem',menuSchema);
module.exports=menuItem;