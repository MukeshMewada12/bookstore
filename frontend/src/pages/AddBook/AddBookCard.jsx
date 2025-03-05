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
    const filteredBooks = books.filter(
        (book) =>
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
            <div className="row mb-4 g-3">
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
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {currentEntries.map((book) => (
                    <div key={book.id} className="col">
                        <div
                            className="card h-100 shadow-sm border-0"
                            onClick={() => handleCardClick(book.id)}
                            style={{
                                cursor: "pointer",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.03)";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                            }}
                        >
                            {/* Display image from the database or a placeholder */}
                            {book.bookPdf ? (
                                <img
                                    src={`http://localhost:3000/${book.bookPdf.replace(/\\/g, "/")}`}
                                    className="card-img-top"
                                    alt="Book"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            ) : (
                                <img
                                    src="https://via.placeholder.com/300"
                                    className="card-img-top"
                                    alt="Placeholder"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            )}

                            <div className="card-body">
                                <h5 className="card-title fw-bold">{book.collegeName}</h5>
                                <p className="card-text text-muted">
                                    <strong>University:</strong> {book.universityName}<br />
                                    <strong>City:</strong> {book.city}<br />
                                    <strong>Course:</strong> {book.courseName}<br />
                                    <strong>Pincode:</strong> {book.pincode}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert(`Added ${book.collegeName} to cart`);
                                    }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="btn btn-success btn-sm"
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
                ))}
            </div>

            {/* Pagination */}
            <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
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