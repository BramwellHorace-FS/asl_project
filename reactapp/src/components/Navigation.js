import { Link } from 'react-router-dom';

const Navigation = ({ loggedIn }) => {

  const logout = () => {
    localStorage.removeItem('token'); // remove the token from the local storage
    window.location.href = '/'; // redirect to the home page
  }

  return (
    <nav className="flex items-center justify-start gap-5 mb-14">
      <Link className="text-2xl font-medium flex flex-col justify-start items-start gap-1 strokeText" to="/">
        <span className="text-xs">01.</span>
        Home
      </Link>
      {loggedIn && (
        <Link onClick={logout} className="text-2xl font-medium flex flex-col justify-start items-start gap-1 strokeText" to="/logout">
          <span className="text-xs ">02.</span>
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
