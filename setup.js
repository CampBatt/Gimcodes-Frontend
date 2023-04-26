var latest = document.getElementById("latest");
var prio = document.getElementById("prio");
var statuss = document.getElementById("status");
var load = document.getElementById("load");
var code_desc = document.getElementById("code_desc");
var s_sents = 0

function start(){
fetch("https://gimcodes-campbatt.vercel.app/setup")
.then (res => {
    return res.json()
})
.then (data =>{
    latest.innerHTML = data["code"]
    code_desc.innerHTML = "This code was found " + data["time"] + " " + data["time_unit"] + " ago."
    prio.innerHTML = data["prio_code"]
    if (data["not_looking"]){
        statuss.innerHTML = "Start Finding a Code"
        load.className = "hidden"
    }else{
        statuss.innerHTML = "Currently Finding Code"
        load.className = ""
    }
    

})
if (! the_one_looking){
    s_sents ++
}

if (s_sents >= 5){
    alert('Are you still here? Going idle puts strain on the database.');
    s_sents = 0
};
};

start();
setInterval(start,30000);
