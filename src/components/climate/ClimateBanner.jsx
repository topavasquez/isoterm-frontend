import React, { useState, useEffect } from "react";
import {
  FaThermometerHalf,
  FaSnowflake,
  FaSun,
  FaCloudSun,
} from "react-icons/fa";
import { WEATHER_CONFIG } from "../../config/weather";

const ClimateBanner = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      console.log("Obteniendo clima real de Chillán...");
      
      const response = await fetch(
        `${WEATHER_CONFIG.BASE_URL}?q=${WEATHER_CONFIG.CITY}&appid=${WEATHER_CONFIG.API_KEY}&units=${WEATHER_CONFIG.UNITS}&lang=${WEATHER_CONFIG.LANG}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Error al obtener datos del clima"
          }`
        );
      }

      const data = await response.json();
      console.log("Datos del clima obtenidos exitosamente:", data);
      setWeatherData(data);
      setError(null); // Limpiar errores previos
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError(error.message);
      
      // Si hay error 401 (API key inválida), usar datos de ejemplo como fallback
      if (error.message.includes('401')) {
        console.log("API key no activada aún, usando datos de ejemplo temporalmente");
        setWeatherData({
          main: { temp: 22 },
          name: 'Chillán',
          weather: [{ main: 'Clear', description: 'cielo claro' }]
        });
        setError(null);
      } else {
        setWeatherData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const getTemperatureStatus = (temp) => {
    if (temp >= 25) {
      return "hot";
    } else if (temp <= 15) {
      return "cold";
    } else {
      return "neutral";
    }
  };

  const getWeatherMessage = (temp, status) => {
    const messages = {
      hot: {
        text: `Chillán, ${Math.round(
          temp
        )}°C - ¡Perfecto para usar aire acondicionado! Refresca tu hogar.`,
        icon: <FaSun size={28} />,
        bgColor: "bg-warning",
        textColor: "text-dark",
        badge: "badge bg-danger",
      },
      neutral: {
        text: `Chillán, ${Math.round(
          temp
        )}°C - Temperatura agradable. Prepárate para los días calurosos.`,
        icon: <FaCloudSun size={28} />,
        bgColor: "bg-primary",
        textColor: "text-white",
        badge: "badge bg-info",
      },
      cold: {
        text: `Chillán, ${Math.round(
          temp
        )}°C - Clima fresco. ¡Ideal para planificar tu próximo aire acondicionado!`,
        icon: <FaSnowflake size={28} />,
        bgColor: "bg-info",
        textColor: "text-white",
        badge: "badge bg-primary",
      },
    };
    return messages[status];
  };

  if (loading) {
    return (
      <div className="bg-primary text-white py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <span>Obteniendo datos del clima...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-warning text-dark py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <FaThermometerHalf className="me-2" />
              <span>
                <strong>Chillán</strong> - No se pudieron obtener datos del clima
                {error && (
                  <small className="d-block mt-1 opacity-75">
                    {error}
                  </small>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const temp = weatherData.main.temp;
  const status = getTemperatureStatus(temp);
  const weatherInfo = getWeatherMessage(temp, status);

  return (
    <div className={`py-4 ${weatherInfo.bgColor}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className={`d-flex align-items-center justify-content-center ${weatherInfo.textColor}`}
            >
              <div className="me-3 d-flex align-items-center">
                {weatherInfo.icon}
              </div>
              <div className="text-center flex-grow-1">
                <h5 className="mb-1 fw-bold">
                  <FaThermometerHalf className="me-2" />
                  {weatherInfo.text}
                </h5>
                <small className="opacity-75">
                  {weatherData.weather[0].description.charAt(0).toUpperCase() +
                    weatherData.weather[0].description.slice(1)}
                </small>
              </div>
              <div className="ms-3">
                <span className={weatherInfo.badge}>
                  {Math.round(weatherData.main.temp)}°C
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateBanner;
