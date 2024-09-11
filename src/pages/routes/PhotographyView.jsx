import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function PhotographyView(props) {
  const pathnames = props.pathname.split('/').filter((x) => x);

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', 
        textAlign: 'left',
        px: 2,
      }}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }} 
      >
        <Link
          underline="none"
          color="inherit"
        >
          Admin
        </Link>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography key={to} color="text.primary">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Link
              underline="none"
              key={to}
              color="inherit"
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          );
        })}

      </Breadcrumbs>

      {/* Content Area */}
      <Typography variant="h4">Photography View</Typography>
    </Box>
  );
}

export default PhotographyView;
