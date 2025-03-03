
  
  
  export const getCollegeData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getAllColleges", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch College Data.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error in College Data:", error.message);
      throw error;
    }
  };
  