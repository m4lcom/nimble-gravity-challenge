import { useState } from "react";

const JobCard = ({ job, candidate, onAply }) => {
  const [repoUrl, setRepoUrl] = useState(" ");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl.includes("github.com")) {
      alert("Please enter a valid GitHub repository URL.");
      return;
    }

    setStatus("loading");
    try {
      const payload = {
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl,
      };
      const result = await onAply(payload);
      if (result.ok) {
        setStatus("success");
        setRepoUrl(" ");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-4">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">{job.title}</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            placeholder="https://github.com/user/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer
              ${
                status === "success"
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300"
              }`}
          >
            {status === "loading"
              ? "Sending..."
              : status === "success"
                ? "Applied!"
                : "Submit"}
          </button>
        </div>
      </form>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 font-medium">
          Something went wrong. Please try again.
        </p>
      )}
      {status === "success" && (
        <p className="mt-3 text-sm text-green-600 font-medium">
          Application received!
        </p>
      )}
    </div>
  );
};

export default JobCard;
