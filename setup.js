var latest = document.getElementById("latest");
var prio = document.getElementById("prio");
var statuss = document.getElementById("status");
var load = document.getElementById("load");
var code_desc = document.getElementById("code_desc");

//let codeAPI = "http://127.0.0.1:8000"
function start(){
fetch(codeAPI + "/setup")
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


};


start();
setInterval(start,30000);