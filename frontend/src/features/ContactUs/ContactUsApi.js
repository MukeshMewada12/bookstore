
export const createContactUs = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/createContactUs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create contact.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createContactUs:", error.message);
    throw error;
  }
};


export const getContactUs = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/getAllContactUs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch contacts.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getContactUs:", error.message);
    throw error;
  }
};
