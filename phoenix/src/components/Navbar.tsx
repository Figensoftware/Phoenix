import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from "../images/logo.png";
import { InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/appSlice';
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success("You have successfully logout.");
    }


    return (
        <div>
            <AppBar position="static" sx={{ bgcolor: "#fff", color: "#000" }}>
                <Toolbar>
                    <IconButton
                        onClick={() => navigate("/")}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <img src={logo} width={85} height={70} />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer", fontFamily: "arial" }} onClick={() => navigate("/")}>
                        Phoenix
                    </Typography>
                    <div className='navbar'>
                        <TextField
                            sx={{ width: "300px", marginBottom: "25px", marginRight: "20px" }}
                            id="username"
                            placeholder="search products..."
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon sx={{ color: "ddd", fontSize: "17px" }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"

                        />
                        {/*  */}
                        <Button onClick={logout} color="warning" sx={{ textTransform: "none", color: "#000", fontSize: "15px" }} variant='outlined'>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
