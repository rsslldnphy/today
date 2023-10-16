import { Film } from "../api/types";
import * as UI from "@mui/material";
import { FilmResult } from "../components/FilmResult";

export const ByFilm: React.FC<{ films: Film[] }> = ({ films }) => {
  return (
    <>
      <UI.Grid container>
        <UI.Grid xs={12} md={3} lg={4} item />
        <UI.Grid item xs={12} md={6} lg={4} sx={{ px: 1, py: 1 }}>
          {films.map((film) => {
            return <FilmResult key={film.title} film={film} />;
          })}
        </UI.Grid>
        <UI.Grid xs={12} md={3} lg={4} item />
      </UI.Grid>
    </>
  );
};
