var populateTable, getData, putData, inputHasEmptyFields, isEmpty;

populateTable = function(data) {
    $("#tableBody").empty();

    var tableTemplate, outputString;
    tableTemplate = "<tr>" + "<td class=\"text-center\">{{ID}}</td>" + "<td class=\"text-center\">{{Name}}</td>" + "<td class=\"text-center\">{{Email}}</td>" + "<td class=\"text-center\">{{City}}</td>" + "</tr>";
    outputString = "";
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
        outputString += tableTemplate.replace("{{ID}}", i.toString()).replace("{{Name}}", data[i][1]).replace("{{Email}}", data[i][2]).replace("{{City}}", data[i][3])
    }
    $("#tableBody").append(outputString);
}

getData = function() {
    $.get("php/dbget.php", function(data) {
        populateTable(data);
    });
}

putData = function(name, city, email, anon) {
    var urlstring = "?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&city=" + encodeURIComponent(city) + "&anon=" + encodeURIComponent(anon);
    $.get("php/dbput.php" + urlstring, function(result) {
        if (result == "1") {
            $(".alert-success").fadeIn();
            getData();
        }
        else {
            $(".alert-warning").show();
        }
    });
}

inputHasEmptyFields = function() {
    var nameEmpty = isEmpty("nameInput1");
    var emailEmpty = isEmpty("emailInput1");
    var cityEmpty = isEmpty("cityInput1");

    if (nameEmpty) {
        $("#nameInput1").parent().addClass("has-error");
    }
    if (emailEmpty) {
        $("#emailInput1").parent().addClass("has-error");
    }
    if (cityEmpty) {
        $("#cityInput1").parent().addClass("has-error");
    }
    return nameEmpty || emailEmpty || cityEmpty;

}

isEmpty = function(inputId) {
    return $("#" + inputId).val().length <= 0;
}

$(document).ready(function() {

    $(".alert").hide();
    getData();

    $("#submitReg").click(function(e) {

        e.preventDefault();
        $(".alert").hide();
        var name, email, city, anon, urlstring;
        name = $("#nameInput1").val();
        email = $("#emailInput1").val();
        city = $("#cityInput1").val();
        anon = $("#anonInput1").is(':checked') ? "true" : "false";

        if (inputHasEmptyFields()) {
            $(".alert-danger").show();
        }
        else {
            putData(name, city, email, anon);
        }

    });

    $(".form-control").keypress(function() {
        $(this).parent().removeClass("has-error");
    });


})