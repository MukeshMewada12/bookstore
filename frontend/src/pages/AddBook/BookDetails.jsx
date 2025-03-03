import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = () => {
    const { id } = useParams(); // Get book ID from URL
    const navigate = useNavigate();

    // Fetch book details based on ID (replace with actual API call)
    const book = {
        id: id,
        universityName: `University ${id}`,
        collegeName: `College ${id}`,
        city: `City ${id}`,
        year: `202${id % 10}`,
        photo: `https://via.placeholder.com/300`, // Larger placeholder image
        description: `This is the detailed description of College ${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={book.photo} className="img-fluid rounded-start" alt={book.collegeName} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{book.collegeName}</h5>
                            <p className="card-text">
                                <strong>University:</strong> {book.universityName}<br />
                                <strong>City:</strong> {book.city}<br />
                                <strong>Year:</strong> {book.year}
                            </p>
                            <p className="card-text">{book.description}</p>
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => alert(`Added ${book.collegeName} to cart`)}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => alert(`Purchased ${book.collegeName}`)}
                            >
                                Purchase
                            </button>
                            <button
                                className="btn btn-secondary mt-3"
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