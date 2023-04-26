var latest = document.getElementById("latest");
var prio = document.getElementById("prio");
var find = document.getElementById("find");
var statuss = document.getElementById("status");
var load = document.getElementById("load");
var code_desc = document.getElementById("code_desc");
var the_one_looking = false


function copy_to_clip(){
    navigator.clipboard.writeText(this.innerHTML)
    .then(()=>{
        alert("Code Copied To Clipboard")
    })
};

function find_code(){
statuss.innerHTML = "Cheking if server is already finding a code, could take about 30 secconds."
fetch("https://gimcodes-q1jkv5tvn-campbatt.vercel.app/test")
.then(res => {
    return res.json()
})
.then (data => {if (data['can_continue']){
    the_one_looking = true
    statuss.innerHTML = "Currently Finding Code"
    load.className = ""
    send_untill_find();
}else{
    statuss.innerHTML = "Code Was Already Being Found"
    load.className = ""
}
});

};


    async function send_untill_find(){
        keep_looking = true
        while (keep_looking){
            //console.log('started')
       let response = await fetch("https://gimcodes-campbatt.vercel.app/");
       console.log(response);
       let APIresponse = response.json();
       APIresponse.then(res => {
        keep_looking = res['keep_looking']
        code = res['code']
       })
    }
    statuss.innerHTML = "Start Finding a Code"
    code_desc.innerHTML = "This code was found 0 minutes ago"
    load.className = "hidden"
    latest.innerHTML = code
    };


console.log(latest);
console.log(prio);
console.log(find);

prio.addEventListener("click", copy_to_clip);
latest.addEventListener("click", copy_to_clip);
find.addEventListener("click", find_code);

