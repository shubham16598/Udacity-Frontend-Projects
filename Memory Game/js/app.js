startGame = function() {
  //cardList to store array
  $('#startGame').remove();
  var cardList = [];

  //to push classname in cardList array
  $('.deck li>i').each(function() {
    cardList.push($(this).attr('class').split(' ')[1]); //findind class and pushing into array
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
    var currentIndex = array.length,
    temporaryValue, randomIndex;

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
  timer.addEventListener('secondsUpdated', function(e) {
    $('#timer').html(timer.getTimeValues().toString());
  });
  var time =0; //for final time
  //restart function
  $('.restart').click(function() {
    document.location.reload();
  });

  var moves = 0;
  var open = [];
  var star;
  var count = 0;//keep count for final popup

  //declaring starFunction for showing level
  starFunction = function() {
    moves++;
    if (moves >15) {
      $('#third-star').removeClass('fa fa-star');
      star = 2;
    }
    if (moves > 30) {
      $('#second-star').removeClass('fa fa-star');
      star = 1;
    }
  }


  function clicked() {
      if (open.length == 2) { // click dont do anything when two cards are open
        return;
      }

      starFunction(); //calling star function
      $(this).addClass("open show"); //opening cards
      $('.moves').text(moves);

      open.push($(this));
      if(open.length == 1){
        //$('.' + open[0]).parent().off("click");
        open[0].off('click');
      }
      console.log(open);
      console.log(open["0"]["0"].firstElementChild);
      if (open.length == 2) {

        setTimeout(function() {
          if (open["0"]["0"].firstElementChild.className == open["1"]["0"].firstElementChild.className) {
            open[0].addClass("match");
            open[1].addClass("match");
            open[0].off('click');
            open[1].off('click');
            count +=2;
            if (count ==  16) {
              timer.stop();
              time = $("#timer").text();
              popup();
            }
          }else {
            open[0].removeClass("open show");
            open[1].removeClass("open show");
            open[0].click(clicked);
          }

          open.splice(0, open.length);
        }, 400);
      }

  }

  $(".card").click(clicked);

  //Popup implemented using sweetheart alert
  function popup() {
    swal({
      title: 'WoHoooo',
      type: 'success',
      text: 'You Won!!! . You took ' + moves +" moves" + '. You have got ' + star + ' stars'+" and you took " + time +' amount of time to complete the game',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Play Again',
      confirmButtonColor: '#0000FF',
      cancelButtonText: 'Close',
      cancelButtonColor: '#FF0000'
    }).then(function() {
      location.reload();
    }, function(dismiss) {
      console.log('Yes');
    });

  }
}

$('#startGame').click(startGame);
