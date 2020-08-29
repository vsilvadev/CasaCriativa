//Express to config serve
const express = require("express");
const server = express();

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur non vero sed libero, officiis perspiciatis saepe sint, animi veniam aperiam similique ratione dolores dicta beatae provident dolorum ducimus. Id, quia!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercicios",
        category: "Saúde",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur non vero sed libero, officiis perspiciatis saepe sint, animi veniam aperiam similique ratione dolores dicta beatae provident dolorum ducimus. Id, quia!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade boa",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur non vero sed libero, officiis perspiciatis saepe sint, animi veniam aperiam similique ratione dolores dicta beatae provident dolorum ducimus. Id, quia!",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur non vero sed libero, officiis perspiciatis saepe sint, animi veniam aperiam similique ratione dolores dicta beatae provident dolorum ducimus. Id, quia!",
        url: "https://rocketseat.com.br"
    }
]

//config statics Files (CSS, scripts, images)
server.use(express.static("public"));

//Nunjucks config
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true, 
})

//create a route /
server.get("/", function(req, res){

    const reversedIdeas = [...ideas].reverse();

    let lastIdeas = [];
    for (let idea of reversedIdeas){
        if(lastIdeas.length < 3)
        {
            lastIdeas.push(idea);
        }
    }

    return res.render("index.html", { ideas: lastIdeas });
})
//create  route /ideias
server.get("/ideas", function(req, res){

    const reversedIdeas = [...ideas].reverse();

    return res.render("ideias.html", { ideas: reversedIdeas});
})

//Turn on server
server.listen(3000);