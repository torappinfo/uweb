apt install less
cd /sdcard/Download/dict
(cat /data/data/info.torapp.uweb/files/home5.search;ls *.xz|awk '{print $0 ":c:xz -cdfq -- /sdcard/Download/dict/" $0,"|less -n +\"/^####%s\""}')|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /data/data/info.torapp.uweb/files/home5.search

