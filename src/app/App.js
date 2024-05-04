import { RouterProvider } from 'react-router-dom';
import appRouter from './appRouter';

import './App.css';

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
