const getRandomInt = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min)
}

//event espera que se cargue el html para cargar el js
document.addEventListener('DOMContentLoaded', () => {
    const idPokemon = getRandomInt(1, 151)
    fetchData(idPokemon)
})

const fetchData = async (id) => {
    try {
        const rs = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await rs.json()

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            base_experience: data.base_experience,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat
        }
        pintarCard(pokemon)
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon) => {
    //console.log(pokemon);
    const flex = document.querySelector('.flex')
    //content accede al contenido del templete
    const templete = document.querySelector('#main').content
    const clone = templete.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img )
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>HP:${pokemon.hp}</span>`
    clone.querySelector('.card-body-text').textContent = `Experience: ${pokemon.base_experience}`
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = `${pokemon.ataque}K`
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = `${pokemon.defensa}K`
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = `${pokemon.especial}K`
    fragment.appendChild(clone)

    flex.appendChild(fragment)
}
