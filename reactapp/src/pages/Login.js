import { BsGithub } from 'react-icons/bs';

const Login = () => {
  const client_id = '51030c86f488a583a663';
  const url = ` https://github.com/login/oauth/authorize?client_id=${client_id}`;

  return (
    <main className="login mx-auto max-w-3xl h-screen flex flex-col items-center justify-center gap-5">
      <h2 className="text-6xl font-medium">Quizzical</h2>
      <p className="text-lg font-normal text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br /> Eligendi non quis exercitationem culpa.
      </p>
      <a className="bg-black text-white text-md font-medium py-4 px-6 flex items-center hover:opacity-70" href={url}>
        <BsGithub className="mr-2 text-2xl" />
        Login with GitHub
      </a>
    </main>
  );
};

export default Login;
