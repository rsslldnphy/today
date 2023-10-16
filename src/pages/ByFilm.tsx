import * as api from "../api";
import * as UI from "@mui/material";
import { FilmResult } from "../components/FilmResult";
import { useParams } from "react-router";

export const ByFilm: React.FC<{ films: api.Film[] }> = ({ films }) => {
  const { date } = useParams();
  return (
    <>
      <UI.Box sx={{ textAlign: "center", my: 1 }}>
        <UI.Typography sx={{ px: 2, display: "inline", fontWeight: "bold" }}>
          By Film
        </UI.Typography>
        <UI.Link
          href={`/today/${date}/by-cinema`}
          sx={{ px: 2, display: "inline" }}
          color="#666"
        >
          By Cinema
        </UI.Link>
      </UI.Box>

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
