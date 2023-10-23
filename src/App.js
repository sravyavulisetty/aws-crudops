import './App.css';
import "./index.css";
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import ProductForm from './components/ProductForm';
import { ProdProvider } from './components/ProdContext';
import EditForm from './components/EditForm';
import ToastProvider from './components/ToastProvider';
function App() {
  return (
    <ProdProvider>
    <ToastProvider>
      <Routes>
      <Route exact path="/" element={<Main/>}></Route>
      <Route exact path="/productform" element={<ProductForm/>}></Route>
      <Route exact path="/editproduct" element={<EditForm />}></Route>
    </Routes>
    </ToastProvider>
    </ProdProvider>

  );
}

export default App;
