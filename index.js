let gameArray = [];
let gameIndex = 0;
let gameStat = true;

//assigning click events
$(document).on('keydown', function(event) {
    console.log(event.key);
    switch(event.key){
        case ' ': 
            console.log('spacebar');
            resetGame(); 
            break;
        case '1': 
            matchChecker(gameArray[gameIndex], 1);
            pulseAnimation(getObject(1));
            gameChecker();
            console.log(gameIndex, gameArray.length);
            break;
        case '2': 
            matchChecker(gameArray[gameIndex], 2); 
            pulseAnimation(getObject(2));
            gameChecker();
            console.log(gameIndex, gameArray.length);
            break;
        case '3': 
            matchChecker(gameArray[gameIndex], 3); 
            pulseAnimation(getObject(3));
            gameChecker();
            console.log(gameIndex, gameArray.length);
            break;
        case '4': 
            matchChecker(gameArray[gameIndex], 4); 
            pulseAnimation(getObject(4));
            gameChecker();
            console.log(gameIndex, gameArray.length);
            break;
    }
});

$('#start').click(resetGame);

$('.square').click(function(){
    matchChecker(gameArray[gameIndex], parseInt($(this).text()));
    pulseAnimation(this);
    gameChecker();
    console.log(gameIndex, gameArray.length);
});


function getObject(number){
    switch(number){
        case 1: return $('.first'); break;
        case 2: return $('.second'); break;
        case 3: return $('.third'); break;
        case 4: return $('.fourth'); break;
    }
}

function resetGame(){
    gameArray = [];
    gameIndex = 0;
    gameArray.push(generateRandom());
    $('.lvl-indicator').text('Level ' + gameArray.length);
    let squareText = $('.square > .info');

    for(let i = 0; i < squareText.length; i++){
        $(squareText[i]).html(i+1);
    }

    console.log(gameArray);
    console.log(gameIndex, gameArray.length);
    setTimeout(function(){
        pulseAnimation(getObject(gameArray[gameArray.length-1]));
    }, 1000);
}

function gameChecker(){
    if(gameIndex === gameArray.length){
        console.log('You Win');
        gameIndex = 0;
        gameArray.push(generateRandom());
        $('.lvl-indicator').text('Level ' + gameArray.length);
        console.log(gameArray);
        setTimeout(function(){
            pulseAnimation(getObject(gameArray[gameArray.length-1]));
        }, 1000);
    }
}

function matchChecker(game, choice){
    if (game!==choice){
        console.log('gameOver');
        $('.square > .info').html(`<img src="./assets/close.png" style="box-sizing: border-box; width: 100%;height: 100%; padding: 30px;">`);
        $('.lvl-indicator').html('Game Over! Your Score is ' + (gameArray.length-1));

        $('body').addClass('bg-red');
        setTimeout(function(){
            $('body').removeClass('bg-red');
        },50);

        setTimeout(function(){
            $('body').addClass('bg-red');
        },100);
        setTimeout(function(){
            $('body').removeClass('bg-red');
        },150);
    }
    else{
        console.log('correct');
        gameIndex++;
    }
}

function generateRandom(){
    return Math.floor(Math.random() * 3) + 1;
}

function pulseAnimation(object){
    $(object).children('.bg').addClass('pulse');
    $(object).children('.border').addClass('ripple');
    $(object).children('.info').addClass('highlight');
    setTimeout(function(){
        $(object).children('.bg').removeClass('pulse');
        $(object).children('.border').removeClass('ripple');
        $(object).children('.info').removeClass('highlight');
    }, 300);
}