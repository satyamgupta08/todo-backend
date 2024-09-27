const mongoose=require("mongoose");

const MONGO_URL = "mongodb+srv://satyamgupta0812:chPF2jxd2pGG9SEg@cluster0.qkeh4.mongodb.net/todosapp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));
const todoSchema =mongoose.Schema({
    title:String,
    description:String,
    completed:{
        type:Boolean,
        default:false}
})
const todo =mongoose.model("todos",todoSchema);
module.exports={
    todo
}