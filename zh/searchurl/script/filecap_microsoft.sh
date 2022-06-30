(cat<<EOF ;cat /sdcard/uweb/default.filecap)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.filecap
m3u8:text/html:echo '<video controls width=100% height=100%><source src="%u"></video>'
mp3:text/html:echo '<audio controls width=100% height=100%><source src="%u"></audio>'
m4b:text/html:echo '<audio controls width=100% height=100%><source src="%u"></audio>'
mp4:text/html:echo '<video controls width=100% height=100%><source src="%u"></video>'
mkv:text/html:echo '<video controls width=100% height=100%><source src="%u"></video>'
doc:uweb:echo https://view.officeapps.live.com/op/view.aspx?src=%U
xls:uweb:echo https://view.officeapps.live.com/op/view.aspx?src=%U
ppt:uweb:echo https://view.officeapps.live.com/op/view.aspx?src=%U
docx:uweb:echo https://view.officeapps.live.com/op/view.aspx?src=%U
xlsx:uweb:echo https://view.officeapps.live.com/op/view.aspx?src=%U
pptx:uweb:echo https://view.officeapps.live.com/op/view.aspx?src=%U
EOF

