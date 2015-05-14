
var populateTable = function(data){
    $("#tableBody").empty();
    
    var tableTemplate, outputString;
    tableTemplate = "<tr>" +
    "<td class=\"text-center\">{{Name}}</td>" + "<td class=\"text-center\">{{Email}}</td>" + "<td class=\"text-center\">{{City}}</td>" +
    "</tr>";
    outputString = "";
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++){
        outputString += tableTemplate.replace("{{Name}}", data[i][1]).replace("{{Email}}", data[i][2]).replace("{{City}}", data[i][3])
    }
    $("#tableBody").append(outputString);
}

var getData = function(){
    $.get("dbget.php", function( data ) {
        //console.log(data);
        populateTable(data);
    });
}

$(document).ready(function(){
    
    getData();

    $("#submitReg").click(function(e){
        
        e.preventDefault();
        var name, email, city, anon, urlstring;
        name = $("#nameInput1").val();
        email = $("#emailInput1").val();
        city = $("#cityInput1").val();
        anon = $("#anonInput1").val();
        
        urlstring = "?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&city=" + encodeURIComponent(city) + "&anon=" + encodeURIComponent(anon);
        $.get("dbput.php" + urlstring, function( data ) {
            //console.log(data);
            getData();
        });
        
    });
    
    
})