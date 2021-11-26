import { useParams } from "react-router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { TextField } from "@mui/material"
import Button from '@mui/material/Button';
import '../../CSS/Profile.css'

export default function() {
    const[name, setName] = useState('');
    const onNameChange = (event) => setName(event.target.value);

    const[surname, setSurname] = useState('');
    const onSurnameChange = (event) => setSurname(event.target.value);

    const[userNameP, setUserNameP] = useState('');
    const onUserNamePChange = (event) => setUserNameP(event.target.value);
    
    const[email, setEmail] = useState('');
    const onEmailChange = (event) => setEmail(event.target.value);

    const[password, setPassword] = useState('');
    const onPasswordChange = (event) => setPassword(event.target.value);

    const[passwordRepeat, setPasswordRepeat] = useState('');
    const onPasswordRepeatChange = (event) => setPasswordRepeat(event.target.value);

    const[phone, setPhone] = useState('');
    const onPhoneChange = (event) => setPhone(event.target.value);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {userName} = useParams();

    return(
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar className='header-toolbar'>
                    <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
                        VladislavMotors
                    </Typography>

                    <Typography variant="h6" className="user-name" component="div" align="right" sx={{ flexGrow: 1 }}>
                        {userName}
                    </Typography>

                    <div className="authorize-panel">
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem /*onClick={handleClose}*/><NavLink to={`/user-home/${userName}`} className="nav-link-user">Home</NavLink></MenuItem>
                            <MenuItem /*onClick={handleClose}*/><NavLink to="/" className="nav-link-user">Logout</NavLink></MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            
            <div className = 'profile-info'>
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
                    value={userNameP}
                    onChange={onUserNamePChange}
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
                <Button color='inherit'><NavLink to={`/user-home/${userNameP}`} className="nav-link-signup">Save</NavLink></Button>
                <NavLink to="/signin" className="nav-link-registred">Already regisred?</NavLink>
            </div>

        </Box>
    );
    
}