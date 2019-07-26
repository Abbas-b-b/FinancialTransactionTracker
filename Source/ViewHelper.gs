/*
* Add option tag arround tag name to use in html document
*/
function BuildTagsOptions(Tags){
  var Result = "";
  
  for(TagIndex in Tags){
    Result += "<option value=\"" + Tags[TagIndex][1] + "\">" + Tags[TagIndex][0] + "</option>"
  }
  
  return Result;
}