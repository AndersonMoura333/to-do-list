"use client"
import { useState, FormEvent, ChangeEvent } from 'react';
import { apiService } from '../services/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<{ [key: string]: string }>({});
  const [errorPassword, setErrorPassword] = useState<{ [key: string]: string }>({});
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!username.trim() || !password.trim()){
      if (!username.trim()) {
        setErrorUsername({ username: 'O nome de usuário é obrigatório.' });
      }
      
      if (!password.trim()) {
        setErrorPassword({ password: 'A senha é obrigatória.' });
        
      }
      return;
    }

    try {
      await apiService.login({username, password})
     router.push("/")
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
    <div className='min-h-screen bg-post-it z-0'></div>
    <div className="min-h-screen fixed  top-0 left-0 right-0 flex flex-col justify-center bg-cover bg-no-repeat bg-white-mask z-50">
    <div className='p-12'>
      <form onSubmit={handleSubmit} className="md:w-1/3 w-full">
      <h4 className="text-3xl mb-4 text-center text-black">Login</h4>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Nome de usuário</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className=" border-gray-400 text-black mt-1 p-2 w-full rounded border" />
          {errorUsername.username && <p className="text-red-500">{errorUsername.username}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Senha</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className=" border-gray-400 text-black mt-1 p-2 w-full rounded border" />
          {errorPassword.password && <p className="text-red-500">{errorPassword.password}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Entrar</button>
      </form>
    <a className='text-blue-400 text-center'href='/register' >Novo por aqui? Crie sua conta</a>
    </div>
    </div>
    </>
  );
}
