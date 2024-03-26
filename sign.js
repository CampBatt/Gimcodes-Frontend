var pix1 = document.getElementById('Pixel_1');
var pix2 = document.getElementById('Pixel_2');
var pix3 = document.getElementById('Pixel_3');
var pix4 = document.getElementById('Pixel_4');
var pix5 = document.getElementById('Pixel_5');
var pix6 = document.getElementById('Pixel_6');
var pix7 = document.getElementById('Pixel_7');
var pix8 = document.getElementById('Pixel_8');
var pix9 = document.getElementById('Pixel_9');
var pix10 = document.getElementById('Pixel_10');
var pix11 = document.getElementById('Pixel_11');
var pix12 = document.getElementById('Pixel_12');
var pix13 = document.getElementById('Pixel_13');
var pix14 = document.getElementById('Pixel_14');
var pix15 = document.getElementById('Pixel_15');
var pix16 = document.getElementById('Pixel_16');
var preview = document.getElementById('preview');
var enter_button = document.getElementById('title')

var user_input = document.getElementById("user_input");
var email_input = document.getElementById("email_input");
var pass_input = document.getElementById("pass_input");
var confirm_input = document.getElementById("confirm_input");

var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");

var socialAPI = 'https://gimcodes-9zd3ncmra-campbatt.vercel.app'
//https://gimcodes-8s07hzjre-campbatt.vercel.app
enter_button.addEventListener('click',creatAccount);
pix1.addEventListener('click',selectPx);
pix2.addEventListener('click',selectPx);
pix3.addEventListener('click',selectPx);
pix4.addEventListener('click',selectPx);
pix5.addEventListener('click',selectPx);
pix6.addEventListener('click',selectPx);
pix7.addEventListener('click',selectPx);
pix8.addEventListener('click',selectPx);
pix9.addEventListener('click',selectPx);
pix10.addEventListener('click',selectPx);
pix11.addEventListener('click',selectPx);
pix12.addEventListener('click',selectPx);
pix13.addEventListener('click',selectPx);
pix14.addEventListener('click',selectPx);
pix15.addEventListener('click',selectPx);
pix16.addEventListener('click',selectPx);

user_input.addEventListener('keypress',entBlur);
user_input.addEventListener('blur',function(){
    user_input.value = user_input.value.replace(/[^a-zA-Z0-9]/g, '')
})
email_input.addEventListener('keypress',entBlur);
email_input.addEventListener('blur',function(){
    email_input.value = email_input.value.replace(/[^a-zA-Z0-9.@_+-]/g, '')
})
pass_input.addEventListener('keypress',entBlur);
confirm_input.addEventListener('keypress',entBlur);
red.addEventListener('keypress',entBlur);
green.addEventListener('keypress',entBlur);
blue.addEventListener('keypress',entBlur);

red.addEventListener('blur',setRValue);
green.addEventListener('blur',setRValue);
blue.addEventListener('blur',setRValue);
var defaults = []
for (var i = 0; i < 30; i++) {
    var nameee = i + 1
    defaults[i] = document.getElementById('cl' + nameee.toString())
}

for (var i = 0; i < 30; i++){
    defaults[i].addEventListener('click',set_from_defualt)
}
console.log(defaults)

function check(){
    return fetch(socialAPI + '/check',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            user:localStorage.getItem('user'),
            token:localStorage.getItem('token')
        })}).then(function (response){
            return response.json();
        }).then(function (info){
            //console.log(info);
            //console.log(info['continue']);
            return info['continue']
            })
};

function creatAccount(){
    New_user = user_input.value;
    New_email = email_input.value;
    New_pass = pass_input.value;
    New_confirm = confirm_input.value;
    New_pfp = createPFPlist();
    console.log(New_pfp)

    if(New_pass == New_confirm){
        if (New_email.includes('@')){
            New_user = New_user.replace(/[^a-zA-Z0-9]/g, '')
            New_email = New_email.replace(/[^a-zA-Z0-9.@_+-]/g, '')
            if (New_user != ''){
                check().then(function(test){
                    console.log(test)
                    if (test != false){
                        fetch(socialAPI + '/signup',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        username:New_user,
                        password:New_pass,
                        email:New_email,
                        pfp:New_pfp
                    })}).then(function (response){
                        return response.json();
                    }).then(function (token){
                        console.log(token)
                        var message_alert = token['message']
                        if (message_alert == 'Username Not Avalible'){
                            alert(message_alert);
                        };
                        if (message_alert == 'Your New Account Is Made'){
                            localStorage.setItem('token',token['token']);
                            localStorage.setItem('user',token['user']);
                            localStorage.setItem('pfp',token['pfp']);
                            localStorage.setItem('Id',token['Id']);
                            alert(message_alert);
                        };
                    }
                        )
                    }else{
                        alert("You're already logged into an account");
                    }
                  })
                return 'oof'
            }else{
                alert('Please enter a username.');
            }

        }else{
            alert('Please enter a valid email address.');
        }

    }else{
        alert("Passwords don't match.");
    }




}

function createPFPlist(){
    pix_list = []
    for (var i = 0; i < 16; i++){
        pix_name = i+1
        var currentPIX = document.getElementById('Pixel_' + pix_name.toString());
        var computedStyle = window.getComputedStyle(currentPIX);
        var clr = computedStyle.backgroundColor;
        var rgbValues = clr.slice(4, -1);
        var rgbArray = rgbValues.split(',');
        var r = parseInt(rgbArray[0]);
        var g = parseInt(rgbArray[1]);
        var b = parseInt(rgbArray[2]);
        pix_list[i] = [r,g,b]
    }
    console.log(pix_list)
    return pix_list
}

function set_from_defualt(event){
    var element = event.target
    var computedStyle = window.getComputedStyle(element);
    var clr = computedStyle.backgroundColor;
    preview.style.backgroundColor = clr
    var changed_px = document.getElementById(preview.innerHTML);
    changed_px.style.backgroundColor = clr
    var rgbValues = clr.slice(4, -1);
    var rgbArray = rgbValues.split(',');
    var r = parseInt(rgbArray[0]);
    var g = parseInt(rgbArray[1]);
    var b = parseInt(rgbArray[2]);

    red.value = r
    green.value = g
    blue.value = b
}

function setRValue(event){
    var r = red.value.toString();
    var g =  green.value.toString();
    var b = blue.value.toString();
    var clr = 'rgb(' + r + ',' + g + ',' + b + ')';
    console.log(clr);
    preview.style.backgroundColor = clr
    var changed_px = document.getElementById(preview.innerHTML);
    changed_px.style.backgroundColor = clr
};

function selectPx(event){
    var selected_px = event.target;
    var computedStyle = window.getComputedStyle(selected_px);
    var clr = computedStyle.backgroundColor;
    var rgbValues = clr.slice(4, -1);
    var rgbArray = rgbValues.split(',');
    var r = parseInt(rgbArray[0]);
    var g = parseInt(rgbArray[1]);
    var b = parseInt(rgbArray[2]);

    red.value = r
    green.value = g
    blue.value = b

    console.log(r,g,b);

    preview.innerHTML = selected_px.innerHTML
    preview.style.backgroundColor = clr

}

function entBlur(event){
    if (event.key == "Enter"){
        element = event.target
        element.blur()
    };

};

