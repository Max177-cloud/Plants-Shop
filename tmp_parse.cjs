const fs = require('fs');
const path = 'src/pages/HomePage.jsx';
const text = fs.readFileSync(path, 'utf8');
let stack = [];
const regex = /<(\/)?([a-zA-Z0-9]+)[^>]*?(\/?)>/g;
let m;
while ((m = regex.exec(text)) !== null) {
  const closing = !!m[1];
  const tag = m[2];
  const selfClosing = !!m[3] || ['br','img','input','meta','link','path','svg','circle','rect','line','textarea'].includes(tag);
  const idx = text.slice(0, m.index).split('\n').length;
  if (selfClosing) continue;
  if (!closing) {
    stack.push({tag, line: idx, pos: m.index});
  } else {
    if (stack.length === 0) {
      console.log('extra close', tag, 'at line', idx);
      continue;
    }
    const top = stack[stack.length-1];
    if (top.tag === tag) {
      stack.pop();
    } else {
      console.log('mismatch close', tag, 'at line', idx, 'expected', top.tag);
      stack.pop();
    }
  }
}
console.log('stack length', stack.length);
if(stack.length>0) console.log('top stack', stack.slice(-10));
