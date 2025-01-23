export const getWeatherData = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const data = await response.json();

    if (data.current_weather) {
      return data.current_weather; // Regresa los datos del clima
    } else {
      throw new Error("No se pudo obtener información del clima.");
    }
  } catch (error) {
    throw new Error("No se pudo obtener el clima.");
  }
};
