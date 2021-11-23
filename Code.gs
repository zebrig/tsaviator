var ssId = "19kMeAYpYcpNi7K4BEqvjrRiZ2_WOZf8W2x6Y9FWto4E";

function uploadFileToGoogleDrive(data, file, street, house, electro) {
  var now = new Date();

  try {

    var dropbox = Utilities.formatDate(now, "GMT+3", "yyyy-MM");
    var folder, folders = DriveApp.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }

    /* Credit: www.labnol.org/awesome */

    var contentType = data.substring(5, data.indexOf(';')),
      bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7)),
      blob = Utilities.newBlob(bytes, contentType, file),
      file = folder.createFile(blob).setName([house, street, electro, Utilities.formatDate(now, "GMT+3", "yyyy-MM-dd HH.mm.ss")].join(" "));

    var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Sheet1");
    lastRow = sheet.getLastRow() + 1;

    sheet.getRange(lastRow, 1, 1, 6).setValues([[now, street, house, electro, "-", '=HYPERLINK("' + file.getUrl() + '")']]);
    // sheet.insertImage(blob, 7, lastRow);

    return "OK";

  } catch (f) {
    return f.toString();
  }

}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}
