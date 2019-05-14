function doGet(){
  var template = HtmlService.createTemplateFromFile('Home');

  var htmlOutput = template.evaluate()
    .setSandboxMode(HtmlService.SandboxMode.NATIVE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');

  return htmlOutput;
}

function AddTag(Tag){
  var Sheet = GetDataSheet(GetSpreadSheet());
  var RowIndex = GetLastRow(Sheet, "A") + 1;
  
  if(Tag.Tag == null || Tag.Tag == ""){
    return "Invaild Tag";
  }
  
  Sheet.getRange(RowIndex, 1).setValue(Tag.Tag);
  Sheet.getRange(RowIndex, 2).setValue("=SUMIF(Transactions!C:C, \"*\" & A" + RowIndex + " & \"*\", Transactions!B:B)");
  
  return "Done";
}

function HandleTransaction(TransactionDetail){
  var Sheet = GetTransactionSheet(GetSpreadSheet());
  var RowIndex = GetLastRow(Sheet, "A") + 1;
  
  if(TransactionDetail.Date === null || TransactionDetail.Date == ""){
    return "Invalid Date";
  }
  else if(TransactionDetail.Amount === null || TransactionDetail.Amount == ""){
    return "Invalid Amount";
  }
  
  Sheet.getRange(RowIndex, 1).setValue(TransactionDetail.Date);
  Sheet.getRange(RowIndex, 2).setValue(TransactionDetail.Amount);
  Sheet.getRange(RowIndex, 3).setValue(TransactionDetail.Tag.toString());
  Sheet.getRange(RowIndex, 4).setValue(TransactionDetail.Description);
  
  return "Done";
}

function GetSpreadSheet(){
  return SpreadsheetApp.openById("1GpQmqpk4ZDqeA5lRj40BiK0xH2aYxWpa3Zj4YW-i7P4");
}

function GetDataSheet(Sheet){
  return Sheet.getSheets()[0];
}

function GetTransactionSheet(Sheet){
  return Sheet.getSheets()[1];
}

function GetTags(Sheet){
  var TagsRange = GetTagsRange();
  return Sheet.getRange(TagsRange).getValues().filter(String);
}

function GetTagsRange(){
  return "A2:A";
}

function BuildTagsOptions(Tags){
  var Result = "";
  
  for(TagIndex in Tags){
    Result += "<option value=\"" + Tags[TagIndex] + "\">" + Tags[TagIndex] + "</option>"
  }
  
  return Result;
}

function GetLastRow(Sheet, Column) {
  var Range = Column + "1" + ":" + Column;
  return Sheet.getRange(Range).getValues().filter(String).length;
}