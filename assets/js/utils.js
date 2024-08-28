export function typeTraslate(typePokemon){
    const diccionario ={
    'fire':{type: 'Fuego', color:'bg-red-600'},
    'flying':{type:'Volador', color:'bg-sky-300'},
    'normal':{type:'Normal', color:'bg-gray-900'},
    'steel':{type:'Acero', color:'bg-gray-900'},
    'water':{type:'Agua', color:'bg-sky-500'},
    'electric':{type:'Eléctrico', color:'bg-yellow-300'},
    'grass':{type:'Planta', color:'bg-green-500'},
    'ice':{type:'Hielo', color:'bg-sky-500'},
    'fighting':{type:'Lucha', color:'bg-red-800'},
    'poison':{type:'Veneno', color:'bg-violet-600'},
    'ground':{type:'Tierra', color:'bg-yellow-950'},
    'psychic':{type:'Psíquico', color:'bg-purple-800'},
    'bug':{type:'Bicho', color:'bg-green-500'},
    'rock':{type:'Roca', color:'bg-stone-600'},
    'ghost':{type:'Fantasma', color:'bg-indigo-950'},
    'dragon':{type:'Dragón', color:'bg-rose-500'},
    'dark':{type:'Siniestro', color:'bg-fuchsia-950'},
    'fairy':{type:'Hada', color:'bg-fuchsia-400'}
    }
    return diccionario[typePokemon]
}