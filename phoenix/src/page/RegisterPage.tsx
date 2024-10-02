import "../css/Register.css";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { FaLock } from "react-icons/fa";
import { Button } from "@mui/material";
import { useFormik } from 'formik';
import { registerPageSchema } from "../Schemas/RegisterPageSchema";
import { useNavigate } from "react-router-dom";
import { UserType } from "../types/Types";
import { toast } from "react-toastify";
import registerPageService from "../services/RegisterPageService";

function RegisterPage() {
    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const payload: UserType = {
                id: String(Math.floor(Math.random() * 99999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await registerPageService.register(payload);
            if (response) {
                clear();
                toast.success("You have successfully registered.")
                navigate("/login");
            }

        } catch (error) {
            toast.error("An error occurred while creating the user.")
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
        <div className="register">
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className="form-div">
                        <h3>Register</h3>
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
                            <Button onClick={() => navigate("/login")} size="small" variant="contained" sx={{ textTransform: "none", marginRight: "5px" }} color="warning">Signin</Button>
                            <Button type="submit" size="small" variant="contained" sx={{ textTransform: "none", bgcolor: "orange", marginRight: "5px" }} >Submit</Button>
                            <Button onClick={clear} size="small" variant="contained" sx={{ textTransform: "none", bgcolor: "brown" }} >Reset</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
