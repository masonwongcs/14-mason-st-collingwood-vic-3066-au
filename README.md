# Bellroy Collect Game

## Overview

Bellroy Collect is an interactive web-based game where players navigate an owl through a grid to collect prizes. The game features two modes of play and uses React for the frontend with Zustand for state management.

## Features

- Grid-based movement system
- Two game modes:
    1. Directional mode: Player rotates and moves forward/backward
    2. Free movement mode: Player can move in any direction
- Randomly generated prizes on the grid
- Keyboard and Swipe controls
- Step counter to track player progress
- Responsive design for various screen sizes

## Technologies Used

- Next.js
- React
- TypeScript
- Zustand (for state management)
- SCSS (for styling)

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/masonwongcs/14-mason-st-collingwood-vic-3066-au.git
   ```

2. Navigate to the project directory:
   ```
   cd 14-mason-st-collingwood-vic-3066-au.git
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open your browser and visit `http://localhost:3000` to play the game.

## How to Play

- Use arrow keys or WASD keys to move the owl:
    - Directional mode:
        - Up/W: Move forward
        - Down/S: Move backward
        - Left/A: Rotate counter-clockwise
        - Right/D: Rotate clockwise
    - Free movement mode:
        - Up/W: Move up
        - Down/S: Move down
        - Left/A: Move left
        - Right/D: Move right
- On touch devices, swipe in the desired direction to move
- Collect all the prizes on the grid to complete the game
- Try to complete the game in as few steps as possible

## Design

[Figma](https://www.figma.com/design/q8LqzyiITKhwQeegfo3Yo4/Bellroy-Collect?node-id=0-1&t=Cc96UOG0UF5YQD5b-1)

## Demo

https://14-mason-st-collingwood-vic-3066-au.vercel.app/
