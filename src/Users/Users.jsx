import React, { useEffect, useState, useContext } from 'react';
import UserAPI from '../API/UserAPI';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Users(props) {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [users, setUsers] = useState([]);
  // get all users data
  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllUsersData();
      console.log(response);
      if (response.users) {
        setUsers(response.users);
        console.log(users);
        toast.success('Load all users data successfully');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page-wrapper d-block">
      {user ? (
        <>
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-7 align-self-center">
                <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                  Basic Initialisation
                </h4>
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 p-0">
                      <li className="breadcrumb-item">
                        <a
                          href="/"
                          className="text-muted"
                        >
                          Home
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item text-muted active"
                        aria-current="page"
                      >
                        Table
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Users</h4>
                    <input
                      className="form-control w-25"
                      type="text"
                      placeholder="Enter Search!"
                    />
                    <br />
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered no-wrap">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Is Admin</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.length > 0 ? (
                            users.map((value) => (
                              <tr key={value._id}>
                                <td>{value._id}</td>
                                <td>{value.fullname}</td>
                                <td>{value.email}</td>
                                <td>{value.phone}</td>
                                <td>{value.isAdmin.toString()}</td>
                                <td>
                                  <a
                                    style={{
                                      cursor: 'pointer',
                                      color: 'white',
                                    }}
                                    className="btn btn-success"
                                  >
                                    Update
                                  </a>
                                  &nbsp;
                                  <a
                                    style={{
                                      cursor: 'pointer',
                                      color: 'white',
                                    }}
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <>
                              <div>
                                <h1>Loading</h1>
                                <Loader></Loader>
                              </div>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>
          Please
          <span>
            <Link to="/login"> Log In</Link>
          </span>
          <span> To Use Admin Functions</span>
        </h1>
      )}
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Users;
