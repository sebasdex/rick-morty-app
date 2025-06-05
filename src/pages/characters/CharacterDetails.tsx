import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { type CharacterDetails, fetchCharacterById } from "../../../client";
import { useFavorites } from "../../store/useFavorites";
import { Heart, ArrowLeft } from "lucide-react";

export default function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchCharacterById(Number(id));
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (error || !character)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  const fav = isFavorite(character.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <button
          onClick={() =>
            fav ? removeFavorite(character.id) : addFavorite(character)
          }
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer group"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              fav
                ? "fill-red-500 text-red-500"
                : "text-gray-600 group-hover:fill-red-500 group-hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src={character.image}
          alt={character.name}
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-cyan-500 shadow-md"
        />
        <h1 className="text-2xl sm:text-3xl font-bold mt-4">
          {character.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{character.status}</p>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-gray-700 text-center sm:text-left">
        <p>
          <strong>Especie:</strong> {character.species}
        </p>
        <p>
          <strong>Género:</strong> {character.gender}
        </p>
        <p>
          <strong>Origen:</strong> {character.origin?.name}
        </p>
        <p>
          <strong>Ubicación:</strong> {character.location?.name}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3 text-center sm:text-left">
          Aparece en episodios:
        </h2>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {character.episode.map((ep) => (
            <span
              key={ep.id}
              className="bg-cyan-100 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
            >
              {ep.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
