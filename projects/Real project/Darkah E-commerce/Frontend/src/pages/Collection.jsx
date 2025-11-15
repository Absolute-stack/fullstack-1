import { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import './Collection.css';
import { ShopContext } from '../contxt/ShopContext';
import ProductItem from '../components/Productitem';
function Collection() {
  const { products, setProducts } = useContext(ShopContext);
  const [productsCopy, setProductsCopy] = useState([]);

  setProductsCopy(structuredClone(productsCopy));
  const [sort, setSort] = useState('Recommended');
  async function applyFilters() {
    if (sort === 'Low-High') {
      productsCopy.sort((a, b) => a.price - b.price);
      return setProducts(productsCopy);
    }

    if (sort === 'High-Low') {
      productsCopy.sort((a, b) => b.price - a.price);
      return setProducts(productsCopy);
    }

    if (sort === 'New Arrivals') {
      productsCopy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return setProducts(productsCopy);
    }
    setProducts(productsCopy);
  }

  useEffect(() => {
    applyFilters();
  }, [sort]);
  return (
    <>
      <section className="collection">
        <div className="title-container">
          <Title text1={'ALL'} text2={'COLLECTION'} />
        </div>
        <div className="select-container flex gap-05">
          <p>Sort</p>
          <select onChange={(e) => setSort(e.target.value)} name="" id="">
            <option value="Recommended">Recommended</option>
            <option value="Low-High">Price Low To High</option>
            <option value="High-Low">Price High To Low</option>
            <option value="New Arrivals">New Arrivals</option>
          </select>
        </div>
        <div className="img-grid">
          {products.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            );
          })}
        </div>
        <button className="filter-toggle-btn">
          <p>Filter</p>
        </button>
        <aside className="sidebar">
          <div className="sidebar-top flex-sb">
            <p>Filter</p>
            <p>X</p>
          </div>
          <div className="sidebar-main"></div>
        </aside>
      </section>
    </>
  );
}

export default Collection;
