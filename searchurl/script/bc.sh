pkg install bc
(cat<<EOF ;cat /sdcard/uweb/default.acmd)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.acmd
超级计算器:text/html:echo "%s"|bc -l -q
EOF

