import { useEffect, useState } from "react";
import { apiService } from "./services/api";
import JobCard from "./components/JobCard";

function App() {
  const [jobs, setJobs] = useState([]);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const userData = await apiService.getCandidate("malcom.foca@gmail.com");
        setCandidate(userData);

        const jobList = await apiService.getJobs();
        setJobs(jobList);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-600 animate-pulse">
          Loading positions...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Nimble Gravity
          </h1>
          <p className="text-slate-600">
            Welcome,{" "}
            <span className="font-semibold text-blue-600">
              {candidate?.firstName}
            </span>
            . Select a position to apply.
          </p>
        </header>

        <section className="space-y-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              candidate={candidate}
              onApply={apiService.applyToJob}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
export default App;
