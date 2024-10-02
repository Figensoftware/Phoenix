import "../css/Login.css";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { FaLock } from "react-icons/fa";
import { Button } from "@mui/material";
import { useFormik } from 'formik';
import { registerPageSchema } from "../Schemas/RegisterPageSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { UserType } from "../types/Types";
import loginPageService from "../services/LoginPageService";
import { toast } from "react-toastify";


interface CheckUserType {
    result: boolean,
    currentUser: UserType | null
}


function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkUser = (userList: UserType[], username: string, password: string): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null }

        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true;
                response.currentUser = user;
            }
        })
        return response;
    }


    const submit = async (values: any, actions: any) => {
        try {
            dispatch(setLoading(true));
            const response: UserType[] = await loginPageService.login();
            if (response) {
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    // username is right
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    toast.success("Successfully logged in.")
                    navigate("/");
                } else {
                    toast.error("The username or password is incorrect or missing.");
                }
            }

        } catch (error) {
            toast.error("An error occurred while logged in.");
        } finally {
            dispatch(setLoading(false));
        }
    }


    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });

    const clear = () => {
        resetForm();
    }


    return (
        <div className="login">
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className="form-div">
                        <h3>Login</h3>
                        <TextField
                            sx={{ width: "350px", marginBottom: "25px" }}
                            id="username"
                            placeholder="User name"
                            value={values.username}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
                        />
                        {/*  */}
                        <TextField
                            sx={{ width: "350px", marginBottom: "25px" }}
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaLock />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                        />
                        <div className="buttons">
                            <Button onClick={() => navigate("/register")} size="small" variant="contained" sx={{ textTransform: "none", marginRight: "5px" }} color="warning">Signup</Button>
                            <Button type="submit" size="small" variant="contained" sx={{ textTransform: "none", bgcolor: "orange", marginRight: "5px" }} >Submit</Button>
                            <Button onClick={clear} size="small" variant="contained" sx={{ textTransform: "none", bgcolor: "brown" }} >Reset</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
