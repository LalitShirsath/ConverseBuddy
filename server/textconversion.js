
function generateKey(str,key){
    key=key.split("");
    if(str.length == key.length)
        return key.join("");
    else
    {
        let temp=key.length;   
        for (let i = 0;i<(str.length-temp) ; i++)
        {
            key.push(key[i % ((key).length)])
        }
    }
    return key.join("");
}
 
// This function returns the encrypted text
// generated with the help of the key
function cipherText(str,key)
{
    let cipher_text="";
  
    for (let i = 0; i < str.length; i++)
    {
        // converting in range 0-25
        let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) %26;
  
        // convert into alphabets(ASCII)
        x += 'A'.charCodeAt(0);
  
        cipher_text+=String.fromCharCode(x);
    }
    return cipher_text;
}
 
// This function decrypts the encrypted text
// and returns the original text
function originalText(cipher_text, key)
{
    let orig_text="";
  
    for (let i = 0 ; i < cipher_text.length ; i++)
    {
        // converting in range 0-25
        let x = (cipher_text[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) %26;
  
        // convert into alphabets(ASCII)
        x += 'A'.charCodeAt(0);
        orig_text+=String.fromCharCode(x);
    }

    return orig_text;
}

// This function will convert the lower
// case character to Upper case
function LowerToUpper(s)
{
    let str =(s).split("");
    for(let i = 0; i < s.length; i++)
    {
        if(s[i] == s[i].toLowerCase())
        {
            str[i] = s[i].toUpperCase();
        }
    }
    s = str.toString();
    return s;
}

// function isCharacterALetter(char) {
//   return (/[a-zA-Z]/).test(char)
// }
 



// dont keep them here, they are changing to undefined while decrypt

let key;
// let originalMessage;


export function Encrypt(message){
    let keyword = "LALIT";
    // originalMessage = message;
    
    // key = generateKey(message, keyword);

    key = "LALIT"; 
    console.log("key in Encryption", key);

    let arr = message.split(" ");
    
    for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].toUpperCase();
        arr[i] = cipherText(arr[i], key);
    }
    
    let encryptedMessage = arr.join(" ");

    return encryptedMessage;
}


export function Decrypt(message){
    // console.log("printing msg : ",message);
    // return originalText(message, key);

    let keyword = "LALIT";
    // key = generateKey(message, keyword);
    key = "LALIT"; 

    if(typeof message === 'string' && message !== undefined){
        let arr = message.split(" ");
        
        console.log("key in Decryption", key);
        
        for(let i=0;i<arr.length;i++){
            arr[i] = originalText(arr[i], key);
        }
        
        let res = arr.join(" ");

        let outputArr = res.split("");
        
        for(let i=0;i<outputArr.length;i++){
            outputArr[i] = outputArr[i].toLowerCase();
        }

        let output = outputArr.join("");;
        // console.log("in conversion algo: ",output);
        return output;

    }

    return "undefined string";
}
