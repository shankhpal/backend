const mongoose =require("mongoose");

const CommentSchema = new Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
  },
  blog: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Tweet"
  },
  body: {
    type: String,
    maxLength: 144
  }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports= Comment;