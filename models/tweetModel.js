const mongoose = require("mongoose");

const TweetSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    body:{
      type : String,
      required: true,
      maxLength: 144
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }]
  },
  {
    timestamps: true,
  });

const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = Tweet;