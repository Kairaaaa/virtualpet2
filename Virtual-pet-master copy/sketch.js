var dog, dog1, Happydog;
var database;
var foodS;
var foodstock,lastFed, fedTime, foodObj;
var feed,addFood

function preload()
{
dog=loadImage("dogImg.png");
Happydog=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500,500);
  foodObj=new Food();
  dog1=createSprite(250,300,150,150);
  dog1.addImage(dog);
  dog1.scale= 0.15;

  foodstock=database.ref('Food'); 
  foodstock.on("value",readStock);
  feed= createButton("feed the dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

 addFood= createButton("add food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87)
 fedTime=database.ref('FeedTime')
 fedTime.on("value",function(data){
   lastFed=data.val();

 })
 fill(255,255,254); 
 textSize(15); 
 if(lastFed>=12){ 
   text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }
  else if(lastFed==0){
     text("Last Feed : 12 AM",350,30); 
    }
    else{ 
      text("Last Feed : "+ lastFed + " AM", 350,30); 
    }
  drawSprites();

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}
function feedDog(){
  dog1.addImage(Happydog);
  if(foodObj.getFoodStock()<= 0){ 
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
   }
   else{ 
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
     }
      database.ref('/').update({ 
        Food:foodObj.getFoodStock(), 
        FeedTime:hour() 
      })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}


