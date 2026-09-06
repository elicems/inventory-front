import { useEffect,useState } from 'react'
import './style.css'
import Trash from '../../assets/Trash.svg'
import api from '../../services/api'



function Home() {
  const[products,setProducts] = useState([])
  async function getProducts() {
    const productsFromAPI = await api.get('/api/products')
    setProducts(productsFromAPI.data)
    console.log(products)
  }

  useEffect(() => {
    getProducts()
  },[])
  
  return (
    <div className='container'>
      <form>
        <h1>Register Product</h1>
        <input placeholder="description" name='description' type="text" />
        <input placeholder="quantity" type="number" name="quantity" />
        <button type='button'>Register product</button>
      </form>
      {products.map(product => (
        <div key={product.id} className='card'>
          <div>
            <p>Id: <span>{product.id}</span></p>
            <p>Description: <span>{product.description}</span> </p>
            <p>Quantity: <span>{product.quantity}</span> </p>
          </div>
          <button><img src="{Trash}" /></button>
        </div>
      ))}

    </div>
  )
}

export default Home
