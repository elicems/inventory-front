import { useEffect,useState,useRef } from 'react'
import './style.css'
import Trash from '../../assets/Trash.svg'
import Pen from '../../assets/Pen.svg'
import api from '../../services/api'



function Home() {
  const[products,setProducts] = useState([])
  const[showForm,setShowForm] = useState(false)
  const[isModalOpen,setIsModalOpen] = useState(false)
  const[editingProduct,setEditingProduct] = useState(null)
  const[description,setDescription] = useState('')
  const[quantity,setQuantity] = useState('')

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
      quantity:Number(inputQuantity.current.value)
    })
    getProducts()
    setShowForm(false)
  }
  async function deleteProduct(id) {
    await api.delete(`/api/products/${id}`)
    getProducts()
  }
  async function updateProduct(id) {
    await api.put(`/api/products/${id}`,{
      description,
      quantity: Number(quantity)
    })
    getProducts()
    setIsModalOpen(false)
    setEditingProduct(null)
    setDescription('')
    setQuantity('')
  }
  function openEditModal(product){
    setEditingProduct(product)
    setDescription(product.description)
    setQuantity(product.quantity)
    setIsModalOpen(true)
  }
  function cancelEdit(){
    setIsModalOpen(false)
    setEditingProduct(null)
    setDescription('')
    setQuantity('')
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
            <td>
              <button className='update-btn' onClick={() => openEditModal(product)}>
                <img src={Pen} alt="Update" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {isModalOpen && editingProduct && (
      <div className='modal-overlay'>
        <div className='modal-box'>
          <h1>Update Product</h1>

          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <div className='modal-actions'>
            <button type='button' onClick={cancelEdit}>Cancelar</button>
            <button type='button' onClick={updateProduct}>Atualizar</button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default Home
