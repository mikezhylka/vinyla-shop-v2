import { Genre } from "../model/types";

interface Props {
  isActive: boolean;
  handleGenre: (id: string) => void;
  genre: Genre;
}

export function GenreTag({ isActive, handleGenre, genre }: Props) {
  return (
    <button
      key={genre.id}
      onClick={() => handleGenre(String(genre.id))}
      aria-pressed={isActive}
      className={`h-8 px-4 rounded-full text-sm font-medium transition-all hover:cursor-pointer duration-150 border ${
        isActive
          ? "bg-primary text-on-primary border-primary"
          : "bg-transparent text-secondary border-outline-variant/40 hover:border-outline-variant hover:text-white"
      }`}
    >
      {genre.name}
    </button>
  );
}
