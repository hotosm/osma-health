const COUNTRIES_URL = 'https://raw.githubusercontent.com/hotosm/osma-health-workers/master/countries.json';
const STATS_BASE_URL = 'https://s3.amazonaws.com/osma-health/data' 

async function fetchCountries() {
  const response = await fetch(COUNTRIES_URL);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Could not retrieve countries');
  }
}

async function fetchStats (country, boundary) {
  const URLize = str => str.toLowerCase().replace(/\s/g, '+');
  const url = `${STATS_BASE_URL}/${URLize(country)}/${URLize(boundary)}/stats.json`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Could not retrieve boundary stats');
  }
}
export default {
  fetchCountries,
  fetchStats
}