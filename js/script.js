//Create Footer Text
var footer = document.querySelector('footer');
var footerP = document.createElement('p');
footerP.textContent = 'Copyright © ' + new Date().getFullYear() + ' DIKUW Incorporated.';
footer.appendChild(footerP);

//Initalize variables with associated propoerties for DOM Construction
var main = document.querySelector('main');
var container = document.createElement('div');
container.className = 'container';
var DIKUWLogo = document.createElement('img');
DIKUWLogo.src = 'img/DIKUW_Logo_B_RGB_1400.png';
DIKUWLogo.className = 'calcLogo';
DIKUWLogo.alt = "DIKUW inc. Logo";
var dsplay = document.createElement('div');
dsplay.className = 'dsplay';
var dsply1 = document.createElement('div');
dsply1.className = 'dsply1';
dsply1.textContent = '';
var dsply2 = document.createElement('div');
dsply2.className = 'dsply2';
dsply2.textContent = '0';
var btnContainer = document.createElement('div');
btnContainer.className = 'buttonContainer';
var numPad = document.createElement('div');
numPad.className = 'numPad';
var numRow1 = document.createElement('div');
numRow1.ClassName = 'numRow'

//Create the DOM Framework in HTML
dsplay.append(dsply1, dsply2);
btnContainer.append(numPad);
container.append(DIKUWLogo, dsplay, btnContainer);
main.append(container);

//Initialize button related variables
var decPoints = 3
var numPadInit = [
    ["numR1", 7, 8, 9, "/", 'AC'],
    ["numR2", 4, 5, 6, "*", 'C'],
    ["numR3", 1, 2, 3, "-", 'Ans'],
    ["numR4", 0, ".", "=", "+", "Back"],
]
var answer = null;
var payload = [];
var opArray = [
    ['*', (array) => multiply(array)],
    ['/', (array) => divide(array)],
    ['+', (array) => add(array)],
    ['-', (array) => subtract(array)]
];

var buttonMatcher = new Array();
numPadInit.forEach(row => {
    row.forEach(item => {
        buttonMatcher.push(item);
    });
});
buttonMatcher.push('Backspace');
buttonMatcher.push('Enter', 'c');


// buttonMatcher = Object.entries(buttonMatcher);

//Make button elements and append to existing DOM Framework
var newBtn
var newRow
numPadInit.forEach(row => {
    for (i = 0; i <= row.length - 1; i++) {
        if (i == 0) {
            newRow = document.createElement('div');
            newRow.classList.add(row[i]);
            newRow.classList.add('numPadRow');
        } else if (row[i] != undefined) {
            newBtn = document.createElement('button');
            newBtn.value = row[i];
            newBtn.classList.add('button');
            newBtn.value.match(/[0-9]|\./) ? newBtn.classList.add('numBtn', row[i]) : newBtn.classList.add('fnBtn', row[i]);
            newBtn.textContent = row[i];
            newRow.appendChild(newBtn);
        };

    };
    numPad.appendChild(newRow);
});

//Add eventlisteners to buttons
let buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const selection = button.value;
        toDoList(selection);
    });
});

//Add event listeners to keyboard
window.addEventListener("keydown", function (event) {
    const entry = event.key;
    buttonMatcher.forEach(button => {
        if (button == entry) { toDoList(entry) };
    })
}, true);

// What to do with entry
function toDoList(selection) {
    if (payload[0] == "Ans=") {
        dsply1.textContent = ""
        payload = [];
    } else if (payload.length == 2) {
        payload[0].pop;
        dsply1.textContent = payload.join('');
    } ;
    switch (selection) {
        case selection.match(/[0-9]/)?.input:
            numClick(selection);
            break
        case selection.match(/\./)?.input:
            decClick();
            break
        case selection.match(/=|(Enter)/)?.input:
            eqClick();
            break
        case selection.match(/(Back)|(Backspace)/)?.input:
            backspace();
            break
        case selection.match(/Ans/)?.input:
            answerCall();
            break
        case selection.match(/AC/)?.input:
            wipeAll();
            break
        case selection.match(/C|c/)?.input:
            wipe();
            break
        case selection.match(/\+|\-|\*|\//)?.input:
            opClick(selection);
            break
        default:
            console.log('No toDoList switch match')
            break
    };
};


//event listener functions

// function eqClick() {
//     // 1st eqCLick instance
//     keepAnswer();
//     if (payload[0] != '=') {        
//         payload.unshift('=');
//         payload.push(dsply2.textContent);
//         dsply1.textContent = payload.join('');
//         dsply2.textContent = "";
//         console.log('1st Eq Click');
//     } else {
//         console.log('Were In!');
//         for (i = 0; i < opArray.length; i++) {
//             for (j = 1; j < payload.length; j++) {
//                 if (payload[j] == opArray[i][0]) {
//                     var result = opArray[i][1]([payload[j - 1], payload[j + 1]]);
//                     // answer = Math.round(result * Math.power(10,decPoints)) / 1000
//                     ///PENDING figure out if result has too many decimal place then use .toFixed to modify
//                     payload.splice(j - 1, 3, result);
//                     dsply1.textContent = payload.join('')
//                     continue //Change this to return for step by step mode
//                 };
//             };
//         };
//     };
// };

function eqClick() {
    // 1st eqCLick instance
    // keepAnswer();
    if (payload[0] != '=') {
        payload.unshift('=');
        payload.push(dsply2.textContent);
        dsply1.textContent = payload.join('');
        dsply2.textContent = "0";
        console.log('1st Eq Click');
    }

    for (i = 0; i < opArray.length; i++) {
        for (j = 1; j < payload.length; j++) {
            if (payload[j] == opArray[i][0]) {
                var result = opArray[i][1]([payload[j - 1], payload[j + 1]]);
                // answer = Math.round(result * Math.power(10,decPoints)) / 1000
                ///PENDING figure out if result has too many decimal place then use .toFixed to modify
                payload.splice(j - 1, 3, result);
                dsply1.textContent = payload.join('')
                continue //Change this to return for step by step mode
            };
        };
    };
};

function opClick(operator) {
    // keepAnswer();
    if (!dsply2.textContent) {
        console.log('Nothing to operate on so do nothing');
    } else {
        payload.push(dsply2.textContent, operator);
        dsply2.textContent = '0';
        dsply1.textContent = payload.join('');
    };
};

function decClick() {
    // keepAnswer();
    if (dsply2.textContent === '0') {
        dsply2.textContent = '0.';
    } else if (dsply2.textContent.match(/\./)) {
        console.log("Do nothing since you cant have more than 1 decimal in a real number pendeho");
    } else {
        dsply2.textContent += '.';
    };
};

function numClick(value) {
    // keepAnswer();
    value = Number(value);
    if (dsply2.textContent === '0') {
        dsply2.textContent = value;
    } else {
        dsply2.textContent += value;
    };
};

function keepAnswer() {
    if (dsply1.textContent.match('Ans=')) {
        payload = [];
        dsply1.textContent = '';
    }
}

//Odin asks for 
/*Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.*/

//JP operation functions
function add(array) {
    console.log({ array })
    return array.reduce((result, num) => { return Number(result) + Number(num) }, 0);
};

function subtract(array) {
    console.log({ array });
    return Number(array[0]) - Number(array[1]);
};

function divide(array) {
    console.log({ array });
    return array.reduce(function (result, num, currentIndex) {
        if (currentIndex == 0) {
            return num
        } else {
            return Number(result) / Number(num)
        };
    });
};

function multiply(array) {
    console.log({ array });
    return array.reduce((result, num) => { return Number(result) * Number(num) }, 1);
};

function wipe() {
    dsply2.textContent = 0;
    payload = [];
};

function wipeAll() {
    document.querySelector('.Ans').classList.remove('btnHighlight');
    dsply1.textContent = '';
    dsply2.textContent = '0';
    answer = null
    payload = [];
};



function answerCall() {
    if (payload[0] == '=') {
        answer = payload[1];
        payload[0] = 'Ans=';
        document.querySelector('.Ans').classList.add('btnHighlight');
        // newBtn.classList.add('numBtn')
        dsply1.textContent = payload.join('');
    } else if (payload[0] == 'Ans=') {
        // keepAnswer()
        dsply2.textContent = answer;
    } else if (answer != null) {
        dsply2.textContent = answer;
    }
}

function backspace() {
    dsply2.textContent = dsply2.textContent.split('').pop().join();
}

function power(base, exponent) {
    if (exponent === 0 | !exponent) {
        return 1;
    } else if (exponent === 1) {
        return base;
    } else {
        console.log({ exponent });
        var inProd = base;
        for (i = 2; i <= exponent; i++) {
            inProd = inProd * base;
        };
        console.log({ inProd });
        return inProd;
    };
}

const factorial = function (num) {
    if (num === 0) {
        return 1
    } else {
        var prod = 1
        for (i = 2; i <= num; i++) {
            prod = prod * i;
        };
        return prod
    };
};