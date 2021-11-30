import React from 'react'
import { Typography, CssBaseline, AppBar, Toolbar, ThemeProvider, IconButton, Badge, Box, Switch} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import theme from './theme';
import logo from './assets/images/Room.me Logo White Crop.png';
import useStyles from './styles';
import { grey } from '@mui/material/colors';
import LoginPage from './components/login';
import SignUpPage from './components/signup';  
import HomePage from './components/home';
import { Login, Router } from '@mui/icons-material';
import './App.css'; 
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import Houses from './components/houses';
import Profile from './components/profile';
import { Route, BrowserRouter, Switch as RouterSwitch } from 'react-router-dom';
import { initializeApp } from 'firebase/app'
import HouseMates from './components/housemates';
import ToDoList2 from'./components/ToDoList2'; 
import Alerts from './components/alerts';

const App = () => {

  const classes = useStyles();
  return(

    <BrowserRouter>
      <RouterSwitch>

        <Route exact path="/">
          <HomePage/>
        </Route>

        <Route exact path="/login">
          <LoginPage/>
        </Route>

        <Route exact path="/signup">
          <SignUpPage/>
        </Route>

        <Route exact path="/todo">
          <ToDoList2/>
        </Route>

        <Route exact path="/houses">
          <Houses/>
        </Route>

        <Route exact path="/profile">
          <Profile/>
        </Route>

        <Route exact path="/housemates">
          <HouseMates/>
        </Route>

        <Route exact path="/alerts">
          <Alerts/>
        </Route>

      </RouterSwitch>
    </BrowserRouter>

    // COMMENT OUT THIS TO VIEW LOGIN PAGE & COMMENT OUT THE NEXT <> BLOCK
    // <div className="App">  
    //   <LoginPage/>
    // </div>
  

    // <>
    //   <ThemeProvider theme={theme}>
    //   <CssBaseline/>
    //   <AppBar className = {classes.appBar}>
    //     <Toolbar className = {classes.toolBar}>
    //       <img src={logo} width="125" height="50"/>
    //       <div className = {classes.icons}>
    //         <IconButton sx={{ color: grey[50] }}>
    //           <Badge>
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>

    //         <IconButton sx={{ color: grey[50] }}>
    //           <Badge>
    //             <FactCheckIcon />
    //           </Badge>
    //         </IconButton>

    //         <IconButton sx={{ color: grey[50] }}>
    //           <Badge>
    //             <MessageIcon />
    //           </Badge>
    //         </IconButton>
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    //   <div className={classes.header}>
    //   <Typography variant="h1">
    //     Room.me work in progress!
    //   </Typography>
    //   </div>
    //   </ThemeProvider>
    // </>
  );
}

export default App;
