import axios from "axios";
import { Metadata } from "./types";

export const getMetadata = async () => {
  const response = await axios.get<Record<string, Metadata>>(
    `https://raw.githubusercontent.com/rsslldnphy/cinemas/main/data/metadata.json`
  );
  return response.data;
};
