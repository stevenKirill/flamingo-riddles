import React from 'react';
import 'materialize-css';
import {BrowserRouter} from 'react-router-dom';
import {useRoutes} from './routes';
import {NavBar} from './Components/NavBar/NavBar';
import {ProjectUrlContext} from './context/contexts';

function App() {
  const routes = useRoutes();
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://flamingo-riddle.ru';
  };

  if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:5000';
  };

  return (
    <div>
      <ProjectUrlContext.Provider value={{
        BASE_URL
      }}>
        <BrowserRouter>
          <NavBar/>
          {routes}
        </BrowserRouter>
        </ProjectUrlContext.Provider>
    </div>
  );
}

export default App;
