import { createBrowserRouter } from "react-router-dom";
import Login from "../services/authService";

const Router = createBrowserRouter(
    [
        {
            element: <Layout />,
            children: [
                {
                    path: "/login",
                    element: <authService />,
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ],
    {
        basename: "/react_context",
    }
);

export default Router;