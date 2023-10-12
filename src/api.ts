import axios from "axios";

export type Showing = {
  starts_at: string;
  site: string;
};

export type Film = {
  title: string;
  url: string;
  trailer: string;
  synopsis: string;
  runtime: number;
  times: Showing[];
};

export const curzon = async () => {
  const response = await axios.get<Record<string, Film[]>>(
    "https://raw.githubusercontent.com/rsslldnphy/cinemas/main/data/curzon.json"
  );
  return response.data;
};

export const poster = async (film: string) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" +
      film.replace(/^DocHouse: /, "")
  );
  const result = response.data.results[0]?.backdrop_path;

  return result
    ? `https://image.tmdb.org/t/p/w500/${result}`
    : "/today/images/grid.jpg";
};
