// Select color input
// Select size input


$(document).ready(function () {

  var table = $("#pixel_canvas");

  $("#submit").on("click",function(){
    table.find('*').remove();
    $makeGrid();
    $changeColor();
    return false;

  });

  $makeGrid = function (){

    var row = $("#input_height").val();
    var column = $("#input_width").val();

    for(var i = 0;i<row;i++){
      rowElement = $("<tr></tr>");
      for(var j = 0;j<column;j++){
        $(rowElement).append("<td></td>");
      }
      table.append(rowElement);
    }
  }

  $changeColor = function() {

    $("td").click(function(){
      var color = $("#colorPicker").val();
      $(this).css("background-color",color);

      return false;
    });
  }



});
