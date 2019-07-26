/*
* Return SpreadSheet which contains data
*/
function GetSpreadSheet(){
    var SpreadSheetId = GetSetting("SpreadSheetId");
    return SpreadsheetApp.openById(SpreadSheetId);
}

/*
* Return Sheet which contains transactions
*/
function GetTransactionsSheet(){
  return GetSpreadSheet().getSheets()[GetSetting("TransactionsSheetIndex")];
}

/*
* Return Sheet which contains tags
*/
function GetTagsSheet(){
  return GetSpreadSheet().getSheets()[GetSetting("TagsSheetIndex")];
}

/*
* Get the last row number with data in the give Coulmn and Sheet
*/
function GetLastRow(Sheet, Column) {
    var Range = Column + "1" + ":" + Column;
    return Sheet.getRange(Range).getValues().filter(String).length;
}

/*
* Return tags with name and id
*/
function GetTagsRange(){
    var TagNameColumnName = GetSetting("TagNameColumnName")
    var TagsColumnStartRow = GetSetting("TagsColumnStartRow");
    var TagsIdColumnName = GetSetting("TagIdColumnName");
    var LastTagsRowIndex = GetLastRow(GetTagsSheet(), TagNameColumnName);

    return TagNameColumnName + TagsColumnStartRow  + ":" + TagsIdColumnName + LastTagsRowIndex;
}

/*
* Return all tags information
*/
function GetTags(){
    var TagsRange = GetTagsRange();
    return GetTagsSheet().getRange(TagsRange).getValues().filter(String);
}

/*
* Generate sumif formula to sum up a tag amount
*/
function GenerateTagAmountFormula(RowIndex){
    var Result =
        "=SUMIF(" + 
        GetSetting("TransactionsSheetName") +
        "!" + 
        GetSetting("TransactionTagIdColumnName") + ":" + GetSetting("TransactionTagIdColumnName") +
        ", \"*\" & " + 
        GetSetting("TagIdColumnName") + 
        RowIndex + 
        " & \"*\", "+
        GetSetting("TransactionsSheetName") +
        "!" + 
        GetSetting("TransactionAmountColumnName") + ":" + GetSetting("TransactionAmountColumnName") +
        ")";
        
    return Result;
}