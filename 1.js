let fileContent = fs.readFileSync('release/ShortLink1-modified.user.js', 'utf8');
let regex = /if\s*\(.+\)\s*\{\s*\}\s*else\s*\{[^}]*document\.createElement\('iframe'\)[^}]*\}/g;
let newContent = fileContent.replace(regex, '');
fs.writeFileSync('release/ShortLink1-modified.user.js', newContent, 'utf8');
