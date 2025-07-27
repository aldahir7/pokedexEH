// Hooks : son funciones

import { useState } from "react";
import usePokemonFetch from "./usePokemonFetch";
import Card from "../cards/Card";

import { useNavigate } from "react-router";

import "./Pokelist.css";

function getPokemonIdFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 2]; 
}

const PokeList = () => {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    const navigateTo = useNavigate();
    const {
        pokemonJsonObject,
        isLoading,
        hasError,
        error
    } = usePokemonFetch(
        offset,
        limit
    );

    return (
        <div className="poke-list">
            <h2>Pokémon List</h2>
                {!isLoading && !hasError && pokemonJsonObject?.results && (
                    <>
                        <section className="flex flex-row flex-wrap gap-8 justify-center mt-4">
                            {pokemonJsonObject.results.map((p) => {
                                const id = getPokemonIdFromUrl(p.url)
                                const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                                return (
                                    <div key={id} className="card bg-white border-2 border-purple-200 rounded-xl shadow-lg p-4 w-48 flex flex-col items-center transition hover:scale-105 hover:border-purple-400">
                                        <img src={imgUrl} alt={p.name} className="w-24 h-24 mb-2 drop-shadow-lg" />
                                        <span className="block font-bold capitalize text-center mb-2">{p.name}</span>
                                        <button
                                            className="mt-2 px-3 py-1 rounded bg-purple-700 text-white font-bold shadow hover:bg-purple-900 transition"
                                            onClick={() => navigateTo(`/pokelist/${id}`)}
                                        >
                                            Go to Details
                                        </button>
                                    </div>
                                )
                            })}
                        </section>
                        <button
                            onClick={(e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                setOffset(offset + 20)
                            }}
                        >
                            Next
                        </button>
                    </>
                )}
                {hasError && (
                    <strong>Algo sucedió mal y no se puede cargar</strong>
                )}
        </div>
    )
}

export default PokeList;