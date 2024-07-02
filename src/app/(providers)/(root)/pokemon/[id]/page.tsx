import PokemonDetail from "@/components/PokemonDetail";
import { fetchPokemonData } from "@/components/util/fetchPokemonData";

export default async function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemonData = await fetchPokemonData(params.id);

  return <PokemonDetail pokemon={pokemonData} />;
}
