import React, { useEffect, useState, useContext } from 'react';
import queryString from 'query-string';
import ProductAPI from '../API/ProductAPI';
import Pagination from './Component/Pagination';
import Loader from '../Loader/Loader';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Products(props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const [products, setProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [pagination, setPagination] = useState({
    page: '1',
    count: '8',
    search: '',
    category: 'all',
  });
  //Tổng số trang
  const [totalPage, setTotalPage] = useState();
  const [search, setSearch] = useState('');

  const onChangeText = (e) => {
    const value = e.target.value;
    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    console.log('Value: ', value);
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await ProductAPI.getAllProducts();
      console.log(response);

      //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      const totalPage = Math.ceil(
        parseInt(response.length) / parseInt(pagination.count)
      );
      console.log(totalPage);

      setTotalPage(totalPage);
    };

    fetchAllData();
  }, [pagination]);

  //Gọi hàm Pagination
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);

      const newQuery = '?' + query;

      const response = await ProductAPI.getPagination(newQuery);
      console.log(response);

      setProducts(response);
    };

    fetchData();
  }, [pagination]);
  console.log(products);
  //
  // delete hotel handler
  const onDeleteHandler = async (e, productId) => {
    const deleteProduct = async () => {
      const params = {
        productId: productId,
      };
      const query = '?' + queryString.stringify(params);
      const response = await ProductAPI.deleteProduct(query);
      console.log(response);
      setIsDeleted(!isDeleted);
      setProducts(response.products);
      toast.success('Delete Product successfully');
    };
    const result = window.confirm('Do you want to Delete this Product?');
    if (result) {
      deleteProduct();
    } else {
      // Do nothing
    }
  };
  //
  // update product handler
  const onUpdateHandler = async (productId) => {
    const result = window.confirm('Do you want to edit this product?');
    if (result) {
      navigate(`/updateproduct/${productId}`);
    } else {
      // Do nothing
    }
  };
  return (
    <>
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

            {products?.length > 0 ? (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Products</h4>
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => {
                            navigate('/new');
                          }}
                        >
                          Add New Product
                        </button>
                        <input
                          className="form-control w-25"
                          onChange={onChangeText}
                          type="text"
                          placeholder="Enter Search!"
                        />

                        <br />
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered no-wrap">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Edit</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products &&
                                products.map((value) => (
                                  <tr key={value._id}>
                                    <td>{value._id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.price}</td>
                                    <td>
                                      <img
                                        src={value.img1}
                                        style={{
                                          height: '60px',
                                          width: '60px',
                                        }}
                                        alt=""
                                      />
                                    </td>
                                    <td>{value.category}</td>
                                    <td>
                                      <a
                                        style={{
                                          cursor: 'pointer',
                                          color: 'white',
                                        }}
                                        className="btn btn-success"
                                        onClick={(e) => {
                                          const productId = value._id;
                                          onUpdateHandler(productId);
                                        }}
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
                                        onClick={(e) => {
                                          const productId = value._id;
                                          console.log('productId', productId);
                                          onDeleteHandler(e, productId);
                                        }}
                                      >
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <Pagination
                            pagination={pagination}
                            handlerChangePage={handlerChangePage}
                            totalPage={totalPage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1>Loading</h1>
                <Loader></Loader>
              </div>
            )}
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
    </>
  );
}

export default Products;
