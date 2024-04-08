"use client"
import { useState, FormEvent, ChangeEvent } from 'react';
import { apiService } from '../services/api';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setRepassword] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<{ [key: string]: string }>({});
  const [errorEmail, setErrorEmail] = useState<{ [key: string]: string }>({});
  const [errorPassword, setErrorPassword] = useState<{ [key: string]: string }>({});
  const [errorRepassword, setErrorRepassword] = useState<{ [key: string]: string }>({});
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!username.trim() || !password.trim() || !confirmPassword.trim() || !email.trim()){
      if (!username.trim()) {
        setErrorUsername({ username: 'O nome de usuário é obrigatório.' });
      }
      if (!email.trim()) {
        setErrorEmail({ email: 'O email é obrigatório.' });
      }
      
      if (!password.trim()) {
        setErrorPassword({ password: 'A senha é obrigatória.' });
        
      }
      if (!confirmPassword.trim()) {
        setErrorRepassword({ confirmPassword: 'As senhas não coincidem.' });
        
      }
      return;
    }

    try {
      await apiService.register({ username, password, confirmPassword, email})
      router.push("/login")

   
     
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRepasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepassword(e.target.value);
  };

  return (
    <>
    <div className='min-h-screen bg-post-it z-0'></div>
    <div className="min-h-screen fixed  top-0 left-0 right-0 flex flex-col justify-center bg-cover bg-no-repeat bg-white-mask z-50">
    <div className='p-12'>
      <form onSubmit={handleSubmit} className="md:w-1/3 w-full">
      <h4 className="text-3xl mb-4 text-center text-black">Cadastro</h4>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Nome de usuário</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className=" border-gray-400 text-black mt-1 p-2 w-full rounded border" />
          {errorUsername.username && <p className="text-red-500">{errorUsername.username}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} className=" border-gray-400 text-black mt-1 p-2 w-full rounded border" />
          {errorEmail.email && <p className="text-red-500">{errorEmail.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Senha</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className=" border-gray-400 text-black mt-1 p-2 w-full rounded border" />
          {errorPassword.password && <p className="text-red-500">{errorPassword.password}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">Repita sua senha</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleRepasswordChange} className=" border-gray-400 text-black mt-1 p-2 w-full rounded border" />
          {errorRepassword.confirmPassword && <p className="text-red-500">{errorRepassword.confirmPassword}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Cadastrar</button>
      </form>
    <a className='text-blue-400 text-center'href='/login' >Já tem conta? Faça seu login</a>
    </div>
    </div>
    </>
  );
}
