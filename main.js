var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clearBtns'),
    resultBtn = document.getElementById('result'),
    howItWorksBtn = document.getElementById('howItWorksBtn'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemeoryPendingOperation = '',
    operationsList = document.getElementById('operationsList');


for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
};
for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    howItWorks(operations[i].value);
    operationBtn.addEventListener('click', function(e){
        operation(e.target.textContent);
    });
};

for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e){
        clear(e.srcElement.id);
    });
};
decimalBtn.addEventListener('click', decimal);
howItWorksBtn.addEventListener('click', viewHowItWorks);

document.onkeypress = function (event) {
    if (event.key === '/' || event.key === '*' || event.key === '+' || event.key === '-'|| event.key === 'Enter') {
        operation(event.key);
    }
    else if (event.key == ".") {
        decimal();
    }
    else if (isNaN(event.key)) {        
        event.key = '';
    }
    else {
        numberPress(event.key);
    }
};
function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
        }
    else {
        if (display.value === '0'){
            display.value = number;
        }
        else {
            display.value += number;
        }
    }
};
function operation(op) {
    var localOperationMemory = display.value;
    if (MemoryNewNumber && MemeoryPendingOperation !== '=' && MemeoryPendingOperation !== 'Enter') {   
        display.value = MemoryCurrentNumber; // enables after press operator afrer operator, but not '=': +, - etc.
        MemeoryPendingOperation = op;
    }   else {
        MemoryNewNumber = true;
        if (MemeoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        }
        else if (MemeoryPendingOperation === '-')
        {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        }
        else if (MemeoryPendingOperation === '*')
        {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        }
        else if(MemeoryPendingOperation === '/')
        {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        }
        else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };
        display.value = parseFloat(MemoryCurrentNumber.toFixed(12)); 
        MemeoryPendingOperation = op;
    }
};
function clear(id) { 
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true; 
        // not sure that MemoryNewNumber = true; is needed here and below 
    }
    else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = '0';
        MemeoryPendingOperation = '';
    }
};
function decimal(arg) {
    var localDecimalMemory = display.value;
    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    }   else {
        if(localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};
function howItWorks(val) {
    var newLi = document.createElement('li');
        var operationText = val;
        newLi.innerText = operationText;
        operationsList.appendChild(newLi);
};
function viewHowItWorks () {
    if (document.getElementById('viewOperationList').style.display === "none") {
        viewOperationList.style.display = "block";
    }
    else {
        viewOperationList.style.display = "none";
    };
};

