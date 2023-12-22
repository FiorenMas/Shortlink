#!/bin/bash

mkdir ./release
curl -o base1.user.js https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js
curl -o base2.user.js https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js
curl -o base3.user.js https://openuserjs.org/install/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.user.js

file1_content=$(cat base1.user.js)
file1_content=${file1_content//"https://free4u.nurul-huda.or.id/?BypassResults="/""}
file1_content=${file1_content//"https://rotator.nurul-huda.sch.id/?BypassResults="/""}
file1_content=${file1_content//"$('a.get-link').text('Bypassed by Bloggerpemula');"/"$('a.get-link').text('');"}
file1_content=${file1_content//"Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula"/""}
file1_content=${file1_content//"// @downloadURL https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js"/"// @downloadURL https://github.com/$repository/releases/download/all/ShortLink1-modified.user.js"}
file1_content=${file1_content//"// @updateURL https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js"/"// @updateURL https://github.com/$repository/releases/download/all/ShortLink1-modified.user.js"}
echo "$file1_content" > ./release/ShortLink1-modified.user.js
sed -i '/if\s*(.*\s*)*else\s*\{\s*let\s*support\s*=\s*document\.createElement\('iframe'\);.*\}/d' release/ShortLink1-modified.user.js

file2_content=$(cat base2.user.js)
file2_content=${file2_content//"function redirect(url, blog = true) {location = blog ? 'https://rotator.nurul-huda.sch.id/?BypassResults=' + url : url;}"/"function redirect(url, blog = true) {location = blog ? '' + url : url;}"}
file2_content=${file2_content//"// @downloadURL https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js"/"// @downloadURL https://github.com/$repository/releases/download/all/ShortLink2-modified.user.js"}
file2_content=${file2_content//"// @updateURL https://update.greasyfork.org/scripts/443888/Additional%20Bypass.meta.js"/"// @updateURL https://github.com/$repository/releases/download/all/ShortLink2-modified.user.js"}
echo "$file2_content" > ./release/ShortLink2-modified.user.js

file3_content=$(cat base3.user.js)
file3_content=${file3_content//"https://free4u.nurul-huda.or.id/?BypassResults="/""}
file3_content=${file3_content//"https://rotator.nurul-huda.sch.id/?BypassResults="/""}
file3_content=${file3_content//"$('a.get-link').text('Bypassed by Bloggerpemula');"/"$('a.get-link').text('');"}
file3_content=${file3_content//"Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula"/""}
file3_content=${file3_content//"// @updateURL   https://openuserjs.org/meta/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.meta.js"/"// @updateURL https://github.com/$repository/releases/download/all/ShortLink3-modified.user.js"}
echo "$file3_content" > ./release/ShortLink3-modified.user.js
sed -i '/if\s*(.*\s*)*else\s*\{\s*let\s*support\s*=\s*document\.createElement\('iframe'\);.*\}/d' release/ShortLink3-modified.user.js

echo -e "\e[32mThe files has been modified and saved\e[0m"
