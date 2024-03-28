// ==UserScript==
// @name        Bypass All Shortlinks Manual Captcha
// @namespace   Violentmonkey Scripts
// @author      Bloggerpemula
// @version     91.6
// @match       *://*/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @run-at      document-start
// @connect     nocaptchaai.com
// @grant       GM_xmlhttpRequest
// @grant       window.onurlchange
// @grant       GM_registerMenuCommand
// @icon        https://i.ibb.co/qgr0H1n/BASS-Blogger-Pemula.png
// @copyright   2022+, Bloggerpemula (https://openuserjs.org/users/Bloggerpemula)
// @license     CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
// @updateURL   https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink3-modified.meta.js
// @license     GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @require     https://update.greasyfork.org/scripts/439099/1203718/MonkeyConfig%20Modern%20Reloaded.js
// @description Bypass All Shortlinks Sites Automatically Skips Annoying Link Shorteners , Skip AdFly , Linkvertise and No Annoying Ads, Directly to Your Destination and now Support Auto Downloading Your Files
// @exclude /^(https?:\/\/)(.+)?((advertisingexcel|talkforfitness|rsadnetworkinfo|rsinsuranceinfo|rsfinanceinfo|rssoftwareinfo|rshostinginfo|rseducationinfo|gametechreviewer|vegan4k|phineypet|batmanfactor|techedifier|urlhives|linkhives|github|freeoseocheck|greenenez|aliyun|reddit|bing|yahoo|wiki-topia|edonmanor|vrtier|whatsapp|gearsadviser|edonmanor|tunebug|menrealitycalc|amazon|ebay|payoneer|paypal|skrill|stripe|tipalti|wise|discord|tokopedia|taobao|taboola|aliexpress|netflix|citigroup|spotify|bankofamerica|hsbc|(cloud|mail|translate|analytics|accounts|myaccount|contacts|clients6|developers|payments|pay|ogs|safety|wallet).google|(login|signup|account|officeapps|api|mail|hotmail).live).com|(thumb8|thumb9|crewbase|crewus|shinchu|shinbhu|ultraten|uniqueten|topcryptoz|allcryptoz|coinsvalue|cookinguide|cryptowidgets|webfreetools|carstopia|makeupguide|carsmania|nflximg|doubleclick).net|(linksfly|shortsfly|urlsfly|wefly|blog24).me|(greasyfork|openuserjs|adarima|telegram|wikipedia).org|mcrypto.club|misterio.ro|insurancegold.in|coinscap.info|chefknives.expert|(shopee|lazada|rakuten|maybank).*|(dana|ovo|bca.co|bri.co|bni.co|bankmandiri.co|desa|(.*).go).id|(.*).edu|(.*).gov)(\/.*)/
// ==/UserScript==