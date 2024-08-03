import { useEffect} from "react"
import axios from 'axios'
import './PokemonList.css'
import { useState } from "react"
import Pokemon from "../Pokemon/Pokemon"

function PokemonList() {


    const [pokemonList , setPokemonList] = useState([])
    const [isloading , setIsLoading] = useState(true)

    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"


    async function DownloadPokemon() {
        const response = await axios.get(POKEDEX_URL)       // this downloads list of 20 pokemon

        const pokemonResults = response.data.results        // getting the array of pokemon from results

        console.log(response.data)

        // iterating over the array of pokemon, and using their url , to create an array of promises
        // that will download those 20 pokemons 
        const pokemonResultPromise =  pokemonResults.map((pokemon) => axios.get(pokemon.url) )

        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise)       // array of 20 pokemon detailed data
        console.log(pokemonData)

        // now iterate on the data of each pokemon, and extract id, name, image, types
        
        const res =  pokemonData.map((pokeData) => {
            const pokemon = pokeData.data 
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
            

        })
        console.log(res)
        setPokemonList(res)
        setIsLoading(false)
        
    }

    useEffect( () => {
        DownloadPokemon()
    }, [])

    return (
        <>
            <div className="pokemon-list-wrapper">
                <div>Pokemon List</div>
                {(isloading) ? 'Loading...': pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} /> )}
                
            </div>

        </>
    )
}

export default PokemonList