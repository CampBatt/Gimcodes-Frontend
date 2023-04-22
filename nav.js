
var nav = document.getElementsByClassName("nav");
console.log(nav);

function move(){
    var chance = Math.random()
    console.log(chance);
    if (chance > 0.999){
        location.href = 'https://r.mtdv.me/SPTh1MFbRz'
    }
    location.href = this.firstChild.href
};

for (x =0; x<4; x++){
    nav[x].addEventListener("click", move)
    console.log(Math.random())
};