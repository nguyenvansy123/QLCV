import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Layout } from "./Layout/Layout";
import { Thongke } from "./Pages/ThongKe/Thongke";
import { Daotao } from "./Pages/DaoTao/Daotao";
import { Quytrinhmau } from "./Pages/QuytrinhMau/Quytrinhmau";


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         errorElement: <ErrorPage />,
//         children: [
//             { index: true, element: <Home /> },
//             { path: "/:slug/:id", element: <DetailPost /> },
//             { path: "about", element: <About /> },
//             { path: "signup", element: isLogin() ? <Navigate to="/" replace={true} /> : <SignupPage /> },
//             { path: "login", element: isLogin() ? <Navigate to="/" replace={true} /> : <LoginPage /> },
//             { path: "forgetpasswordpage", element: <ForgetPasswordPage /> },
//             { path: "danh-muc/:slug", element: <ArticleManagement /> },
//             { path: "article-management", element: <PrivateRoute component={ArticleManagement} /> },
//             { path: "profile", element: <Profile /> },
//             { path: "phan-loai/:slug", element: <FilterPost /> },
//             { path: "contact", element: <ContactPage /> }
//         ]
//     },
//     { path: "reset-password/:userId", element: <ResetPassword /> }
// ], {
//     // basename: "/client-tvdt2"
// })
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children:[
            { index: true, element: <Thongke /> },
            { path: "daotao", element: <Daotao /> },
            {path:"quytrinhmau",element:<Quytrinhmau/>}
        ]
    }

])