import React from 'react'
import { Typography, CssBaseline, AppBar, Toolbar, ThemeProvider, IconButton, Badge, Box} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import theme from './theme';
import logo from './assets/images/Room.me Logo White Crop.png';
import useStyles from './styles';
import { grey } from '@mui/material/colors';
import LoginPage from './components/login'; 
import { Login } from '@mui/icons-material';
import './App.css'; 

const App = () => {
  const classes = useStyles();
  return(

    // COMMENT OUT THIS TO VIEW LOGIN PAGE & COMMENT OUT THE NEXT <> BLOCK
    // <div className="App">  
    //   <LoginPage/>
    // </div>

    <>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar className = {classes.appBar}>
        <Toolbar className = {classes.toolBar}>
          <img src={logo} width="125" height="50"/>
          <div className = {classes.icons}>
            <IconButton sx={{ color: grey[50] }}>
              <Badge>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton sx={{ color: grey[50] }}>
              <Badge>
                <FactCheckIcon />
              </Badge>
            </IconButton>

            <IconButton sx={{ color: grey[50] }}>
              <Badge>
                <MessageIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.header}>
      <Typography variant="h1">
        Room.me work in progress!
      </Typography>
      </div>
      </ThemeProvider>
    </>
  );
}

export default App;
