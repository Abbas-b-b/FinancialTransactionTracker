/*
* To keep settings of application
*/
function GetSettings(){
    return {
        "AppTitle" : "Financial Transaction Tracker",
    
        "SpreadSheetId" : "",

        //Tags sheet
        "TagsSheetIndex" : 0,
        "TagNameColumnName" : "A",
        "TagIdColumnName" : "B",
        "TagAmountColumnName" : "C",
        "TagsColumnStartRow" : 2,

        //Transaction sheet
        "TransactionsSheetName" : "Transactions",
        "TransactionsSheetIndex" : 1,
        "TransactionDateColumnName" : "A",
        "TransactionAmountColumnName" : "B",
        "TransactionTagsNameColumnName" : "C",
        "TransactionDescriptionColumnName" : "D",
        "TransactionTagIdColumnName" : "E",
        "TransactionsColumnStartRow" : 2,
    }
}

/*
* Get a specific setting value with it's key
*/
function GetSetting(Key){
    return GetSettings()[Key]
}