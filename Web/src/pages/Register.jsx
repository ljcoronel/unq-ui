import { use, useState } from 'react'
import Button from '../components/atoms/button/Button'
import Input from '../components/atoms/input/Input'
import defaultImage from '../assets/gog.png'
import Api from '../services/Api'



const Register = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(''); 
    


    const enviarDatosDeRegistro = (ev) => {
        ev.preventDefault();
        const body = {
            name,
            email,
            password,
            image,
            backgroundImage
        };
        Api.userRegister(body);
    }

    return (
        <div className='register-container login-container'>
            <form className='register-card login-card'  onSubmit={enviarDatosDeRegistro}>
                <h2 className='register-title login-title'>Create your account</h2>
                <Input 
                    label = "EMAIL" 
                    name="email" 
                    placeholder='Enter your email' 
                    type='email' 
                    value = {email} 
                    onChange={ev=>setEmail(ev.target.value)}
                    required />
                <Input 
                    label = "PASSWORD" 
                    placeholder='Enter your password' 
                    type='password' 
                    value={password} 
                    onChange={ev=>setPassword(ev.target.value)}
                    required />
                <Input 
                    label = "NAME" 
                    placeholder='Enter your name'
                    value={name} 
                    onChange={ev=>setName(ev.target.value)}
                    required />
                <Input 
                    label = "IMAGE" 
                    value={image}
                    placeholder= 'Enter a image URL'
                    onChange={ev => setImage(ev.target.value)}
                    required />
                <Input 
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
