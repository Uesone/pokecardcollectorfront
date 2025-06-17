# 💻 Pokedecks – Frontend

Pixel art web app for Pokémon TCG lovers!  
Search, collect, and track your cards in your personal Pokédex — see the total value of your collection in real time.

> **Note:** Pokedecks is currently available **only as a desktop web app**.

---

## 🚀 Features

- Desktop-first UI with retro pixel art style
- Search and filter Pokémon TCG cards
- Add cards to your collection (personal Pokédex)
- Real-time total collection value
- Syncs with backend API
- Responsive and fast (React)
- Simple login and register system (if enabled by backend)

---

## 🧰 Built With

- React (Create React App)
- Fetch API
- CSS
- Pixel art assets (custom)

---

## 🖼️ Preview

### Home
![Home](https://github.com/Uesone/pokecardcollectorfront/blob/master/screenshots/home.png?raw=true)

### Trading Cards
![Trading Cards](https://github.com/Uesone/pokecardcollectorfront/blob/master/screenshots/tradingcards.png?raw=true)

### Pokedex
![Pokedex](https://github.com/Uesone/pokecardcollectorfront/blob/master/screenshots/pokedex.png?raw=true)

### About Us
![About Us](https://github.com/Uesone/pokecardcollectorfront/blob/master/screenshots/aboutus.png?raw=true)

---

## 📦 Getting Started

Clone the repository and install dependencies:

```bash

git clone https://github.com/Uesone/pokecardcollectorfront.git
cd pokecardcollectorfront
npm install
npm start

⚙️ Configuration
If you use environment variables (for example, to set your backend API URL),

create a .env file in the root directory (do not commit this file) like:

REACT_APP_API_URL=http://localhost:3001

⚠️ Never commit your real .env file!

Add .env to your .gitignore.
You can provide a safe .env.example (without real secrets) in the repo.

📁 Folder Structure

pokecardcollectorfront/
│
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.css
│   ├── App.js
│   ├── Card.js
│   ├── CardList.js
│   ├── Collezione.js
│   ├── Collezione.css
│   ├── index.css
│   ├── index.js
│   ├── Login.js
│   ├── Navbar.js
│   ├── Pokedex.js
│   ├── Register.js
│   ├── SearchBar.js
│   └── ... (other components)
├── screenshots/
│   ├── home.png
│   ├── tradingcards.png
│   ├── pokedex.png
│   └── aboutus.png
├── .env           (not committed)
├── package.json
└── ...

📄 License
This project is open source.

Made with ☕ and pixels by Umberto Amoroso
