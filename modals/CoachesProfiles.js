const mongoose = require("mongoose");
const CoachesProfileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },

  contactNO:{
    type: String,
    minlength: 6,
    maxlength: 30,
    required: true
  },

  imgUrl: {
    type: String,
  },

  unique_id: {
    type: String,
    required: true
  },

  childSafeGaurding: {
    type: String,
    required: true
  },

  currentGroups: [
    {
      type: Object
    }
  ],

  coachEducation: [
    {
      type: Object
    }
  ] 
});

module.exports = CoachesProfiles = mongoose.model("CoachesProfiles", CoachesProfileSchema);