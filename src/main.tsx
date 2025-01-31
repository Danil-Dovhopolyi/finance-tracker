import { createRoot } from 'react-dom/client';
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from './app/routes/routes';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
);

