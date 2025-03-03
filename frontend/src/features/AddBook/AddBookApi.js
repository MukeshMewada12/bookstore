export const createAddBook = async (formData) => {
  try {
      const response = await fetch("http://localhost:3000/api/createaddbook", {
          method: "POST",
          body: formData, // Send FormData directly (no headers needed for FormData)
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create Add Book.");
      }
      return await response.json();
  } catch (error) {
      console.error("Error in creating Add Book:", error.message);
      throw error;
  }
};

export const getAllAddBooks = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/getalladdbook", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch Add Book Data.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetching Add Book Data:", error.message);
    throw error;
  }
};

export const updateAddBook = async (bookData) => {
  try {
    const response = await fetch("http://localhost:3000/api/updateaddbook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update Add Book.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in updating Add Book:", error.message);
    throw error;
  }
};

export const deleteAddBook = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/deleteaddbook/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Add Book.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in deleting Add Book:", error.message);
    throw error;
  }
};
