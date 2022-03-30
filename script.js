function generatePassword() {
  //your code goes here
  if (confirm("Would you like to select your password criteria?\nCancel for default")) {
    //let user chose critiera's for pw
    let length = choseLength();
    console.log(length);
    if (!length) {
      //show cancelled if nothing is entered for length
      return "Cancelled";
    } else { //no need ot run if no length is entered
      let includeLowerCase = confirm("Would you like your password to include lower case characters?\nOk=Yes  Cancel=No");
      let includeUpperCase = confirm("Would you like your password to include upper case characters?\nOk=Yes  Cancel=No");
      let includeNumeric = confirm("Would you like your password to include numbers?\nOk=Yes  Cancel=No");
      let includeSpecialChars = confirm("Would you like your password to include special characters?\nOk=Yes  Cancel=No");

      //call function to generate pw and dispaly it
      return generate(length, includeLowerCase, includeUpperCase, includeNumeric, includeSpecialChars);
    }
  } else {
    //default
    return generate(8, true, true, true, true);
  }
}

// prompt user for length of password
function choseLength() {
  let pwLength = prompt("Choose a length for the password (8-128 characters): ")
  // keep asking until valid answer
  while(true) {
    if (isNaN(pwLength)){
      alert ("That's not a number!");
    } else if (pwLength < 8) {
      alert ("That's too short!");
    } else if (pwLength > 128) {
      alert ("That's too long!");
    } else {
      break;
    }
    pwLength = prompt("Re-enter a length for the password (8-128 characters): ")
  }
  return pwLength;
}

//generate random password
function generate(len, lower, upper, numeric, special) {
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
  if (numeric) {
    chars[i] = "0123456789";
    i++
  }
  if (special) {
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
    if (i - usedTypes.size + chars.length === len) {
      //find out which kind of character is not used
      for (let l = 0; l < chars.length; l++) {
        if (!usedTypes.has(l)) {
          //make sure the next character added is something new
          j = l;
          usedTypes.add(j);
          l = chars.length;
        }
      }
    }
    let k = Math.floor(Math.random() * chars[j].length);
    password += chars[j].substring(k, k + 1);
  }
  return password;
}


// Assignment Code, DO NOT EDIT ANTHING  BELOW THIS LINE
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
