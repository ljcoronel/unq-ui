import { use, useState } from 'react'
import '../styles/Auth.css'
import Button from '../components/atoms/button/Button'
import Input from '../components/atoms/input/Input'
import defaultImage from '../assets/gog.png'
import Api from '../services/Api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'



const Register = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(''); 
    const navigate = useNavigate();
    


    const enviarDatosDeRegistro = (ev) => {
        ev.preventDefault();
        const body = {
            name,
            email,
            password,
            image,
            backgroundImage
        };
        
        Api.userRegister(body).then(() => {
            toast.success("Register successful");
            navigate("/");})
    }

    

    return (
        <div className='form-container'>
            <form className='form-card'  onSubmit={enviarDatosDeRegistro}>
                <h2 className='card-title'>Create your account</h2>
                <Input className='register-input-container'
                    label = "EMAIL" 
                    name="email" 
                    placeholder='Enter your email' 
                    type='email' 
                    value = {email} 
                    onChange={ev=>setEmail(ev.target.value)}
                    required />
                <Input  className='register-input-container'
                    label = "PASSWORD" 
                    placeholder='Enter your password' 
                    type='password' 
                    value={password} 
                    onChange={ev=>setPassword(ev.target.value)}
                    required />
                <Input  className='register-input-container'
                    label = "NAME" 
                    placeholder='Enter your name'
                    value={name} 
                    onChange={ev=>setName(ev.target.value)}
                    required />
                <Input  className='register-input-container'
                    label = "IMAGE" 
                    value={image}
                    placeholder= 'Enter a image URL'
                    onChange={ev => setImage(ev.target.value)}
                    required />
                <Input  className='register-input-container'
                    label = "BACKGROUND IMAGE" 
                    value={backgroundImage}
                    placeholder='Enter a image URL'
                    onChange={ev => setBackgroundImage(ev.target.value)}
                    required />
                <Button>Register</Button>
            </form>
        </div>
    )
} 
    

export default Register
