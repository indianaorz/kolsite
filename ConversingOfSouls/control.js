var elements;
var content;
var fogs;

document.addEventListener("DOMContentLoaded", function(event) { 
    elements = document.getElementsByClassName("hero");
    content = document.getElementsByClassName("content")[0];
    fogs = document.getElementsByClassName("fog");
    
    for(var i = 0; i < fogs.length; i++){
        fogs[i].style.zIndex = i;
    }
    //setTimeout(OnScroll, 200);
});  

function OnSetServer(){
    var url = document.getElementById("server").value;

    $.ajax({
        url: url
      }).done(function(data) {
        document.getElementById("serverText").innerHTML = data;
      }).fail(function() {
        // Handle error
    });

}