import { fetchPokemonDetails } from "./pokemonDetails.js";

export async function fetchEvolutionChain(pokemonId) {
    try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
        const speciesData = await speciesResponse.json();

        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();

        let previous = null;
        let next = null;
        let currentEvolution = evolutionChainData.chain;

        while (currentEvolution) {
            // Verificar si el nombre de la especie coincide con el nombre del Pokémon actual
            if (currentEvolution.species.name === speciesData.name) {
                // Verificar si hay una evolución posterior
                if (currentEvolution.evolves_to.length > 0) {
                    const nextEvolutionSpeciesUrl = currentEvolution.evolves_to[0].species.url.replace('pokemon-species', 'pokemon');
                    const nextEvolutionData = await fetchPokemonDetails(nextEvolutionSpeciesUrl);
                    next = {
                        name: nextEvolutionData.name,
                        image: nextEvolutionData.sprites.front_default
                    };
                }
                break;
            }

            // Obtener la evolución anterior
            const previousEvolutionSpeciesUrl = currentEvolution.species.url.replace('pokemon-species', 'pokemon');
            const previousEvolutionData = await fetchPokemonDetails(previousEvolutionSpeciesUrl);
            previous = {
                name: previousEvolutionData.name,
                image: previousEvolutionData.sprites.front_default
            };

            currentEvolution = currentEvolution.evolves_to[0];
        }

        return {
            previous,
            next
        };

    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return {
            previous: null,
            next: null
        };
    }
}