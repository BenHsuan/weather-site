window.addEventListener('load', () => {
    let long;
    let lat;
    let tempertureDescription = document.querySelector(".temperature-description");
    let tempertureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temepature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/4dd69830c2ba485242165b93b25cdc03/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    //Set DOM Elements from the API
                    /* changing of farenheit to celsius
                    (32°F − 32) × 5/9 = 0°C*/
                    tempertureDegree.textContent = temperature;
                    tempertureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));
                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                        } else {
                            temperatureSpan.textContent = "F";
                        }
                    }
                    )
                });
        });

    } else {
        h1.textContent = "Hey, Timezone not found."
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})