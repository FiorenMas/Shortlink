#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const async = require('async');
const folder = './release/';

const filesToDownload = [
  {name: 'base1.user.js', url: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js'},
  {name: 'base2.user.js', url: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js'},
  {name: 'base4.user.js', url: 'https://www.youxiaohou.com/instantpage.user.js'},
  {name: 'base5.user.js', url: 'https://www.youxiaohou.com/panlinker.user.js'}
]

const filesToEdit = ['ShortLink1-modified.user.js', 'ShortLink2-modified.user.js', 'instantpage-modified.user.js', 'panlinker-modified.user.js'];

const editRules = {
  'base1.user.js': {
    removeStrings: [
      `https://free4u.nurul-huda.or.id/?BypassResults=`,
      `https://free4u.nurul-huda.or.id/?BypassResults=`,
      `https://rotator.nurul-huda.sch.id/?BypassResults=`,
      "$('a.get-link').text('Bypassed by Bloggerpemula');",
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      `Please Wait in @ Seconds , Don't Try to Remove/Replace My Blogs if You Want My Script to be Updated Regularly , Thanks`,
      'if (List.includes(location.host)) {} else {let support = document.createElement(\'iframe\');support.src = \'https://purdasseer.com/idB2Nn6Y8NC0SFF/61239\';support.style.cssText = "width: 1%; height: 1%; border: none;";document.body.appendChild(support);}',
      `let visitors = document.createElement('iframe');visitors.src = 'https://menrealitycalc.com/greasyfork';visitors.style.cssText = "width: 0; height: 0; border: 0;";document.body.appendChild(visitors);let btz = bp('.banner-ad > script:nth-child(9)' || '.panel-body > script:nth-child(7)' || 'div.adb-top > script:nth-child(10)');`,
      `let visitors = document.createElement('iframe');visitors.src = 'https://menrealitycalc.com/openuserjs';visitors.style.cssText = "width: 0; height: 0; border: 0;";document.body.appendChild(visitors);let btz = bp('.banner-ad > script:nth-child(9)' || '.panel-body > script:nth-child(7)' || 'div.adb-top > script:nth-child(10)');`
    ],
    replaceStrings: [
      {old: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink1-modified.user.js'},
      {old: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink1-modified.meta.js'}
    ],
    outputName: 'ShortLink1-modified.user.js',
    outputPath: './release/'
  },
  'base2.user.js': {
    removeStrings: [
      'https://rotator.nurul-huda.sch.id/?BypassResults='
    ],
    replaceStrings: [
      {old: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink2-modified.user.js'},
      {old: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.meta.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink2-modified.meta.js'}
    ],
    outputName: 'ShortLink2-modified.user.js',
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
      {old: 'https://www.youxiaohou.com/instantpage.user.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/instantpage-modified.meta.js'},
      {old: 'https://www.youxiaohou.com/instantpage.user.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/instantpage-modified.user.js'},
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
  },
  'base5.user.js': {
    removeStrings: [
      `if (pan.num === $('#init').val() || pan.license === $('#init').val()) {`,
      `} else {
                await Swal.fire({
                    title: pan.init[3],
                    text: pan.init[4],
                    confirmButtonText: '重新输入',
                    imageUrl: pan.img,
                });
                await this.initDialog();
            }`,
      '<img style="width: 250px;margin-bottom: 10px;" src="${pan.img}" alt="${pan.img}"><input class="swal2-input" id="init" type="text" placeholder="${pan.init[1]}">'
    ],
    replaceStrings: [
      {old: '网盘直链下载助手', new: 'Pan Baidu direct link download assistant'},
      {old: `localhost
// @connect           *`, new: `localhost`},
      {old: "title: pan.init[0]", new: "title: 'Accept license agreement'"},
      {old: "confirmButtonText: '确定'", new: "confirmButtonText: 'Accept'"},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: '下载助手', new: 'Download'},
      {old: 'API下载', new: 'API Download'},
      {old: 'API下载', new: 'API Download'},
      {old: 'API下载', new: 'API Download'},
      {old: 'API下载', new: 'API Download'},
      {old: 'API下载', new: 'API Download'},
      {old: 'API下载', new: 'API Download'},
      {old: 'API下载', new: 'API Download'},
      {old: 'Aria下载', new: 'Aria Download'},
      {old: 'Aria下载', new: 'Aria Download'},
      {old: 'Aria下载', new: 'Aria Download'},
      {old: 'Aria下载', new: 'Aria Download'},
      {old: 'Aria下载', new: 'Aria Download'},
      {old: 'Aria下载', new: 'Aria Download'},
      {old: 'Aria下载', new: 'Aria Download'},
      {old: 'RPC下载', new: 'RPC Download'},
      {old: 'RPC下载', new: 'RPC Download'},
      {old: 'RPC下载', new: 'RPC Download'},
      {old: 'RPC下载', new: 'RPC Download'},
      {old: 'RPC下载', new: 'RPC Download'},
      {old: 'RPC下载', new: 'RPC Download'},
      {old: 'RPC下载', new: 'RPC Download'},
      {old: 'cURL下载', new: 'cURL Download'},
      {old: 'cURL下载', new: 'cURL Download'},
      {old: 'cURL下载', new: 'cURL Download'},
      {old: 'cURL下载', new: 'cURL Download'},
      {old: 'cURL下载', new: 'cURL Download'},
      {old: 'cURL下载', new: 'cURL Download'},
      {old: 'cURL下载', new: 'cURL Download'},
      {old: 'BC下载', new: 'BC Download'},
      {old: 'BC下载', new: 'BC Download'},
      {old: 'BC下载', new: 'BC Download'},
      {old: 'BC下载', new: 'BC Download'},
      {old: 'BC下载', new: 'BC Download'},
      {old: 'BC下载', new: 'BC Download'},
      {old: 'BC下载', new: 'BC Download'},
      {old: `Swal.fire({
                title,
                html,
                footer,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`, new: `Swal.fire({
                html,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`},
      {old: `Swal.fire({
                title,
                html,
                footer,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`, new: `Swal.fire({
                html,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`},
      {old: `Swal.fire({
                title,
                html,
                footer,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`, new: `Swal.fire({
                html,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`},
      {old: `Swal.fire({
                title,
                html,
                footer,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`, new: `Swal.fire({
                html,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`},
      {old: `Swal.fire({
                title,
                html,
                footer,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`, new: `Swal.fire({
                html,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`},
      {old: `Swal.fire({
                title,
                html,
                footer,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`, new: `Swal.fire({
                html,
                allowOutsideClick: false,
                showCloseButton: true,
                showConfirmButton: false,
                position: 'top',
                width,
                padding: '15px 20px 5px',
                customClass,
            })`},
      {old: `提示：请先勾选要下载的文件`, new: `Please choose files you want to download first`},
      {old: `提示：请先勾选要下载的文件`, new: `Please choose files you want to download first`},
      {old: `提示：请先勾选要下载的文件`, new: `Please choose files you want to download first`},
      {old: `提示：请先勾选要下载的文件`, new: `Please choose files you want to download first`},
      {old: `提示：请先勾选要下载的文件`, new: `Please choose files you want to download first`},
      {old: `提示：请先勾选要下载的文件`, new: `Please choose files you want to download first`},
      {old: `提示：请先勾选要下载的文件`, new: `Please choose files you want to download first`},
      {old: `提示：请打开文件夹后勾选文件`, new: `Please open folder and then select files`},
      {old: `提示：请打开文件夹后勾选文件`, new: `Please open folder and then select files`},
      {old: `提示：请打开文件夹后勾选文件`, new: `Please open folder and then select files`},
      {old: `提示：请打开文件夹后勾选文件`, new: `Please open folder and then select files`},
      {old: `提示：请打开文件夹后勾选文件`, new: `Please open folder and then select files`},
      {old: `提示：请打开文件夹后勾选文件`, new: `Please open folder and then select files`},
      {old: `提示：请打开文件夹后勾选文件`, new: `Please open folder and then select files`},
      {old: `提示：请先登录网盘`, new: `Please login first`},
      {old: `提示：请先登录网盘`, new: `Please login first`},
      {old: `提示：请先登录网盘`, new: `Please login first`},
      {old: `提示：请先登录网盘`, new: `Please login first`},
      {old: `提示：请先登录网盘`, new: `Please login first`},
      {old: `提示：请先登录网盘`, new: `Please login first`},
      {old: `title: '提示'`, new: `title: 'Hint'`},
      {old: `请先切换到`, new: `Please switch to`},
      {old: `列表视图`, new: `list view`},
      {old: `点击切换`, new: `Click to switch`},
      {old: `切换成功，请重新获取下载链接`, new: `The switch is successful, please obtain the download link again.`},
      {old: `下载完成，正在弹出浏览器下载框`, new: `Download completed and browser will popup download box`},
      {old: `设置终端类型（当前为：`, new: `Terminal type (Currently:`},
      {old: `设置终端类型（当前为：`, new: `Terminal type (Currently:`},
      {old: `设置终端类型（当前为：`, new: `Terminal type (Currently:`},
      {old: `设置终端类型（当前为：`, new: `Terminal type (Currently:`},
      {old: `设置终端类型（当前为：`, new: `Terminal type (Currently:`},
      {old: `设置终端类型（当前为：`, new: `Terminal type (Currently:`},
      {old: `复制成功，快去粘贴吧！`, new: `Copied successfully!`},
      {old: `复制成功，快去粘贴吧！`, new: `Copied successfully!`},
      {old: `复制成功，快去粘贴吧！`, new: `Copied successfully!`},
      {old: `复制成功，快去粘贴吧！`, new: `Copied successfully!`},
      {old: `复制成功，快去粘贴吧！`, new: `Copied successfully!`},
      {old: `复制成功，快去粘贴吧！`, new: `Copied successfully!`},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '复制全部链接', new: 'Copy all links'},
      {old: '取消下载', new: 'Cancel download'},
      {old: '未发现IDM，使用自带浏览器下载', new: 'Not found IDM, use built-in browser download'},
      {old: '如何唤起IDM？', new: 'How to use IDM?'},
      {old: `⚙️ 设`, new: `⚙️ Settings`},
      {old: `⚙️ Settings置`, new: `⚙️ Settings`},
      {old: `助手配置`, new: `Configuration`},
      {old: `设置成功`, new: `Saved`},
      {old: `设置成功`, new: `Saved`},
      {old: `RPC密钥`, new: `RPC Key`},
      {old: `无密钥无需填写`, new: `Leave it blank if not have key`},
      {old: `RPC主机`, new: `RPC Host`},
      {old: `主机地址，需带上http(s)://`, new: `Host address, begin with http(s)://`},
      {old: `RPC端口`, new: `RPC Port`},
      {old: `端口号，例如：Motrix为16800`, new: `Port number. Example: 16800 for Motrix`},
      {old: `RPC路径`, new: `RPC Path`},
      {old: `路径，默认为/jsonrpc`, new: `Default is /jsonrpc}`},
      {old: `保存路径`, new: `Save location`},
      {old: '文件下载后保存路径，例如：D:', new: 'Path to save files after download. Example: D:'},
      {old: '终端类型', new: 'Terminal type'},
      {old: 'Linux 终端', new: 'Linux terminal'},
      {old: 'MacOS 终端', new: 'MacOS terminal'},
      {old: '主题颜色', new: 'Theme color'},
      {old: 'https://www.youxiaohou.com/panlinker.user.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/panlinker-modified.meta.js'},
      {old: 'https://www.youxiaohou.com/panlinker.user.js', new: 'https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/panlinker-modified.user.js'}
    ],
    outputName: 'panlinker-modified.user.js',
    outputPath: './release/'
  }
};

function downloadFile(file, callback) {
  https.get(file.url, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(file.name);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log('Downloaded ' + file.name);
        callback(null);
      });
    } else {
      console.error('File not found: ' + file.name);
      callback(new Error('File not found'));
    }
    response.on('error', (err) => {
      console.error(err);
      callback(err);
    });
  }).on('error', (err) => {
    console.error('Error with the request:', err.message);
    callback(err);
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
