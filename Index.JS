var Time = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8];
var People = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Inputs:
var Room_Width = 3; var Room_Depth = 3; var Room_Height = 3; var VR = 3;

// Case parameters:
var Infectors = 1; var Area = Room_Width * Room_Depth; var Volume = Room_Height*Area;

// CO2 parameters:
var CO2_0 = 450; var CO2_Outside = 410; var CO2_HumanRate = 0.0048

// Ventilation parameters:
var BR = 0.54; var RR = 0; var Ventilation_Rate = VR * Volume;

// Virus parameters:
var QUANTA = 96; var Labda = 0.63; var Disp_Rate = 0.24; var VRR = Math.abs(VR*(RR-1)-Labda-Disp_Rate)

//____________________________________________
//Create an array with all the formulas output values:
var AllOutputs_Arr = [];
for(var i=0; i<People.length; i++){
    for(var j=0; j<Time.length; j++){
        var Formula_Output = (People[i]-Infectors)*(1-Math.exp(-BR*(QUANTA*Infectors/(VRR*Volume))*(Time[j]+(1/VRR)*Math.exp(-VRR*Time[j])-(1/VRR))));
        AllOutputs_Arr.push(Formula_Output);
//        console.log(X);
    };
};

//____________________________________________
//Slice function to returns an array with arrays of the given size:
//  @param myArray {Array} array to split
//  @param chunk_size {Integer} Size of every group
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }
    return tempArray;
}
// Split in group of Time array length items:
var result = chunkArray(AllOutputs_Arr, Time.length);
console.log(result);

//______________________________________________
//Formula:
//var X = (People[0]-Infectors)*(1-Math.exp(-BR*(QUANTA*Infectors/(VRR*Volume))*(Time[0]+(1/VRR)*Math.exp(-VRR*Time[0])-(1/VRR))));
