(cat<<EOF ;cat /sdcard/uweb/default.filecap)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.filecap
search:termux/*:!mkdir search;cd search;curl %u>%s;
EOF

