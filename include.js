#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const regexParser = require('regex-parser');
const pattern1 = /BypassedByBloggerPemula\((.*?),/;
const pattern2 = /BloggerPemula\('([^']+)',/;
const pattern3 = /RemoveBp\('([^']+)',/;
const pattern4 = /case '(.*?)':/;
const pattern5 = /h\.href\.includes\('(.*?)'\)/;
function regexToIncludeLine(regex) {
  if (regex.includes('|') || regex.includes('(') || regex.includes(')') || regex.includes('*')) {
    regex = '(' + regex + ')';
    includeLine = '// @include /^(https?:\/\/)(.+?)' + regex + '(\/.*)/';
    includeLine = includeLine.replace( '\\.*)(\/.*)/', '\\.*)/' );
  }
  else {
    includeLine = '// @match *://*.' + regex + '/*';
  }
  return includeLine;
}
function generateIncludeLines(regexList) {
  let includeLines = [];
  for (let regex of regexList) {
    let includeLine = regexToIncludeLine(regex);
    includeLines.push(includeLine);
  }
  return includeLines;
}
function writeToFile(filename, lines) {
  fs.writeFile(filename, lines.join('\n'), 'utf8', (err) => {
    if (err) {
      console.error(`Error: Failed to write to ${filename}`);
    }
    else {
      console.log(`OK: Generated ${filename}`);
    }
  });
}
function compileAndPrint(regexStrings) {
  let includeLines = generateIncludeLines(regexStrings);
  writeToFile('includes.txt', includeLines);
}
function readAndReplaceIncludeLines() {
  fs.readFile('includes.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error: Failed to read includes.txt`);
    }
    else {
      let includeLines = data.split('\n').find(line => line === '// @match *');
      fs.readFile('./release/ShortLink1-modified-include.user.js', 'utf8', (err, data) => {
        if (err) {
          console.error(`Error: Failed to read ShortLink1-modified-include.user.js`);
        }
        else {
          let newData = data.replace('// @match          *://*/*', includeLines);
          fs.writeFile('./release/ShortLink1-modified-include.user.js', newData, 'utf8', (err) => {
            if (err) {
              console.error(`Error: Failed to write to ShortLink1-modified-include.user.js`);
            }
            else {
              console.log(`OK: Replaced the include lines in ShortLink1-modified-include.user.js`);
            }
          });
        }
      });
    }
  });
}
function findAndReplaceURLs() {
  fs.readFile('./release/ShortLink1-modified-include.user.js', 'utf8', (err, data) => {
    if (err) {
      console.error(`Error: Failed to read ShortLink1-modified-include.user.js`);
    }
    else {
      let newData = data.replace('// @downloadURL https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink1-modified.user.js',
      '// @downloadURL https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink1-modified-include.user.js');
      newData = newData.replace('// @updateURL https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink1-modified.meta.js',
      '// @updateURL https://raw.githubusercontent.com/FiorenMas/Shortlink/release/release/ShortLink1-modified-include.user.js');
      fs.writeFile('./release/ShortLink1-modified-include.user.js', newData, 'utf8', (err) => {
        if (err) {
          console.error(`Error: Failed to write to ShortLink1-modified-include.user.js`);
        }
        else {
          console.log(`OK: Replaced the URLs in ShortLink1-modified-include.user.js`);
        }
      });
    }
  });
}
function main() {
  let filePath = './release/ShortLink1-modified-include.user.js';
  let rl = readline.createInterface({
    input: fs.createReadStream(filePath, 'utf8'),
    output: null,
    terminal: false
  });
  let regexStrings = [];
  rl.on('line', (line) => {
    let match1 = line.match(pattern1);
    let match2 = line.match(pattern2);
    let match3 = line.match(pattern3);
    let match4 = line.match(pattern4);
    let match5 = line.match(pattern5);
    if (match1) {
      let regex = match1[1].replace(/\//g, '');
      regexStrings.push(regex);
    }
    if (match2) {
      let regex = match2[1];
      regexStrings.push(regex);
    }
    if (match3) {
      let regex = match3[1];
      regexStrings.push(regex);
    }
    if (match4) {
      let regex = match4[1];
      regexStrings.push(regex);
    }
    if (match5) {
      let regex = match5[1];
      regexStrings.push(regex);
    }
  });
  rl.on('close', () => {
    regexStrings = regexStrings.filter((s) => s.includes('.') && s.length >= 5);
    let blockedWordsForIncludes = [
      'google',
      'youtube'
    ];
    regexStrings = regexStrings.filter((s) => !blockedWordsForIncludes.some((word) => s.includes(word)));
    compileAndPrint(regexStrings);
    readAndReplaceIncludeLines();
  });
}
main();
findAndReplaceURLs();
