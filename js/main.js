let el = document.getElementById('num1');
let num2 = document.getElementById('num2');
let b1 = document.getElementById('b1');
let b2 = document.getElementById('b2');
let h1 = document.getElementById('h1');
let h2 = document.getElementById('h2');
let l1 = document.getElementById('l1');
let l2 = document.getElementById('l2');
let m1 = document.getElementById('m1');
let m2 = document.getElementById('m2');
let a1 = document.getElementById('a1');
let a2 = document.getElementById('a2');
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');

el.addEventListener('input', count);

function count() {
    b1.innerText = '';
    b2.innerText = '';
    num2.innerText = '';
    h1.innerText = '0x';
    h2.innerText = '0x';
    l1.innerText = '0x';
    l2.innerText = '0x';
    m1.innerText = '0x';
    m2.innerText = '0x';
    a1.innerText = '0x';
    a2.innerText = '0x';
    c1.innerText = '0x';
    c2.innerText = '0x';

    let bn1 = (el.value >>> 0).toString(2);
    while (bn1.length < 16) {
        bn1 = '0' + bn1;
    }

    num2.value = parseInt(mirror(bn1), 2);

    let hex1 = parseInt(el.value, 10).toString(16).toUpperCase();
    while (hex1.length < 4) {
        hex1 = '0' + hex1;
    }
    let hex2 = parseInt(num2.value, 10).toString(16).toUpperCase();
    while (hex2.length < 4) {
        hex2 = '0' + hex2;
    }

    let lsb1 = hex1.substring(hex1.length - 2);
    let msb1 = hex1.substring(0, 2);
    let lsb2 = hex2.substring(hex2.length - 2);
    let msb2 = hex2.substring(0, 2);

    let asc1 = a2hex(hex1);
    let asc2 = a2hex(hex2);

    let i = 0x100;

    let csum1 = ('0x'+lsb1)-0x00 + (('0x'+msb1)-0x00);
    while ( csum1 > i ) i+= 0x100;
    let cs1 = Number(i - csum1).toString(16).toUpperCase();

    i = 0x100;
    let csum2 = ('0x'+lsb2)-0x00 + (('0x'+msb2)-0x00);
    while ( csum2 > i ) i+= 0x100;
    let cs2 = Number(i - csum2).toString(16).toUpperCase();

    b1.insertAdjacentText('afterbegin', bn1);
    b2.insertAdjacentText('afterbegin', bn1.split("").reverse().join(""));
    h1.insertAdjacentText('beforeend', hex1);
    h2.insertAdjacentText('beforeend', hex2);
    l1.insertAdjacentText('beforeend', lsb1);
    l2.insertAdjacentText('beforeend', lsb2);
    m1.insertAdjacentText('beforeend', msb1);
    m2.insertAdjacentText('beforeend', msb2);
    a1.insertAdjacentText('beforeend', asc1);
    a2.insertAdjacentText('beforeend', asc2);
    c1.insertAdjacentText('beforeend', cs1);
    c2.insertAdjacentText('beforeend', cs2);

}

function mirror(num) {
    return num.split("").reverse().join("");
}

function dec2hex(dec) {
    return (dec + 0x10000).toString(16).substr(-4).toUpperCase();
}

function a2hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i++) {
        var hex = Number(str.charCodeAt(i)).toString(16);
        arr.push(hex);
    }
    return arr.join('');
}