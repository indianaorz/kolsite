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
    const Http = new XMLHttpRequest();
    const url= document.getElementById("server");
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        document.getElementById("serverText").innerHTML = Http.responseText;
    }

}