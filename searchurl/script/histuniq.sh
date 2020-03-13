(cat<<EOF ;cat /sdcard/uweb/default.cmds)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.cmds
历史记录去重::awk -F'\t' '!s[\$2]++' /sdcard/uweb/history.log>a.tmp;mv a.tmp /sdcard/uweb/history.log
EOF

