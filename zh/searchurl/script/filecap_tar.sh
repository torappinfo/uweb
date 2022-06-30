(cat<<EOF ;cat /sdcard/uweb/default.filecap)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.filecap
txt:text/plain:curl -r 0-10240 -s "%u"
tar.xz:text/plain:curl -r 0-10240 -s "%u"|tar -J -t
tar.gz:text/plain:curl -r 0-10240 -s "%u"|tar -J -t
tgz:text/plain:curl -r 0-10240 -s "%u"|tar -J -t
tar:text/plain:curl -r 0-10240 -s "%u"|tar -t
EOF

