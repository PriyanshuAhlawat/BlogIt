const mongoose = require("mongoose")
const Schema = mongoose.Schema


const commentschema = new Schema({
    author : {type: String, required: true},
    content: { type: String, required: true},
    post: { type: Schema.Types.ObjectId, ref: "Post",required: true }
})

module.exports = mongoose.model('Comment', commentschema)