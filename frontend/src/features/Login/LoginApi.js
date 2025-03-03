export const loginUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),  
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed.");
    }

    const data = await response.json();  
    return data;
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw error;
  }
};
export const logoutUserApi = async (userId) => {
  try {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),  
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed.");
    }

    const result = await response.json();  
    return result;
  } catch (error) {
    console.error("Error in logoutUserApi:", error.message);
    throw error;
  }
};
