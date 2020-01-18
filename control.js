var elements;
var content;

document.addEventListener("DOMContentLoaded", function(event) { 
    elements = document.getElementsByClassName("hero");
    content = document.getElementsByClassName("content")[0];
    content.style.top = elements[0].offsetHeight -(document.documentElement.scrollTop )+ "px";
    OnScroll();
});  


function OnScroll(){
    for(var i = 0; i < elements.length; i++){
        elements[i].style.top = -(document.documentElement.scrollTop ) * (i / elements.length) + "px";
    }
    content.style.top = elements[0].offsetHeight -(document.documentElement.scrollTop )+ "px";
}