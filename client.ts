import { GraphQLClient, gql } from "graphql-request";
const graphql = new GraphQLClient("https://rickandmortyapi.com/graphql");

export type Character = {
  id: string;
  name: string;
  gender: string;
  status: string;
  image: string;
};

export type CharactersPage = {
  info: {
    pages: number;
    next: number | null;
    prev: number | null;
  };
  results: Character[];
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
};

export type Episode = {
  id: string;
  name: string;
  episode: string; // ejemplo: "S01E03"
};

export async function fetchCharacters(
  page = 1,
  name?: string
): Promise<CharactersPage> {
  const query = gql`
    query ($page: Int, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          pages
          next
          prev
        }
        results {
          id
          name
          image
          status
          gender
          species
          origin { name }
          location { name }
          episode { id name episode }
        }
      }
    }
  `;
  const data = await graphql.request<{ characters: CharactersPage }>(query, { page, name });
  return data.characters;
}

export async function fetchCharacterById(id: number): Promise<CharacterDetails> {
  const query = gql`
    query ($id: ID!) {
      character(id: $id) {
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
          episode
        }
      }
    }
  `;

  const data = await graphql.request<{ character: CharacterDetails }>(query, { id });
  return data.character;
}
