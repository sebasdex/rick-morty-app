import { Heart } from "lucide-react";
import { Link } from "react-router";

function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Title */}
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-center sm:text-left">
            Rick & Morty
          </h1>
        </Link>

        {/* Favorites button */}
        <Link
          to={"/favorites"}
          className="relative flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition-colors hover:cursor-pointer"
          aria-label="Favoritos"
        >
          <Heart className="w-5 h-5" />
          <span className="text-base font-medium">Favoritos</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
