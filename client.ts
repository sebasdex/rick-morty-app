
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

export async function fetchCharacters(
  page = 1,
  name?: string
): Promise<CharactersPage> {
  const res = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query ($page: Int, $name: String) {
          characters(page: $page, filter: { name: $name }) {
            info {
              count pages next prev
            }
            results {
              id
              name
              image
              status
              species
              gender
              origin { name }
              location { name }
              episode { id name }
            }
          }
        }
      `,
      variables: { page, name },
    }),
  });

  const json = await res.json();
  return json.data.characters;
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

