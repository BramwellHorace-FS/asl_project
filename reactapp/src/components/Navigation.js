import { Link } from 'react-router-dom';

const Navigation = ({ loggedIn }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      { loggedIn && <Link to="/Logout">Logout</Link> }
    </nav>
  );
};

export default Navigation;
