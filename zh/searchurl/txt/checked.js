(function(){let d=document;
 let ea=d.querySelectorAll('input:checked');
 let s="";
 for(let i=0;i<ea.length;i++){
   let sibling = ea[i].nextElementSibling;
   if(sibling==null) sibling=ea[i].previousElementSibling;
   let str = sibling.getAttribute("href");
   if(null==str) str=sibling.getAttribute("src");
   s = s+str+"\n";
 }
 return s;
})()
