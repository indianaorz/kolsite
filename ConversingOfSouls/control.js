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



function StartGame() {
    var url = document.getElementById("server").value + "/Start";

    $.ajax({
        url: url
    }).done(function (data) {
        document.getElementById("serverText").innerHTML = JSON.stringify(data);
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
        var characters = data;
        document.getElementById("CharacterSelect").innerHTML = "";
        characters.forEach(function (character) {
            document.getElementById("CharacterSelect").innerHTML +=
                '<option value="' + character.id + '">' + character.name + '</option>';
        });

    }).fail(function () {
        // Handle error
    });

}

function ChangeCharacter() {

    var id = document.getElementById("CharacterSelect").value;
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
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });

}