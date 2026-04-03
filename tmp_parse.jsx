const fs = require('fs');
const path = 'src/pages/HomePage.jsx';
const text = fs.readFileSync(path, 'utf8');
let stack = [];
const regex = /<(\/)?([a-zA-Z0-9]+)[^>]*?(\/?)>/g;
let m;
while ((m = regex.exec(text)) !== null) {
  const closing = !!m[1];
  const tag = m[2];
  const selfClosing = !!m[3];
  const idx = text.slice(0, m.index).split('\n').length;
  if (selfClosing || tag === 'br' || tag === 'img' || tag === 'input' || tag === 'meta' || tag === 'link') continue;
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
console.log('stack length', stack.length); console.log(stack.slice(-5));
