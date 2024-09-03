import React from 'react'
import AddItemForm from './components/AddItemForm'
import ItemList from './components/ItemList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <AddItemForm />
    <ItemList />
    </>
  )
}

export default App