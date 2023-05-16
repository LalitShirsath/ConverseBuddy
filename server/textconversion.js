let M;

let map1;
let map2;

function initialize() {
  M = 62;
  map1 = new Map();
  map2 = new Map();

  map1.set(" ", 62);
  map2.set(62, " ");
  map1.set(".", 63);
  map2.set(63, ".");
  map1.set(",", 64);
  map2.set(64, ",");
  map1.set("!", 65);
  map2.set(65, "!");
  map1.set("\n", 66);
  map2.set(66, "\n");

  M += map1.size;
}

function code(c) {
  if (c >= "A" && c <= "Z") return c.charCodeAt(0) - "A".charCodeAt(0);
  else if (c >= "a" && c <= "z")
    return c.charCodeAt(0) - "a".charCodeAt(0) + 26;
  else if (c >= "0" && c <= "9")
    return c.charCodeAt(0) - "0".charCodeAt(0) + 52;
  else {
    return map1.get(c) || 0;
  }
}

function rev(x) {
  if (x >= 0 && x <= 25) return String.fromCharCode(x + "A".charCodeAt(0));
  else if (x >= 26 && x <= 51)
    return String.fromCharCode(x - 26 + "a".charCodeAt(0));
  else if (x >= 52 && x <= 61)
    return String.fromCharCode(x - 52 + "0".charCodeAt(0));
  else {
    return map2.get(x) || "0";
  }
}

function generateKey(str, keyword) {
  const n = str.length;
  const m = keyword.length;
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr[i] = keyword.charAt(i % m);
  }

  return arr.join("");
}

function encryptVigenere(str, key) {
  const n = str.length;
  const sb = [];

  for (let i = 0; i < n; i++) {
    const num = (code(str.charAt(i)) + code(key.charAt(i))) % M;
    sb.push(rev(num));
  }

  return sb.join("");
}

function decryptVigenere(dec, key) {
  const sb = [];
  const n = dec.length;

  for (let i = 0; i < n; i++) {
    let num2 = (code(dec.charAt(i)) - code(key.charAt(i))) % M;
    if (num2 < 0) num2 += M;

    sb.push(rev(num2));
  }

  return sb.join("");
}

function encryptPolybius(str, key) {
  const sb = [];
  const n = str.length;

  for (let i = 0; i < n; i++) {
    const num = code(str.charAt(i));
    const row = Math.floor(num / 10);
    const col = num % 10;
    sb.push(row);
    sb.push(col);
  }
  return sb.join("");
}

function decryptPolybius(str, key) {
  let sb = "";
  const n = str.length;

  for (let i = 0; i < n; i += 2) {
    const num = (str.charAt(i) - "0") * 10 + (str.charAt(i + 1) - "0");
    sb += rev(num);
  }

  return sb;
}

let key;

export function Encrypt(message) {
  initialize();

  let keyword = "LALIT";
  key = generateKey(message, keyword);

  const cipher1 = encryptVigenere(message, key);
  //   console.log("vigenere cipher: " + cipher1);

  const cipher2 = encryptPolybius(cipher1, key);
  //   console.log("Polybius cipher: " + cipher2);

  return cipher2;
}

export function Decrypt(message) {
  let keyword = "LALIT";
  key = generateKey(message, keyword);

  if (typeof message === "string" && message !== undefined) {
    const dec1 = decryptPolybius(message, key);
    // console.log("poly dec: " + dec1);

    const dec2 = decryptVigenere(dec1, key);
    // console.log("vig dec: " + dec2);

    return dec2;
  }

  return "undefined string";
}
