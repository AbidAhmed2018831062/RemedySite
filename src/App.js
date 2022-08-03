import Header from './Component/Navigate';

import { Helmet } from 'react-helmet';
import { Routes } from 'react-router-dom';
function App() {
  return (
   <div>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Remedy</title>
            </Helmet>
      <Header/>
       <Routes>
     
     </Routes>
  
   </div>
  );
}

export default App;
