function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{name : "Find Duplicates",functionName : "findDuplicates"}];
  sheet.addMenu("Scripts", entries);
};

function findDuplicates() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange("E:E");  // "F:F" is for Column F
  // And if you want to check duplicates for whole sheet then try:
  // var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();//gets all the values in the spreadsheet
  var numRows = data.length;//rows is the data's length  
  var numColumns = data[0].length; 

  var formats = [];//used to give a background color to cells
  var values = [];
  for (var i = 0; i < numRows; i++) {
    formats[i] = [];
    for (var j = 0; j < numColumns; j++) {
      formats[i][j] = 'NONE';
      if (data[i][j] != '') {
        values.push([data[i][j], i, j]);//adds a new element into the list of data 
      }
    }
  }
  var numValues = values.length;
  
  for (var m = 0 ; m < numValues - 1; m++) { // all the vals in array of links
    if (formats[values[m][1]][values[m][2]] == 'NONE') {// if a link doesn't have a duplicate, leave alone
      for (var n = m + 1; n < numValues; n++) {
        if (values[m][0] == values[n][0]) {// if a link has a duplicate, change the backgroud color to red
          formats[values[m][1]][values[m][2]] = 'RED';
          formats[values[n][1]][values[n][2]] = 'RED';
        }
      }
    }
  }
    
  dataRange.setBackgroundColors(formats);
}
