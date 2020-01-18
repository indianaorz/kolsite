var elements;
var content;

document.addEventListener("DOMContentLoaded", function(event) { 
    elements = document.getElementsByClassName("hero");
    content = document.getElementsByClassName("content")[0];
    setTimeout(OnScroll, 200);
});  


function OnScroll(){
    for(var i = 0; i < elements.length; i++){
        elements[i].style.top = -(document.documentElement.scrollTop - 72 ) * (Math.pow(i,2)  / Math.pow(elements.length,2)) + "px";
    }
    content.style.top = elements[0].offsetHeight -(document.documentElement.scrollTop - 72)+ "px";
}