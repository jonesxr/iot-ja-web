
//aa6080f0b3d3f2ad02640aa9af989b64

let weatherChart;  //kaavio

async function haeJaPaivita() {
    try {
        //datan fetchaus ja purku
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Tampere,FI&appid=aa6080f0b3d3f2ad02640aa9af989b64&units=metric');
        //virhe
        if (!response.ok) throw new Error('Api error'); 

        const data = await response.json();
        //nykyinen
        const current = data.list[0]; 

        // päivitykset säähän
        let temp = document.querySelector('.temp');
        let desc = document.querySelector('.description');

        //lämpötilat
        temp.textContent = Math.round(current.main.temp) + '°C'; 

        //sään kuvaus
        desc.textContent = current.weather[0].description;

        //nelän seuraavan tunnin ennuste tekoäly auttoi hieman aika paljon tä
        let hourlyItems = document.querySelectorAll('.hourly-forecast .col');
        for (let i = 0; i < 4; i++) {

            let forecast = data.list[i + 1]; // seuraavat neljä ajanhetkeä sivulta

            let time = hourlyItems[i].querySelector('.hourly-time');

            let hourlyTemp = hourlyItems[i].querySelector('.hourly-temp'

            );

            time.textContent = new Date(forecast.dt * 1000).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
            hourlyTemp.textContent = Math.round(forecast.main.temp) + '°C';
        }



        // kuvaajan asetukset 
        if (weatherChart) {
            weatherChart.destroy(); //poistetaan vanha kaavio uuden alta
        }
        let chartCanvas = document.getElementById('weatherChart');
        let chartContext = chartCanvas.getContext('2d');
        let times = []; //x akseli aika
        let temps = []; // y akseli lämpötila
        //pisteet kuvaajassa
        for (let i = 0; i < 15; i++) {
            times.push(new Date(data.list[i].dt * 1000).toLocaleTimeString('fi-FI', { hour: '2-digit' }));
            temps.push(data.list[i].main.temp);
        }
        weatherChart = new Chart(chartContext, {
            type: 'line',
            data: {

                labels: times, // akselit
                datasets: [{
                    label: 'Temp (°C)',
                    data: temps, //pisteet
                   
                  
                }]
            }
        });
       

        // viimeisen päivityksen aika 
        document.querySelector('.update-time').textContent = new Date().toLocaleTimeString('fi-FI');


    } catch (error) {
        // virhetilanne
        console.error('Error !!!', error);
      
    }
}

// suoritus
haeJaPaivita();
// päivitys 5min välein 
setInterval(haeJaPaivita, 5 * 60 * 1000);