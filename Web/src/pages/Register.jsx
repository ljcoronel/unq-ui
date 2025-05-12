import { use, useState } from 'react'
import Button from '../components/atoms/button/Button'
import Input from '../components/atoms/input/Input'
import defaultImage from '../assets/gog.png'
import Api from '../services/Api'



const Register = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(defaultImage);
    const [backgroundImage, setBackgroundImage] = useState(defaultImage); // no se puede setear una url en value por defecto
    

    const handleImageChange = ev => {
        const file = ev.target.files[0];
        if(file){
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    }

    const handleBackgroundImageChange = ev => {
        const file = ev.target.files[0];
        if(file){
            const imageURL = URL.createObjectURL(file);
            setBackgroundImage(imageURL);
        }
    }

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
        <form onSubmit={enviarDatosDeRegistro}>
            <h1>Create your account</h1>
            <Input label = "EMAIL" id="email-register" name="email" placeholder='Enter your email' type='email' value = {email} onChange={ev=>setEmail(ev.target.value)}/>
            <Input label = "PASSWORD" id="password-register" name ="password" placeholder='Enter your password' type='password' value={password} onChange={ev=>setPassword(ev.target.value)} />
            <Input label = "NAME" id ="name-register" name = "name" placeholder='Enter your name' type='text' value={name} onChange={ev=>setName(ev.target.value)}/>
            <Input 
                label = "IMAGE" 
                type='file' 
                name = "image"
                accept = "image/png, image/jpeg" 
                id="image-register" 
                className='imageInput'
                onChange={handleImageChange} />
            <Input 
                label = "BACKGROUND IMAGE" 
                type='file' 
                name= "backgroundImage"
                accept = "image/png, image/jpeg" 
                id="background-image-register" 
                className='imageInput'
                onChange={handleBackgroundImageChange} />
            <Button type='submit'>
                Register
            </Button>
        </form>
    )
}
    

export default Register
