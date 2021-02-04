const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURI || "mongodb+srv://traynore:Monday21@cillinchiller.dsddy.mongodb.net/cillinchiller?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    if (connection) {
      console.log(`Mongodb connected HOST: ${connection.connection.host}`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;