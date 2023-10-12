import * as api from "../api";
import { useQuery } from "@tanstack/react-query";
import * as UI from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import _ from "lodash";
import format from "date-fns/format";

export const CinemaResult: React.FC<{
  cinema: string;
  showtimes: (api.Showing & { film: api.Film })[];
}> = ({ cinema, showtimes }) => {
  [];
  return (
    <UI.Card elevation={2} sx={{ mb: 3 }}>
      <UI.CardContent>
        <UI.Typography variant="h5" component="div" sx={{ pb: 1 }}>
          Curzon {cinema}
        </UI.Typography>
        {showtimes.map((showing) => (
          <UI.Typography key={showing.starts_at}>
            {format(new Date(showing.starts_at), "HH:mmaaa")} -{" "}
            <UI.Link href={showing.film.trailer} target="_blank">
              {" "}
              {showing.film.title}
            </UI.Link>
          </UI.Typography>
        ))}
      </UI.CardContent>
    </UI.Card>
  );
};
