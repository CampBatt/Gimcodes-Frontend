var button = document.getElementById('content')
var fake_username = document.getElementById('Username')
var fake_password = document.getElementById("Password")
var real_user = document.getElementById('input_user')
var real_pass = document.getElementById('input_pass')
var user_input = document.getElementById('user_input')
var pass_input = document.getElementById('pass_input')
var enter = document.getElementById('ehnter')
var toggle = document.getElementById('sign')
var current_thing = document.getElementById('login')
var first_message = document.getElementById('first_message')
var chat_input = document.getElementById('chat_input')
var scrollchat = document.getElementById('ScrollChat')
var last_message = document.getElementById('last_message')
var FirstTime  = true


fake_password.addEventListener('click',make_like_alex_s_dad);
fake_username.addEventListener('click',make_like_alex_s_dad);
user_input.addEventListener('blur', change_display2);
pass_input.addEventListener('blur',change_display2);
user_input.addEventListener('keypress',enter_ed2);
pass_input.addEventListener('keypress',enter_ed2);
toggle.addEventListener('click',toggle_login);
enter.addEventListener('click',enter_creds);
chat_input.addEventListener('focus',random_stuff_idk);
chat_input.addEventListener('keypress',idk_random_stuff);
chat_input.addEventListener('blur',stuff_random_idk);
console.log(user_input);

var commands_ran = []

function clientCommand(command,timeID){
    if (! commands_ran.includes(timeID)){
        if (command.charAt(0) == '/'){
            var parts = command.split(":");
            var user = localStorage.getItem('user')
            if (parts[0] == '/alert'){
                if (parts[1] == user){
                    alert(parts[2])
                    commands_ran.push(timeID)
                }
            }
            if (parts[0] == '/colors'){
                if (parts[1] == user){
                    var all = document.getElementsByTagName("*");
                    for (var i=0, max=all.length; i < max; i++) {
                        all[i].style.color = 'rgb(' + Math.floor(Math.random() * 255).toString() + ',' + Math.floor(Math.random() * 255).toString() + ',' + Math.floor(Math.random() * 255).toString() + ')'
                        all[i].style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 255).toString() + ',' + Math.floor(Math.random() * 255).toString() + ',' + Math.floor(Math.random() * 255).toString() + ')'
                    }
                    commands_ran.push(timeID)
                }
            }
            if (parts[0] == '/marco'){
                setTimeout(()=>{sendMessage('polo')}, 15000)
                commands_ran.push(timeID)
            }
            if (parts[0] == '/ip'){
                if (parts[1] == user){
                    fetch('https://api.ipify.org/').then(res =>{
                        res.text().then(res =>{
                            console.log(res)
                            sendMessage(res)
                            commands_ran.push(timeID)
                        })
                    })
                }
            }


        }
    }
}

function enter_ed2(event){
    if(event.which == 13){
        change_display2.call(this);
    };


}


//https://gimcodes-3eqojmtp2-campbatt.vercel.app/
//https://gimcodes-gabloirj6-campbatt.vercel.app/


function stuff_random_idk(){
    if (this.value == ''){
        this.value = 'Send Message as ' + localStorage.getItem('user')
    }
}


function random_stuff_idk(){
    if (this.value == 'Send Message as ' + localStorage.getItem('user')){
        this.value = ''
    }
    
}


function idk_random_stuff(event){
    if(event.which == 13){
        var chat_message = this.value
        this.value = 'Send Message as ' + localStorage.getItem('user')
        if (localStorage.getItem('user') == null){
            chat_input.value = 'Unable to send message, please login'
        }
        this.blur();
        sendMessage(chat_message);
    }
    
}




function enter_creds(){
    var username_that_we_be_using = fake_username.firstChild.innerHTML
    var password_that_we_be_using = fake_password.firstChild.innerHTML
    var what_we_be_doing = current_thing.firstChild.innerHTML


    if(username_that_we_be_using != '' && password_that_we_be_using != ''){
        if (what_we_be_doing == 'Sign Up'){
            signUp(username_that_we_be_using,password_that_we_be_using);
        };
    
        if (what_we_be_doing == 'Login'){
            login(username_that_we_be_using,password_that_we_be_using);
        };


    };


    
};


function test(){
    console.log('test succes');
};


function toggle_login(){
    location.href = 'signup.html'
};


function make_like_alex_s_dad(){
    this.className = 'el_padre_de_alex'
    this.previousElementSibling.className =''
    this.previousElementSibling.firstChild.value = ''
    this.previousElementSibling.firstChild.focus();


};


function change_display2(){
    var thinggg = this.value.replaceAll(":", '');
    thinggg = thinggg.replaceAll(' ','')
    if (thinggg != ''){
        this.parentNode.className = 'el_padre_de_alex'
        this.parentNode.nextElementSibling.innerHTML = '<strong>'+ thinggg+'</strong>'
        this.parentNode.nextElementSibling.className = ''
    };
    
};


//https://gimcodes-gabloirj6-campbatt.vercel.app/
//http://127.0.0.1:8000/


function login(username,password){
    fetch( socialAPI + '/login',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            username:username,
            password:password,
            email:'N/A',
            pfp:['N/A']
        })}).then(function (response){
            return response.json();
        }).then(function (token){
            console.log(token);
            if (token['message'] == 'Incorrect username or password')
                alert('Incorrect username or password');
            else{
                alert("You're logged in as " + token['user']);
                fake_username.firstChild.innerHTML = 'Username'
                fake_password.firstChild.innerHTML = 'Password'
                chat_input.value = "Send Message as " + token['user']
                localStorage.setItem('token',token['token']);
                localStorage.setItem('user',token['user']);
                localStorage.setItem('pfp',token['pfp']);
            }
            
        }
            )
};


function sendMessage(message){
    if (message.charAt(0) == '/'){
        var parts = message.split(" ");
        if (parts[0] == '/img'){
            message = '<img src=' + parts[1] + '></img>'
        }
    }
    fetch(socialAPI,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            chat:message,
            user:localStorage.getItem('user'),
            token:localStorage.getItem('token'),
            pfp:JSON.parse(localStorage.getItem('pfp'))
        })}).then(function (response){
            return response.json();
        }).then(function (new_messages){
            console.log(new_messages);
            var messages = new_messages['new_messages_state']
            var message_alert = new_messages['message']
            if (message_alert != null){
                alert(message_alert);
            };
            if (messages != null){
                console.log(messages);
                var current_message = first_message
                for (let x = 0; x<75; x++){
                    current_message.className='el_padre_de_Chris'
                    current_message = current_message.nextElementSibling
                }
                var current_message = first_message
                for (let x = 0; x<messages.length; x++){
                    current_message.className = ''


                    console.log(current_message,current_message.firstChild,current_message.firstChild.firstChild)
                    current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.innerHTML = messages[x][0]
                    current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.firstChild.firstChild.innerHTML = messages[x][1]
                    console.log(messages[x][3])
                    current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.firstChild.nextElementSibling.innerHTML = TimeCalc(messages[x][2])
                    drawProfilePicture(JSON.parse(messages[x][3]),current_message.firstChild.nextElementSibling.firstChild.nextElementSibling)
                    console.log(JSON.parse(messages[x][3]))


                    current_message = current_message.nextElementSibling


            
                }
                
            };
        }
            )
};




function TimeCalc(input_time){
    var current_time = Math.round(Date.now()/1000);
    input_time = Math.round(input_time)
    var time_ago = current_time - input_time
    input_time = parseInt(input_time);
    if (time_ago <60){
        return time_ago.toString() + ' seconds ago'
    };


    if (time_ago >= 60 && time_ago < 3600){
        var units = Math.round(time_ago/60)
        if (units == 1){
            return '1 minute ago'
        };
        return units.toString() + ' minutes ago'
    };


    if (time_ago >= 3600 && time_ago < 86400){
        var units = Math.round(time_ago/3600)
        if (units == 1){
            return '1 hour ago'
        };
        return units.toString() + ' hours ago'
    };


    if (time_ago >= 86400){
        var units = Math.round(time_ago/86400)
        if (units == 1){
            return '1 day ago'
        };
        return units.toString() + ' days ago'
    };


};

function drawProfilePicture(pixels, canvas) {
    var ctx = canvas.getContext('2d');
    var pixelSize = canvas.width / 4; // Assuming the profile picture is always 4x4

    pixels.forEach(function(rgb, index) {
        var rowIndex = Math.floor(index / 4);
        var colIndex = index % 4;

        var r = rgb[0]; // Extract red value from RGB array
        var g = rgb[1]; // Extract green value from RGB array
        var b = rgb[2]; // Extract blue value from RGB array

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
    });
}


function getMessageState(){
    fetch(socialAPI).then(function(response){ //https://gimcodes-3eqojmtp2-campbatt.vercel.app/
            return response.json();
        }).then(function (new_messages){
            console.log(new_messages);
            var messages = new_messages['new_messages_state']
            if (messages != null){
                console.log(messages);
                var current_message = first_message
                for (let x = 0; x<75; x++){
                    current_message.className='el_padre_de_Chris'
                    current_message = current_message.nextElementSibling
                }
                var current_message = first_message
                for (let x = 0; x<messages.length; x++){
                    current_message.className = ''


                    if (x == messages.length-1){
                        current_message.className='last_message'
                        clientCommand(messages[x][0],messages[x][2]);
                    }
                    console.log(current_message,current_message.firstChild,current_message.firstChild.firstChild)
                    current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.innerHTML = messages[x][0]
                    current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.firstChild.firstChild.innerHTML = messages[x][1]
                    console.log(messages[x][3])
                    current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.firstChild.nextElementSibling.innerHTML = TimeCalc(messages[x][2])
                    drawProfilePicture(JSON.parse(messages[x][3]),current_message.firstChild.nextElementSibling.firstChild.nextElementSibling)
                    console.log(JSON.parse(messages[x][3]))
                    //current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.innerHTML = messages[x][0]
                    //current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.firstChild.firstChild.firstChild.innerHTML = messages[x][1]
                    //current_message.firstChild.nextElementSibling.firstChild.nextElementSibling.firstChild.firstChild.nextElementSibling.innerHTML = TimeCalc(messages[x][2])


                    current_message = current_message.nextElementSibling


            
                }
            if (FirstTime){
                FirstTime = false
                scrollchat.scrollTop = scrollchat.scrollHeight- scrollchat.clientHeight
                setTimeout(()=>{scrollchat.scrollTop = scrollchat.scrollHeight- scrollchat.clientHeight}, 100)
                }
            };
        })
}






function signUp(username,password){
    check().then(function(test){
        console.log(test)
        if (test != false){
            fetch(socialAPI + '/signup',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            username:username,
            password:password
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
                alert(message_alert);
                fake_username.firstChild.innerHTML = 'Username'
                fake_password.firstChild.innerHTML = 'Password'
                chat_input.value = "Send Message as " + token['user']
            };
        }
            )
        }else{
            alert("You're already logged into an account");
        }
      })
    return 'no bitches'
};


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






function getPings(){
    fetch(socialAPI + '/pings',{
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
            if (info['redirect_pings'] == '1'){
                console.log('redirecting...')
            }
            if (info['pings'] != '0'){
                alert('You have been pinged by ' + info['pings'])
            }
        }
            )
};












//button.addEventListener('click',login)
chat_input.value = 'Send Message as ' + localStorage.getItem('user')


if (localStorage.getItem('user') == null){
    chat_input.value = 'Unable to send message, please login'
}
getMessageState();
setInterval(getMessageState,10000)
console.log(fake_password);
console.log('hello world');
