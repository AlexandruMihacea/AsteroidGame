let canvas;
let context;
let canvasLatime = 1000;
let canvasInaltime = 500;
let chei = [];
let nava;
let gloante = [];
let asteroizi = [];
let scor = 0;
let highScore = 0;
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
    
    for(let i = 0; i < 6; i++){
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
        this.visibil = true;
        this.x = canvasLatime / 2;
        this.y = canvasInaltime / 2;
        this.mergeInFata = false;
        this.mergeInSpate = false;
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
        if(this.mergeInSpate){
            this.velX -= Math.cos(grade) * this.viteza;
            this.velY -= Math.sin(grade) * this.viteza;
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
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.latime, this.inaltime);
    }
}




class Asteroid{
    constructor(x,y,diametru,nivel,razaColiziune){
        this.visibil = true;
        this.x = x || Math.floor(Math.random() * canvasLatime);
        this.y = y || Math.floor(Math.random() * canvasInaltime);
        this.viteza = 0.9;
        this.diametru = diametru || 40;
        this.unghi = Math.floor(Math.random() * 360);
        this.sColor = "white";
        this.razaColiziune = razaColiziune || 26;
        this.nivel = nivel || 1;
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




Coliziune = (p1x, p1y, r1, p2x, p2y, r2) => {
    let razaSum;
    let xDiff;
    let yDiff;

    razaSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
    if(razaSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))){
        return true;
    }else{
        return false;
    }
}

 viataNava = () => {
    let startX = 950;
    let startY = 10;
    let puncte = [[9,9] , [-9,9]];
    context.strokeStyle = 'red';
    for(let i = 0; i < vieti; i++)
    {
        context.beginPath();
        context.moveTo(startX, startY);
        for(let j = 0; j < puncte.length;j++){
            context.lineTo(startX + puncte[j][0], startY + puncte[j][1]);
        }
       
        context.closePath();
        context.stroke();
        startX -= 30;
    }
}




 Incarca = () => {
    nava.mergeInFata = (chei[83] || chei[38]);
    nava.mergeInSpate = (chei[40])
    if(chei[67] || chei[39]){
        nava.Roteste(1);
    }
    if(chei[90] || chei[37]){
        nava.Roteste(-1);
    }
    context.clearRect(0,0,canvasLatime,canvasInaltime);


   
    context.fillStyle = 'white';
    context.font = 'px Arial';
    context.fillText('SCORE: ' + scor.toString(), 20, 35);
  
    if(vieti <= 0 ){
        nava.visibil = false;
        context.fillStyle = 'white';
        context.font = '50px Arial';
        context.fillText('GAME OVER', canvasLatime / 2 - 150, canvasInaltime / 2);
    } 
    viataNava();
    
    
    if(asteroizi.length !== 0){
        for(let k = 0; k < asteroizi.length;k++){
            if(Coliziune(nava.x,nava.y, 11,asteroizi[k].x, asteroizi[k].y,asteroizi[k].razaColiziune)){
                nava.x = canvasLatime / 2;
                nava.y = canvasInaltime/ 2;
                nava.velX = 0;
                nava.velY = 0;
                vieti -= 1 ;
            }
        }
    }





    if(asteroizi.length !== 0 && gloante.length !== 0){
    loop1:
        for(let i = 0; i < asteroizi.length;i++){
            for(let r = 0; r < gloante.length;r++){
                if(Coliziune(gloante[r].x,gloante[r].y,3,asteroizi[i].x,asteroizi[i].y, asteroizi[i].razaColiziune)){
                    if(asteroizi[i].nivel === 1){
                        asteroizi.push(new Asteroid(asteroizi[i].x - 5, asteroizi[i].y - 5, 30,2,32));
                        asteroizi.push(new Asteroid(asteroizi[i].x + 5, asteroizi[i].y + 5, 30,2,32));
                        scor += 20;
                    }else if(asteroizi[i].nivel === 2){
                        asteroizi.push(new Asteroid(asteroizi[i].x - 5, asteroizi[i].y - 5,20,3,12));
                        asteroizi.push(new Asteroid(asteroizi[i].x + 5, asteroizi[i].y + 5,20,3,12));
                        scor += 15;
                    }
                    else if(asteroizi[i].nivel === 3){
                        asteroizi.push(new Asteroid(asteroizi[i].x - 5, asteroizi[i].y - 5, 10,4,12));
                        asteroizi.push(new Asteroid(asteroizi[i].x + 5, asteroizi[i].y + 5, 10,4,12));
                        asteroizi.push(new Asteroid());
                        scor += 10; 
                    }
                    asteroizi.splice(i,1);   
                    gloante.splice(r,1);

                    if(scor > highScore){
                        highScore = scor;
                    }

                    break loop1;

                   
                }
            }
        }

    }

    if(nava.visibil){
    nava.Update();
    nava.Deseneaza();
    }

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
            asteroizi[j].Deseneaza(j);
        }
    }
    requestAnimationFrame(Incarca);
}





