import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {

    const { pokemonListState , setPokemonListState } = usePokemonList( false);

    return (
        <>
            <div className="pokemon-list-wrapper">
                <div>Pokemon List</div>

                <div className="pokemon-wrapper">
                    {pokemonListState.isLoading ? 'Loading...' : pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)}
                </div>

                <div className="controls">
                    
                    <button disabled={pokemonListState.prevUrl == null} onClick={() => { const urlToSet = pokemonListState.prevUrl; setPokemonListState({ ...pokemonListState , pokedexUrl: urlToSet})} }>&laquo; Prev</button>
                    
                    <button disabled={pokemonListState.nextUrl == null } onClick={() => { const urlToSet = pokemonListState.nextUrl; setPokemonListState({ ...pokemonListState , pokedexUrl: urlToSet})} }>Next &raquo;</button>

                </div>
            </div>
        </>
    );
}

export default PokemonList;
