import axios from 'axios';
import { useState } from 'react';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';
import './AddProduct.css';
import { backendUrl } from '../App.jsx';
function AddProduct({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productCategory, setProductCategory] = useState('Men');
  const [productSubCategory, setProductSubCategory] = useState('Topwear');
  const [productPrice, setProductPrice] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [bestseller, setBestSeller] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('desc', productDesc);
      formData.append('price', productPrice);
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);
      formData.append('category', productCategory);
      formData.append('subCategory', productSubCategory);
      formData.append('sizes', JSON.stringify(productSizes));
      formData.append('bestseller', bestseller);
      const res = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success('New Product added');
        setProductName('');
        setProductDesc('');
        setProductPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Occured :Product wasnt added');
    }
  }

  return (
    <>
      <div className="addform-container">
        <form action="#" onSubmit={handleSubmit}>
          <h2 className="image-title">Upload Images</h2>
          <div className="upload-img-wrapper">
            <div className="img-wrapper">
              <label htmlFor="image1">
                <img
                  src={
                    !image1 ? assets.upload_area : URL.createObjectURL(image1)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setImage1(e.target.files[0])}
                  type="file"
                  id="image1"
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="img-wrapper">
              <label htmlFor="image2">
                <img
                  src={
                    !image2 ? assets.upload_area : URL.createObjectURL(image2)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setImage2(e.target.files[0])}
                  type="file"
                  id="image2"
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="img-wrapper">
              <label htmlFor="image3">
                <img
                  src={
                    !image3 ? assets.upload_area : URL.createObjectURL(image3)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setImage3(e.target.files[0])}
                  type="file"
                  id="image3"
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="img-wrapper">
              <label htmlFor="image4">
                <img
                  src={
                    !image4 ? assets.upload_area : URL.createObjectURL(image4)
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setImage4(e.target.files[0])}
                  type="file"
                  id="image4"
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
          <div className="pw">
            <h2>Product Name</h2>
            <input
              onInput={(e) => setProductName(e.target.value)}
              type="text"
              className="product-name-input"
              placeholder="Type here"
              required
            />
          </div>
          <div className="pw">
            <h2>Product Desc</h2>
            <textarea
              onInput={(e) => setProductDesc(e.target.value)}
              name=""
              id=""
              placeholder="write product description here"
              required
              className="product-desc-textarea"
            ></textarea>
          </div>
          <div className="pw flex">
            <div className="product-item-wrapper">
              <h2>Product Category</h2>
              <select
                onChange={(e) => setProductCategory(e.target.value)}
                className="product-category required"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="product-item-wrapper">
              <h2>Product SubCategory</h2>
              <select
                onChange={(e) => setProductSubCategory(e.target.value)}
                className="product-subcategory required"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div className="product-item-wrapper">
              <h2 className="prduct-price">Product Price</h2>
              <input
                onInput={(e) => setProductPrice(e.target.value)}
                value={productPrice}
                type="number"
                placeholder="25"
                className="product-price-input"
                required
              />
            </div>
          </div>
          <div className="sizes">
            <h2>Product sizes</h2>
            <div className="product-sizes-wrapper flex-1 gap-1">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={productSizes.includes(size) ? 'active' : ''}
                  onClick={() =>
                    setProductSizes((prevArr) =>
                      prevArr.includes(size)
                        ? prevArr.filter((item) => item !== size)
                        : [...prevArr, size]
                    )
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="bestseller flex-1 gap-1">
            <label htmlFor="bestseller-checkbox">Add to Bestseller</label>
            <input
              onChange={() => setBestSeller((prevState) => !prevState)}
              type="checkbox"
              required
              className="bestseller-checkbox"
            />
          </div>
          <button type="submit" className="product-add-btn">
            ADD
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
