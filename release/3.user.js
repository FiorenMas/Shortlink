// ==UserScript==
// @name       Additional Bypass
// @namespace  Violentmonkey Scripts
// @match      *://*.offerwallmedia.com/*
// @match      *://*.offers4crypto.xyz/*
// @match      *://*.dripoffers.com/*
// @match      *://*.adwallgate.com/*
// @match      *://*.bitcotasks.com/*
// @match      *://*.ewall.biz/*
// @grant      none
// @version    7.2
// @author     Bloggerpemula
// @run-at     document-start
// @description Bypass Addition for Bypass All Shortlinks
// @require    https://code.jquery.com/jquery-3.6.0.min.js
// @require    https://cdnjs.cloudflare.com/ajax/libs/xhook/1.4.9/xhook.js
// @require    https://cdnjs.cloudflare.com/ajax/libs/jimp/0.22.10/jimp.min.js
// @downloadURL https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/3.user.js
// @updateURL  https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/3.meta.js
// ==/UserScript==
!function(){"use strict";const e=e=>document.querySelector(e),t=new URLSearchParams(location.search);function n(e){return new Promise((t=>setTimeout(t,e)))}function o(e,t=!1){location=t?""+e:e}function c(t){return new Promise((function(n,o){let c=e(t);c?n(c):new MutationObserver((function(o,a){c=e(t),c&&(n(c),a.disconnect())})).observe(document.documentElement,{childList:!0,subtree:!0})}))}function a(){c("#validateVisit").then(xhook.after((async function(t,o,c){if(t.url.match(/captcha\/request\.php$/)){const c=t.url.replace(/captcha\/request\.php$/,""),i=JSON.parse(o.text),r=new Map;var a="";xhook.disable();let s=0;for(let e=0;e<i.length;e++)Jimp.read(c+"captcha/request.php?cid=0&hash="+i[e]).then((function(t){t.getBase64(Jimp.AUTO,(function(t,n){r.has(n)?a||(a=n):r.set(n,i[e]),s+=1}))}));for(let e=0;e<5&&s!=i.length;e++)await n(2e3);if(s==i.length&&2==r.size)for(let[t,n]of r)t!=a&&(e("[name='captcha-hf']").value=r.get(t),$.ajax({url:c+"captcha/request.php",type:"POST",data:{cID:0,pC:r.get(t),rT:2},success:function(){$("div.captcha-modal__icons > div:nth-child(1)").trigger("success")},error:function(){console.log("An Error Occurred When Solving the Captcha")}}));else console.log("Sorry Images Cannot be identified")}else c()})))}function i(){window.jQuery;!function(e,n,c){if(!e.test(location.host))return;if("function"==typeof n)return n();if(Array.isArray(n)&&(n={"/":n}),!(location.pathname in n))return;const[a,i]=n[location.pathname];if("object"==typeof a&&a.test(location.search))return o(i+RegExp.$1,c);t.has(a)&&o(i+t.get(a),c)}(/(bitcotasks|adwallgate|dripoffers|offerwallmedia).com|offers4crypto.xyz|ewall.biz/,(function(){location.href.includes("lead/")&&a()}))}["interactive","complete"].includes(document.readyState)?i():document.addEventListener("DOMContentLoaded",i)}();