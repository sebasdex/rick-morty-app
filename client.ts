import { GraphQLClient, gql } from "graphql-request";

const ENDPOINT = "https://rickandmortyapi.com/graphql";

const client = new GraphQLClient(ENDPOINT);

const GET_CHARACTERS = gql`
    query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        next
        prev
      }
      results {
        id
        name
        status
        image
      }
    }
  }
`;

export type Character = {
    id: string;
    name: string;
    gender: string;
    status: string;
    image: string;
};

export type CharactersPage = {
    info:{
        pages:number;
        next:number | null;
        prev:number | null;
    };
    results:Character[];
};

export type CharacterDetails = {
    id: string;
    name: string;
    status: string;
    image: string;
    species: string;
    gender: string;
    origin: { name: string };
    location: { name: string };
    episode: Episode[];
}

export type Episode = {
    id: string;
    name: string;
}

export async function fetchCharacters(page:number): Promise<CharactersPage> {
    try {
        const data = await client.request<{characters:CharactersPage}>(GET_CHARACTERS, {page});
        return data.characters;
    } catch (error) {
        console.error("Error al obtener personajes", error);
        throw new Error("No se pudo cargar la pagina de personajes");
    }
}

export async function fetchCharacterById(id: number): Promise<CharacterDetails> {
  const res = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          character(id: ${id}) {
            id
            name
            image
            status
            species
            gender
            origin { name }
            location { name }
            episode {
              id
              name
            }
          }
        }
      `,
    }),
  });

  const { data } = await res.json();
  return data.character;
}

