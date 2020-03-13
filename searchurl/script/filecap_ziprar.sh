(cat<<EOF ;cat /sdcard/uweb/default.filecap)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.filecap
zip:text/plain:curl -r -1024 -s "%u">tmp.zip;unzip -l tmp.zip
rar:text/plain:curl -r 0-1024 -s "%u">tmp.rar;unrar l tmp.rar
EOF
apt install unzip unrar


