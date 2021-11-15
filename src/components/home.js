import { ClassNames } from '@emotion/react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useTheme } from '@mui/private-theming'
import React from 'react'
import logo from '../assets/images/Room.me Logo White Crop.png';



const HomePage = () => {

    const theme = useTheme()

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />

                    <Typography type='Title' color='inherit' style={{ flex: 1 }} />
                    
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href ="/signup">Sign Up</Button>
                </Toolbar>
            </AppBar>

            
            <div class='text' style={{marginTop:300, justifyContent:'center', alignItems:'center'}} >
                <Typography variant='h1'>
                    Welcome to Room.me! 
                </Typography>
                
                <Typography variant='h1'>
                    Here to solve all your roommate issues. 
                </Typography>
            </div>
            

        </div>


    )
}
export default HomePage