var storedArray = JSON.parse(sessionStorage.getItem("inputs"));//no brackets
var i;
for (i = 0; i < storedArray.length; i++) {
            //  console.log(storedArray[i]);
}


var Time = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8];
var People = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// _____________________________________________
// Function to format dicimal number:
function round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
      return Math.round(value);  
    value = +value;
    exp = +exp;  
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
      return NaN; 
    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));  
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  }

//______________________________________________
// Change an array to object:
// function toObject(arr) {
//     var rv = {};
//     for (var i = 0; i < arr.length; ++i)
//       rv[i] = arr[i];
//     return rv;
//   }

//____________________________________________
// Create table:  
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
        cell.className = element[key];
      }
    }
  }

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

// ___________________________________________
function CreateChartCO2() {
// Create people axes for CO2 chart:
ul = document.createElement('ul');
document.getElementById('People_CO2').appendChild(ul);
People.forEach(function (item) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML += item;
});

// ____________________________________________
    // Delete chart:
    var ObjToDelete = document.getElementById("chart_CO2");
    while (ObjToDelete.hasChildNodes()) {  
        ObjToDelete.removeChild(ObjToDelete.firstChild);
    }

// ___________________________________________
// Inputs:
var Room_Width = storedArray[0]; var Room_Depth = storedArray[1]; var Room_Height = storedArray[2];
var VR = 3;
console.log(Room_Width, Room_Depth, Room_Height);

// Case parameters:
var Infectors = 1; var Area = Room_Width * Room_Depth; var Volume = Room_Height*Area;

// CO2 parameters:
var CO2_0 = 450; var CO2_Outside = 410; var CO2_HumanRate = 0.0048

// Ventilation parameters:
var BR = 0.54; var RR = 0; var Ventilation_Rate = VR * Volume;

// Virus parameters:
var QUANTA = 96; var Labda = 0.63; var Disp_Rate = 0.24; var VRR = Math.abs(VR*(RR-1)-Labda-Disp_Rate)

// _______________________________________________
//Create an array with all the formulas output values for CO2:
var AllOutputs_CO2_Arr = [];
for(var i=0; i<People.length; i++){
    for(var j=0; j<Time.length; j++){
        var Formula_Output = round((CO2_HumanRate*3600000*People[i])/(Volume*VR*(1-RR))+(CO2_0-CO2_Outside-CO2_HumanRate*3600000*People[i]/(Volume*VR*(1-RR)))*Math.exp(-VR*(1-RR)*Time[j])+CO2_Outside);
        //set color value:
        var tempColor="";
        if(Formula_Output<450) {
            var tempColor = "color1";
        } else if(Formula_Output<500) {
            var tempColor = "color2";
        }else if(Formula_Output<550) {
            var tempColor = "color3";
        }else if(Formula_Output<600) {
            var tempColor = "color4";
        }else if(Formula_Output<650) {
            var tempColor = "color5";
        }else if(Formula_Output<700) {
            var tempColor = "color6";
        }else if(Formula_Output<750) {
            var tempColor = "color7";
        }else if(Formula_Output<800) {
            var tempColor = "color8";
        }else if(Formula_Output<850) {
            var tempColor = "color9";
        }else if(Formula_Output<900) {
            var tempColor = "color10";
        }else if(Formula_Output<950) {
            var tempColor = "color11";
        }else if(Formula_Output<1000) {
            var tempColor = "color12";
        }else if(Formula_Output<1050) {
            var tempColor = "color13";
        }else if(Formula_Output<1100) {
            var tempColor = "color14";
        }else if(Formula_Output<1150) {
            var tempColor = "color15";
        } else {
            var tempColor = "color16";
        };
        
        AllOutputs_CO2_Arr.push(tempColor);
        // AllOutputs_CO2_Arr.push(Formula_Output);
    //    console.log(Formula_Output);
    };
};

//____________________________________________
// Split in group of Time array length items:
var result = chunkArray(AllOutputs_CO2_Arr, Time.length);
// console.log(result);

//______________________________________________

  let tableCO2 = document.querySelector("#chart_CO2");
  let dataCO2 = Object.keys(result);
  generateTableHead(tableCO2, Time);
  generateTable(tableCO2, result);

}

