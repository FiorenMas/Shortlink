#!/bin/bash

mkdir ./release
curl -o base1.user.js https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js
curl -o base2.user.js https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js
curl -o base3.user.js https://openuserjs.org/install/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.user.js

file1_content=$(cat base1.user.js)
file1_content=${file1_content//"let $ = window.jQuery;let respect = 'https://free4u.nurul-huda.or.id/?BypassResults=';"/"let $ = window.jQuery;let respect = '';"}
file1_content=${file1_content//"function redirect(url, blog = true) {location = blog ? 'https://rotator.nurul-huda.sch.id/?BypassResults=' + url : url;}"/"function redirect(url, blog = true) {location = blog ? '' + url : url;}"}
file1_content=${file1_content//"// @downloadURL https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js"/"// @downloadURL https://github.com/$repository/releases/download/all/ShortLink1-modified.user.js"}
file1_content=${file1_content//"// @updateURL https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js"/"// @updateURL https://github.com/$repository/releases/download/all/ShortLink1-modified.user.js"}
echo "$file1_content" > ./release/ShortLink1-modified.user.js
sed -i "s/let list = \['free4u.nurul-huda.or.id', 'rotator.nurul-huda.sch.id'\]; if (list.includes(location.host)) {} else {let support = document.createElement('iframe');support.src = 'https:\/\/purdasseer.com\/idB2Nn6Y8NC0SFF\/61239';support.style.cssText = \"width: 1%; height: 1%; border: none;\";document.body.appendChild(support);}/let list = \['free4u.nurul-huda.or.id', 'rotator.nurul-huda.sch.id'\];/" release/ShortLink1-modified.user.js

file2_content=$(cat base2.user.js)
file2_content=${file2_content//"function redirect(url, blog = true) {location = blog ? 'https://rotator.nurul-huda.sch.id/?BypassResults=' + url : url;}"/"function redirect(url, blog = true) {location = blog ? '' + url : url;}"}
file2_content=${file2_content//"// @downloadURL https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js"/"// @downloadURL https://github.com/$repository/releases/download/all/ShortLink2-modified.user.js"}
file2_content=${file2_content//"// @updateURL https://update.greasyfork.org/scripts/443888/Additional%20Bypass.meta.js"/"// @updateURL https://github.com/$repository/releases/download/all/ShortLink2-modified.user.js"}
echo "$file2_content" > ./release/ShortLink2-modified.user.js

file3_content=$(cat base3.user.js)
file3_content=${file3_content//"let $ = window.jQuery;let respect = 'https://free4u.nurul-huda.or.id/?BypassResults=';"/"let $ = window.jQuery;let respect = '';"}
file3_content=${file3_content//"function redirect(url, blog = true) {location = blog ? 'https://rotator.nurul-huda.sch.id/?BypassResults=' + url : url;}"/"function redirect(url, blog = true) {location = blog ? '' + url : url;}"}
file3_content=${file3_content//"if (list.includes(location.host)) {} else {let support = document.createElement('iframe');support.src = 'https://purdasseer.com/idB2Nn6Y8NC0SFF/61239';support.style.cssText = "width: 1%; height: 1%; border: none;";document.body.appendChild(support);}"/"if (list.includes(location.host)) {} else {}"}
file3_content=${file3_content//"// @updateURL   https://openuserjs.org/meta/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.meta.js"/"// @updateURL https://github.com/$repository/releases/download/all/ShortLink3-modified.user.js"}
echo "$file3_content" > ./release/ShortLink3-modified.user.js
sed -i "s/let list = \['free4u.nurul-huda.or.id', 'rotator.nurul-huda.sch.id'\]; if (list.includes(location.host)) {} else {let support = document.createElement('iframe');support.src = 'https:\/\/purdasseer.com\/idB2Nn6Y8NC0SFF\/61239';support.style.cssText = \"width: 1%; height: 1%; border: none;\";document.body.appendChild(support);}/let list = \['free4u.nurul-huda.or.id', 'rotator.nurul-huda.sch.id'\];/" release/ShortLink3-modified.user.js

echo -e "\e[32mThe files has been modified and saved\e[0m"
