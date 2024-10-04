import { ToastContainer } from 'react-toastify';
import './App.css';
import RouterConfig from './config/RouterConfig';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const { currentUser } = useSelector((state: RootState) => state.app);

  return (
    <>
      {currentUser && <Navbar />}
      <RouterConfig />
      <ToastContainer autoClose={2500} />
      <Spinner />
    </>
  )
}

export default App
