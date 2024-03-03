async function fetchPasses() {
    while (true) {
        await fetch("https://app.smartpass.app/main/passes");
        // Add a delay here before the next fetch
        await new Promise(resolve => setTimeout(resolve, 0)); // Adjust the delay time as needed (in milliseconds)
    }
}

fetchPasses(); // Start the fetch loop

