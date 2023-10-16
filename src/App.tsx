import * as UI from "@mui/material";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import { flatten, sortBy, take, uniq } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ByCinema } from "./pages/ByCinema";
import { ByFilm } from "./pages/ByFilm";
import { useFilmsQuery } from "./api/useFilmsQuery";
import { Link } from "react-router-dom";
import { Film, Metadata } from "./api/types";
import {
  ArrowForward,
  CameraIndoor,
  EmojiEmotions,
  FilterAlt,
  Movie,
} from "@mui/icons-material";

function App() {
  const { date, tab } = useParams();
  const [showFilters, setShowFilters] = useState(false);

  const three = UI.useMediaQuery("(max-width: 700px)");
  const five = UI.useMediaQuery("(max-width: 900px)");
  const data = useFilmsQuery();

  const dates = take(Object.keys(data), three ? 3 : five ? 5 : 7);

  useEffect(() => {
    if (!date && data && Object.keys(data)[0]) {
      window.location.href = `/today/${Object.keys(data)[0]}/by-film`;
    }
  }, [date, data]);

  const [hiddenCinemas, setHiddenCinemas] = useState<Record<string, boolean>>(
    {}
  );

  if (!data) return null;

  const cinemas = uniq(
    flatten(Object.values(data)).flatMap((f) => f.times.map((t) => t.site))
  );
  cinemas.sort();

  const visibleCinemas = cinemas.filter((c) => !hiddenCinemas[c]);

  const films = sortBy(data[date!], "title")
    .map((f) => {
      const times = f.times.filter((t) => !hiddenCinemas[t.site]);
      if (times.length === 0) return null;
      return { ...f, times };
    })
    .filter((f) => !!f) as (Film & Metadata)[];

  return (
    <>
      <UI.AppBar position="fixed" color="default">
        <UI.Toolbar>
          <EmojiEmotions />
          <UI.Box flexGrow={1}>
            <UI.Tabs value={date} centered>
              {dates.map((dateString, index) => {
                const date = new Date(dateString);
                const label = isToday(date)
                  ? "Today"
                  : isTomorrow(date)
                  ? "Tomorrow"
                  : format(date, three ? "EE" : "EEEE");
                return (
                  <UI.Tab
                    key={dateString}
                    label={label}
                    value={dateString}
                    href={`/today/${dateString}/${tab}`}
                    sx={{
                      display: {
                        xl: index > 2 ? "none" : "block",
                        sm: "block",
                      },
                    }}
                  />
                );
              })}
            </UI.Tabs>
          </UI.Box>
          <UI.IconButton onClick={() => setShowFilters(true)}>
            <FilterAlt />
          </UI.IconButton>
        </UI.Toolbar>
      </UI.AppBar>
      <UI.Toolbar sx={{ mb: 3 }} />

      {visibleCinemas.length > 0 && visibleCinemas.length < cinemas.length && (
        <UI.Typography variant="subtitle1" sx={{ textAlign: "center", m: 3 }}>
          Showing {cinemas.filter((c) => !hiddenCinemas[c]).join(", ")}.
        </UI.Typography>
      )}

      {visibleCinemas.length === 0 && (
        <UI.Typography variant="subtitle1" sx={{ textAlign: "center", m: 3 }}>
          All cinemas hidden - change filters to include at least one cinema
        </UI.Typography>
      )}

      {tab === "by-film" && <ByFilm films={films} />}
      {tab === "by-cinema" && <ByCinema films={films} />}

      <UI.Box sx={{ height: "60px" }} />
      <UI.Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <UI.Box sx={{ minWidth: "300px", m: 3 }}>
          <UI.Typography
            variant="h6"
            display="flex"
            sx={{ alignItems: "center", ml: 2, mb: 2 }}
          >
            Filter cinemas
            <UI.Box flexGrow={1} />
            <UI.IconButton
              sx={{ verticalAlign: "bottom" }}
              onClick={() => setShowFilters(false)}
            >
              <ArrowForward />
            </UI.IconButton>
          </UI.Typography>
          <UI.Box flexGrow={1} />
          <UI.List disablePadding>
            {cinemas.map((c) => (
              <UI.ListItem key={c} disablePadding>
                <UI.ListItemButton
                  onClick={() =>
                    setHiddenCinemas({
                      ...hiddenCinemas,
                      [c]: !hiddenCinemas[c],
                    })
                  }
                >
                  <UI.ListItemIcon>
                    <UI.Checkbox
                      edge="start"
                      checked={!hiddenCinemas[c]}
                      tabIndex={-1}
                      disableRipple
                    />
                  </UI.ListItemIcon>
                  <UI.ListItemText id={c} primary={c} />
                </UI.ListItemButton>
              </UI.ListItem>
            ))}
            <UI.Divider />
            <UI.ListItem disablePadding>
              <UI.ListItemButton onClick={() => setHiddenCinemas({})}>
                <UI.ListItemIcon>
                  <UI.Checkbox
                    edge="start"
                    checked={!Object.values(hiddenCinemas).includes(true)}
                    disabled={!Object.values(hiddenCinemas).includes(true)}
                    tabIndex={-1}
                    disableRipple
                  />
                </UI.ListItemIcon>
                <UI.ListItemText id="select-all" primary="Select all" />
              </UI.ListItemButton>
            </UI.ListItem>
            <UI.ListItem disablePadding>
              <UI.ListItemButton
                onClick={() =>
                  setHiddenCinemas(
                    cinemas.reduce(
                      (acc, cinema) => ({ ...acc, [cinema]: true }),
                      {}
                    )
                  )
                }
              >
                <UI.ListItemIcon>
                  <UI.Checkbox
                    edge="start"
                    checked={cinemas.every((c) => !!hiddenCinemas[c])}
                    disabled={cinemas.every((c) => !!hiddenCinemas[c])}
                    tabIndex={-1}
                    disableRipple
                  />
                </UI.ListItemIcon>
                <UI.ListItemText id="deselect-all" primary="Deselect all" />
              </UI.ListItemButton>
            </UI.ListItem>
          </UI.List>
        </UI.Box>
      </UI.Drawer>

      <UI.Box sx={{ zIndex: 2 }}>
        <UI.Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
          elevation={3}
        >
          <UI.BottomNavigation showLabels value={tab}>
            <UI.BottomNavigationAction
              icon={<Movie />}
              label="By film"
              value="by-film"
              component={Link}
              to={`/today/${date}/by-film`}
            />

            <UI.BottomNavigationAction
              icon={<CameraIndoor />}
              label="By Cinema"
              value="by-cinema"
              component={Link}
              to={`/today/${date}/by-cinema`}
            />
          </UI.BottomNavigation>
        </UI.Paper>
      </UI.Box>
    </>
  );
}

export default App;
