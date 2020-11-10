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

// Uploading Excel files:
function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};
function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    console.log(excelRows);

    // Pass Excel file values to the report page:
    if (typeof(Storage) !== "undefined") {
        // var ExcelsObj = excelRows;
        window.sessionStorage.setItem("excel", JSON.stringify(excelRows));
        var ExcelsObj = JSON.parse(sessionStorage.getItem("excel"));//no brackets
        var i;
        for (i = 0; i < ExcelsObj.length; i++) {
                 console.log(ExcelsObj[i]);
        }
    }

    // //Create a HTML Table element.
    // var table = document.createElement("table");
    // table.border = "1";

    // //Add the header row.
    // var row = table.insertRow(-1);

    // //Add the header cells.
    // var headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Name";
    // row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "Description";
    // row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "W";
    // row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "D";
    // row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "H";
    // row.appendChild(headerCell);

    // headerCell = document.createElement("TH");
    // headerCell.innerHTML = "V";
    // row.appendChild(headerCell);

    // //Add the data rows from Excel file.
    // for (var i = 0; i < excelRows.length; i++) {
    //     //Add the data row.
    //     var row = table.insertRow(-1);

    //     //Add the data cells.
    //     var cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Id;

    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].Name;

    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].W;

    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].D;

    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].H;

    //     cell = row.insertCell(-1);
    //     cell.innerHTML = excelRows[i].H;
    // }

    // var dvExcel = document.getElementById("dvExcel");
    // dvExcel.innerHTML = "";
    // dvExcel.appendChild(table);
};