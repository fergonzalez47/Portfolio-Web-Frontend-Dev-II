function Calculate(number) {
    let total = 0;
    for (let counter = 1; counter <= number; counter++) {
        total+= counter; 
        
    } 
    return total;  

}

function Show() {
    let UserInput = document.getElementById("InputNumber").value;
    document.getElementById("display").innerHTML = UserInput;
}



function Read() {
    let UserInput = document.getElementById("InputNumber2").value;
     let InputToNumber = Number(UserInput);


    if (Number.isNaN(InputToNumber)) {
        let message = "You entered a string; please, enter a number";
        document.getElementById("display2").innerHTML = message;
        
     
    } else {
        document.getElementById("display2").innerHTML = Calculate(InputToNumber);
        
        
    }
}

function Sum() {
    let Input1 = parseInt(document.getElementById("number2").value);
    let Input2 = parseInt(document.getElementById("number3").value);

    if (Number.isNaN(Input1) || Number.isNaN(Input2)) {
        let message = "Please, enter two valid number";
        document.getElementById("display3").innerHTML = message;
        
     
    } else {
        document.getElementById("display3").innerHTML = Input1 + Input2;
        
        
    }

}

