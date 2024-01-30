#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
function extractRegexFromJs(jsCode) {
    const pattern1 = /(?<!\/\/)BypassedByBloggerPemula\((.*?),/g;
    let matches1 = [...jsCode.matchAll(pattern1)].map(match => match[1].trim('/'));
    const pattern2 = /(?<!\/\/)BloggerPemula\('([^']+)',/g;
    let matches2 = [...jsCode.matchAll(pattern2)].map(match => match[1]);
    const pattern3 = /(?<!\/\/)RemoveBp\('([^']+)',/g;
    let matches3 = [...jsCode.matchAll(pattern3)].map(match => match[1]);
    const pattern4 = /(?<!\/\/)case '(.*?)':/g;
    let matches4 = [...jsCode.matchAll(pattern4)].map(match => match[1]);
    const pattern5 = /h\.href\.includes\('(.*?)'\)/g;
    let matches5 = [...jsCode.matchAll(pattern5)].map(match => match[1]);
    return [...matches1, ...matches2, ...matches3, ...matches4, ...matches5];
}
function writeListOfStringsToFile(filename, lines) {
    fs.writeFileSync(filename, lines.join('\n'), { encoding: 'utf-8' });
    console.log(`OK: Generated ${filename}`);
}

function generateIncludeLines(regexList) {
    let includeRules = [];
    let matchRules = [];
    let includeAndMatchLines = [];

    regexList.forEach(regex => {
        regex = regex.replace(/\/|\\/g, '');
        //regex = regex.replace(/\//g, '').replace(/\\/g, '');
        if (/[|()*]/.test(regex)) {
            regex = '(' + regex + ')';
            let includeRule = `/^(https?:\\/\\/)(.+)?${regex}(\\/.*)/`;
            includeRules.push(includeRule);
            let includeLine = "// @include " + includeRule;
            includeAndMatchLines.push(includeLine);
        } else {
            let matchRule = `*://*.${regex}/*`;
            matchRules.push(matchRule);
            let matchLine = '// @match ' + matchRule;
            includeAndMatchLines.push(matchLine);
        }
    });
    writeListOfStringsToFile('includes.txt', includeAndMatchLines);
}

function include_write() {
    const fs = require('fs');
    let script_lines = fs.readFileSync('./release/ShortLink1-modified-include.user.js', 'utf-8').split('\n');
    let includes_content = fs.readFileSync('includes.txt', 'utf-8');
    script_lines = script_lines.filter(s => !(s.startsWith("// @description:") || s.startsWith("// @name:")));
    script_lines = script_lines.filter(line => !line.includes('@match') && !line.includes('@include'));
    let last_description_line_index = null;
    for (let i = script_lines.length - 1; i >= 0; i--) {
        if (script_lines[i].startsWith('// @description')) {
            last_description_line_index = i;
            break;
        }
    }
    script_lines.splice(last_description_line_index + 1, 0, includes_content);
    fs.writeFileSync('./release/ShortLink1-modified-include.user.js', script_lines.join('\n'));
    console.log(`@Include lines added.`);
}
function findAndReplaceURLs() {
  fs.readFileSync('./release/ShortLink1-modified-include.user.js', 'utf8', (err, data) => {
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
    const filePath = './release/ShortLink1-modified-include.user.js';
    try {
        const jsCode = fs.readFileSync(filePath, { encoding: 'utf-8' });
        let regexStrings = extractRegexFromJs(jsCode);
        regexStrings = regexStrings.filter(s => s.includes('.') && s.length >= 5);
        const blockedWordsForIncludes = [
            "google",
            "youtube",
            "twitter.com",
            "tiktok.com",
            "vk.com"
        ];
        regexStrings = regexStrings.filter(s => !blockedWordsForIncludes.some(word => s.includes(word)));
        generateIncludeLines(regexStrings);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: File '${filePath}' not found.`);
        } else {
            console.error(`An error occurred: ${error}`);
        }
    }
}
main();
include_write();
findAndReplaceURLs();
