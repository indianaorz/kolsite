var elements;
var content;
var fogs;

document.addEventListener("DOMContentLoaded", function (event) {
    elements = document.getElementsByClassName("hero");
    content = document.getElementsByClassName("content")[0];
    fogs = document.getElementsByClassName("fog");

    for (var i = 0; i < fogs.length; i++) {
        fogs[i].style.zIndex = i;
    }
    //setTimeout(OnScroll, 200);
});



function ResetGame() {
    var url = document.getElementById("server").value + "/Reset";

    $.ajax({
        url: url
    }).done(function (data) {
        document.getElementById("serverText").innerHTML = JSON.stringify(data);
    }).fail(function () {
        // Handle error
    });

}

function StartGame() {
    var url = document.getElementById("server").value + "/Start";

    $.ajax({
        url: url
    }).done(function (data) {
        document.getElementById("serverText").innerHTML = data;
    }).fail(function () {
        // Handle error
    });

}

function OnGenerateCharacter() {
    var url = document.getElementById("server").value + "/Character";
    var name = document.getElementById("characterName").value;


    var body = {
        "name": name
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        crossDomain: true,
        success: function (data) {
            document.getElementById("serverText").innerHTML = JSON.stringify(data);
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}

function GetAllCharacters() {
    var url = document.getElementById("server").value + "/Characters";

    $.ajax({
        url: url
    }).done(function (data) {
        AssignCharactersToDropdown("CharacterSelect", data);
        AssignCharactersToDropdown("PlayerSelect", data);
    }).fail(function () {
        // Handle error
    });

}

function AssignCharactersToDropdown(optionId, characters){
    
    document.getElementById(optionId).innerHTML = "";
    characters.forEach(function (character) {
        document.getElementById(optionId).innerHTML +=
            '<option value="' + character.id + '">' + character.name + '</option>';
    });
}

function ChangeCharacter() {

    var id = document.getElementById("PlayerSelect").value;
    var knowledgeId = document.getElementById("CharacterSelect").value;
    var url = document.getElementById("server").value + "/Characters/Knowledge";

    var body = {
        "id": id,
        "knowledgeOf":knowledgeId
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        crossDomain: true,
        success: function (data) {
            document.getElementById("serverText").innerHTML = JSON.stringify(data);
            AssignCharacterData("character", data);

        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}

function FocusCharacterName(){
    var name = document.getElementById("character-name").innerHTML;
    SelectTarget(name);
    SetTargetType("Character");
}

var targetType = "Trait";
function SetTargetType(name){
    targetType = name;
}


function ChangePlayer() {

    var id = document.getElementById("PlayerSelect").value;
    var url = document.getElementById("server").value + "/Characters?id=" + id;

    var body = {
        "id": id
    };

    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        success: function (data) {
            document.getElementById("serverText").innerHTML = JSON.stringify(data);
            AssignCharacterData("player", data[0]);
            AssignCharacterData("player", data[0]);
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });

}

function AssignCharacterData(idPrefix, data){

    //Assign Name
    document.getElementById(idPrefix + "-name").innerHTML = data.name;

    //Assign traits
    AssignTraits(idPrefix, "traits",data.traits);
    AssignTraits(idPrefix, "subtexts",data.subtexts);
}

function AssignTraits(idPrefix, idSuffix, data){
    
    var element = document.getElementById(idPrefix + "-" + idSuffix);
    element.innerHTML = "";
    data.forEach(function(trait){
        element.innerHTML +=
        "<div class = 'trait' onclick=SelectTarget('" + trait + "')>" + trait +"</div>"
    });
}

function SelectTarget(detail){
    document.getElementById("target").innerHTML = detail;
    SetTargetType("Trait");
}