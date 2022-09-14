/* select poke-container from html because thats we gonna fill up with cards */
const poke_container = document.getElementById('poke-container');
const pokemon_count = 150; /* number of pokemon cards */
const colors = {
  /* pokemon cards colors based on element type */
  fire: '#d78c8a',
  grass: '#8aec94',
  electric: '#FCF7DE',
  water: '#278181',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

/* colors are in arrays so we set colors as object keys to order them by numbers fire:0 grass:1 electric:2 ect */
const main_types = Object.keys(colors);

/* create function with loop */
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`; /* api url and pokemon id is variable */
  const res = await fetch(url); /* waits for url to load */
  const data = await res.json();
  createPokemonCard(data); /* creates pokemon card*/
};

/* declares objects name id types and methods toUppercase slice ect..*/
const createPokemonCard = (pokemon) => {
  /* create css pokemon 'div' for cards */
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  /* changes name to uppercase 0 is for first letter + removes/slices letter from pokemon name*/
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  /* changes object name id ect to string + padStart adds extra characters to name like here 3 is length and 0 is extra characters so its 000 if we dont specify it adds empty spaces*/
  const id = pokemon.id.toString().padStart(3, '0');

  const poke_types = pokemon.types.map((type) => type.type.name);

  /* the main_types are numbered list so use find type and set it greater than -1 so it starts from 0 1 2 ect..
  the main_types is list of all the pokemon types */
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  /* set the number of pokemon card as its color */
  const color = colors[type];
  /* set card colors as background Color aka fire red grass green */
  pokemonEl.style.backgroundColor = color;

  /* html template inside javascript for pokemon cards use with api so we dont have to type all 150 card manually*/
  const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `;
  /* assigns pokemon element to inner html */
  pokemonEl.innerHTML = pokemonInnerHTML;

  /* assigns poke-container to pokemonEl element */
  /* Both innerHTML property and appendChild() method can be used to add new contents to the page */
  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
