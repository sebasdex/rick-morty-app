export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-center">
          🚀 Desarrollado por{" "}
          <a
            href="https://github.com/sebasdex"
            className="font-semibold text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            SebastianDC
          </a>
        </p>

        <p className="text-center">
          © {new Date().getFullYear()} — Datos de{" "}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            Rick and Morty API
          </a>
        </p>
      </div>
    </footer>
  );
}
