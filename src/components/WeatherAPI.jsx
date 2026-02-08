import { useState , useEffect } from "react"
function WeatherApi() { //infos from api so we make usestate for updating the data 
    const [weatherData , setWeatherData] = useState([]);
    const [city , setCity] = useState(""); //from user
    const [selectedCity ,setselectedCity] = useState(null);  //from APi
    const [searchType , setSearchType] = useState("");
    const [loading , setLoading] = useState(false);
    const [searchLoading ,setSearchLoading] = useState(false);
    const [showDropDown , setShowDropDown] =useState(false);

    //using useeffect for fetching data from api so it will show after user searching 
    useEffect(() => {
        if (searchType.length < 1) { //if the search did not type it will not show data
            setCity([])
            setShowDropDown(false)
            return
            
        }
        setSearchLoading(true);
        const timer = setTimeout(() => { //to avoid many requests 
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchType}&count=5&language=en&format=json`)
            .then((response) => response.json())
            .then((data) => {
                if(data.results) {//from the api array 
                    setCity(data.results); //if the city is there i will store it 
                    setShowDropDown(true); //show the city 
                } else {
                    setCity([]);
                    setShowDropDown(false);
                }
                setLoading(false)
                    
            })
            .catch((e) => {
                console.error("error fetching" , e);
                setSearchLoading(false);


            })
        },500 );
        return() => clearTimeout(timer);    
    } , [searchType]); //dependancies 

    const fetchWether = (city) => {
        setLoading(loading)
        setShowDropDown(false)

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`)
        .then((response) => response.json())
        .then((data) => {
            setWeatherData(
                { // wil take the data from the API
                    temperature:data.current_weather.temperature,
                    windspeed:data.current_weather.windspeed,
                    weathercode:data.current_weather.weathercode,
                    time:data.current_weather.time,

                }
            );
            setLoading(false);
        })

    }
    const handleCitySelect = (city) => {
        setselectedCity(city);
        setSearchType(city.name);
        fetchWether(city);
    };
    return (
    <div className="weather-page">
        <div className="weather-card">
        <h2 className="weather-title">Weather Panel</h2>

        {/* Search */}
        <div className="search-area">
            <label className="label">Search City</label>
            <input
            id="cityInput"
            type="text"
            className="search-input"
            placeholder="Type a city name..."
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            onFocus={() => {
                if (city?.length > 0) setShowDropDown(true);
            }}
            />

            {/* Dropdown */}
            {showDropDown && city?.length > 0 && (
            <div className="dropdown">
                {city.map((c) => (
                <button
                    key={`${c.id}-${c.latitude}-${c.longitude}`}
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleCitySelect(c)}
                >
                    <div className="dropdown-title">
                    {c.name}
                    <span className="dropdown-country"> • {c.country}</span>
                    </div>
                    <div className="dropdown-sub">
                    {c.admin1 ? `${c.admin1}, ` : ""}
                    {c.latitude.toFixed(2)}, {c.longitude.toFixed(2)}
                    </div>
                </button>
                ))}
            </div>
            )}

            {searchLoading && <p className="hint">Searching...</p>}
        </div>

        {/* Weather Panel */}
        <div className="panel">
            {!selectedCity && !weatherData?.temperature && (
            <p className="empty">
                Type a city, then choose from the dropdown to show weather.
            </p>
            )}

            {loading && <p className="hint">Loading weather...</p>}

            {selectedCity && weatherData?.temperature !== undefined && (
            <>
                <div className="panel-top">
                <div>
                    <p className="city-name">
                    {selectedCity.name}
                    <span className="country"> • {selectedCity.country}</span>
                    </p>
                    <p className="time">
                    {weatherData.time}
                    </p>
                </div>

                <div className="temp">
                    {Math.round(weatherData.temperature)}°C
                </div>
                </div>

                <div className="grid">
                <div className="box">
                    <p className="box-label">Wind</p>
                    <p className="box-value">{weatherData.windspeed} km/h</p>
                </div>

                <div className="box">
                    <p className="box-label">Weather Code</p>
                    <p className="box-value">{weatherData.weathercode}</p>
                </div>

                <div className="box">
                    <p className="box-label">Latitude</p>
                    <p className="box-value">{selectedCity.latitude.toFixed(2)}</p>
                </div>

                <div className="box">
                    <p className="box-label">Longitude</p>
                    <p className="box-value">{selectedCity.longitude.toFixed(2)}</p>
                </div>
                </div>
            </>
            )}
        </div>
        </div>
    </div>
    );

    
}

export default WeatherApi