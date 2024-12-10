import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Scorer from './components/Scorer';
import { store } from './redux/store';
import UserInscription from './components/UserInscription';

function App() {

  return (
    <>
      <Provider store={store}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserInscription/>} />
              <Route path="/scorer" element={<Scorer />} />
            </Routes>
          </BrowserRouter>
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
