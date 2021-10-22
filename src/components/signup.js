import React from 'react'
import { Grid, Paper, Link, Avatar,TextField, Button, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { typography } from '@mui/system';

const SignUpPage = () => {

    const paperStyle = { padding: 50, height: '250', width: 280, margin: "90px auto" }
    const avatarStyle = { backgroundColor: '#97D8C4' }
    const buttonStyle = { margin: '8px 0 ' }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>

                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <h2>Sign up for Room.me!</h2>
                    
                </Grid>

                <TextField label='Email' placeholder='Enter Email' margin='normal' fullWidth required />
                <TextField label='Password' placeholder='Enter Password' type='password' fullWidth required />

                <Button type='submit' color='primary' variant='contained' style={buttonStyle} fullWidth> Sign Up </Button>

                <Typography>
                    <Link href='#'>
                        Already have an account? 
                    </Link>
                </Typography>

            </Paper>
        </Grid>
    )
}
export default SignUpPage