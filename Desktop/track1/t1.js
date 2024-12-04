let para1 = document.createElement('p');
para1.innerText = "hello  i am a para 1";
let body = document.querySelector('body');
body.appendChild(para1);


let div1 = document.createElement('div');
let h1 = document.createElement('h1');
let para2 = document.createElement('p')
h1.innerText = "hello i am h1 tag :)"
para2.innerText = "hello i am para 2"
div1.appendChild(h1);
div1.appendChild(para2);
body.appendChild(div1);
div1.classList.add("lorem");

let input1 = document.querySelector("input");
let para3 = document.querySelector(".nclass");
let btn  = document.querySelector("button");
btn.onclick = function(){
    input1.innerText = para3;
}



