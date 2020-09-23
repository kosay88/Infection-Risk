// Get input excel array saved in the session:
var ExcelsObj = JSON.parse(sessionStorage.getItem("excel"));//no brackets

// _____________________________________________
var Time = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8];
var People = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// _____________________________________________
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

// ___________________________________________
function CreateChartReport() {
    // Change rooms object to an array:
    var ExcelsArray = Object.values(ExcelsObj);
    for (let index = 0; index < ExcelsArray.length; index++) {
        const element = ExcelsArray[index];
        // Change each room object to an array:
        var RoomInfo = Object.values(element)
        // console.log(index);
        // console.log(RoomInfo);
            
        // Room info:
        var Room_Name = RoomInfo[0]; var Room_Description = RoomInfo[1];            
        // Inputs:
        var Room_Width = RoomInfo[2]; var Room_Depth = RoomInfo[3];
        var Room_Height = RoomInfo[4]; var VR = RoomInfo[5];
        // console.log(Room_Name, Room_Description, Room_Width, Room_Depth, Room_Height, VR);            
        // Case parameters:
        var Infectors = 1; var Area = Room_Width * Room_Depth; var Volume = Room_Height*Area;            // CO2 parameters:
        var CO2_0 = 450; var CO2_Outside = 410; var CO2_HumanRate = 0.0048
        // Ventilation parameters:
        var BR = 0.54; var RR = 0; var Ventilation_Rate = VR * Volume;
        // Virus parameters:
        var QUANTA = 96; var Labda = 0.63; var Disp_Rate = 0.24; var VRR = Math.abs(VR*(RR-1)-Labda-Disp_Rate);

        // _______________________________________________
        //Create an array with all the formulas output values for Risk and CO2:
        var AllOutputs_Risk_Arr = [];
        var AllOutputs_CO2_Arr = [];
        var Risk_report_outputs = [];
        var CO2_report_outputs = [];

        for(var i=0; i<People.length; i++){
            for(var j=0; j<Time.length; j++){
                var Formula_Output_Risk = round((People[i]-Infectors)*(1-Math.exp(-BR*(QUANTA*Infectors/(VRR*Volume))*(Time[j]+(1/VRR)*Math.exp(-VRR*Time[j])-(1/VRR)))) ,2);
                var Formula_Output_CO2 = round((CO2_HumanRate*3600000*People[i])/(Volume*VR*(1-RR))+(CO2_0-CO2_Outside-CO2_HumanRate*3600000*People[i]/(Volume*VR*(1-RR)))*Math.exp(-VR*(1-RR)*Time[j])+CO2_Outside);
                //set color value:
                var tempColorRisk="";
                var tempColorCO2="";

                if(Formula_Output_Risk<0.0625) {
                    var tempColorRisk = "color1";
                } else if(Formula_Output_Risk<0.1250) {
                    var tempColorRisk = "color2";
                }else if(Formula_Output_Risk<0.1875) {
                    var tempColorRisk = "color3";
                }else if(Formula_Output_Risk<0.2500) {
                    var tempColorRisk = "color4";
                }else if(Formula_Output_Risk<0.3125) {
                    var tempColorRisk = "color5";
                }else if(Formula_Output_Risk<0.3750) {
                    var tempColorRisk = "color6";
                }else if(Formula_Output_Risk<0.4375) {
                    var tempColorRisk = "color7";
                }else if(Formula_Output_Risk<0.5000) {
                    var tempColorRisk = "color8";
                }else if(Formula_Output_Risk<0.5625) {
                    var tempColorRisk = "color9";
                }else if(Formula_Output_Risk<0.6250) {
                    var tempColorRisk = "color10";
                }else if(Formula_Output_Risk<0.6875) {
                    var tempColorRisk = "color11";
                }else if(Formula_Output_Risk<0.7500) {
                    var tempColorRisk = "color12";
                }else if(Formula_Output_Risk<0.8125) {
                    var tempColorRisk = "color13";
                }else if(Formula_Output_Risk<0.8750) {
                    var tempColorRisk = "color14";
                }else if(Formula_Output_Risk<0.9375) {
                    var tempColorRisk = "color15";
                } else {
                    var tempColorRisk = "color16";
                };
                AllOutputs_Risk_Arr.push(tempColorRisk);
                // AllOutputs_Risk_Arr.push(Formula_Output);
                // console.log(AllOutputs_Risk_Arr);

                if(Formula_Output_CO2<450) {
                    var tempColorCO2 = "color1";
                } else if(Formula_Output_CO2<500) {
                    var tempColorCO2 = "color2";
                }else if(Formula_Output_CO2<550) {
                    var tempColorCO2 = "color3";
                }else if(Formula_Output_CO2<600) {
                    var tempColorCO2 = "color4";
                }else if(Formula_Output_CO2<650) {
                    var tempColorCO2 = "color5";
                }else if(Formula_Output_CO2<700) {
                    var tempColorCO2 = "color6";
                }else if(Formula_Output_CO2<750) {
                    var tempColorCO2 = "color7";
                }else if(Formula_Output_CO2<800) {
                    var tempColorCO2 = "color8";
                }else if(Formula_Output_CO2<850) {
                    var tempColorCO2 = "color9";
                }else if(Formula_Output_CO2<900) {
                    var tempColorCO2 = "color10";
                }else if(Formula_Output_CO2<950) {
                    var tempColorCO2 = "color11";
                }else if(Formula_Output_CO2<1000) {
                    var tempColorCO2 = "color12";
                }else if(Formula_Output_CO2<1050) {
                    var tempColorCO2 = "color13";
                }else if(Formula_Output_CO2<1100) {
                    var tempColorCO2 = "color14";
                }else if(Formula_Output_CO2<1150) {
                    var tempColorCO2 = "color15";
                } else {
                    var tempColorCO2 = "color16";
                };
                AllOutputs_CO2_Arr.push(tempColorCO2);
                // AllOutputs_CO2_Arr.push(Formula_Output);
                // console.log(AllOutputs_CO2_Arr);    
            };
        };
        console.log(index);
        // console.log(AllOutputs_Risk_Arr);
        // console.log(AllOutputs_CO2_Arr);

        //____________________________________________
        // Split in group of Time array length items for risk & co2:
        var result_risk = chunkArray(AllOutputs_Risk_Arr, Time.length);
        var result_co2 = chunkArray(AllOutputs_CO2_Arr, Time.length);
        console.log(result_risk);
        console.log(result_co2);

        // ________________________________________________________
        // Create div for each room and div for each risk chart, CO2 chart and info card:
        let room = document.createElement('div');
        room.className = "room";
        let roomId = "room"+index;
        room.setAttribute("id", roomId);
        document.getElementById('Report').appendChild(room);

        let Risk_div = document.createElement('div');
        Risk_div.className = "Risk_div";
        let riskId = "Risk_div"+index;
        Risk_div.setAttribute("id", riskId);
        document.getElementById(roomId).appendChild(Risk_div);

        let CO2_div = document.createElement('div');
        CO2_div.className = "CO2_div";
        let CO2Id = "CO2_div"+index;
        CO2_div.setAttribute("id", CO2Id);
        document.getElementById(roomId).appendChild(CO2_div);

        let Info_div = document.createElement('div');
        Info_div.className = "Info_div";
        let InfoId = "Info_div"+index;
        Info_div.setAttribute("id", InfoId);
        document.getElementById(roomId).appendChild(Info_div);

        // ________________________________________________________
        // Create chart risk titles:
        let title_risk = document.createElement('h4');
        title_risk.textContent = "Secondary infection risk";
        title_risk.className = "title_risk";
        document.getElementById(riskId).appendChild(title_risk);

        // Create chart risk time text:
        let chart_time_risk = document.createElement('p');
        chart_time_risk.textContent = "Meeting duration (hours)";
        chart_time_risk.className = "chart_time_risk";
        document.getElementById(riskId).appendChild(chart_time_risk);

        // Create people axes for Risk chart:
        people_axes_risk = document.createElement('ul');
        people_axes_risk.className = "people_axes_risk";
        People.forEach(function (item) {
        let li = document.createElement('li');
        people_axes_risk.appendChild(li);
        li.innerHTML += item;
        });
        document.getElementById(riskId).appendChild(people_axes_risk);

        // Create risk charts:
        table_risk = document.createElement('table');
        table_risk.className = "table_risk";
        document.getElementById(riskId).appendChild(table_risk);
        let tableRisk = document.querySelector(".table_risk");
        let dataRisk = Object.keys(result_risk);
        generateTableHead(tableRisk, Time);
        generateTable(tableRisk, result_risk);

        // Create chart risk people text:
        let chart_people_risk = document.createElement('p');
        chart_people_risk.textContent = "# of people in the meeting room";
        chart_people_risk.className = "chart_people_risk";
        document.getElementById(riskId).appendChild(chart_people_risk);

        
        // ________________________________________________
        // Create chart co2 titles:
        let title_CO2 = document.createElement('h4');
        title_CO2.textContent = "CO2 level(PPM)";
        title_CO2.className = "title_CO2";
        document.getElementById(CO2Id).appendChild(title_CO2);

        // Create chart co2 time text:
        let chart_time_co2 = document.createElement('p');
        chart_time_co2.textContent = "Meeting duration (hours)";
        chart_time_co2.className = "chart_time_risk";
        document.getElementById(CO2Id).appendChild(chart_time_co2);

        // Create people axes for Risk chart:
        people_axes_co2 = document.createElement('ul');
        people_axes_co2.className = "people_axes_co2";
        People.forEach(function (item) {
        let li = document.createElement('li');
        people_axes_co2.appendChild(li);
        li.innerHTML += item;
        });
        document.getElementById(CO2Id).appendChild(people_axes_co2);

        // Create risk charts:
        table_co2 = document.createElement('table');
        table_co2.className = "table_co2";
        document.getElementById(CO2Id).appendChild(table_co2);
        let tableCO2 = document.querySelector(".table_co2");
        let dataCO2 = Object.keys(result_co2);
        generateTableHead(tableCO2, Time);
        generateTable(tableCO2, result_co2);

        // Create chart co2 people text:
        let chart_people_co2 = document.createElement('p');
        chart_people_co2.textContent = "# of people in the meeting room";
        chart_people_co2.className = "chart_people_co2";
        document.getElementById(CO2Id).appendChild(chart_people_co2);

        // ___________________________________________
        // Create room info card:
        let roomName = document.createElement('p');
        roomName.textContent = "Room number: "+Room_Name;
        roomName.className = "roomName";
        document.getElementById(InfoId).appendChild(roomName);

        let roomDescription = document.createElement('p');
        roomDescription.textContent = "Description: "+Room_Description;
        roomDescription.className = "roomDescription";
        document.getElementById(InfoId).appendChild(roomDescription);

        let roomWidth = document.createElement('p');
        roomWidth.textContent = "Room width: "+Room_Width+"m";
        roomWidth.className = "roomWidth";
        document.getElementById(InfoId).appendChild(roomWidth);

        let roomDepth = document.createElement('p');
        roomDepth.textContent = "Room depth: "+Room_Depth+"m";
        roomDepth.className = "roomDepth";
        document.getElementById(InfoId).appendChild(roomDepth);

        let roomHeight = document.createElement('p');
        roomHeight.textContent = "Room height: "+Room_Height+"m";
        roomHeight.className = "roomWidth";
        document.getElementById(InfoId).appendChild(roomHeight);

        let roomVR = document.createElement('p');
        roomVR.textContent = "Room Ventilation rate: "+VR+"(1/hour)";
        roomVR.className = "roomVR";
        document.getElementById(InfoId).appendChild(roomVR);
    }
}