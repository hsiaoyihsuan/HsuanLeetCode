// 659. Encode and Decode Strings
function encode(strs: string[]): string {
  return strs.map((str) => `${str.length}#${str}`).join("");
}

function decode(s: string): string[] {
  const result: string[] = [];
  let num: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "#") {
      const count = parseInt(num.join(""));
      num = [];
      const word = s.slice(i + 1, i + 1 + count);
      result.push(word);
      i += count;
    } else {
      num.push(s[i]!);
    }
  }
  return result;
}

const original = ["hello", "world", "123#456", "", "🔥"];
const encoded = encode(original);
console.log("Encoded:", encoded);

const decoded = decode(encoded);
console.log("Decoded:", decoded);
