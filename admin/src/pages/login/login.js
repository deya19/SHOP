import { useState } from "react";
import { useDispatch} from "react-redux";
import { loginAdmin } from "../../redux/apiCalls";
import "./login.css";
import { Helmet } from "react-helmet-async";
import Alert from 'react-bootstrap/Alert'
import { useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  


  const handleClick = (e) => {
    e.preventDefault();
    username && password && loginAdmin(dispatch, { username, password})
  };

  const {isFetching,error,currentError} = useSelector(state=>state.user)

  return (
  <>
     <Helmet>
        <title>LOGIN</title>
        <meta name="description" content="login"/>
      </Helmet>
      <div className="big">
        <form className="loginAdmin">
          <h1 style={{ color: "#000" }}>Admin Login</h1>
          <input
            required
            className="userAdmin"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            className="passAdmin"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert variant="danger" style={{fontSize:"13px"}}>{currentError}—check it out!</Alert>}
          <button className="buttonAdmin" onClick={handleClick}>
            Login
          </button>
          {isFetching && <Spinner animation="border" variant="success" />}
        </form>
      </div>
  </>
  );
}

export default Login;
