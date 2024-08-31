export async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener los detalles del Pokémon');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}