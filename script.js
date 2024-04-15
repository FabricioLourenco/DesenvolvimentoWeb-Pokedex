const containerPokemon = document.querySelector("#containerPokemon");
const quantidadePokemons = 151;

const traducoesTipos = {
    grass: 'Grama',
    fire: 'Fogo',
    water: 'Água',
    bug: 'Inseto',
    poison: 'Venenoso',
    normal: 'Normal',
    flying: 'Voador',
    electric: 'Elétrico',
    ground: '=Terra',
    fairy: 'Fada',
    fighting: 'Lutador',
    psychic: 'Psíquico',
    rock: 'Pedra',
    dragon: 'Dragão',
    ice: 'Gelo',
    dark: 'Sombrio'
};

const cores = {
    grass: '#9bcc50',
    fire: '#fd7d24',
    water: '#4592c4',
    bug: '#729f3f',
    poison: '#b97fc9',
    normal:  '#a4acaf',
    flying: '#89f',   
    electric: '#eed535',   
    ground: '#db5',
    fairy: '#fdb9e9',
    fighting: '#d56723',
    psychic: '#f366b9',
    rock: '#a38c21',       
    dragon: '#76e',
    ice: '#51c4e7',
    dark: '#754'    
}

const tipos = Object.keys(cores)

async function buscarTodosPokemons(){

    for(let i = 1; i <= quantidadePokemons; i++){

        await buscarPokemon(i);
    }
}

async function buscarPokemon(id){

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch (url);
    const data = await resp.json();

    criarCardPokemon(data);
}

function criarCardPokemon(pokemon){

    const card = document.createElement('div');
    card.classList.add("pokemon");

    const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const id = pokemon.id.toString().padStart(3, '0');

    const tiposPokemon = pokemon.types.map(type => type.type.name);
    const coresTipos = tiposPokemon.map(tipo => cores[tipo]);
    
    card.style.background = coresTipos.length === 1 ? coresTipos[0] : `linear-gradient(to right, ${coresTipos.join(', ')})`;

    const tiposHTML = tiposPokemon.map(tipo => `<span class="tipo ${tipo}" title="${traducoesTipos[tipo]}">${traducoesTipos[tipo]}</span>`).join(' ');
    
    const pokemonInnerHTML = `
        <div class="imagem-pokemon">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${nome}">
        </div>
        <div class="informacoes">
            <span class="numero">#${id}</span>
            <h3 class="nome">${nome}</h3>
            <small class="tipos">${tiposHTML}</small>
        </div>   
    `;

    card.innerHTML = pokemonInnerHTML;
    containerPokemon.appendChild(card);
}



buscarTodosPokemons();

