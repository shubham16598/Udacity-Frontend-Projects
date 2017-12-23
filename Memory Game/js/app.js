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

//shuffle function
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


//starting timer
var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
  $('#timer').html(timer.getTimeValues().toString());
});

//restart function
$('.restart').click(function(){
  document.location.reload();
});

var moves = 0;
var open = [];
//declaring starFunction for showing level
starFunction = function(){
  moves++;
  if(moves>10){
    $('#third-star').removeClass('fa fa-star');
  }else if(moves>10 && moves <20){
    $('#second-star').removeClass('fa fa-star');
  }
}


$(".card").click(function(){
  if (open.length ==2) {
    return;
  }
  starFunction();//calling star function
  $(this).addClass("open show");
  $('.moves').text(moves);
  open.push($(this).find('i').attr('class').split(' ')[1]);
  if (open.length == 2) {
    setTimeout(function() {
      if (open[0]==open[1]) {
        $('.' + open[0]).parent().addClass("match");
        $('.' + open[1]).parent().addClass("match");

      }else {
        $('.' + open[0]).parent().removeClass("open show");
        $('.' + open[1]).parent().removeClass("open show");

      }
      open.splice(0, open.length);
      console.log(open);
    },2000);


  }

});
