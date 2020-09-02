// Geting inputs values ans store them in session:
function GetInputValues(){
    if (typeof(Storage) !== "undefined") {

        var InputsArray = [document.getElementById("Room_Width").value,
                           document.getElementById("Room_Depth").value,
                           document.getElementById("Room_Height").value,
                           document.getElementById("Ventilation_Rate").value];
        window.sessionStorage.setItem("inputs", JSON.stringify(InputsArray));
        var storedArray = JSON.parse(sessionStorage.getItem("inputs"));//no brackets
        var i;
        for (i = 0; i < storedArray.length; i++) {
                     console.log(storedArray[i]);
        }

    }    
}
