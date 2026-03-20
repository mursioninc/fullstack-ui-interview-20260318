'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
      .then(res => res.json())
      .then(data => setPokemons(data.results))
  }, [])

  useEffect(() => {
    if (search) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(res => res.json())
        .then(data => setSearchResult(data))
    }
  }, [search])

  return (
    <div className="container">
      <h1 className="title">Pokedex</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search a pokemon by name..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {searchResult && (
        <div className="search-result">
          <img src={(searchResult as any).sprites.front_default} alt={(searchResult as any).name} />
          <h2>{(searchResult as any).name}</h2>
        </div>
      )}

      <ul className="pokemon-list">
        {pokemons.map((pokemon: any) => {
          const id = pokemon.url.split('/').filter(Boolean).pop()
          return (
            <li key={pokemon.name} className="pokemon-card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={pokemon.name}
              />
              <span>{pokemon.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
