
export const registerUserApi = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed.");
    }

    return await response.json();  
  } catch (error) {
    console.error("Error in registerUserApi:", error.message);
    throw error;
  }
};
