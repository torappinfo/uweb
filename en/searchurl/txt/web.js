let ess = {
  "a":["http://www.amazon.com/s?url=search-alias%3Daps&field-keywords=",],
  "ab":["http://audiobookbay.se/?s=",],
  "b":["http://www.bing.com/search?q=",],
  "bi":["http://bing.com/images/search?q=",],
  "bv":["https://www.bing.com/videos/search?q=",],
  "g":["https://google.com/search?q=",],
  "gi":["http://www.google.com/images?as_q=",],
  "gf":["https://google.com/search?q=intitle:index.of+%22parent+directory%22+",],
  "n":["https://neeva.com/search?q=",],
  "sx":["https://searx.be/?q=",],
  "w":["https://en.wikipedia.org/wiki/Special:Search?search=",],
  "wf":["https://encyclopedia.thefreedictionary.com/",],
  "yt":["https://www.youtube.com/results?search_query=",],
};

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
