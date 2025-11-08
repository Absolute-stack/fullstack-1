import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function List() {
  const [list, setList] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.get(backendUrl + '/api/product/list');
      console.log(res);
      if (res.status === 200) {
        setList(res.data.products);
        toast.success('All Products retrived');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong with fetching products');
    }
  }

  useEffect(() => {
    fetchData();
    return;
  }, []);

  return list.length > 0 ? (
    <div>
      
    </div>
  ) : (
    ''
  );
}

export default List;
