import {
  fetchCharacters,
  type Character,
  type CharactersPage,
} from "../../../client";
import { useState, useEffect } from "react";
import { Heart, Info } from "lucide-react";
import { useFavorites } from "../../store/useFavorites";
import { Link } from "react-router";
import { useSearchParams } from "react-router";

export default function Home() {
  const [data, setData] = useState<CharactersPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const pageData = await fetchCharacters(page, searchTerm || undefined);
        setData(pageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, searchTerm]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: String(newPage) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-gray-900">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  if (data?.results.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No se encontraron personajes con el nombre <strong>{search}</strong>.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 w-full flex-1">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Explora el multiverso de Rick & Morty
        </h1>
        <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
          Descubre personajes de todas las dimensiones, filtra por nombre y
          guarda tus favoritos del universo más caótico de la TV.
        </p>
      </div>

      <div className="mb-6 flex gap-2 w-full">
        <input
          type="text"
          placeholder="Buscar personaje por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <button
          onClick={() => {
            setPage(1);
            setSearchTerm(search.trim());
          }}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition hover:cursor-pointer"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.results.map((char: Character) => {
          const statusColor =
            char.status === "Alive"
              ? "bg-green-500"
              : char.status === "Dead"
              ? "bg-red-500"
              : "bg-yellow-500";

          return (
            <div
              key={char.id}
              className="relative group h-80 w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={char.image}
                alt={char.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl font-semibold truncate text-white">
                  {char.name}
                </h2>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${statusColor}`}
                    ></span>
                    <span className="text-sm uppercase tracking-wide text-white">
                      {char.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        isFavorite(char.id)
                          ? removeFavorite(char.id)
                          : addFavorite(char)
                      }
                      className="p-1 rounded-full transition bg-white/20 hover:bg-white/30 group/fav hover:cursor-pointer"
                      aria-label="Favorite"
                    >
                      <Heart
                        className={`w-5 h-5 text-white ${
                          isFavorite(char.id) ? "fill-red-500" : ""
                        } transition-colors duration-200`}
                      />
                    </button>
                    <Link
                      to={`/character/${char.id}`}
                      className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition group/details hover:cursor-pointer"
                      aria-label="Details"
                    >
                      <Info className="w-5 h-5 text-white group-hover/details:fill-blue-500 transition-colors duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between">
        <button
          onClick={() => data.info.prev && handlePageChange(data.info.prev)}
          disabled={!data.info.prev}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors hover:cursor-pointer ${
            data.info.prev
              ? "bg-cyan-600 hover:bg-cyan-500 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span className="mt-4 sm:mt-0 text-gray-700">
          Page <span className="text-gray-900 font-bold">{page}</span> of{" "}
          <span className="text-gray-900 font-bold">{data.info.pages}</span>
        </span>

        <button
          onClick={() => data.info.next && handlePageChange(data.info.next)}
          disabled={!data.info.next}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors hover:cursor-pointer ${
            data.info.next
              ? "bg-cyan-600 hover:bg-cyan-500 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
