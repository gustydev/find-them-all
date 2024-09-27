# Find Them All

**Find Them All** is a "Where's Waldo" type game where players try to locate characters on a series of maps. It's a front-end React app that connects to the [Waldo API](https://github.com/gustydev/waldo-api), allowing users to start new game sessions, submit character guesses that are validated in the back-end, and submit scores on the leaderboards.

## Features

- **Interactive Map Interface**: Click on characters and submit guesses for their locations.
- **Game Timer**: Tracks how quickly players can find all characters on the map.
- **Dynamic Map Loading**: Maps and characters are dynamically loaded from the backend API.
- **Leaderboard**: View top scores for each map.
- **Responsive Design**: Optimized for different screen sizes, keeping coordinates consistent among them.

## Technologies Used

- **React** (with hooks: `useState`, `useEffect`, `useContext`)
- **React Router** for navigation
- **CSS Modules** for scoped styling
- **Toastify** for notifications
- **API Fetching** of the Waldo API
- **Custom Hooks** for shared logic

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- `npm` package manager
- The [Waldo API](https://github.com/gustydev/waldo-api) backend up and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gustydev/find-them-all.git
   cd find-them-all
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:
   ```
   VITE_API_URL=http://localhost:3000
   VITE_SECRET_PASS=secret_password # Must match the one set up in the back-end
   ```

4. Start the React development server:
   ```bash
   npm run dev
   ```

### Key Features

1. **Starting a Game**:
   Players can choose a map and click "Start Game" to begin. A new game session is created on the backend.

2. **Making a Guess**:
   Players click on a map location and select the character they believe is at that spot. If the guess is correct, the character is marked as found.

3. **Timer**:
   A `Stopwatch` component starts when the game begins and tracks the total time until all characters are found.

4. **Leaderboard**:
   Once the game is completed, the player's time is submitted to the leaderboard, and they can view their ranking.

### Custom Hooks

- **useGameData**: Manages the game session, fetching game details from the backend, and handles character guessing.
- **useMapData**: Fetches map data, including details about the characters and leaderboard.

