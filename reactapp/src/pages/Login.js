const Login = () => {
  const client_id = '51030c86f488a583a663';
  const url = ` https://github.com/login/oauth/authorize?client_id=${client_id}`;

  return (
    <div className="login">
      <h2>Login</h2>
      <a href={url}>Login with GitHub</a>
    </div>
  );
};

export default Login;
