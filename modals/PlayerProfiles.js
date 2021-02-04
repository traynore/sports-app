const mongoose = require("mongoose");
const PlayerProfileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  
  dateofbirth: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  currentGroup: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },

  parents: {
    mother:{
      type: String
    },
    father:{
      type: String
    }
  },

  unique_id: {
    type: String,
    required: true
  },

  imgUrl: {
    type: String,
    default: "person.png"
  },

  contactNO:{
    type: String,
    minlength: 6,
    maxlength: 30,
    required: true
  },

  playerNotes: [
      {
        type: Object,
        date: Date.now
      }
    ],

  medicalNotes: [
    {
      type: Object,
      date: Date.now
    }
  ]
});

module.exports = PlayerProfiles = mongoose.model("PlayerProfiles", PlayerProfileSchema);