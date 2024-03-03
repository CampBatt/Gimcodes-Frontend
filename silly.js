async function fetchPasses() {
    var delay_time = prompt("input time between each request (in miliseconds)")
    var num_delay = parseInt(delay_time);

    if (!isNaN(num_delay)) {
        txt_dly = num_delay.toString();
        alert("Starting with a delay of " + txt_dly + 'ms');
    } else {
        alert("Invalid input, defualting to 250ms");
        var num_delay = 250
    }
    while (true) {
        await fetch("https://app.smartpass.app/main/passes");
        // Add a delay here before the next fetch
        await new Promise(resolve => setTimeout(resolve, num_delay)); // Adjust the delay time as needed (in milliseconds)
    }
}

fetchPasses(); // Start the fetch loop

