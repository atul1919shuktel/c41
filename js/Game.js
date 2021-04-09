class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
       
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }


  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(c1)
    car2 = createSprite(300,200);
    car2.addImage(c2)
    car3 = createSprite(500,200);
    car3.addImage(c3)
    car4 = createSprite(700,200);
    car4.addImage(c4)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getRank()
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(trac,0,-displayHeight*4,displayWidth,displayHeight*5 )
      //index of the array
      var index = 0;

      
      var x = 290;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        x = x + 290;  
      
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
      
        cars[index-1].y = y;
        //  ;

        if (index === player.index){
          fill("red")
          stroke(10)
          ellipse(x,y,70,60)
          //cars[index - 1].fillRed
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && player.distance <= 5150){
      player.distance +=50
      player.update();
      if(player.distance > 5150){
      rankCount++
      player.rank = rankCount
      player.updateRank(rankCount) 
      player.update()
      rankLabel = createElement("h1","RANK : "+rankCount)
      rankLabel.position(displayWidth/2-100,100)

      
      }
    }

    

    drawSprites();
  }

  end(){
    background("cyan")
    var ypos = 50
    
    Player.getPlayerInfo();
    if(allPlayers !== undefined){
      strokeWeight(5)
      stroke("red")
      textSize(50)
      text("leaderboard",displayWidth/2 - 100,-displayHeight*4 - 200)
      rankLabel.hide()
     // console.log("s")
     for(var pl in allPlayers){
       ypos+=70
       ps = createElement("h1",allPlayers[pl].name+" : "+allPlayers[pl].rank)
       ps.position(displayWidth/3 , ypos)
     // text(allPlayers[p].name+"  :  "+allPlayers[p].rank,displayWidth/3 , ypos)
       console.log("why are we still here")
      }
             
    }
  }
} 
//reateElement("h2",allPlayers[p].name+"  :  "+allPlayers[p].ran