
function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  var address = $('#address').val();

  $greeting.text('So do u want to live at'+ address +'?');

  // load streetview

  // YOUR CODE GOES HERE!
  var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'';
  $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

  // Built by LucyBot. www.lucybot.com
/*  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
    'api-key': "e8a3cc43728146d4b12f0b0f5de08a48",
    'sort': "newest"
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    articles = data.response.docs;
    for(var i=0;i<articles.length;i++)
    { var article = articles[i];
      $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');

   };
  }).fail(function(err) {
    $nytHeaderElem.text("couldnt be loadeds")
    throw err;
  });
  */

  return false;
};

$('#form-container').submit(loadData);
