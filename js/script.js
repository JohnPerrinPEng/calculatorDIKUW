//Initalize DOM Tree by variables
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
    
dsplay.append(dsply1, dsply2);
btnContainer.append(numPad);
container.append(DIKUWLogo,dsplay,btnContainer);
main.append(container);

//Initialize buttons
var numPadInit = [
    ["numR1", 7,8,9,"/"],
    ["numR2", 4,5,6,"*"],
    ["numR3", 1,2,3,"-"],
    ["numR4",0,".","=","+"],
]
var subArray = [];
var opArray = [
    ['*',(array) => multiply(array)],
    ['/',(array) => divide(array)],
    ['+',(array) => add(array)],
    ['-',(array) => subtract(array)]
  ];
//Make button elements and append to existing DOM
var newBtn
var newRow
numPadInit.forEach(row => {
    for (i=0; i<=row.length-1; i++) {
        if (i==0) {
            newRow = document.createElement('div');
            newRow.classList.add(row[i]);
            newRow.classList.add('numPadRow');
        } else if (row[i] != undefined){
            newBtn = document.createElement('button');
            newBtn.id= row[i];
            newBtn.classList.add('button');
            newBtn.classList.add('numBtn');
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
        const selection = button.textContent;
        if (selection.match(/[0-9]/)) {
            numClick(selection);
        } else if (selection.match(/\./)) {
            decClick();
        } else if (selection.match(/=/)) {
            eqClick();                
        } else {
            opClick(selection);
        };

    });
});

//event listener functions
function opClick(operator) {
    if (!dsply2.textContent) {
        console.log('Nothing to operate on so do nothing');
    } else {
        dsply1.textContent = `${dsply1.textContent} ${dsply2.textContent} ${operator}`;
        dsply2.textContent = '0';
    };
};

function eqClick() {
    dsply1.textContent = `${dsply1.textContent} ${dsply2.textContent}`;//Finalize expression
    // payload = dsply1.textContent.split(/[0-9][\.][^\s]+/g);
    payload = dsply1.textContent.match(/(\S+)/g); //Array of numbers and operators, no whitespace
    console.log(parseFloat(payload));
    for (i=0; i<opArray.length;i++) {
        // console.log('opArray [i,0]='+opArray[i][0]);
        for (j=1; j<payload.length;j++) {
            // console.log('payload j='+payload[j]);
            // console.log(parseFloat(payload));
            if(payload[j] == opArray[i][0]) {
                var result = opArray[i][1]([parseFloat(payload[j-1]),parseFloat(payload[j+1])]);
                payload.splice(j-1,3,result);
            };
            // if(payload[j].indexOf(opArray[i]) > 0) {
            //     'use strict;'
            //     const exp = parseFloat(payload[j-1]+payload[j]+[j+1]);
            //     console.log({exp});
            // };
        };
    };
    // const payArray = payload.reduce(function(obj, item) {
    //     // console.log(item);
    //     if ( !obj[item] ) {
    //       obj[item] = 0;
    //     }
    //     obj[item]++;
    //     return obj
    //   },{});
    // console.table(payArray);
    dsply2.textContent = result;
    dsply1.textContent += '=';
};

function decClick() {
    if (dsply2.textContent === '0') {
        dsply2.textContent = '0.';
    } else {
        dsply2.textContent += '.';
    };
};

function numClick(value) {
    value = Number(value);
    if (dsply2.textContent === '0') {
        dsply2.textContent = value;
    } else {
        dsply2.textContent += value;        
    };
};

//Odin asks for 
/*Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.*/

//JP operation functions
function add(array) {
	return array.reduce((result,num) => {return result+num},0);
};

function subtract (array) {
	return array[0]-array[1];
};

function divide(array) {
    return array.reduce(function(result,num, currentIndex) {
        console.log({result});
        console.log({num});
        if (currentIndex == 0) {
            console.log("I'm waitin here.")
            return num
         } else {
            console.log("I'm workin here.")
            console.log({result});
            console.log({num});
            return result/num
        };
    });
};

function multiply(array) {
    return array.reduce((result,num) => {return Number(result*num)},1);
};
// function multiply(array) {
//   let product = array.reduce((product, num) => {
//     console.log({product});
//     console.log({num});
//     return product*num
//   },1);
//   console.log({product});
//   return product
// };

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

const factorial = function(num) {
	if (num === 0) {
    return 1
  } else {
    var prod = 1
    for (i=2; i <= num; i++) {
      prod = prod*i;
    };
    return prod
  };
};