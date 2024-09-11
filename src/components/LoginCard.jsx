import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Fingerprint from '@mui/icons-material/Fingerprint';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginCard() {
    const navigate = useNavigate();

    //to hide and view password
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    //use hook form to handle the admin form
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: 'admin',
        }
    });

    //on submit handling using hook
    const onSubmit = async (data) => {
        try {
            // await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth`, data)
            //     .then((response) => {
            //         let message = response?.data?.message || "Success!!"
            //         toast.success(message)
                    // localStorage.setItem('admin', JSON.stringify(response.data.user))
                    localStorage.setItem('admin', JSON.stringify(data))
                    navigate('/admin')
                // })
                // .catch((error) => {
                //     console.log(error);
                //     let message = error.response?.data?.message || "something went wrong!"
                //     toast.error(message)
                // })
        }
        catch (error) {
            setError("root", {
                message: "Something went wrong! Try again..."
            })
        }

    }

    return (
        <Box sx={{ minWidth: 500 }}>
            <Toaster />
            <Card variant='outlined' style={{ maxWidth: 500, paddingBottom: 25 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <Typography variant="h4" component="div" className='text-center py-4'>
                            Admin
                        </Typography>
                        <div className="flex flex-col gap-4">
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <TextField
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                    id="username" label="Username" variant="outlined" />
                                {errors.username && (<div className='text-red-500'>{errors.username.message}</div>)}
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must contain minimum of 8 charecters!"
                                        }
                                    })}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
                            </FormControl>
                        </div>
                    </CardContent>
                    <CardActions className='flex flex-col gap-4 justify-center items-center'>
                        <Button
                            color='#fff'
                            size="large"
                            type='submit'
                            variant="outlined"
                            style={{ width: 200 }}
                            endIcon={<Fingerprint />}
                            disabled={isSubmitting}>
                            {isSubmitting ? "Loading ..." : "Authenticate"}
                        </Button>
                        {errors.root && (<div className='text-red-500'>{errors.root.message}</div>)}
                    </CardActions>
                </form>
            </Card>
        </Box>
    );
}
