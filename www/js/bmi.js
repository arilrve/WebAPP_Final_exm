function send(){
    var flag = true
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var bmi = weight/(height*height);
        document.getElementById("Bmiresult").value=bmi;
    }