var user_input = document.getElementById('user_input');
var code_input = document.getElementById('code_input');
var pass_input = document.getElementById('pass_input');
var cfrm_input = document.getElementById('confirm_input');
var butt1 = document.getElementById('Button1');
var butt2 = document.getElementById('Button2');

user_input.addEventListener('keypress',entBlur);
pass_input.addEventListener('keypress',entBlur);
code_input.addEventListener('keypress',entBlur);
cfrm_input.addEventListener('keypress',entBlur);
butt1.addEventListener('click',request_code)
butt2.addEventListener('click',send_code)

if (localStorage.getItem('user')!= null){
    user_input.value = localStorage.getItem('user')
};
var socialAPI = 'https://gimcodes-9zd3ncmra-campbatt.vercel.app'
function entBlur(event){
    if (event.key == "Enter"){
        element = event.target
        element.blur()
    };

};

function request_code(){
    var usernamee = user_input.value
    console.log(usernamee)
    console.log("")
    console.log(usernamee=="")
    if (usernamee == ""){
        alert('please enter a username below');
    }else{
        fetch(socialAPI + '/requestcode',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: usernamee
            })}).then(res =>{
                res.json().then( res =>{
                    alert(res['message'])
                })
            })
    }
    
}

function send_code(){
    if (user_input.value == "" || code_input.value == "" || pass_input.value == "" || cfrm_input.value == ""){
        alert('Please enter all information');
    }
    if(pass_input.value != cfrm_input.value){
        alert('passwords do not match.')
    }else{
        fetch(socialAPI + '/changepassword',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: user_input.value,
                code: code_input.value,
                new_pword: pass_input.value
            })}).then(res =>{
                res.json().then( res =>{
                    if (typeof(res['user']) != 'undefined'){
                        localStorage.setItem('user',res['user'])
                        localStorage.setItem('token',res['token'])
                        localStorage.setItem('pfp',res['pfp'])
                        localStorage.setItem('Id',res['Id'])
                    }
                    alert(res['message'])
                })
            })
    }
    
}