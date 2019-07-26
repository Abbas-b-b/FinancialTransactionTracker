/*
* Response to get request and retun Home.html
*/
function doGet(){
  var template = HtmlService.createTemplateFromFile('Index');

  var htmlOutput = template.evaluate()
    .setSandboxMode(HtmlService.SandboxMode.NATIVE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle(GetSetting("AppTitle"));

  return htmlOutput;
}

/*
* Add a tag to sheet
*/
function AddTag(Tag){
  if(Tag.Tag == null || Tag.Tag == ""){
    return "Invaild Tag";
  }

  var Sheet = GetTagsSheet();
  var RowIndex = GetLastRow(Sheet, GetSetting("TagNameColumnName")) + 1; //Added to go to the new empty row
  var TagNameColumnName = GetSetting("TagNameColumnName");
  var TagIdColumnName = GetSetting("TagIdColumnName");
  var TagAmountColumnName = GetSetting("TagAmountColumnName");

  //Generate tag id and check if there is a same id or not if the same id exist try to create new id
  var Tags = GetTags();
  var TagId  
  do{
    TagId = GenerateUUIDv4();

    var TagExist = false;
    
    for (i = 0; i < Tags.length; i++) {
      if(Tags[i][1] == TagId){
        TagExist = true;
      }
    } 
  }
  while(TagExist)
  
  Sheet.getRange(TagNameColumnName + RowIndex).setValue(Tag.Tag);
  Sheet.getRange(TagIdColumnName + RowIndex).setValue(TagId);
  Sheet.getRange(TagAmountColumnName + RowIndex).setValue(GenerateTagAmountFormula(RowIndex));
  
  return "Done";
}

/*
* Handle a transaction info that comes from UI
*/
function HandleTransaction(TransactionDetail){
  if(TransactionDetail.Date === null || TransactionDetail.Date == ""){
    return "Invalid Date";
  }
  else if(TransactionDetail.Amount === null || TransactionDetail.Amount == ""){
    return "Invalid Amount";
  }
  
  var Sheet = GetTransactionsSheet()
  var RowIndex = GetLastRow(Sheet, GetSetting("TransactionDateColumnName")) + 1; //Added to go to the new empty row
 
  var TransactionDateColumnName = GetSetting("TransactionDateColumnName");
  var TransactionAmountColumnName = GetSetting("TransactionAmountColumnName");
  var TransactionTagsNameColumnName = GetSetting("TransactionTagsNameColumnName");
  var TransactionDescriptionColumnName = GetSetting("TransactionDescriptionColumnName");
  var TransactionTagIdColumnName = GetSetting("TransactionTagIdColumnName");
  
  Sheet.getRange(TransactionDateColumnName + RowIndex).setValue(TransactionDetail.Date);
  Sheet.getRange(TransactionAmountColumnName + RowIndex).setValue(TransactionDetail.Amount);
  Sheet.getRange(TransactionTagsNameColumnName + RowIndex).setValue(TransactionDetail.TagsName);
  Sheet.getRange(TransactionDescriptionColumnName + RowIndex).setValue(TransactionDetail.Description);
  Sheet.getRange(TransactionTagIdColumnName + RowIndex).setValue(TransactionDetail.TagsId);
  
  return "Done";
}