import { useParams } from "react-router-dom";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import './PokemonDetails.css';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon] = usePokemonDetails(id);

    return (
        <div className="pokemon-details-container">
            <img className="pokemon-details-image" src={pokemon.image} alt={pokemon.name} />
            
            <div className="pokemon-details-content">
               
                <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
                
                <div className="pokemon-details-stats">
                    <div>Height: {pokemon.height}</div>
                    <div>Weight: {pokemon.weight}</div>
                </div>
                
                <div className="pokemon-details-types">
                    <h2>Types</h2>
                    {pokemon.types && pokemon.types.map((t) => (
                        <div key={t} className={`pokemon-type ${t.toLowerCase()}`}>{t}</div>
                    ))}
                </div>
                
                {pokemon.types && pokemon.similarPokemon && (
                    <div className="more-pokemon-types">
                        <h2 className="pokemon-heading">More {pokemon.types[0]} Type Pokemons</h2>

                        <ul>
                            {pokemon.similarPokemon.map((p) => (
                                <li key={p.pokemon.id}>{p.pokemon.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PokemonDetails;
