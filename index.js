const express = require("express");
const fs = require("fs");
const cors = require('cors');
    
const app = express();
const jsonParser = express.json();
  
app.use(cors());

app.use("/catalog",express.static("catalog"))

const filePath = "fishing.json";
const fileCapsPath="caps.json"
const fileShirts="shirts.json"
const fileRods="rods.json";
const fileSoftBates="softBates.json";
const fileAccessories="accessories.json";
const fileHooks="hooks.json";
app.get("/api/softBates", function(req, res){
       
    const content = fs.readFileSync(fileSoftBates,"utf8");
    const softBates = JSON.parse(content);
    res.send(softBates);
});

app.get("/api/hooks", function(req, res){
       
    const content = fs.readFileSync(fileHooks,"utf8");
    const hooks = JSON.parse(content);
    res.send(hooks);
});

app.get("/api/rods", function(req, res){
       
    const content = fs.readFileSync(fileRods,"utf8");
    const rods = JSON.parse(content);
    res.send(rods);
});

app.get("/api/accessories", function(req, res){
       
    const content = fs.readFileSync(fileAccessories,"utf8");
    const accessories = JSON.parse(content);
    res.send(accessories);
});

app.get("/api/caps", function(req, res){
       
    const content = fs.readFileSync(fileCapsPath,"utf8");
    const caps = JSON.parse(content);
    res.send(caps);
});
app.get("/api/shirts", function(req, res){
       
    const content = fs.readFileSync(fileShirts,"utf8");
    const shirts = JSON.parse(content);
    res.send(shirts);
});
// получение одного пользователя по id
app.get("/api/fishing/:id", function(req, res){
    const id = req.params.id; // получаем id
    let content; 
    if(id<500)
    {
        content= fs.readFileSync(fileSoftBates, "utf8");
    }
    else
    {
        if(id<1000)
        {
            content= fs.readFileSync(fileHooks, "utf8");
        }
        else
        {
            if(id<1500)
            {
                content= fs.readFileSync(fileRods, "utf8");
            }
            else
            {
                if(id<2500)
                {
                    content= fs.readFileSync(fileAccessories, "utf8");
                }
            }
        }
    }
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
app.get("/api/clothes/:id", function(req, res){
    const id = req.params.id; // получаем id
    let content; 
    if(id<10500)
    {
        content= fs.readFileSync(fileCapsPath, "utf8");
    }
    else
    {
        content= fs.readFileSync(fileShirts, "utf8");
    }
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/api/post", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    console.log(req.body);
    // const userName = req.body.name;
    // const userAge = req.body.age;
    // let user = {name: userName, age: userAge};
      
    // let data = fs.readFileSync(filePath, "utf8");
    // let users = JSON.parse(data);
      
    // // находим максимальный id
    // const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // // увеличиваем его на единицу
    // user.id = id+1;
    // // добавляем пользователя в массив
    // users.push(user);
    // data = JSON.stringify(users);
    // // перезаписываем файл с новыми данными
    // fs.writeFileSync("fishing.json", data);
    // res.send(user);
});
 // удаление пользователя по id
app.delete("/api/fishing/:id", function(req, res){
    
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync("fishing.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/api/users", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
      
    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
      
    let data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);
    let user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.age = userAge;
        user.name = userName;
        data = JSON.stringify(users);
        fs.writeFileSync("fishing.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});
   
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
// const express =require( "express");
// const app=express();
// const mongoose=require("mongoose");
// const bodyParser=require("body-parser");
// const todoRoutes=require("./routes/todo")

// main()
//     .then((res)=>console.log(res))
//     .catch((err)=>console.log(err));

// async function main()
// {
//     await mongoose.connect("mongodb://localhost:27017/test");
// }
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// app.get("/",(req,res)=>{
//     res.send("hello world");
// })

// app.use("/api/todos",todoRoutes)

// app.listen(8080,()=>{
//     console.log("Listen 8080");
// })