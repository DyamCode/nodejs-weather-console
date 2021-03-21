const {
  readInput,
  inquireMenu,
  pause,
  listPlaces,
} = require('./helpers/inquirer');
const Searches = require('./Models/Searches');

const main = async () => {
  let option = '';
  const searches = new Searches();

  do {
    option = await inquireMenu();

    console.log();

    switch (option) {
      case 1:
        const place = await readInput('Buscar:');

        const places = await searches.place(place);

        const placeId = await listPlaces(places);

        if (placeId === 0) continue;

        const selectedPlace = places.find((place) => place.id === placeId);

        searches.storeRecord(selectedPlace.name);

        const temperature = await searches.temperature(
          selectedPlace.lat,
          selectedPlace.lng
        );

        console.clear();
        console.log('\nInformacion del lugar\n'.yellow);
        console.log('Ciudad:'.yellow, selectedPlace.name);
        console.log('Lat:'.yellow, selectedPlace.lat.toString());
        console.log('Lng:'.yellow, selectedPlace.lng.toString());
        console.log('Temperatura:'.yellow, temperature.temp.toString());
        console.log('Minima:'.yellow, temperature.min.toString());
        console.log('Maxima:'.yellow, temperature.max.toString());
        console.log('Como esta el clima?:'.yellow, temperature.desc);

        break;

      case 2:
        searches.record.forEach((place, index) => {
          console.log(`${((++index).toString() + '.').green} ${place}`);
        });
        break;
    }

    console.log();

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
