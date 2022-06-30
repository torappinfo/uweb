(cat<<EOF ;cat /sdcard/uweb/default.filecap)|awk -F: '!s[$1]++'>a.tmp;mv a.tmp /sdcard/uweb/default.filecap
m3u8:text/html:echo '<video controls width=100% height=100%><source src="%u"></video>'
mp3:text/html:echo '<audio controls width=100% height=100%><source src="%u"></audio>'
m4b:text/html:echo '<audio controls width=100% height=100%><source src="%u"></audio>'
mp4:text/html:echo '<video controls width=100% height=100%><source src="%u"></video>'
mkv:text/html:echo '<video controls width=100% height=100%><source src="%u"></video>'
doc::am start --user 0 -a android.intent.action.VIEW -d "%u" -t "application/vnd.ms-word"
xls::am start --user 0 -a android.intent.action.VIEW -d "%u" -t "application/vnd.ms-excel"
ppt::am start --user 0 -a android.intent.action.VIEW -d "%u" -t "application/vnd.ms-powerpoint"
docx::am start --user 0 -a android.intent.action.VIEW -d "%u" -t "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
xlsx::am start --user 0 -a android.intent.action.VIEW -d "%u" -t "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
pptx::am start --user 0 -a android.intent.action.VIEW -d "%u" -t "application/vnd.openxmlformats-officedocument.presentationml.presentation"
EOF

