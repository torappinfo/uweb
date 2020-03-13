apt install xz-utils grep less
cd /sdcard/uweb/dict
(cat /sdcard/uweb/home.search;ls *.xz|awk -F: '{print $0 "G:c:xz -cdfq /sdcard/uweb/dict/" $0,"|grep -i \\\'%s\\\'|less" }')|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/home.search

