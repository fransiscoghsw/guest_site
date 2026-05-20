import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import LoadingPage from "../../components/LoadingPage";
import ErrorPage from "../../pages/ErrorPage";
import { motion } from "framer-motion"; // Import Motion

const GuestLayouts = ({
    children,
    pageTitle,
    isLoading = false,
    isError = false,
}) => {
    return (
        <>
            <Helmet>
                <title>
                    {pageTitle
                        ? `${pageTitle} | KEMBAR MEDIKA SAFETY`
                        : `KEMBAR MEDIKA SAFETY`}
                </title>
            </Helmet>

            <div className="flex flex-col min-h-screen overflow-x-hidden">
                <Navbar />

                {/* Menangani Loading & Error Secara Global */}
                {isLoading ? (
                    <LoadingPage />
                ) : isError ? (
                    <ErrorPage />
                ) : (
                    <motion.main
                        className="grow overflow-x-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.main>
                )}

                <ScrollToTopButton />
                <Footer />
            </div>
        </>
    );
};

// Prop Types Validation
GuestLayouts.propTypes = {
    children: PropTypes.node.isRequired,
    pageTitle: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
};

export default GuestLayouts;
