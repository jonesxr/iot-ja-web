// Tehtävänanto: Osa 1 - "Show the Data"
// Näyttää kaupungin tiedot taulukossa
const populateTable = (data) => {
  document.getElementById("city-name").innerText = data.city;
  document.getElementById("city-country").innerText = data.country;
};

// Tehtävänanto: Osa 1 - "Show the Data"
// Hakee tietyn kaupungin tiedot backendistä ID:n perusteella
const fetchCity = async (id) => {
  try {
    const response = await fetch('http://localhost:5000/api/cities/' + id);
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.log(error);
  }
};

// Tehtävänanto: Osa 2 - "PUT UI"
// Vaihtaa näkymän muokkaustilaan luomalla syötekentät
const switchMode = () => {
  const cityColumn = document.getElementById('city-name');
  const countryColumn = document.getElementById('city-country');

  const cityInput = document.createElement('input');
  cityInput.id = 'name-input';
  cityInput.setAttribute('value', cityColumn.innerText);
  cityInput.setAttribute('name', 'city');
  cityColumn.innerText = "";
  cityColumn.appendChild(cityInput);

  const countryInput = document.createElement('input');
  countryInput.id = 'country-input';
  countryInput.setAttribute('value', countryColumn.innerText);
  countryInput.setAttribute('name', 'country');
  countryColumn.innerText = "";
  countryColumn.appendChild(countryInput);

  document.getElementById('button-edit').style.display = 'none';
  document.getElementById('button-save').style.display = 'block';
};

// Tehtävänanto: Osa 2 - "PUT UI"
// Päivittää kaupungin tiedot backendissä ja palauttaa näyttötilan
const updateCity = async () => {
  const cityColumn = document.getElementById('city-name');
  const countryColumn = document.getElementById('city-country');
  const city = {
    id: sessionStorage.getItem('cityId'),
    city: document.getElementById('name-input').value,
    country: document.getElementById('country-input').value
  };
  try {
    const response = await fetch('http://localhost:5000/api/cities', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(city)
    });
    const data = await response.json();
    if (response.status == 200) {
      cityColumn.innerText = data.city;
      countryColumn.innerText = data.country;
      saveButton.style.display = 'none';
      editButton.style.display = 'inline';
    }
  } catch (error) {
    console.log(error);
  }
};

// Tehtävänanto: Osa 1 - "Show the Data" + Osa 2 - "PUT UI"
// Asettaa tapahtumakuuntelijat ja hakee kaupungin sivun latautuessa
window.onload = () => {
  const id = sessionStorage.getItem('cityId');
  editButton.onclick = () => {
    switchMode();
  };
  fetchCity(id);
};