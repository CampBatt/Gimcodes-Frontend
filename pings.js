let socialAPI = "https://gimcodes-8s07hzjre-campbatt.vercel.app"

function getPings(){
    if(localStorage.token == null){
        return null
    }
    fetch( socialAPI + '/pings',{
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
                window.location.href = 'https://gimcodes.vercel.app/Chat.html';
            }
            if (info['pings'] != '0' && info['pings'] != undefined){
                alert('You have been pinged by ' + info['pings'])
            }
        }
            )
};
getPings();
setInterval(getPings,30000);
