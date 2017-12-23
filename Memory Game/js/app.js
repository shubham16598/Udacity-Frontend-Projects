//cardList to store array
var cardList = [];

//to push classname in cardList array
$('.deck li>i').each(function() {
  cardList.push($(this).attr('class').split(' ')[1]);//findind class and pushing into array
});

//shuffling of array for every new game
var temp = 0;
cardList = shuffle(cardList);
console.log(cardList);
$('.deck li>i').each(function() {
  var currentCard = $(this).attr('class').split(' ')[1];
  $(this).removeClass(currentCard);
  $(this).addClass(cardList[temp]);
  temp++;
});


//starting timer
var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#timer').html(timer.getTimeValues().toString());
});

//restart function
$('.restart').click(function(){
    document.location.reload();
});//call resetGame function to reset the game


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
