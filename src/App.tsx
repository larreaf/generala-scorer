import { Provider } from 'react-redux';
import './App.css';
import Layout from './components/Layout';
import Scorer from './components/Scorer';
import { store } from './redux/store';

function App() {

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
