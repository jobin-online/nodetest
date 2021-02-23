const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

const mongoDb = 'mongodb://127.0.0.1/todoapp';
mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: String,
});

var todoModel = mongoose.model('todoModel', todoSchema );

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req,res)=>{
    todoModel.find({},(err,result)=>{
        console.log(result);
        res.render('index',{data :result});
    })
    
})

app.post('/add',(req,res)=>{
    var name = req.body.title;
    todoModel.create({title:name},(err,data)=>{
        console.log(data);
        todoModel.find({},(err,result)=>{
            console.log(result);
        })
        res.redirect('/');
    })
} )

app.get('/delete',(req,res)=>{
    todoModel.deleteOne({title:req.params.id},(err,data)=>{
        todoModel.find({},(err,result)=>{
            res.redirect('/');
        })
    });
});

app.get('/del/:id',(req,res)=>{
    var id = req.params.id;
    console.log(req.params.id);
    todoModel.deleteOne({_id:id},(err,data)=>{
        todoModel.find({},(err,result)=>{
            res.redirect('/');
        })
    });
});

app.listen(80,()=>{
    console.log("Server started Successfully");
})
