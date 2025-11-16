const submitButtonMainPage = document.getElementById("submit-button-main-page")


// TODO: Replace with API
submitButtonMainPage.addEventListener("click", () => { 
    const state = document.getElementById("state");
    const city = document.getElementById("city");

    console.log(`Clicked Submit with State: ${state.value} and City: ${city.value}.`);
}); 