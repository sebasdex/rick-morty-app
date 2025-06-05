import { Heart, Info } from "lucide-react";
import { useFavorites } from "../../../store/useFavorites";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 w-full flex-1">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            No tienes favoritos guardados
          </h2>
          <p className="text-gray-600">
            Agrega personajes a tus favoritos desde la página principal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 w-full flex-1">
      <h1 className="text-3xl font-bold mb-8">Mis Favoritos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((char) => {
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
              <div className="absolute bottom-0 left-0 right-0 p-4">
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
                      onClick={() => removeFavorite(char.id)}
                      className="p-1 rounded-full transition bg-white/20 hover:bg-white/30 group/fav hover:cursor-pointer"
                      aria-label="Remove from favorites"
                    >
                      <Heart className="w-5 h-5 text-white fill-red-500 transition-colors duration-200" />
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
    </div>
  );
}

export default Favorites;
