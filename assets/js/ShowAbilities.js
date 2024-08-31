export function showAbilitiesChart(pokemon) {
    const abilities = pokemon.stats.map(stat => ({
        name: translateAbility(stat.stat.name),
        value: stat.base_stat,
        icon: getAbilityIcon(stat.stat.name) // Obtén el icono correspondiente
    }));

    const colors = abilities.map(ability => {
        if (ability.value < 40) return 'red';
        if (ability.value < 80) return 'yellow';
        return 'green';
    });

    const abilityHTML = abilities.map(ability => `
        <div class="chart-item" style="display: flex; align-items: center; margin-bottom: 10px;">
            <span style="width: 24px; height: 24px; margin-right: 10px;">${ability.icon}</span>
            <div class="chart-bar" style="background-color: ${colors[abilities.indexOf(ability)]}; width: ${ability.value}%;">
                ${ability.name}: ${ability.value}
            </div>
        </div>
    `).join('');

    const htmlContent = `
        <div style="display: grid; grid-template-columns: 1fr;">
            <h2>${pokemon.name}</h2>
            <div class="chart-img">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" style="width: 100px; margin-bottom: 20px;">
            </div>
            ${abilityHTML}
        </div>
    `;

    Swal.fire({
        html: htmlContent,
        width: 800,
        showConfirmButton: true,
    });
}

function getStatIcon(statName) {
    const icons = {
        'hp': 'https://img.icons8.com/emoji/48/heart-suit.png',
        'attack': 'https://img.icons8.com/external-soft-fill-juicy-fish/60/external-component-game-development-soft-fill-soft-fill-juicy-fish-9.png',
        'defense': 'https://img.icons8.com/color/48/knight-shield.png',
        'special-attack': 'https://img.icons8.com/color/48/fist-pokemon.png',
        'special-defense': 'https://img.icons8.com/color/48/yellow-team.png',
        'speed': 'https://img.icons8.com/color/48/instinct.png',
        
    };
    return icons[statName] || 'default_icon_url';
}

function translateAbility(abilityName) {
    const translations = {
        'attack': 'Ataque',
        'defense': 'Defensa',
        'speed': 'Velocidad',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defensa Especial',
        'hp': 'Puntos de Salud',
    };
    return translations[abilityName] || abilityName;  // Devuelve el nombre original si no se encuentra la traducción
}

function getAbilityColor(value) {
    if (value < 40) {
        return 'red';  // Rojo para valores menores de 40
    } else if (value >= 40 && value <= 80) {
        return 'yellow';  // Amarillo para valores entre 40 y 80
    } else {
        return 'green';  // Verde para valores mayores de 80
    }
}

function getAbilityIcon(abilityName) {
    const icons = {
        'attack': '🗡️',  // Ejemplo: ícono de espada para ataque
        'defense': '🛡️',  // Ejemplo: ícono de escudo para defensa
        'speed': '⚡',  // Ejemplo: ícono de rayo para velocidad
        'special-attack': '🔥',  // Ejemplo: ícono de fuego para ataque especial
        'special-defense': '✨',  // Ejemplo: ícono de brillo para defensa especial
        'hp': '❤️',  // Ejemplo: ícono de corazón para puntos de salud (HP)
    };
    return icons[abilityName] || '❓';  // Devuelve un ícono por defecto si no se encuentra el nombre
}