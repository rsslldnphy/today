import axios from "axios";

export const curzon = async () => {
  const response = await axios.get<Record<string, Film[]>>(
    "https://raw.githubusercontent.com/rsslldnphy/cinemas/main/data/curzon.json"
  );
  return response.data;
};
