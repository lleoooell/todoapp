const mongoose = require("mongoose");


var todoSchema = mongoose.Schema({
	"titre": { type : String},
      "commentaire": {type :String},
      "done":{type : Boolean, default : false},
      "createdAt" : {type : Date, default : Date.now}
});


var Todos = mongoose.model("todos", todoSchema);

module.exports= Todos;

// const tod = new Todos({"titre" : "test","commentaire" : "commentaire1"});
//       tod.save();

