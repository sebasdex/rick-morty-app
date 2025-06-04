import {
  fetchCharacters,
  type Character,
  type CharactersPage,
} from "../../../client";
import { useState, useEffect } from "react";
import { Heart, Info } from "lucide-react";
import { useFavorites } from "../../store/useFavorites";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<CharactersPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const pageData = await fetchCharacters(page);
        setData(pageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900">
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
                    <button
                      className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition group/details hover:cursor-pointer"
                      aria-label="Details"
                    >
                      <Info className="w-5 h-5 text-white group-hover/details:fill-blue-500 transition-colors duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between">
        <button
          onClick={() => data.info.prev && setPage(data.info.prev)}
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
          onClick={() => data.info.next && setPage(data.info.next)}
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
