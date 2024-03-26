var canvas = document.getElementById('displayed_pfp');
var username = document.getElementById('displayed_user');
var email = document.getElementById('displayed_email');
var bio = document.getElementById('bio');
var msgs_sent = document.getElementById('displayed_message_stats');
var code_stats = document.getElementById('displayed_code_stats');
var online_stats = document.getElementById('displayed_online_stats');
var creation_date = document.getElementById('displayed_join_date_stats');
var mute_stats = document.getElementById('displayed_mute_stats');
var admin_stats = document.getElementById('displayed_admin_stats');
var Id = document.getElementById('displayed_ID');
var stats = document.getElementById('stats');
var profile_mat = document.getElementById("profile_mat");
var button = document.getElementById('modify_button');
var error = document.getElementById('login_error');

var parameters = new URLSearchParams(window.location.search);
var target_user = parameters.get('id');

console.log(target_user);
if (target_user == null){
    console.log('target user == null')
    target_user = localStorage.getItem('Id')
}
if (target_user == null){
    profile_mat.className = 'invis'
    error.className =''

}

var socialAPI = 'https://gimcodes-9zd3ncmra-campbatt.vercel.app'

function TimeCalc(input_time){
    var time_ago = input_time
    input_time = parseInt(input_time);
    if (time_ago <60){
        return time_ago.toString() + ' seconds'
    };


    if (time_ago >= 60 && time_ago < 3600){
        var units = Math.round(time_ago/60)
        if (units == 1){
            return '1 minute'
        };
        return units.toString() + ' minutes'
    };


    if (time_ago >= 3600 && time_ago < 86400){
        var units = Math.round(time_ago/3600)
        if (units == 1){
            return '1 hour'
        };
        return units.toString() + ' hours' //2,592,000
    };


    if (time_ago >= 86400 && time_ago < 2592000){
        var units = Math.round(time_ago/86400)
        if (units == 1){
            return '1 day'
        };
        return units.toString() + ' days'
    };

    if (time_ago >= 2592000 && time_ago < 31540000){
        var units = Math.round(time_ago/2592000) //31,540,000
        if (units == 1){
            return '1 month'
        };
        return units.toString() + ' months'
    };

    if (time_ago >= 31540000){
        var units = Math.round(time_ago/31540000) //31,540,000
        if (units == 1){
            return '1 year'
        };
        return units.toString() + ' years'
    };

    


};

function BoolToYN(bol){
    if (parseInt(bol)){
        return 'Yes'
    }else{
        return 'No'
    }

}

function MuteStat(time_input){
    var current_time = Math.round(Date.now()/1000);
    time_input = Math.round(time_input)
    if (time_input - current_time < 0){
        return "Not Muted"
    }
    console.log(time_input-current_time)
    return "Muted for " + TimeCalc(time_input-current_time)


}

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

fetch(socialAPI + '/profile',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        Id:target_user,
    })}).then(res => {
        return res.json().then(res =>{
            console.log(res);
            username.innerHTML = res[0]+ '#'+res[res.length-1];
            email.innerHTML = res[8];
            msgs_sent.innerHTML = "Messages Sent : " + res[10];
            code_stats.innerHTML = "Codes Found : " + res[11];
            var current_time = Math.round(Date.now()/1000);
            var time_to_use = current_time-parseInt(res[13])
            online_stats.innerHTML = "Last Online : " + TimeCalc(time_to_use) + ' ago';
            creation_date.innerHTML = "Join Date : " + res[12];
            mute_stats.innerHTML = "Mute Status : " + MuteStat(res[2]);
            admin_stats.innerHTML = "Is an Admin : " + BoolToYN(res[3]);
            Id.innerHTML = 'ID : ' + res[res.length-1]

            //bio.innerHTML = res[14]
            displayed_bio.innerHTML = res[14]
            drawProfilePicture(JSON.parse(res[9]),canvas)

            if(localStorage.getItem('user') == res[0]){
                button.className = ''
            }

            canvas.className = ''
            stats.className = ''
            
        })
    })