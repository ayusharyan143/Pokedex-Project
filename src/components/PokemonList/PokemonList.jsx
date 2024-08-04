import { useEffect} from "react"
import axios from 'axios'
import './PokemonList.css'
import { useState } from "react"
import Pokemon from "../Pokemon/Pokemon"

function PokemonList() {


    const [pokemonList , setPokemonList] = useState([])
    const [isloading , setIsLoading] = useState(true)

    const [pokedexurl , setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")

    const [nexturl , setNextUrl] = useState('');
    const [prevurl , setPrevUrl] = useState('');


    async function DownloadPokemon() {

        setIsLoading(true)

        const response = await axios.get(pokedexurl)       // this downloads list of 20 pokemon

        const pokemonResults = response.data.results        // getting the array of pokemon from results

        console.log(response.data)
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)

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
    }, [pokedexurl])

    return (
        <>
            <div className="pokemon-list-wrapper">
                <div>Pokemon List</div>
                
                <div className="pokemon-wrapper">
                    {(isloading) ? 'Loading...': pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/> )}
                </div>

                <div className="controls">
                    <button disabled={prevurl == null} onClick={() => setPokedexUrl(prevurl)}>&laquo;  Prev</button>
                    <button disabled={nexturl == null} onClick={() => setPokedexUrl(nexturl)}>Next  &raquo;</button>
                </div>


            </div>

        </>
    )
}

export default PokemonList