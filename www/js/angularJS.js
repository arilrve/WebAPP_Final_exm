angular
.module('App',[])
.controller('LoginConController',['$scope',function($scope){
    $scope.done='';
}])

.directive('loadingBtn',['$timeout',function($timeout){
return{
    link: function(scope,element,attrs){
        element.bind('click',function(){
            if(scope.loading == true || scope.done == 'done'){
                return;
            }
            scope.loading= true;
            element.addClass('loading');
            timeoutId= $timeout(function(){
                scope.loading =false;
                element.removeClass('loading');
                scope.done= 'done';
            },2000);
        });
    }
 };
}]);


function onLoad(){
    document.addEventListener("deviceready", onDeviceReady,false);
    if(localStorage.userName !=null){
        document.getElementById("user").value = localStorage.userName;
    }
    if(localStorage.userPassword != null){
        document.getElementById("passwd").value = localStorage.userPassword;
    }
}



// function onDeviceReady(){
//     alert("DeviceReady");
//     getposition();
// }
// function getPosition() {
//     var options = {
//        enableHighAccuracy: true,
//        maximumAge: 3600000
//     }
//     var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
 
//     function onSuccess(position) {
//        localStorage.lon=position.coords.longitude;
//        localStorage.lat=position.coords.longitude;
//     };
 
//     function onError(position) {
//        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
//     }
//  }
function login(){
    var id = document.getElementById("user").value;
    var passwd = document.getElementById("passwd").value;
    $.ajax({
    datatype: "JSON",
    type: "POST",
    url:"http://210.70.80.21/~s107021039/WebAPP_DB/login.php",
    data: "userName="+ id+ "&userPassword="+passwd,
    // +"&lon"+localStorage.lon+"lat"+localStorage.lat,
    crossDomain:true,
    cache: false,
    success: function(data){
    var obj =JSON.parse(data);
    if(obj.status== "success"){
        localStorage.userName = id;
        localStorage.userPassword = passwd;
        localStorage.loginType =0;
        document.location.href="MainPage.html";
            }else if(obj.status=="noAccount"){
                alert("Wrong ID or Password!!" + id + " " + passwd);
            }else if(obj.status == "fail"){
                alert("Can't connect to DB!");
        }
    },
        error: function(data){
            alert("Error:"+ data);
        }
    });
}

function noteOnload(){
    var id = localStorage.userName;
    $.ajax({
        datatype:"JSON",
        type:"POST",
        url:"http://210.70.80.21/~s107021039/WebAPP_DB/getNotes.php",
        data:"userEmail=" + id,
        crossDomain: true,
        cache:false,
        success: function(data){
            var obj = JSON.parse(data);
            $("#div3").html('');
            var div3Content = '';
            for(var i =0;i<obj.length;i++){
                div3Content += '<p>' + obj[i].type + ',' + obj[i].title +'<p>';
            }
            $("#div3").append(div3Content);
        },
        error: function(data){
            alert("Error" + data);
        }
    });
}

function sendNote2DB(){
        var id = localStorage.userName;
        var type = document.getElementById("noteType").value;
        var title = document.getElementById("title").value;
        var description = document.getElementById("description").value;
        $.ajax({
            datatype: "JSON",
            type: "POST",
            url:"http://210.70.80.21/~s107021039/WebAPP_DB/addNotes.php",
            data: "userEmail=" +id + "&noteType=" + type + "&title=" + title +"&description=" +description,
            crossDomain:true,
            cache: false,
            success: function(data){
                var obj =JSON.parse(data);
                if(obj.status== "success"){ 
                    alert("寫入1筆note");
                    documen.location.href="notePage.html";
                    }else if(obj.status=="noAccount"){
                        alert("寫入資料庫失敗");
                    }else if(obj.status == "fail"){
                        alert("Can't connect to DB!");
                }
            },
                error: function(data){
                    alert("Error:"+ data);
                }
            });
        }

        function moneyOnload(){
            var id = localStorage.userName;
            $.ajax({
                datatype:"JSON",
                type:"POST",
                url:"http://210.70.80.21/~s107021039/WebAPP_DB/getMoney.php",
                data:"userEmail=" + id,
                crossDomain: true,
                cache:false,
                success: function(data){
                    var obj = JSON.parse(data);
                    $("#div3").html('');
                    var div3Content = '';
                    for(var i =0;i<obj.length;i++){
                        div3Content += '<p>' + obj[i].type + ',' + obj[i].price +'<p>';
                    }
                    $("#div3").append(div3Content);
                },
                error: function(data){
                    alert("Error" + data);
                }
            });
        }

        function sendMoney2DB(){
            var id = localStorage.userName;
            var type = document.getElementById("MoneyType").value;
            var price = document.getElementById("price").value;
            var description = document.getElementById("description").value;
            $.ajax({
                datatype: "JSON",
                type: "POST",
                url:"http://210.70.80.21/~s107021039/WebAPP_DB/addMoney.php",
                data: "userEmail=" +id + "&MoneyType=" + type + "&price=" + price +"&description=" +description,
                crossDomain:true,
                cache: false,
                success: function(data){
                    var obj =JSON.parse(data);
                    if(obj.status== "success"){ 
                        alert("寫入1筆note");
                        documen.location.href="Money.html";
                        }else if(obj.status=="noAccount"){
                            alert("寫入資料庫失敗");
                        }else if(obj.status == "fail"){
                            alert("Can't connect to DB!");
                    }
                },
                    error: function(data){
                        alert("Error:"+ data);
                    }
                });
            }
            function registered(){
                var useremail = document.getElementById("user").value;
                var password = document.getElementById("passwd").value;
                $.ajax({
                    datatype: "JSON",
                    type: "POST",
                    url:"http://210.70.80.21/~s107021039/WebAPP_DB/addAcount.php",
                    data: "useremail=" +useremail + "&passwd=" + password,
                    crossDomain:true,
                    cache: false,
                    success: function(data){
                        var obj =JSON.parse(data);
                        if(obj.status== "success"){ 
                                alert("Success");
                                document.location.href="index.html";
                            }else if(obj.status == "fail"){
                                alert("Can't connect to DB!");
                        }
                    },
                        error: function(data){
                            alert("Error:"+ data);
                        }
                    });
                }