import React, { useEffect, useState, useContext } from 'react';
import queryString from 'query-string';
import ProductAPI from '../API/ProductAPI';

import Loader from '../Loader/Loader';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//
const NewProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const [load, setLoad] = useState(false);
  // name
  const [productName, setProductName] = useState('');
  const [productNameError, setProductNameError] = useState(false);
  // category
  const [productCategory, setProductCategory] = useState('');
  const [productCategoryError, setProductCategoryError] = useState(false);
  // short description
  const [shortDesc, setShortDesc] = useState('');
  const [shortDescError, setShortDescError] = useState(false);
  // long description
  const [longDesc, setLongDesc] = useState('');
  const [longDescError, setLongDescError] = useState(false);
  //
  const onChangeProductName = (e) => {
    setProductName(e.target.value);
  };
  //
  const onChangeProductCategory = (e) => {
    setProductCategory(e.target.value);
  };
  //
  const onChangeShortDesc = (e) => {
    setShortDesc(e.target.value);
  };
  //
  const onChangeLongDesc = (e) => {
    setLongDesc(e.target.value);
  };
  //
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log('handlerSubmit');
    if (!productName) {
      setProductNameError(true);
      setProductCategoryError(false);
      setShortDescError(false);
      setLongDescError(false);
      return;
    } else {
      if (!productCategory) {
        setProductNameError(false);
        setProductCategoryError(true);
        setShortDescError(false);
        setLongDescError(false);
        return;
      } else {
        if (!shortDesc) {
          setProductNameError(false);
          setProductCategoryError(false);
          setShortDescError(true);
          setLongDescError(false);
          return;
        } else {
          if (!longDesc) {
            setProductNameError(false);
            setProductCategoryError(false);
            setShortDescError(false);
            setLongDescError(true);
            return;
          } else {
            console.log('Front End Validation Successfully');
            const result = window.confirm('Do you want to add a new Product?');
            if (result) {
              setLoad(!load);
            } else {
              // Do nothing
            }
          }
        }
      }
    }
  };
  //
  //Post request for new Product
  useEffect(() => {
    console.log(load);
    if (load) {
      const sendProduct = async () => {
        const data = {
          productName: productName,
          productCategory: productCategory,
          shortDesc: shortDesc,
          longDesc: longDesc,
        };
        const response = await ProductAPI.postNewProduct(data);
        console.log(response);
        if (response) {
          //Dùng setTimeout delay 2s
          //Sau 2s nó sẽ thực hiện
          setTimeout(() => {
            toast.success('Add a new Product successfully!');
            setLoad(!load);
            navigate('/products');
          }, 2000);
        }
      };
      sendProduct();
    }
  }, [load]);

  return (
    <div className="page-wrapper d-block">
      {user ? (
        <>
          <div className="page-breadcrumb">
            <div className="row">
              <form style={{ width: '50%', marginLeft: '40px' }}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={productName}
                    onChange={onChangeProductName}
                  />
                  {productNameError && (
                    <p className="text-danger">* Please Fill Product Name</p>
                  )}
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Category"
                    value={productCategory}
                    onChange={onChangeProductCategory}
                  />
                  {productCategoryError && (
                    <p className="text-danger">
                      * Please Fill Product Category
                    </p>
                  )}
                </div>
                <div class="form-group">
                  <label>Short Description</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Enter Short Description"
                    value={shortDesc}
                    onChange={onChangeShortDesc}
                  ></textarea>
                  {shortDescError && (
                    <p className="text-danger">
                      * Please Fill Product Short Description
                    </p>
                  )}
                </div>
                <div class="form-group">
                  <label>Long Description</label>
                  <textarea
                    class="form-control"
                    rows="6"
                    placeholder="Enter Long Description"
                    value={longDesc}
                    onChange={onChangeLongDesc}
                  ></textarea>
                  {longDescError && (
                    <p className="text-danger">
                      * Please Fill Product Long Description
                    </p>
                  )}
                </div>
                <div class="form-group">
                  <label for="exampleFormControlFile1">
                    Upload image (5 images)
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                    multiple
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handlerSubmit}
                >
                  Submit
                </button>
              </form>
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
    </div>
  );
};

export default NewProduct;
