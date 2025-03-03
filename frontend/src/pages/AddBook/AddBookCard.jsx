import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAddBook } from "../../features/AddBook/AddBookSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const AddBookCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get books from Redux state
    const { books, loading, error } = useSelector((state) => state.addBook);

    // Fetch books when the component mounts
    useEffect(() => {
        dispatch(fetchAllAddBook());
    }, [dispatch]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10);

    // Search filters
    const [searchPincode, setSearchPincode] = useState("");
    const [searchUniversity, setSearchUniversity] = useState("");
    const [searchCollege, setSearchCollege] = useState("");
    const [searchCourse, setSearchCourse] = useState("");

    // Navigate to book details
    const handleCardClick = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    // Filter books based on search criteria
    const filteredBooks = books.filter((book) =>
        String(book.pincode).includes(searchPincode) &&
        book.universityName?.toLowerCase().includes(searchUniversity.toLowerCase()) &&
        book.collegeName?.toLowerCase().includes(searchCollege.toLowerCase()) &&
        book.courseName?.toLowerCase().includes(searchCourse.toLowerCase())
    );

    // Pagination logic
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredBooks.slice(indexOfFirstEntry, indexOfLastEntry);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Book List</h1>

            {/* Loading and Error Handling */}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-danger text-center">Error: {error}</p>}

            {/* Search Bars */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Pincode"
                        value={searchPincode}
                        onChange={(e) => setSearchPincode(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by University"
                        value={searchUniversity}
                        onChange={(e) => setSearchUniversity(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by College"
                        value={searchCollege}
                        onChange={(e) => setSearchCollege(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Course"
                        value={searchCourse}
                        onChange={(e) => setSearchCourse(e.target.value)}
                    />
                </div>
            </div>

            {/* Book Cards */}
            <div className="row">
                {currentEntries.map((book) => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow" onClick={() => handleCardClick(book.id)} style={{ cursor: "pointer" }}>
                            {/* Display image from the database or a placeholder */}
                            <img
    src={book.bookPdf ? `http://localhost:3000/uploads/${book.bookPdf}` : "https://via.placeholder.com/250"}
    className="card-img-top"
    alt={book.collegeName}
    style={{ height: "250px", objectFit: "cover" }}
/>
                            <div className="card-body">
                                <h5 className="card-title">{book.collegeName}</h5>
                                <p className="card-text">
                                    <strong>University:</strong> {book.universityName}<br />
                                    <strong>University:</strong> {book.bookPdf}<br />
                                    <strong>City:</strong> {book.city}<br />
                                    <strong>Pincode:</strong> {book.pincode}<br />
                                    <strong>Course:</strong> {book.courseName}<br />
                                    <strong>Year:</strong> {book.year}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alert(`Added ${book.collegeName} to cart`);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alert(`Purchased ${book.collegeName}`);
                                        }}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(filteredBooks.length / entriesPerPage) }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AddBookCard;