// Implemented by Jevin Sutariya
// Author: Jevinkumar sutariya
const doing = new Audio('music/doing.wav');
const end = new Audio('music/end.wav');

// Some functions for lesser code
function is3_x(val1, val2, val3) {
    if ((val1 == 'x' || val1 == 'X') && (val2 == 'x' || val2 == 'X') && (val3 == 'x' || val3 == 'X'))
        return true;
    return false;
}
function is3_0(val1, val2, val3) {
    if (val1 == '0' && val2 == '0' && val3 == '0')
        return true;
    return false;
}
function disable_all_box() {
    const elements = document.querySelectorAll(".box");
    Array.from(elements).forEach((element, index) => {
        element.disabled = true;
        
    })
}
function change_background(file, arr){
    arr.forEach(
        function(ele){
            ele.style.background = `url(${file})`;
            ele.style.backgroundSize = 'cover';
        }
    )
}
function drawLine(a, b) {
    document.body.appendChild(createLine(a, b));
}
function createLine(el1, el2) {

    
    var off1 = getElementProperty(el1);
    var off2 = getElementProperty(el2);
    // center of first point
    var dx1 = off1.left + off1.width / 2;
    var dy1 = off1.top + off1.height / 2;
    // center of second point
    var dx2 = off2.left + off2.width / 2;
    var dy2 = off2.top + off1.height / 2;
    // distance
    var length = Math.sqrt(((dx2 - dx1) * (dx2 - dx1)) + ((dy2 - dy1) * (dy2 - dy1)));
    // center
    var cx = ((dx1 + dx2) / 2) - (length / 2);
    var cy = ((dy1 + dy2) / 2) - (2 / 2);
    // angle
    var angle = Math.atan2((dy1 - dy2), (dx1 - dx2)) * (180 / Math.PI);
    // draw line
    return "<section class='connectingLines' style='left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -webkit-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);'></section>";
};

function getElementProperty(el) {
    var dx = 0;
    var dy = 0;
    var width = el.width() | 0;
    var height = el.height() | 0;

    dx += el.position().left;
    dy += el.position().top;
    
    return { top: dy, left: dx, width: width, height: height };
};
// Is anyone win or tie condition occered cheking...
function myfunc() {

    doing.play();
    var b1, b1, b3, b4, b5, b6, b7, b8, b9;
    b1 = document.getElementById("b1");
    b2 = document.getElementById("b2");
    b3 = document.getElementById("b3");
    b4 = document.getElementById("b4");
    b5 = document.getElementById("b5");
    b6 = document.getElementById("b6");
    b7 = document.getElementById("b7");
    b8 = document.getElementById("b8");
    b9 = document.getElementById("b9");
    let arr1 = [[b1, b2, b3], [b4, b5, b6], [b7, b8, b9], [b1, b5, b9], [b3, b5, b7], [b1, b4, b7], [b2, b5, b8], [b3, b6, b9]];
    let is_win = false;
    arr1.forEach(function (val, i) {
        if (is3_x(val[0].value, val[1].value, val[2].value)) {
            change_background("win.jpg", arr1[i]);
            disable_all_box();
            let newscore = 1 + parseInt(document.getElementById("firstPlayerScore").innerText);
            document.getElementById("firstPlayerScore").innerText = newscore;
            if (!myAlert('Player X won'))
               alert('Player X won');   
               end.play();
            is_win = true;
            drawLine(val[0], val[2]);
            return;
        } else if (is3_0(val[0].value, val[1].value, val[2].value)) {
            change_background("win.jpg", arr1[i]);
            disable_all_box();
            let newscore = 1 + parseInt(document.getElementById("secondPlayerScore").innerText);
            document.getElementById("secondPlayerScore").innerText = newscore;
            if (!myAlert('Player 0 won'))
                alert('Player 0 won');
                end.play();
            is_win = true;
            return;
        }
    });
    if (is_win)
        return;
    let arr2 = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
    let count = 0;
    arr2.forEach(function (val) {
        if (val.value == '') {
            if (flag == 1) {
                document.getElementById('print').innerHTML = "Player X Turn";
            }
            else {
                document.getElementById('print').innerHTML = "Player 0 Turn";
            }
            return;
        }
        count++;
    });
    if (count == 9) {
        document.getElementById('print').innerHTML = "Match Tie";
        end.play();
        myAlert('Match Tie');
    }
}

// reset all box 
function reset() {
    const elements = document.querySelectorAll(".box");
    Array.from(elements).forEach((element, index) => {
        element.value = "";
        element.disabled = false;
        element.style.background = "url('game1.jpg')";
        element.style.backgroundSize = "cover";
    });
    flag = 1;
    document.getElementById('print').innerHTML = "Player X Turn";
}

// altering and insearting x and 0 logic
flag = 1;
function insert_x_0(e) {
    if (flag == 1) {
        e.value = "X";
        e.disabled = true;
        flag = 0;
    }
    else {
        e.value = "0";
        e.disabled = true;
        flag = 1;
    }
}

// alert function defination
function myAlert(val) {
    document.getElementById('print').innerHTML = val;
    document.getElementById("modal-msg").textContent = val;
    $("#myModal").modal('toggle');
    return true;
}
$(document).ready(function () {
    // play agin javascript code
    $("#continuePlay").click(() => {
        reset();
        $("#myModal").modal('toggle');
    });
    // Change width accoding to name size
    $("#firstPlayerName").change(function () {
        let name = $("#firstPlayerName").val();
        $("#player1").text(name);
        $(this).css('width', `${name.length * 12}px`);
    })
    $("#secondPlayerName").change(function () {
        let name = $("#secondPlayerName").val();
        $("#player2").text(name);
        $(this).css('width', `${name.length * 12}px`);
    })
});
