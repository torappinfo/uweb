(cat /data/data/com.termux/files/usr/etc/apt/sources.list;cat<<EOF )|awk '!s[$0]++'>a.tmp;mv a.tmp /data/data/com.termux/files/usr/etc/apt/sources.list
deb [trusted=yes] http://termux.iikira.com stable main
EOF

apt update
apt upgrade
apt install baidupcs-go
BaiduPCS-Go config set -appid=266719
(cat /sdcard/uweb/default.longclick;cat<<HERE )|awk '!s[$0]++'>a.tmp;mv a.tmp /sdcard/uweb/default.longclick
百度离线下载:/data/data/com.termux/files/usr/bin/BaiduPCS-Go od add
HERE
BaiduPCS-Go login

