apt install xz-utils grep less
cd /sdcard/Download/dict
(cat /data/data/info.torapp.uweb/files/home5.search;ls *.xz|awk -F: '{print $0 "G:c:xz -cdfq /sdcard/Download/dict/" $0,"|grep -i \\\\'%s\\\\'|less" }')|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /data/data/info.torapp.uweb/files/home5.search

