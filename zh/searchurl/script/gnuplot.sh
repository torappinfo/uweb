pkg install gnuplot
(cat<<EOF ;cat /sdcard/uweb/default.acmd)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.acmd
命令:text/plain:%s
函数作图:image/svg+xml:gnuplot -e 'set term svg;set output; plot %s'
函数作图(3d):image/svg+xml:gnuplot -e 'set term svg;set output; splot %s'
EOF

