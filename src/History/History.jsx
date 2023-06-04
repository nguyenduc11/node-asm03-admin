import React, { useEffect, useState, useContext } from 'react';
import HistoryAPI from '../API/HistoryAPI';

import Loader from '../Loader/Loader';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
const socket = io('http://localhost:5000', { transports: ['websocket'] });

function History(props) {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [history, setHistory] = useState([]);

  const [text, setText] = useState('');
  // get all orders history
  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryAPI.getAllHistoryData();
      //console.log(response);
      if (response.orders) {
        setHistory(response.orders);
        console.log(history);
        toast.success('Load all Orders data successfully');
      }
    };

    fetchData();
  }, []);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_order
    socket.on('receive_order', (data) => {
      setText('User ID: ' + data + ' Vừa Đặt Hàng');

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    });
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
                          History
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
                    <h4 className="card-title">History</h4>
                    <h3>{text}</h3>
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
                            <th>ID User</th>
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
                          {history?.length > 0 ? (
                            history.map((value) => (
                              <tr key={value._id}>
                                <td>{value.idUser}</td>
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

export default History;
