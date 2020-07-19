function onload(){
    $("#addItem").hide();
}
function addItem(){
        // div.style.top = "50px";
        // div.style.left = "50px";
    $("#addItem").show();
}
function cancel(){
    // div.style.top = "50px";
    // div.style.left = "50px";
$("#addItem").hide();
}
function addGoal(){
    var input = document.getElementById("input");
    var txtNode = document.createTextNode(input.value);
    var li = document.createElement("li");
    li.appendChild(txtNode);
    var list = document.getElementById("List");
    list.appendChild(li);
    
    // var checkinp =document.getElementById("check").innerHTML='str';
    $("#addItem").hide();
}
function complete(){
    $("#List li").remove();
}
function Delete(){
    $('ul li:lt(1)').remove();  
    }  