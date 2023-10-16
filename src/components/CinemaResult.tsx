import * as UI from "@mui/material";
import format from "date-fns/format";
import { Film, Showing } from "../api/types";

export const CinemaResult: React.FC<{
  cinema: string;
  showtimes: (Showing & { film: Film })[];
}> = ({ cinema, showtimes }) => {
  [];
  return (
    <UI.Card elevation={2} sx={{ mb: 3 }}>
      <UI.CardContent>
        <UI.Typography variant="h5" component="div" sx={{ pb: 1 }}>
          {cinema}
        </UI.Typography>
        {showtimes.map((showing) => (
          <UI.Typography key={showing.starts_at}>
            {format(new Date(showing.starts_at), "HH:mmaaa")} -{" "}
            <UI.Link href={showing.url ?? showing.film.url} target="_blank">
              {" "}
              {showing.film.title}
            </UI.Link>
          </UI.Typography>
        ))}
      </UI.CardContent>
    </UI.Card>
  );
};
