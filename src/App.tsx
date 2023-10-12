import { useQuery } from "@tanstack/react-query";
import * as api from "./api";
import * as UI from "@mui/material";
import { useState } from "react";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import format from "date-fns/format";
import _ from "lodash";
import { FilmResult } from "./components/FilmResult";

function App() {
  const { data } = useQuery(["curzon"], api.curzon);
  const [tab, setTab] = useState(0);
  const hidden = UI.useMediaQuery("300px");
  if (!data) return null;

  const dates = hidden ? Object.keys(data) : _.take(Object.keys(data), 3);
  const films = _.sortBy(data[dates[tab]], "title");
  return (
    <>
      <UI.AppBar position="fixed" color="default">
        <UI.Tabs value={tab} onChange={(_, value) => setTab(value)} centered>
          {dates.map((dateString, index) => {
            const date = new Date(dateString);
            const label = isToday(date)
              ? "Today"
              : isTomorrow(date)
              ? "Tomorrow"
              : format(date, "EEEE");
            return (
              <UI.Tab
                key={dateString}
                label={label}
                sx={{
                  display: { xl: index > 2 ? "none" : "block", sm: "block" },
                }}
              />
            );
          })}
        </UI.Tabs>
      </UI.AppBar>
      <UI.Toolbar></UI.Toolbar>

      <UI.Grid container>
        <UI.Grid xs={12} md={3} lg={4} />
        <UI.Grid item xs={12} md={6} lg={4} sx={{ px: 1, py: 1 }}>
          {films.map((film) => {
            return <FilmResult key={film.title} film={film} />;
          })}
        </UI.Grid>
        <UI.Grid xs={12} md={3} lg={4} />
      </UI.Grid>
    </>
  );
}

export default App;
