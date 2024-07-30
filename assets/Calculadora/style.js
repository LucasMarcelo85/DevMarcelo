let currentlnput = "";
let lastOperator = "";
let calculationFinished = false;

function press(num){
    if (calculationFinished){
        currentlnput ="";
        calculationFinished = false;
    }
    currentlnput += num;
    document.getElementById("Display").value = currentlnput;
}

function calculate(op){
    if (calculationFinished){
        calculationFinished = false;
    }
    if (op=== "="){
        currentlnput= eval(currentlnput);
        calculationFinished=true;
    }else{
        currentlnput +=op;
    }
    document.getElementById("display").value= currentlnput;
}
function clearDisplay(){
    currentlnput="";
    document.getElementById("display").value="";
}
