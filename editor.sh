#!/bin/bash

mkdir ./release
curl -o base.user.js https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js
file_content=$(cat base.user.js)
file_content=${file_content//"let $ = window.jQuery;let respect = 'https://free4u.nurul-huda.or.id/?BypassResults=';"/"let $ = window.jQuery;let respect = '';"}
file_content=${file_content//"function redirect(url, blog = true) {location = blog ? 'https://rotator.nurul-huda.sch.id/?BypassResults=' + url : url;}"/"function redirect(url, blog = true) {location = blog ? '' + url : url;}"}
echo "$file_content" > ./release/BypassAllShortLink-modified.user.js
echo -e "\e[32mThe file has been modified and saved as BypassAllShortLink-modified.user.js\e[0m"