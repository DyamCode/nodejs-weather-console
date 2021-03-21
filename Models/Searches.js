const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

class Searches {
  record = [];
  dbPath = './db/database.json';

  constructor() {
    this.readDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  async place(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const res = await instance.get();

      return res.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (err) {
      throw err;
    }
  }

  async temperature(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          appid: process.env.OPENWEATHER_KEY,
          units: 'metric',
          lang: 'es',
          lat,
          lon,
        },
      });

      const res = await instance.get();

      const { weather, main } = res.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (err) {
      console.log(err);
    }
  }

  storeRecord(place = '') {
    if (this.record.includes(place.toLocaleLowerCase())) return;

    this.record = this.record.splice(0, 5);

    this.record.unshift(place.toLocaleLowerCase());

    this.storeDB();
  }

  storeDB() {
    const payload = {
      record: this.record,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;
    const data = JSON.parse(
      fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
    );

    data.record.forEach((place) => this.record.push(place));
  }
}

module.exports = Searches;
