/**
 * Created by Александр on 21.04.2016.
 */
window.onload = createView;
document.getElementById('input').onkeydown = validate;
function createView() {
    var left = 100;
    var top = 100;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            addButton(left,top, getOperationByIndex(i, j));
            left += 60;
        }
        left = 100;
        top += 60;
    }
}

function getOperationByIndex(i, j) {
    var val = i * 3 + j + 1 + '';
    if(j == 3)
        switch (i){
            case 0: val = '+'; break;
            case 1: val = '-'; break;
            case 2: val = '*'; break;
            case 3: val = '/'; break;
        }
    if(i == 3)
        switch (j){
            case 0: val = 'C'; break;
            case 1: val = '0'; break;
            case 2: val = '='; break;
        }
    return val;
}

function addButton(left, top, value) {
    var calc = document.getElementById('calculator');
    var but = document.createElement('input');
    but.setAttribute('class', 'button')
    but.setAttribute('type', 'button');
    but.setAttribute('value', value);
    but.setAttribute('style', 'left: ' + left + 'px; top: ' + top + 'px;')
    but.onclick = keyPress;
    calc.appendChild(but);
}

function keyPress(event) {
    var input = document.getElementById('input');
    var command = event.target.value;
    switch (command){
        case 'C': input.value = ''; break;
        case '=':
            input.value = solve(input.value);
            break;
        default: input.value += command;
    }
}

function solve(expression) {
    try{
        return eval(expression);
    }
    catch(ex) {
        return 'Ошибка в выражении'
    }
}

function validate(key) {
    var input = document.getElementById('input');
    if (!key.shiftKey && key.keyCode === 13 || key.keyCode === 187) {
        input.value = solve(input.value);
        return false;
    }

    if (isDigit(key.keyCode) || isOperator(key.keyCode)) {
        return true;
    }
    else
        return false;
}

function isDigit(code) {
    switch (code) {
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 96:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
            return true;
    }

    return false;
}

function isOperator(code) {
    switch (code) {
        case 111:
        case 106:
        case 107:
        case 109:
        case 110:
        case 189:
        case 187:
        case 191:
        case 8:
        case 16:
            return true;
    }
    return false;
}