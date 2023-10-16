import axios from "axios";
import { Film } from "./types";

export const getFilms = async (source: string) => {
  const response = await axios.get<Record<string, Film[]>>(
    `https://raw.githubusercontent.com/rsslldnphy/cinemas/main/data/${source}.json`
  );
  return response.data;
};
