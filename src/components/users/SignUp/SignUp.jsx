import { TextField } from "@mui/material"
import '../../CSS/SignUp.css'
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function SignUp(){
    const[name, setName] = useState('');
    const onNameChange = (event) => setName(event.target.value);

    const[surname, setSurname] = useState('');
    const onSurnameChange = (event) => setSurname(event.target.value);

    const[userName, setUserName] = useState('');
    const onUserNameChange = (event) => setUserName(event.target.value);
    
    const[email, setEmail] = useState('');
    const onEmailChange = (event) => setEmail(event.target.value);

    const[password, setPassword] = useState('');
    const onPasswordChange = (event) => setPassword(event.target.value);

    const[passwordRepeat, setPasswordRepeat] = useState('');
    const onPasswordRepeatChange = (event) => setPasswordRepeat(event.target.value);

    const[phone, setPhone] = useState('');
    const onPhoneChange = (event) => setPhone(event.target.value);

    return (
    <>
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
            <Toolbar className='header-toolbar'>
                <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                    VladislavMotors
                </Typography>

                <Button color='inherit'><NavLink to="/" className="nav-link-home">Home</NavLink> </Button>
            </Toolbar>
            </AppBar>
        </Box>
        <div className = 'signUp'>
            <TextField
                value={name}
                onChange={onNameChange}
                margin="normal"
                size="string"
                required
                id="outlined-required"
                label="Required"
                placeholder="Name"
            />
            <TextField
                value={surname}
                onChange={onSurnameChange}
                margin= "normal"
                required
                id="outlined-required"
                label="Required"
                placeholder="Surname"
            />
            <TextField
                value={userName}
                onChange={onUserNameChange}
                margin= "normal"
                required
                id="outlined-required"
                label="Required"
                placeholder="User Name"
            />
            <TextField
                value={email}
                onChange={onEmailChange}
                margin= "normal"
                required
                id="outlined-required"
                label="Required"
                placeholder="Email"
            />
            <TextField
                value={password}
                onChange={onPasswordChange}
                margin= "normal"
                required
                id="outlined-required"
                label="Required"
                placeholder="Password"
            />
            <TextField
                value={passwordRepeat}
                onChange={onPasswordRepeatChange}
                margin= "normal"
                required
                id="outlined-required"
                label="Required"
                placeholder="Repeat password"
            />
            <TextField
                value={phone}
                onChange={onPhoneChange}
                margin= "normal"
                required
                id="outlined-required"
                label="Required"
                placeholder="Phone number"
            />
            <Button color='inherit'><NavLink to={`/user-home/${userName}`} className="nav-link-signup">Register</NavLink></Button>
            <NavLink to="/signin" className="nav-link-registred">Already regisred?</NavLink>
        </div>
    </>
   );
}