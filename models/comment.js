
const {Schema,model} = require('mongoose')

const commentSchema = new Schema({
    content:{
        type:String,
        require:true,

    },
    blogId:{
        type:String,
        ref:"blog",

    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user',

    },

},{timestamps:true}
); 

const Comment = model("comment",commentSchema); 

module.exports = Comment; 
