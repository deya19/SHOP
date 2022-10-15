import { useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./login.css";
import { Helmet } from "react-helmet-async";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(process.env);

  const handleClick = (e) => {
    e.preventDefault();
    username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD &&
      login(dispatch, { username, password });

    username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD &&
      history.push("/");
  };

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
          <button className="buttonAdmin" onClick={handleClick}>
            Login
          </button>
        </form>
      </div>
  </>
  );
}

export default Login;
