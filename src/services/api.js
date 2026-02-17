const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const apiService = {
  // --- step 2 ---
  getCandidate: async (email) => {
    const response = await fetch(
      `${BASE_URL}/api/candidate/get-by-email?email=${email}`,
    );
    if (!response.ok) throw new Error("Failed to fetch candidate data");
    return await response.json();
  },
  // --- step3 ---
  getJobs: async () => {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) throw new Error("Failed to fetch job data");
    return await response.json();
  },
  // --- step 4 ---
  applyToJob: async (payload) => {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || "Failed to apply to job");
    }
    return await response.json();
  },
};
