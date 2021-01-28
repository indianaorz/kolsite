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

function RefreshGameOutput() {
    var url = document.getElementById("server").value + "/Output";

    $.ajax({
        url: url
    }).done(function (data) {
        document.getElementById("serverText").innerHTML = data.output;
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
            document.getElementById("serverText").innerHTML = name + " created."
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

function AssignCharactersToDropdown(optionId, characters) {

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
        "knowledgeOf": knowledgeId
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        crossDomain: true,
        success: function (data) {
            AssignCharacterData("character", data);

            //After changing the character, get the trait focus data relative to the player
            GetTraitFocusData();
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}

function FocusCharacterName() {
    var name = document.getElementById("character-name").innerHTML;
    SelectTarget(name);
    SetTargetType("Character");
}

var targetType = "Trait";
function SetTargetType(name) {
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
            AssignCharacterData("player", data[0]);
            AssignCharacterData("player", data[0]);

            //After changing the player, get the trait focus data relative to them
            GetTraitFocusData();
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });

}

function AssignCharacterData(idPrefix, data) {

    //Assign Name
    document.getElementById(idPrefix + "-name").innerHTML = data.name;

    //Assign traits
    AssignTraits(idPrefix, "traits", data.traits);
    AssignTraits(idPrefix, "subtexts", data.subtexts);
}

function AssignTraits(idPrefix, idSuffix, data) {

    if (data == null) {
        return;
    }
    var element = document.getElementById(idPrefix + "-" + idSuffix);
    element.innerHTML = "";
    data.forEach(function (trait) {
        element.innerHTML +=
            "<div class = 'trait' onclick=SelectTarget('" + trait + "')>" + trait + "</div>"
    });
}


function SelectTarget(detail) {
    if (document.getElementById("BaseAction" + activeActionIndex).value != "Rest"
        && detail != undefined) {
        document.getElementById("target" + activeActionIndex).innerHTML = detail;
        SetTargetType("Trait");
    }
    else {
        document.getElementById("target" + activeActionIndex).innerHTML = "";
        SetTargetType("");
    }
}



function EndRound() {

    var url = document.getElementById("server").value + "/Round";
    var id = document.getElementById("PlayerSelect").value;

    var body = {
        "playerId": id
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        crossDomain: true,
        success: function (data) {
            document.getElementById("serverText").innerHTML = data.output;
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}

var activeActionIndex = 0;
function SetActiveActionIndex(index) {
    activeActionIndex = index;

    if (document.getElementById("BaseAction" + activeActionIndex).value == "Rest") {
        document.getElementById("target" + activeActionIndex).innerHTML = "";
    }
}

function SendAction() {

    var id = document.getElementById("PlayerSelect").value;
    var baseAction1 = document.getElementById("BaseAction1").value;
    var target1 = document.getElementById("target1").innerHTML;
    var baseAction2 = document.getElementById("BaseAction2").value;
    var target2 = document.getElementById("target2").innerHTML;
    var baseAction3 = document.getElementById("BaseAction3").value;
    var target3 = document.getElementById("target3").innerHTML;
    var dialogue = document.getElementById("dialogue").value;
    var url = document.getElementById("server").value + "/Round/Action";

    var body = {
        "characterId": id,
        "actions": [
            {
                "actionType": baseAction1,
                "target": target1,
            },
            {
                "actionType": baseAction2,
                "target": target2,
            },
            {
                "actionType": baseAction3,
                "target": target3,
            }
        ],
        "dialogue": dialogue
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(body),
        crossDomain: true,
        success: function (data) {
            CompleteSubmit(data);
        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}

function CompleteSubmit(data) {
    document.getElementById("serverText").innerHTML = data.output;

    //Clear the dialogue to avoid double submit
    document.getElementById("dialogue").value = "";

    //Reset active action index
    SetActiveActionIndex(1);

    //Reset UI
    document.getElementById("BaseAction1").value = "Rest";
    document.getElementById("BaseAction2").value = "Rest";
    document.getElementById("BaseAction3").value = "Rest";
    document.getElementById("target1").innerHTML = "";
    document.getElementById("target2").innerHTML = "";
    document.getElementById("target3").innerHTML = "";

    var outputWindow = document.getElementById("serverText");
    outputWindow.scrollTop = outputWindow.scrollHeight;

    ChangeCharacter();
    GetTraitFocusData();
}


function GetTraitFocusData() {

    var id = document.getElementById("PlayerSelect").value;
    var url = document.getElementById("server").value + "/TraitFocus?id=" + id;
    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        success: function (data) {

            ProcessTraitFocusData(data);

        },
        error: function (data) {
            console.log(JSON.stringify(data));
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });

}

function ProcessTraitFocusData(data) {
    traitElements = document.getElementsByClassName("trait");
    if (traitElements == undefined) {
        return;
    }
    data.traitFocusData.forEach(function (traitFocusData) {
        for (let visibleTraitElement of traitElements) {
            if (visibleTraitElement.innerHTML == traitFocusData.trait) {

                var yourValue = traitFocusData.yourFocus;
                var otherValue = traitFocusData.otherFocus;

                var strength = Math.abs(yourValue - otherValue);
                var difference = yourValue - otherValue;
                var total = yourValue + otherValue;


                visibleTraitElement.style.boxShadow = "0px 0px 20px " + strength + "px  hsl(0,0%, " + (50 + ((difference/total) * 50)).toString() + "%)";
                visibleTraitElement.style.zIndex = difference + total;


            }
        }
    });
}