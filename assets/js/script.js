import { typeTraslate } from "./utils.js";


const pokemonList = document.querySelector('.list-items');
let offset = 0;
const limit = 20;

async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener los detalles del Pokémon');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function loadPokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        if (!response.ok) throw new Error('Error al obtener la lista de Pokémones');

        const data = await response.json();
        
        for (const pokemon of data.results) {
            const details = await fetchPokemonDetails(pokemon.url);
            if (details) {
                /*Se ocupa un map para agregar un guion que separe los tipos y se usa la función typeTraslate para traducir los typos de pókemones a español*/
                const types = details.types.map(typeInfo => typeTraslate(typeInfo.type.name).type).join(' - ');
                
                const listItem = document.createElement('li');
                listItem.classList.add('pokemon-item');
                listItem.innerHTML = `
                        <h4 class="item-id">#${details.id}</h4>
                        <img src="${details.sprites.front_default}" alt="${pokemon.name}" height="80" width="80" class="item-img">
                        <h4 class="item-name">${pokemon.name}</h4>
                        <h4 class="item-type">${types}</h4>
                `;
                pokemonList.appendChild(listItem);
            }
        }

        offset += limit;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

// cargando la lista inicial de pókemones
loadPokemon();

// detectar el scroll para cargar mas pókemones
pokemonList.parentElement.addEventListener('scroll', () => {
    if (pokemonList.parentElement.scrollTop + pokemonList.parentElement.clientHeight >= pokemonList.parentElement.scrollHeight) {
        loadPokemon();
    }
});