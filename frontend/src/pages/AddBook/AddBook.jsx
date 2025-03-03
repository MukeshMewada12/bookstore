import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { fetchAllColleges } from "../../features/CollegeData/CollegerDataSlice";
import { submitAddBook } from "../../features/AddBook/AddBookSlice";

const AddBook = () => {
    const dispatch = useDispatch();
    const { colleges, loading: collegeLoading, error: collegeError } = useSelector((state) => state.college);
    const { loading: formLoading, success, error: formError } = useSelector((state) => state.addBook);

    const [formData, setFormData] = useState({
        city: "",
        universityName: "",
        collegeName: "",
        courseName: "",
        pincode: "",
        state: "",
        bookYear: "",
        bookCondition: "",
        bookPdf: null,
    });

    const [cities, setCities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);

    // Fetch college data on component mount
    useEffect(() => {
        dispatch(fetchAllColleges());
    }, [dispatch]);

    // Extract unique cities from college data
    useEffect(() => {
        if (colleges.length > 0) {
            const uniqueCities = [...new Set(colleges.map((college) => college.district_name))];
            setCities(uniqueCities);
        }
    }, [colleges]);

    // Handle city selection
    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setFormData({ ...formData, city: selectedCity, universityName: "", collegeName: "" });

        const universitiesInCity = colleges.filter((college) => college.district_name === selectedCity);
        const uniqueUniversities = [...new Set(universitiesInCity.map((college) => college.university_name))];
        setFilteredUniversities(uniqueUniversities);
        setFilteredColleges([]);
    };

    // Handle university selection
    const handleUniversityChange = (e) => {
        const selectedUniversity = e.target.value;
        setFormData({ ...formData, universityName: selectedUniversity, collegeName: "" });

        const collegesInUniversity = colleges.filter((college) => college.university_name === selectedUniversity);
        setFilteredColleges(collegesInUniversity);
    };

    // Handle college selection
    const handleCollegeChange = (e) => {
        const selectedCollege = e.target.value;
        const selectedCollegeData = colleges.find((college) => college.college_name === selectedCollege);
        setFormData({
            ...formData,
            collegeName: selectedCollege,
            pincode: selectedCollegeData.pincode || "",
            state: selectedCollegeData.state_name || "",
        });
    };

    // Handle other form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setFormData({ ...formData, bookPdf: file });
        } else {
            alert("Please upload a valid PDF file (max 5MB).");
            e.target.value = "";
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate pincode
        if (!/^\d{6}$/.test(formData.pincode)) {
            alert("Please enter a valid 6-digit pincode.");
            return;
        }
    
        // Create a FormData object
        const formDataToSend = new FormData();
    
        // Append all form fields to the FormData object
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        // Dispatch the submitAddBook action with the FormData object
        dispatch(submitAddBook(formDataToSend))
            .unwrap()
            .then(() => {
                alert("Book details submitted successfully!");
                setFormData({
                    city: "",
                    universityName: "",
                    collegeName: "",
                    courseName: "",
                    pincode: "",
                    state: "",
                    bookYear: "",
                    bookCondition: "",
                    bookPdf: null,
                });
            })
            .catch((error) => {
                alert(`Failed to submit book details: ${error}`);
            });
    };

    if (collegeLoading) {
        return <div className="text-center">Loading college data...</div>;
    }

    if (collegeError) {
        return <div className="text-danger">Error loading college data: {collegeError}</div>;
    }

    return (
        <div className="container-fluid vh-100 d-flex align-items-center bg-light">
            <div className="container w-100 px-5">
                <h2 className="mb-4 text-center">Add Book Details</h2>
                {formError && <div className="alert alert-danger">{formError}</div>}
                {success && <div className="alert alert-success">Book submitted successfully!</div>}
                <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
                    {/* City Dropdown */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">City</label>
                            <select
                                name="city"
                                className="form-select"
                                value={formData.city}
                                onChange={handleCityChange}
                                required
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* University Dropdown */}
                        <div className="col-md-6">
                            <label className="form-label">University Name</label>
                            <select
                                name="universityName"
                                className="form-select"
                                value={formData.universityName}
                                onChange={handleUniversityChange}
                                required
                                disabled={!formData.city}
                            >
                                <option value="">Select University</option>
                                {filteredUniversities.map((university) => (
                                    <option key={university} value={university}>
                                        {university}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* College Dropdown */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">College Name</label>
                            <select
                                name="collegeName"
                                className="form-select"
                                value={formData.collegeName}
                                onChange={handleCollegeChange}
                                required
                                disabled={!formData.universityName}
                            >
                                <option value="">Select College</option>
                                {filteredColleges.map((college) => (
                                    <option key={college.id} value={college.college_name}>
                                        {college.college_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Course Name */}
                        <div className="col-md-6">
                            <label className="form-label">Course Name</label>
                            <input
                                type="text"
                                name="courseName"
                                className="form-control"
                                value={formData.courseName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Pincode and State */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                className="form-control"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">State</label>
                            <input
                                type="text"
                                name="state"
                                className="form-control"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Book Year and Condition */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Book Year</label>
                            <input
                                type="date"
                                name="bookYear"
                                className="form-control"
                                value={formData.bookYear}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Book Condition</label>
                            <select
                                name="bookCondition"
                                className="form-select"
                                value={formData.bookCondition}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Condition</option>
                                <option value="New">New</option>
                                <option value="Good">Good</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Upload Book PDF</label>
                            <input
    type="file"
    name="bookFile"
    className="form-control"
    accept=".jpg, .jpeg, .png, .gif, .pdf"
    onChange={handleFileChange}
    required
/>

                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" disabled={formLoading}>
                            {formLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;