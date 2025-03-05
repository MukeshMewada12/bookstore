import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BookDetails = () => {
    const { id } = useParams(); // Get book ID from URL
    const navigate = useNavigate();

    // State to store book details
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch book details based on ID
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getbookbyid/${id}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch book details");
                }
                const data = await response.json();
                console.log(data.book)
                setBook(data.book);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-danger text-center">Error: {error}</p>;
    }

    if (!book) {
        return <p className="text-center">Book not found</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="row g-0">
                    {/* Image Section */}
                    <div className="col-md-5">
                        {/* Display image from the database or a placeholder */}
                        {book.bookPdf ? (
                            <img
                                src={`http://localhost:3000/${book.bookPdf.replace(/\\/g, "/")}`}
                                className="img-fluid rounded-start h-100"
                                alt={book.collegeName}
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <img
                                src="https://via.placeholder.com/600x400"
                                className="img-fluid rounded-start h-100"
                                alt="Placeholder"
                                style={{ objectFit: "cover" }}
                            />
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="col-md-7">
                        <div className="card-body p-4">
                            <h2 className="card-title fw-bold mb-3">{book.collegeName}</h2>
                            <p className="card-text text-muted mb-4">
                                <strong>University:</strong> {book.universityName}<br />
                                <strong>City:</strong> {book.city}<br />
                                <strong>Year:</strong> {book.year}<br />
                                <strong>Course:</strong> {book.courseName}<br />
                                <strong>Pincode:</strong> {book.pincode}
                            </p>
                            <p className="card-text mb-4">{book.description}</p>

                      

                            {/* Action Buttons */}
                            <div className="d-flex gap-3 mb-3">
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => alert(`Added ${book.collegeName} to cart`)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="btn btn-success btn-lg"
                                    onClick={() => alert(`Purchased ${book.collegeName}`)}
                                >
                                    Purchase
                                </button>
                            </div>

                            {/* Back Button */}
                            <button
                                className="btn btn-outline-secondary btn-lg"
                                onClick={() => navigate(-1)} // Go back to the previous page
                            >
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;