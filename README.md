# Weather App

This Weather App provides real-time weather information based on the user's location or a city search. It uses the OpenWeatherMap API to fetch weather data and displays it in an intuitive and attractive UI.

## Features

- Displays real-time weather based on the user's current location.
- Allows users to search for weather information in any city.
- Displays temperature, humidity, visibility, wind speed, and weather condition.
- Provides a visually appealing UI with animated weather icons.
- Responsive design for better user experience on different devices.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **axios**: Promise-based HTTP client for the browser and Node.js.
- **react-animated-weather**: Animated weather icons.
- **react-live-clock**: Live clock component for React.
- **OpenWeatherMap API**: Provides weather data.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nareshbodapatla/kraftshala-weatherapp
```

2. Navigate to the project directory:

```bash
cd kraftshala-weatherapp
```

3. Install the dependencies:

```bash
npm install
```

4. Create an `apiKeys.js` file in the `src/api` directory with your OpenWeatherMap API key:

```js
const apiKeys = {
  key: 'YOUR_API_KEY',
  base: 'https://api.openweathermap.org/data/2.5/',
};

export default apiKeys;
```

### Running the App

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Integration

This app uses the OpenWeatherMap API to fetch weather data. You need an API key from OpenWeatherMap to use their API. 

## Contributions

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
