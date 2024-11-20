const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winning_position=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];

    //UI per empty bhi karna hai 
    boxes.forEach((box,index)=>{

        box.innerText="";
        boxes[index].computedStyleMap.pointerEvents="all";
        box.classList=`box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currPlayer}`;
}


initGame();


boxes.forEach((box,index)=>{
    
    box.addEventListener("click",()=>{
        handleClick(index);

    });
});


function swapTurn(){
    if(currPlayer=="X"){
        currPlayer="0";
    }
    else
    {
        currPlayer="X";
    }

    gameInfo.innerText=`Current Player - ${currPlayer}`;
}


function checkGameOver(){

    let answer="";

    winning_position.forEach((position)=>{
          
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
            && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])){

                if(gameGrid[position[0]]==="X")
                {
                    answer="X";
                }
                else{
                    answer="0";
                }

                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    if(answer!==""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillcnt=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillcnt++;
    });

    if(fillcnt==9)
    {
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
}



function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText=currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].computedStyleMap.pointerEvents="none";
        //swap turn
        swapTurn();
        checkGameOver();
    }
}


newGameBtn.addEventListener("click",initGame);