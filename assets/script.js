var isStarted = false;

function start() {
  if (confirm ("Would you like to enter your password criterias?\nCancel for default")) {
    //let user chose critiera's for pw
    let length = choseLength();
    let includeLowerCase = confirm("Would you like your password to include lower case characters?\nCancel=No");
    let includeUpperCase = confirm("Would you like your password to include upper case characters?\nCancel=No");
    let includeNumeric = confirm("Would you like your password to include numbers?\nCancel=No");
    let includeSpecialChars = confirm("Would you like your password to include special characters?\nCancel=No");
    
    //call function to generate pw and dispaly it
    document.getElementById("pw").innerHTML = generatePw(length, includeLowerCase, includeUpperCase, includeNumeric, includeSpecialChars);
  } else {
    //default
    document.getElementById("pw").innerHTML = generatePw(8, true, true, true, true);
  }
}

// prompt user for length of password
function choseLength() {
    let pwLength = prompt("Choose a length for the password (8-128 characeters): ")
    //abort if cancel
    if(pwLength === null) {
        document.getElementById("pw").innerHTML = "aborted";
    }
    // ask again if length given is invalid
    else if (!isNaN(pwLength) && pwLength >= 8 && pwLength <= 128) {
        return pwLength;
    }
    // return length if valid
    else {
        choseLength();
    }
}


//generate random password
function generatePw(len, lower, upper, numeric, special) {
    // pw starts as empty string
    let password = "";

    // char bank for password
    let chars = [];

    // edit char bank to only include what is needed based on user selection
    let i = 0;
    if (lower) {
        chars[i] = "abcdefghijklmnopqrstuvwxyz";
        i++;
    }
    if (upper) {
        chars[i] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        i++;
    }
    if(numeric) {
        chars[i] = "0123456789";
        i++
    }
    if(special) {
        chars[i] = "~!@#$%^&*()_+=-<>,./?";
    }

    //cannot have password with no character types
    if (chars.length === 0) {
        return "You must choose at least 1 type of characters to include.";
    }

    //unique set of numbers to keep track of which types of characters are used already
    let usedTypes = new Set();
    //generate pw
    for (let i = 0; i < len; i++) {
        let j = Math.floor(Math.random() * chars.length);
        usedTypes.add(j);
        //check to make sure every type of character selected is used
        if (i-usedTypes.size+chars.length === len) {
            //find out which kind of character is not used
            for(let l = 0; l < chars.length; l++) {
                if (!usedTypes.has(l)) {
                    //make sure the next character added is something new
                    j = l;
                    usedTypes.add(j);
                    l = chars.length;
                }
            }
        }
        let k = Math.floor(Math.random() * chars[j].length);
        let temp = chars[j].substring(k, k+1);
        password += temp;
    }
    return password;
}