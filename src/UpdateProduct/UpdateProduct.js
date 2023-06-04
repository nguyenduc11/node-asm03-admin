import React, { useEffect, useState, useContext } from 'react';
import queryString from 'query-string';
import ProductAPI from '../API/ProductAPI';

import Loader from '../Loader/Loader';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
//
const UpdateProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { productId } = useParams();
  console.log(user);
  console.log(productId);
  const [load, setLoad] = useState(false);
  // fetch current product
  const [currentProduct, setCurrentProduct] = useState({});
  useEffect(() => {
    const fetchProductDetail = async () => {
      console.clear();
      const response = await ProductAPI.getDetail(productId);
      console.log(response);
      setCurrentProduct(response);
    };
    fetchProductDetail();
  }, []);
  console.log(currentProduct);
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
            const result = window.confirm(
              'Do you want to Update this Product?'
            );
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
          productId: productId,
          productName: productName,
          productCategory: productCategory,
          shortDesc: shortDesc,
          longDesc: longDesc,
        };
        const response = await ProductAPI.updateProduct(data);
        console.log(response);
        if (response) {
          //Dùng setTimeout delay 2s
          //Sau 2s nó sẽ thực hiện
          setTimeout(() => {
            toast.success('Update Product successfully!');
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
      <div className="page-breadcrumb">
        <div className="row">
          <form style={{ width: '50%', marginLeft: '40px' }}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder={currentProduct.name}
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
                placeholder={currentProduct.category}
                value={productCategory}
                onChange={onChangeProductCategory}
              />
              {productCategoryError && (
                <p className="text-danger">* Please Fill Product Category</p>
              )}
            </div>
            <div class="form-group">
              <label>Short Description</label>
              <textarea
                class="form-control"
                rows="3"
                placeholder={currentProduct.short_desc}
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
                placeholder={currentProduct.long_desc}
                value={longDesc}
                onChange={onChangeLongDesc}
              ></textarea>
              {longDescError && (
                <p className="text-danger">
                  * Please Fill Product Long Description
                </p>
              )}
            </div>
            {/*  <div class="form-group">
              <label for="exampleFormControlFile1">
                Upload image (5 images)
              </label>
              <input
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
                multiple
              />
            </div> */}
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
    </div>
  );
};

export default UpdateProduct;
