import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Footer from "./components/footer/Footer";
import ContactUsList from "./pages/Contact/ContactUsList";
import AddBook from "./pages/AddBook/AddBook";
import AddBookCard from "./pages/AddBook/AddBookCard";
import BookDetails from "./pages/AddBook/BookDetails"; // Import the BookDetails component

function App() {
    // Get user session from sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));

    const isAuthenticated = user !== null; // Check if user is logged in

    return (
        <div className="container-fluid d-flex flex-column min-vh-100">
            <Router>
                {/* Navbar Section */}
                <div className="row">
                    <div className="col-12">
                        <Navbar />
                    </div>
                </div>

                {/* Main Content */}
                <div className="row flex-grow-1">
                    {isAuthenticated ? (
                        <>
                            {/* Sidebar only for logged-in users */}
                            <div className="col-md-2 bg-light p-3 border-end d-none d-md-block">
                                <Sidebar />
                            </div>

                            {/* Page Content */}
                            <div className="col-md-10 p-2">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/contactuslist" element={<ContactUsList />} />
                                    <Route path="/addbook" element={<AddBook />} />
                                    <Route path="/addbookcard" element={<AddBookCard />} />
                                    <Route path="/book/:id" element={<BookDetails />} /> {/* Add route for BookDetails */}
                                </Routes>
                            </div>
                        </>
                    ) : (
                        /* Full-width layout for guests */
                        <div className="col-md-12 p-3">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/registration" element={<Registration />} />
                            </Routes>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="row">
                    <div className="col-12">
                        <Footer />
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;