import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Get all users from database
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await UserAPI.getAllUsers();
      console.log(response);
      setAllUsers(response.users);
    };

    fetchAllUsers();
  }, []);

  const handleSubmit = async () => {
    const findUser = allUsers.find((value) => {
      return value.email === email;
    });
    console.log(findUser);
    if (findUser) {
      const data = {
        email: email,
        password: password,
      };
      const response = await UserAPI.postSignIn(data);
      console.log(response.user);
      // setFindUser(response.user);
      const isPasswordCorrect = await response.isPasswordCorrect;
      if (isPasswordCorrect) {
        toast.success('User Sign In Successfully!');
        dispatch({ type: 'LOGIN_SUCCESS', payload: findUser });
        navigate('/');
      }
    } else {
      alert('Email or password wrong!');
    }
    /*     if (findUser && findUser.password === password) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: findUser });
      navigate('/');
      // navigate('/');
    } else {
      alert('Email or password wrong!');
    } */

    // if (findUser.password !== password) {
    // 	setErrorPassword(true);
    // 	return;
    // } else {
    // 	setErrorPassword(false);

    // 	localStorage.setItem('id_user', findUser._id);

    // 	localStorage.setItem('name_user', findUser.fullname);

    // 	const action = addSession(localStorage.getItem('id_user'));
    // 	dispatch(action);

    // 	setCheckPush(true);
    // }
  };

  return (
    <div className="page-wrapper d-block">
      <div className="page-breadcrumb">
        <div className="row">
          <div class="login">
            <div class="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="float"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
