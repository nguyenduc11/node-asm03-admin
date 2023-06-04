import React, { useEffect, useState } from 'react';
import HistoryAPI from '../API/HistoryAPI';
import UserAPI from '../API/UserAPI';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserAlt, FaMoneyBill, FaPhoneAlt } from 'react-icons/fa';
Home.propTypes = {};

function Home(props) {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [earning, setEarning] = useState(0);
  // get latest orders function
  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryAPI.getLatestHistory();
      //console.log(response);
      if (response.orders) {
        setHistory(response.orders);

        console.log(history);
        toast.success('Load Latest Orders successfully');
      }
    };
    fetchData();
  }, []);
  // calculate total earning
  useEffect(() => {
    let sum = 0;
    history.forEach((order) => {
      sum += Number(order.total);
    });
    setEarning(sum);
  }, [history]);
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
  console.log('current user is:', user);
  return (
    <div className="page-wrapper d-block">
      {user ? (
        <>
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-7 align-self-center">
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 p-0">
                      <li className="breadcrumb-item">
                        <Link to="/">Dashboard</Link>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="card-group">
              <div className="card border-right">
                <div className="card-body">
                  <div className="d-flex d-lg-flex d-md-block align-items-center">
                    <div>
                      <div className="d-inline-flex align-items-center">
                        <h2 className="text-dark mb-1 font-weight-medium">
                          {users?.length}
                        </h2>
                      </div>
                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        Users
                      </h6>
                    </div>
                    <div className="ml-auto mt-md-3 mt-lg-0">
                      <span className="opacity-7 text-muted">
                        <FaUserAlt></FaUserAlt>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border-right">
                <div className="card-body">
                  <div className="d-flex d-lg-flex d-md-block align-items-center">
                    <div>
                      <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                        <sup className="set-doller">$</sup>
                        {earning}
                      </h2>
                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        Total Earnings
                      </h6>
                    </div>
                    <div className="ml-auto mt-md-3 mt-lg-0">
                      <span className="opacity-7 text-muted">
                        <FaMoneyBill></FaMoneyBill>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border-right">
                <div className="card-body">
                  <div className="d-flex d-lg-flex d-md-block align-items-center">
                    <div>
                      <div className="d-inline-flex align-items-center">
                        <h2 className="text-dark mb-1 font-weight-medium">
                          {history?.length}
                        </h2>
                      </div>
                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        Number of Orders
                      </h6>
                    </div>
                    <div className="ml-auto mt-md-3 mt-lg-0">
                      <span className="opacity-7 text-muted">
                        <FaPhoneAlt></FaPhoneAlt>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Latest Orders</h4>
                    <br />
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered no-wrap">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Time Created</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Total</th>
                            <th>Delivery</th>
                            <th>Status</th>
                            <th>Detail</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history &&
                            history.map((value) => (
                              <tr key={value._id}>
                                <td>{value._id}</td>
                                <td>{value.createdAt}</td>
                                <td>{value.fullname}</td>
                                <td>{value.phone}</td>
                                <td>{value.address}</td>
                                <td>{value.total}</td>
                                <td>
                                  {value.delivery
                                    ? 'Đã Vận Chuyển'
                                    : 'Chưa Vận Chuyển'}
                                </td>
                                <td>
                                  {value.status
                                    ? 'Đã Thanh Toán'
                                    : 'Chưa Thanh Toán'}
                                </td>
                                <td>
                                  <a
                                    style={{
                                      cursor: 'pointer',
                                      color: 'white',
                                    }}
                                    className="btn btn-success"
                                  >
                                    View
                                  </a>
                                </td>
                              </tr>
                            ))}
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
        <>
          <h1>
            Please
            <span>
              <Link to="/login"> Log In</Link>
            </span>
            <span> To Use Admin Functions</span>
          </h1>
        </>
      )}
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Home;
