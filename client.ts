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

export async function fetchCharacters(page:number): Promise<CharactersPage> {
    try {
        const data = await client.request<{characters:CharactersPage}>(GET_CHARACTERS, {page});
        return data.characters;
    } catch (error) {
        console.error("Error al obtener personajes", error);
        throw new Error("No se pudo cargar la pagina de personajes");
    }
}

