import './index.css';

const CityInformationTable = ({
  city,
  temp,
  humidity,
                                     })=>{
  return (
    <div className="weather-info">
      <table align={"center"}>
        <tr>
          <th>City</th><td>{city}</td>
        </tr>
        <tr>
          <th>Temperature</th><td>{temp}°C</td>
        </tr>
        <tr>
          <th>Humidity</th><td>{humidity}%</td>
        </tr>
      </table>
    </div>
  );
}

export default CityInformationTable;
