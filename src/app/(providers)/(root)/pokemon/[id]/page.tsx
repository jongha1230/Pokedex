import PokemonDetail from "@/components/PokemonDetail";

export default async function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/pokemons/${params.id}`);
  const pokemonData = await res.json();

  return <PokemonDetail pokemon={pokemonData} />;
}
