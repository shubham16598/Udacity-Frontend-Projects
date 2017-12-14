var cardList = [];
$('.deck li>i').each(function(j, i) {
  cardList.push($(i).attr('class').split(' ')[1]);
});
console.log(cardList);
var moves = 0;
var match_found = 0;
var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#timer').html(timer.getTimeValues().toString());
});
           

$('#reset-button').click(resetGame);//call resetGame function to reset the game

$(".card").click(function(){
  $(this).addClass("open show");
});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetGame() {
    moves = 0;
    match_found = 0;
    game_started=false;
    timer.stop();
    $('#timer').html("00:00:00");
}
