import { fetchPokemonData } from "@/components/util/fetchPokemonData";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pokemonData = await fetchPokemonData(params.id);
  const title = `${pokemonData.korean_name}- Pokemon Detail`;
  const description = `${pokemonData.korean_name}의 상세 페이지`;

  return {
    title,
    description,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
