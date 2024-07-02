export async function fetchPokemonData(id: string) {
  const res = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
