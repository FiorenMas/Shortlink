#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const async = require('async');
const folder = './release/';

const filesToDownload = [
  {name: 'base1.user.js', url: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js'},
  {name: 'base2.user.js', url: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js'},
  {name: 'base3.user.js', url: 'https://openuserjs.org/install/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.user.js'},
  {name: 'base4.user.js', url: 'https://www.youxiaohou.com/instantpage.user.js'}
];

const filesToEdit = ['ShortLink1-modified.user.js', 'ShortLink2-modified.user.js', 'ShortLink3-modified.user.js', 'instantpage-modified.user.js'];

const editRules = {
  'base1.user.js': {
    removeStrings: [
      'https://free4u.nurul-huda.or.id/?BypassResults=',
      'https://rotator.nurul-huda.sch.id/?BypassResults=',
      "$('a.get-link').text('Bypassed by Bloggerpemula');",
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'if (List.includes(location.host)) {} else {let support = document.createElement(\'iframe\');support.src = \'https://purdasseer.com/idB2Nn6Y8NC0SFF/61239\';support.style.cssText = "width: 1%; height: 1%; border: none;";document.body.appendChild(support);}'
    ],
    replaceStrings: [
      {old: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink1-modified.user.js'},
      {old: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink1-modified.meta.js'}
    ],
    outputName: 'ShortLink1-modified.user.js',
    outputPath: './release/'
  },
  'base2.user.js': {
    removeStrings: [
      'https://rotator.nurul-huda.sch.id/?BypassResults='
    ],
    replaceStrings: [
      {old: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink2-modified.user.js'},
      {old: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.meta.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink2-modified.meta.js'}
    ],
    outputName: 'ShortLink2-modified.user.js',
    outputPath: './release/'
  },
  'base3.user.js': {
    removeStrings: [
      'https://free4u.nurul-huda.or.id/?BypassResults=',
      'https://rotator.nurul-huda.sch.id/?BypassResults=',
      "$('a.get-link').text('Bypassed by Bloggerpemula');",
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'if (List.includes(location.host)) {} else {let support = document.createElement(\'iframe\');support.src = \'https://purdasseer.com/idB2Nn6Y8NC0SFF/61239\';support.style.cssText = "width: 1%; height: 1%; border: none;";document.body.appendChild(support);}'
    ],
    replaceStrings: [
      {old: 'https://openuserjs.org/meta/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.meta.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink3-modified.meta.js'}
    ],
    outputName: 'ShortLink3-modified.user.js',
    outputPath: './release/'
  },
  'base4.user.js': {
    removeStrings: [
      "util.setValue('setting_success_times', util.getValue('setting_success_times') + 1);",
      `GM_registerMenuCommand('🚀 已加速：' + util.getValue('setting_success_times') + '次', () => {
                Swal.fire({
                    showCancelButton: true,
                    title: '确定要重置加速次数吗？',
                    icon: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass: {
                        popup: 'instant-popup',
                    },
                }).then((res) => {
                    if (res.isConfirmed) {
                        util.setValue('setting_success_times', 0);
                        history.go(0);
                    }
                });
            });`
    ],
    replaceStrings: [
      {old: '网页加速器', new: 'Web accelerator'},
      {old: '设置', new: 'Settings'},
      {old: '加速器配置', new: 'Configuration'},
      {old: '加速外部链接', new: 'Accelerate external links'},
      {old: '加速含参数链接', new: 'Accelerate links with parameters'},
      {old: '详见', new: 'See more'},
      {old: '加速扩展/应用商店链接', new: 'Accelerate Extension/App Store Link '},
      {old: '加速链接在当前页打开', new: 'Accelerate links open on the current page'},
      {old: '加速动画效果', new: 'Animation effects when Accelerated'},
      {old: '链接预读延时（毫秒）', new: 'Delay (milliseconds)'},
      {old: '排除下列网址', new: 'Exclude by URLs'},
      {old: '排除下列关键词', new: 'Exclude by Keywords'},
      {old: '保存', new: 'Save'},
      {old: '列表中的域名将不开启加速器，一行一个，例如：www.baidu.com', new: 'One domain per line, Example: www.google.com'},
      {old: '链接中含关键词将不开启加速器，一行一个，例如：logout', new: 'One keyword per line, Example: logout'},
      {old: '点击查看', new: 'Click to view'},
      {old: '使用说明', new: 'instructions'},
      {old: '助手免费开源', new: 'free and open source'},
      {old: 'https://www.youxiaohou.com/instantpage.user.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/instantpage-modified.meta.js'},
      {old: 'https://www.youxiaohou.com/instantpage.user.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/instantpage-modified.user.js'},
      {old: `{
                name: 'enable_store_link',
                value: true
            }, {
                name: 'enable_target_self',
                value: false
            }`, new: `{
                name: 'enable_store_link',
                value: false
            }, {
                name: 'enable_target_self',
                value: true
            }`}
    ],
    outputName: 'instantpage-modified.user.js',
    outputPath: './release/'
  }
};

function downloadFile(file, callback) {
  const fileStream = fs.createWriteStream(file.name);
  https.get(file.url, (response) => {
    response.pipe(fileStream);
    response.on('error', (err) => {
      console.error(err);
      callback(err);
    });
    response.on('end', () => {
      console.log('Downloaded ' + file.name);
      callback(null);
    });
  });
}

function editFile(file, callback) {
  const rules = editRules[file.name];
  fs.readFile(file.name, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }
    for (let removeString of rules.removeStrings) {
      data = data.replace(removeString, '');
    }
    for (let replaceString of rules.replaceStrings) {
      data = data.replace(replaceString.old, replaceString.new);
    }
    fs.writeFile(rules.outputPath + rules.outputName, data, 'utf8', (err) => {
      if (err) {
        console.error(err);
        callback(err);
        return;
      }
      console.log('Edited and saved ' + rules.outputName);
      callback(null);
    });
  });
}

function createMetaFile(file, callback) {
  fs.readFile(folder + file, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }
    const index = data.indexOf('// ==/UserScript==');
    if (index !== -1) {
      const newData = data.slice(0, index + '// ==/UserScript=='.length);
      const newFile = file.replace('.user.js', '.meta.js');
      fs.writeFile(folder + newFile, newData, 'utf-8', (err) => {
        if (err) {
          console.error(err);
          callback(err);
          return;
        }
        console.log('File ' + file + ' edited and saved as ' + newFile);
        callback(null);
      });
    } else {
      console.log('File ' + file + ' does not have the line // ==/UserScript==');
      callback(null);
    }
  });
}

function downloadAndEditAll(filesToDownload, filesToEdit, callback) {
  let downloadTasks = [];
  for (let file of filesToDownload) {
    downloadTasks.push((cb) => downloadFile(file, cb));
  }
  async.parallel(downloadTasks, (err) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }
    let editTasks = [];
    for (let file of filesToDownload) {
      editTasks.push((cb) => editFile(file, cb));
    }
    async.parallel(editTasks, (err) => {
      if (err) {
        console.error(err);
        callback(err);
        return;
      }
      let metaTasks = [];
      for (let file of filesToEdit) {
        metaTasks.push((cb) => createMetaFile(file, cb));
      }
      async.parallel(metaTasks, (err) => {
        if (err) {
          console.error(err);
          callback(err);
          return;
        }
        callback(null);
      });
    });
  });
}

downloadAndEditAll(filesToDownload, filesToEdit, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('All done!');
});
