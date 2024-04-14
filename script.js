const containerPokemon = document.querySelector("#containerPokemon");
const quantidadePokemons = 102;
const cores = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
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
    //console.log(data);
    criarCardPokemon(data);
}

function criarCardPokemon(pokemon){

    const card = document.createElement('div');
    card.classList.add("pokemon");

    const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const tiposPokemon = pokemon.types.map(type => type.type.name);
    console.log(tiposPokemon);
    const tipo = tipos.find(type => tiposPokemon.indexOf(type) > -1);
    const cor = cores[tipo];

    card.style.backgroundColor = cor

    const pokemonInnerHTML = `
    
        <div class="imagem-pokemon">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${nome}">
        </div>
        <div class="informacoes">
            <span class="numero">#${id}</span>
            <h3 class="nome">${nome}</h3>
            <small class="tipo">Tipo: <span>${tipo}</span> </small>
        </div>   
    `

    card.innerHTML = pokemonInnerHTML;
    containerPokemon.appendChild(card);

}


buscarTodosPokemons();

