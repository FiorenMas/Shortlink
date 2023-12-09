#!/bin/bash

mkdir ./release
curl -o base1.user.js https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js
curl -o base2.user.js https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js
file1_content=$(cat base1.user.js)
file1_content=${file1_content//"let $ = window.jQuery;let respect = 'https://free4u.nurul-huda.or.id/?BypassResults=';"/"let $ = window.jQuery;let respect = '';"}
file1_content=${file1_content//"function redirect(url, blog = true) {location = blog ? 'https://rotator.nurul-huda.sch.id/?BypassResults=' + url : url;}"/"function redirect(url, blog = true) {location = blog ? '' + url : url;}"}
file1_content=${file1_content//"// @downloadURL https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js"/"// @downloadURL https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink1-modified.user.js"}
file1_content=${file1_content//"// @updateURL https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js"/"// @updateURL https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink1-modified.user.js"}
echo "$file1_content" > ./release/ShortLink1-modified.user.js
file2_content=$(cat base2.user.js)
file2_content=${file2_content//"function redirect(url, blog = true) {location = blog ? 'https://rotator.nurul-huda.sch.id/?BypassResults=' + url : url;}"/"function redirect(url, blog = true) {location = blog ? '' + url : url;}"}
file2_content=${file2_content//"// @downloadURL https://update.greasyfork.org/scripts/443888/Additional%20Bypass.meta.js"/"// @downloadURL https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink2-modified.user.js"}
file2_content=${file2_content//"// @updateURL https://update.greasyfork.org/scripts/443888/Additional%20Bypass.meta.js"/"// @updateURL https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink2-modified.user.js"}
echo "$file2_content" > ./release/ShortLink2-modified.user.js
echo -e "\e[32mThe file has been modified and saved as BypassAllShortLink-modified.user.js\e[0m"