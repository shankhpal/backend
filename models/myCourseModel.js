const mongoose =require("mongoose");

const myCourseSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    status:{
      type: Boolean,
      default: false,
    },
    
   
  },
  {
    timestamps: true,
  }
);

const MyCourse = mongoose.model("MyCourse", myCourseSchema);

module.exports=MyCourse;