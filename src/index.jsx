import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/style/index.css";

// 1. IMPORT RootLayout YANG BARU DIBUAT
import RootLayout from "./layouts/GuestLayouts/RootLayout";

// START: Guest
import Dashboard from "./pages/guest/Dashboard";
import About from "./pages/guest/About";
import ErrorPage from "./pages/ErrorPage";
import Founder from "./pages/guest/About/Founder";
import Produk from "./pages/guest/Produk";
import Kontak from "./pages/guest/Kontak";

// END: Guest

const queryClient = new QueryClient();

const router = createBrowserRouter([
    // 2. BUAT SATU RUTE INDUK (PARENT) YANG MENGGUNAKAN RootLayout
    {
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        // 3. PINDAHKAN SEMUA RUTE LAMA ANDA KE DALAM ARRAY 'children' INI
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/products",
                element: <Produk />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Kontak />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </HelmetProvider>
    </React.StrictMode>,
);
