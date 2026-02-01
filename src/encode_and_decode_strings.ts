// 659. Encode and Decode Strings
function encode(strs: string[]): string {
  return strs.map((str) => `${str.length}#${str}`).join("");
}

function decode(str: string): string[] {
  const result: string[] = [];

  let i = 0;
  while (i < str.length) {
    let j = i;
    while (str[j] !== "#") {
      j++;
    }

    const size = parseInt(str.slice(i, j));
    result.push(str.slice(j + 1, j + 1 + size));
    i = j + 1 + size;
  }
  return result;
}

const original = ["hello", "world", "123#456", "", "🔥"];
const encoded = encode(original);
console.log("Encoded:", encoded);

const decoded = decode(encoded);
console.log("Decoded:", decoded);
