const COUNTRIES_URL = 'https://raw.githubusercontent.com/hotosm/osma-health-workers/master/countries.json';

async function fetchCountries() {
  const response = await fetch(COUNTRIES_URL);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Could not retrieve countries');
  }
}

export default {
  fetchCountries
}