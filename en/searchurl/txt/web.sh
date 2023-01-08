#!/usr/bin/dash
#usage: g [engine] word1 word2 ...

default=''
g="https://www.google.com.hk/search?q="
yt="https://www.youtube.com/results?search_query="
m="http://www.merriam-webster.com/dictionary/"
w="http://en.wikipedia.org/wiki/"
wd="https://en.wiktionary.org/wiki/"
b="http://www.bing.com/search?intlF=1&q="
ks="http://www.iciba.com/"
en="http://www.enacademic.com/searchall.php?SWord="
gen="http://gen.lib.rus.ec/search.php?req="
abb="http://audiobookbay.li/?s="

bd="https://www.baidu.com/s?wd="
gb="https://www.gigablast.com/search?q="
yd="http://dict.youdao.com/search?q="
a="http://www.amazon.com/s?url=search-alias%3Daps&field-keywords="
bdic="http://cn.bing.com/dict/search?q="
be="http://www.britannica.com/search?query="
u="http://www.urbandictionary.com/define.php?term="
o="http://en.oxforddictionaries.com/definition/"

eval engine=\$${1:-default}         #engine=$(eval echo \${$1})

shift  #concate second argument to the last one with +
string=$1  
shift
for a in "$@"
do
  string+="+$a"
done

echo $engine$string
