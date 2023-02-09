const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Comment = require('./comment')
const Postschema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: { type: [String] },
    createdAt: { type: Date, default: Date.now }, 
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }] , 
    votes: {type: Number, default: 0 } 
})

// presave middleware to update the createdAt parameter
Postschema.pre('save', function(next) {
    now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
});

module.exports = mongoose.model('Post',Postschema)
