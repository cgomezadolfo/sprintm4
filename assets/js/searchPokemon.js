export async function searchPokemon(value){
    const inputValue = value.trim();

    if (!inputValue){
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor, ingresa un nombre o ID de Pokémon.',
        });
        return null;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`;

    try {
        const response = await fetch(url);

        // Verificar si la respuesta no es válida
        if (!response.ok) {
            throw new Error('No encontrado');
        }
        const pokemon = await response.json();
        return pokemon;

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'No encontrado',
            text: 'No se encontró un Pokémon con ese nombre o ID. Por favor, verifica y vuelve a intentar.',
        });
        return null;
    }
}