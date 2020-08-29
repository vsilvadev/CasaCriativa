//Express to config serve
const express = require("express");
const server = express();

const db = require("./db");

//config statics Files (CSS, scripts, images)
server.use(express.static("public"));

//enable use of req.body
server.use(express.urlencoded( { extended: true } ))

//Nunjucks config
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true, 
})

//create a route /
server.get("/", function(req, res){
    //Consult Data in the Table
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err)
        {
            console.log(err);
            return res.send("Erro no banco de dados");
        } 

        const reversedIdeas = [...rows].reverse();

        let lastIdeas = [];
        for (let idea of reversedIdeas){
            if(lastIdeas.length < 3)
            {
                lastIdeas.push(idea);
            }
        }
    
        return res.render("index.html", { ideas: lastIdeas });
    });
})

//create  route /ideas
server.get("/ideas", function(req, res){
    //Consult Data in the Table
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err)
        {
            console.log(err);
            return res.send("Erro no banco de dados");
        } 

        const reversedIdeas = [...rows].reverse();
    
        return res.render("ideias.html", { ideas: reversedIdeas});
    });
});

server.post("/", function(req, res){
    //Insert Data In the Table
    const query = `
        INSERT INTO ideas(
            image, 
            title,
            category, 
            description, 
            link
        ) VALUES (?, ?, ?, ?, ?);
    `   
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    //Insert Data in the table
    db.run(query, values, function(err){
        if(err)
        {
            console.log(err);
            return res.send("Erro no banco de dados");
        } 

        return res.redirect("/ideas");

    });
});

//Turn on server
server.listen(3000);