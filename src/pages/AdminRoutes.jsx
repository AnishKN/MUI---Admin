import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Dashboard from './routes/Dashboard';
import Team from './routes/Team';
import PhotographyAdd from './routes/PhotographyAdd';
import PhotographyView from './routes/PhotographyView';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Manage content',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'team',
    title: 'Team',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Services',
  },
  {
    segment: 'photography',
    title: 'Photography',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'add',
        title: 'Add',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'view',
        title: 'View',
        icon: <DescriptionIcon />,
      },
    ],
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function AdminRoutes(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [pathname, setPathname] = useState('/dashboard');

  const handleNavigate = (path) => {
    setPathname(path)
  }

  const router = {
    navigate: handleNavigate,
    pathname
  }

  const renderComponent = () => {
    switch (pathname) {
      case '/dashboard':
        return <Dashboard pathname={pathname} />
      case '/team':
        return <Team pathname={pathname} />
      case '/photography/add':
        return <PhotographyAdd pathname={pathname} />
      case '/photography/view':
        return <PhotographyView pathname={pathname} />
      default:
        return <Dashboard pathname={pathname} />;
    }
  }

  let adminDetails = JSON.parse(localStorage.getItem('admin'))

  const [session, setSession] = useState({
    user: {
      name: adminDetails.username,
      email: 'active now',
      image: '/icon.png',
    },
  });

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: adminDetails.username,
            email: 'active now',
            image: '/icon.png',
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem('admin')
        navigate('/')
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        // logo: <img src="" alt="QP logo" />,  //replce logo here
        title: 'QP',
      }}
      session={session}
      authentication={authentication}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        {renderComponent()}
      </DashboardLayout>
    </AppProvider>
  )
}

export default AdminRoutes


