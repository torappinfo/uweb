apt install less
cd /sdcard/uweb/dict
(cat /sdcard/uweb/home.search;ls *.xz|awk '{print $0 ":c:xz -cdfq -- /sdcard/uweb/dict/" $0,"|less -n +\"/^####%s\""}')|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/home.search

