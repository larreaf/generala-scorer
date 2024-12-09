import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import {
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Scorer from './components/Scorer';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Scorer/>
        </Layout>

      </Provider>

      {/* <HistoryRouter history={history}> */}
      {/* <ThemeProvider > */}
      {/* <CssBaseline />
          <Layout>
            <Routes>
              {/* Protected routes */}

      {/* Public routes */}
      {/* <Route path="/" element={} />
            </Routes> */}
      {/* </Layout>} */}
      {/* </ThemeProvider> */}
      {/* </HistoryRouter> */}
    </>
  )
}

export default App
