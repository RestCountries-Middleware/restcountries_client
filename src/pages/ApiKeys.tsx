import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { apiKeyService } from "../services/apiKeyService";
import { ApiKey } from "../dtos/ApiKeyDto";
import { toast } from "react-toastify";

const ApiKeysPage: React.FC = () => {
  const [apiKeyName, setApiKeyName] = useState<string>("");
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchApiKeys = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const keys = await apiKeyService.getAllByUserId(userId);
      setApiKeys(keys);
    } catch (err) {
      console.error("Error fetching API keys:", err);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleGenerate = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await apiKeyService.generateApiKey(userId, apiKeyName);
      if (res.id) {
        toast.success("API key generated successfully!");
        await fetchApiKeys();
        setApiKeyName("");
      }
    } catch (err: any) {
      console.error("Error generating API key:", err.message);
      toast.error(err.message || "API key generation failed!");
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this API key?"
    );
    if (!confirm) return;

    try {
      await apiKeyService.deleteApiKey(id);
      toast.success("API key deleted successfully!");
      await fetchApiKeys();
    } catch (err: any) {
      console.error("Error deleting API key:", err.message);
      toast.error(err.message || "API key deletion failed!");
    }
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.info('API key copied to clipboard.')
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">API Keys</h2>

        <div className="d-flex px-5 py-4">
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ minWidth: "20rem" }}>API Key</th>
                  <th style={{ minWidth: "8rem" }}>Name</th>
                  <th style={{ minWidth: "5rem" }}>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="text-muted">
                      {" "}
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={key.api_key}
                          readOnly
                          style={{ maxWidth: "300px" }}
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => {
                            handleCopy(key.api_key);
                          }}
                        >
                          {copiedKey === key.api_key ? (
                            <i className="bi bi-clipboard-check-fill"></i>
                          ) : (
                            <i className="bi bi-clipboard"></i>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="text-muted">{key.name}</td>
                    <td className="text-muted">{key.created_at}</td>
                    <td className="d-flex justify-content-end">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(key.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {apiKeys.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No API Keys available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-4 px-4">
            <div className="card px-5 py-4">
              <label>Create key</label>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="API key name"
                required
                value={apiKeyName}
                onChange={(e) => setApiKeyName(e.target.value)}
              />
              <div className="d-flex justify-content-end mt-3">
                <button className="btn custom-btn" onClick={handleGenerate}>
                  <i className="bi bi-gear-wide-connected me-1"></i>Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiKeysPage;
