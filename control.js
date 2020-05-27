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

var distFromTop = 72;
function OnScroll(){
    for(var i = 0; i < elements.length; i++){
        elements[i].style.top = -(document.documentElement.scrollTop - distFromTop ) * (Math.pow(i,2)  / Math.pow(elements.length,2)) + "px";
        elements[i].style.zIndex = i;
    }
    content.style.top = elements[0].offsetHeight -(document.documentElement.scrollTop - distFromTop)+ "px";
}