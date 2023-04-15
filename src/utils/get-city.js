export async function getCity(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    const cityName = data.address.city || data.address.town;
    return cityName;
  } catch (error) {
    alert('GET_CITY_ERROR: ', error);
    console.error('ERR: ', error);
  }
}
