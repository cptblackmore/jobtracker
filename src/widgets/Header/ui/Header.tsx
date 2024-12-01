import { AppBar, css, MenuItem, Stack, Typography } from "@mui/material";

interface Props {
  pages: Array<string>;
}

export const Header: React.FC<Props> = ({ pages }) => {
  return (
    <AppBar position='sticky' css={css`display: flex; flex-direction: row; align-items: center; gap: 2em; padding: 0.5em; padding-left: 2em;`}>
      <Typography variant='h4' height='100%' >jobtracker</Typography>
      <Stack>
        {pages.map((page) => (
          <MenuItem key={page}>{page}</MenuItem>
        ))}
      </Stack>
    </AppBar>
  );
};
