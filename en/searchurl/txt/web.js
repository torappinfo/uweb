let ess = {};
ess["g"]=["https://google.com/search?q=",];
ess["v"]=["https://www.youtube.com/results?search_query=",];
ess["b"]=["http://www.bing.com/search?q=",];
ess["w"]=["https://encyclopedia.thefreedictionary.com/",];
ess["a"]=["http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=",];

let url=arguments[1];
let iS1 = url.search(/ [^ ]/);
let iS2 = url.indexOf(' ',iS1+2);
let name = url.substring(iS1+1,iS2)
let keywords = url.substring(iS2+1);
let es = ess[name];
if(es){
  let len = es.length;
  for(let i=1;i<len;i++)
    window.open(es[i]+keywords);
  location.href=es[0]+keywords;
}
