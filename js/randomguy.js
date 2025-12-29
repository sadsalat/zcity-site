var i = Math.floor(Math.random() * 4) + 1;
document.querySelector(".random_guy").innerHTML = 
`<img style="width: 100%; text-aling: center;" src='${'/content/random_guy_png/'+ i + '.png'}'>`;