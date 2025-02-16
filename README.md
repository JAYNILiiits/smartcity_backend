# Sensor Data Backend

A Node.js and Express.js backend application for receiving, processing, and storing sensor data from LoRa and ultrasonic sensors.

## Features

- Real-time data collection from LoRa-based water level sensors
- Distance measurement data collection from ultrasonic sensors
- Secure storage of sensor readings in MongoDB database
- RESTful API endpoints for data retrieval and management

## Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Hardware**: LoRa and Ultrasonic sensors
- **API**: RESTful architecture

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- LoRa gateway configured for data reception
- Ultrasonic sensors properly connected to the system

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sensor-backend.git
   cd sensor-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT
MONGODB_URI=
LORA_GATEWAY_ID
```

## API Endpoints

### Sensor Data

- `GET /api/sensors` - Retrieve all sensor readings
- `GET /api/sensors/:id` - Retrieve specific sensor reading
- `POST /api/sensors` - Store new sensor reading
- `GET /api/sensors/stats` - Get sensor statistics

### System Status

- `GET /api/status` - Check system health
- `GET /api/status/sensors` - Check sensor connectivity

## Development

Start the development server with automatic restart:

```bash
npm run dev
```

## Testing

Run the test suite:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
