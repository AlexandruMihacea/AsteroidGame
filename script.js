let canvas;
let context;
let canvasLatime = 1000;
let canvasInaltime = 500;
let chei = [];
let nava;
let gloante = [];
let asteroizi = [];
let scor = 0;
let vieti = 3;


document.addEventListener('DOMContentLoaded', SetJoc);


function SetJoc(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = canvasLatime;
    canvas.height = canvasInaltime;
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);
    nava = new Nava();
    
    for(let i = 0; i < 8; i++){
        asteroizi.push(new Asteroid());
    }

    document.body.addEventListener('keydown', function(e){
        chei[e.keyCode] = true;
    });
    document.body.addEventListener('keyup', function(e){
        chei[e.keyCode] = false;
        if(e.keyCode === 32){
            gloante.push(new Gloante(nava.unghi));
        }
    });
    Incarca();
}



class Nava{
    constructor(){
        this.show = true;
        this.x = canvasLatime / 2;
        this.y = canvasInaltime / 2;
        this.mergeInFata = false;
        this.viteza = 0.09;
        this.velX = 0;
        this.velY = 0;
        this.vitezaRotatie = 0.0009;
        this.raza = 30;
        this.unghi = 0;
        this.sColor = 'white';
        this.varfX = canvasLatime / 2 + 15;
        this.varfY = canvasInaltime / 2;
    }
    Roteste = (dir) =>{
        this.unghi += this.vitezaRotatie * dir;
    }
    Update = () =>{
        let grade = this.unghi / Math.PI * 180;
        if(this.mergeInFata){
            this.velX += Math.cos(grade) * this.viteza;
            this.velY += Math.sin(grade) * this.viteza;
        }
        if(this.x < this.raza){
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.raza;
        }
        if(this.y < this.raza){
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.raza;
        }
        this.velX *= 0.99;
        this.velY *= 0.99;

        this.x -= this.velX;
        this.y -= this.velY;
    }
    Deseneaza = () =>{
        context.strokeStyle = this.sColor;
        context.beginPath();
        let vertUnghi = ((Math.PI * 2) / 3);
        let radiani = this.unghi / Math.PI * 180;
        this.varfX = this.x - this.unghi * Math.cos(radiani);
        this.varfY = this.y - this.unghi * Math.sin(radiani);
        for(let i = 0; i < 3; i++){
            context.lineTo(this.x - this.raza * Math.cos(vertUnghi * i+ radiani),
            this.y - this.raza * Math.sin(vertUnghi * i+ radiani));
        }
        context.closePath();
        context.stroke();
    }
}




class Gloante{
    constructor(unghi){
        this.visibil = true;
        this.x = nava.varfX;
        this.y = nava.varfY;
        this.unghi = unghi;
        this.inaltime = 5;
        this.latime = 10;
        this.viteza = 8;
        this.velX = 0;
        this.velY = 0;
    }

    Update = () =>{
        let radiani = this.unghi / Math.PI * 180;
        this.x -= Math.cos(radiani) * this.viteza;
        this.y -= Math.sin(radiani) * this.viteza;
    }

    Deseneaza = () => {
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.latime, this.inaltime);
    }
}




class Asteroid{
    constructor(x,y){
        this.visibil = true;
        this.x = Math.floor(Math.random() * canvasLatime);
        this.y = Math.floor(Math.random() * canvasInaltime);
        this.viteza = 0.9;
        this.diametru = 30;
        this.unghi = Math.floor(Math.random() * 360);
        this.sColor = "white";
    }

    Update = () => {
        let radiani = this.unghi / Math.PI * 180;
        this.x += Math.cos(radiani) * this.viteza;
        this.y += Math.sin(radiani) * this.viteza;
        if(this.x < this.diametru){
            this.x = canvas.width;
        }
        if(this.x > canvas.width){
            this.x = this.diametru;
        }
        if(this.y < this.diametru){
            this.y = canvas.height;
        }
        if(this.y > canvas.height){
            this.y = this.diametru;
        }
    }

    Deseneaza = () => {
        context.beginPath();
        let vertUnghi = ((Math.PI * 2) / 6);
        let radiani = this.unghi / Math.PI * 180;
        for(let i = 0; i < 6; i++){
            context.lineTo(this.x - this.diametru * Math.cos(vertUnghi * i + radiani),
            this.y - this.diametru * Math.sin(vertUnghi * i + radiani));
        }
        context.closePath();
        context.stroke();
    }
}



 Incarca = () => {
    nava.mergeInFata = (chei[83] || chei[38]);
    if(chei[67] || chei[39]){
        nava.Roteste(1);
    }
    if(chei[90] || chei[37]){
        nava.Roteste(-1);
    }
    context.clearRect(0,0,canvasLatime,canvasInaltime);
    nava.Update();
    nava.Deseneaza();
    if(gloante.length !== 0){
        for(let i = 0; i < gloante.length;i++)
        {
            gloante[i].Update();
            gloante[i].Deseneaza();
        }
    }
    if(asteroizi.length !== 0){
        for(let j = 0; j < asteroizi.length; j++)
        {
            asteroizi[j].Update();
            asteroizi[j].Deseneaza();
        }
    }
    requestAnimationFrame(Incarca);
}





