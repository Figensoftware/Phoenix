import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from "../images/logo.png";
import { InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setDrawer, setFilterProducts, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import { ProductType } from '../types/Types';
import productService from '../services/ProductService';
import Badge from '@mui/material/Badge';
import { CiShoppingBasket } from "react-icons/ci";
import { RootState } from '../redux/store';


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { basket } = useSelector((state: RootState) => state.basket);

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success("You have successfully logout.");
    }

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                dispatch(setFilterProducts(e.target.value));
            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("An error occurred while filtering products." + error);
        }
    }


    const openDrawer = () => {
        dispatch(setDrawer(true));
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
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
                        <Badge onClick={openDrawer} badgeContent={basket.length} color="warning" sx={{ margin: "5px 20px", cursor: "pointer" }}>
                            <CiShoppingBasket style={{ fontSize: "24px" }} />
                        </Badge>
                        {/*  */}
                        <Button onClick={logout} color="warning" sx={{ textTransform: "none", color: "#000", fontSize: "15px" }} variant='outlined'>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
