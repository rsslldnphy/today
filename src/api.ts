import axios from "axios";

export type Showing = {
  started_at: Date;
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
