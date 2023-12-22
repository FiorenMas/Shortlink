#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const async = require('async');

const files = [
  {name: 'base1.user.js', url: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js'},
  {name: 'base2.user.js', url: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.user.js'},
  {name: 'base3.user.js', url: 'https://openuserjs.org/install/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.user.js'}
];

const editRules = {
  'base1.user.js': {
    removeStrings: [
      'https://free4u.nurul-huda.or.id/?BypassResults=',
      'https://rotator.nurul-huda.sch.id/?BypassResults=',
      "$('a.get-link').text('Bypassed by Bloggerpemula');",
      'Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula',
      'if (List.includes(location.host)) {} else {let support = document.createElement(\'iframe\');support.src = \'https://purdasseer.com/idB2Nn6Y8NC0SFF/61239\';support.style.cssText = "width: 1%; height: 1%; border: none;";document.body.appendChild(support);}'
    ],
    replaceStrings: [
      {old: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink1-modified.user.js'},
      {old: 'https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink1-modified.user.js'}
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
      {old: 'https://update.greasyfork.org/scripts/443888/Additional%20Bypass.meta.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink2-modified.user.js'}
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
      'if (List.includes(location.host)) {} else {let support = document.createElement(\'iframe\');support.src = \'https://purdasseer.com/idB2Nn6Y8NC0SFF/61239\';support.style.cssText = "width: 1%; height: 1%; border: none;";document.body.appendChild(support);}'
    ],
    replaceStrings: [
      {old: 'https://openuserjs.org/meta/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.meta.js', new: 'https://github.com/FiorenMas/Shortlink/releases/download/all/ShortLink3-modified.user.js'}
    ],
    outputName: 'ShortLink3-modified.user.js',
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

function downloadAndEditAll(files, callback) {
  let downloadTasks = [];
  for (let file of files) {
    downloadTasks.push((cb) => downloadFile(file, cb));
  }
  async.parallel(downloadTasks, (err) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }
    let editTasks = [];
    for (let file of files) {
      editTasks.push((cb) => editFile(file, cb));
    }
    async.parallel(editTasks, (err) => {
      if (err) {
        console.error(err);
        callback(err);
        return;
      }
      callback(null);
    });
  });
}

downloadAndEditAll(files, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('All done!');
});
