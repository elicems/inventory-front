import { useEffect,useState,useRef } from 'react'
import './style.css'
import Trash from '../../assets/Trash.svg'
import api from '../../services/api'



function Home() {
  const[products,setProducts] = useState([])
  const[showForm,setShowForm] = useState(false)
  const inputDescription = useRef()
  const inputQuantity = useRef()
  async function getProducts() {
    const productsFromAPI = await api.get('/api/products')
    setProducts(productsFromAPI.data)
    console.log(products)
  }
  async function createProducts() {
    await api.post('/api/products',{
      description:inputDescription.current.value,
      quantity:inputQuantity.current.value
    })
    getProducts()
  }
  async function deleteProduct(id) {
    await api.delete(`/api/products/${id}`)
    getProducts()
  }
  
  useEffect(() => {
    getProducts()
  },[])
  
  return (
    
    <div className='container'>
      <button type='button'
      className='form-button' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close':'Add product'}
      </button>
      {showForm &&(
        <form >
          <h1>Register a new product</h1>
          <input placeholder="description" name='description' type="text" ref={inputDescription} />
          <input placeholder="quantity" type="number" name="quantity" ref={inputQuantity}/> 
          <button type='button' onClick={createProducts}>Register product</button>
        </form>
      )}
      <table className='excel-table'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Delete</th>{}
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.description}</td>
            <td>{product.quantity}</td>
            <td>
              <button className='delete-btn' onClick={() => deleteProduct(product.id)}>
                <img src={Trash} alt="Delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Home
