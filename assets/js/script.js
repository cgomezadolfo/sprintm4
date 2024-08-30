//importaciones
import { typeTraslate } from "./utils.js";
import { searchPokemon } from "./searchPokemon.js";

// elementos del DOM
const pokemonList = document.querySelector('.list-items');
const loadingSpinner = document.getElementById('loading-spinner');
const pokemonCard = document.querySelector('.pokemon-card');
const pokemonForm = document.querySelector('.pokemon-form');


let offset = 0;
const limit = 20;
let isLoading = false;

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
        isLoading = true;
        loadingSpinner.style.display = 'flex';
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
        loadingSpinner.style.display = 'none';
        isLoading = false;   
    } finally {
        isLoading = false;
        loadingSpinner.style.display = 'none';
    }
}
function handleScroll() {
    if (pokemonList.scrollTop + pokemonList.clientHeight >= pokemonList.scrollHeight - 5 && !isLoading) {
        loadPokemon();
        
    }
}

pokemonList.addEventListener('scroll', handleScroll);
loadPokemon();


//colocar función para renderizar la card pokémon

function renderPokemonCard(pokemon) {
    pokemonList.style.display = 'none';
    pokemonCard.style.display = 'block';

    const types = pokemon.types.map(typeInfo => typeTraslate(typeInfo.type.name).type).join(' - ');

    pokemonCard.innerHTML = `
        <div class="card">
            <div class="card-title">
                <h4>#${pokemon.id} - ${pokemon.name}</h4>
            </div>
            <div class="card-body">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="card-img">
                <p>Tipo: ${types}</p>
                <button class="view-hability">Ver habilidades</button>
            </div>
            <button class="back-to-list">Volver a la lista</button>
        </div>
    `;

    document.querySelector('.back-to-list').addEventListener('click', () => {
        pokemonCard.style.display = 'none';
        pokemonList.style.display = 'block';
    });

    document.querySelector('.view-hability').addEventListener('click', () => {
        const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
        alert(`Habilidades de ${pokemon.name}: ${abilities}`);
    });
}

//Evento para manejar el formulario
pokemonForm.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const inputValue = document.querySelector('.input').value;
    const pokemon = await searchPokemon(inputValue);
    if(pokemon){
        renderPokemonCard(pokemon);
    }

    pokemonForm.reset();
})