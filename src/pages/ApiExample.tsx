import { useState } from "react";
import Navbar from "../components/NavBar";
import { toast } from "react-toastify";

const ApiExamplePage: React.FC = () => {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedReact, setCopiedReact] = useState(false);

  const curlCode = `curl --location --globoff 'http://localhost:3000/api/restCountry/getConuntry?countryName={country}' \\
  --header 'x-api-key: {your-api-key}'`;

  const reactCode = `fetch('http://localhost:3000/api/restCountry/getConuntry?countryName={country}', {
    method: 'GET',
    headers: {
      'x-api-key': '{your-api-key}',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));`;

  const handleCopy = (
    code: string,
    message: string,
    setCopied: (v: boolean) => void
  ) => {
    navigator.clipboard.writeText(code);
    toast.info(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-3">API Example: Get Country Info</h2>

        <div className="mb-4">
          <p>
            <strong>Instructions:</strong>
          </p>
          <ul>
            <li>
              Replace <code>{"{country}"}</code> with the name of the country
              you want info on.
            </li>
            <li>
              Replace <code>{"{your-api-key}"}</code> with your valid API key.
            </li>
            <li>Use the examples below in your terminal or frontend app.</li>
          </ul>
        </div>

        <div className="mb-4">
          <label className="mb-2">
            <strong>Example cURL Command:</strong>
          </label>
          <div className="position-relative">
            <pre
              className="bg-dark text-white p-3 rounded"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {curlCode}
            </pre>
            <button
              onClick={() =>
                handleCopy(
                  curlCode,
                  "cURL command copied to clipboard.",
                  setCopiedCurl
                )
              }
              className="btn btn-sm btn-outline-light position-absolute"
              style={{ top: 10, right: 10 }}
            >
              {copiedCurl ? (
                <i className="bi bi-clipboard-check-fill"></i>
              ) : (
                <i className="bi bi-clipboard"></i>
              )}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2">
            <strong>React (fetch) Example:</strong>
          </label>
          <div className="position-relative">
            <pre
              className="bg-dark text-white p-3 rounded"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {reactCode}
            </pre>
            <button
              onClick={() =>
                handleCopy(
                  reactCode,
                  "React example copied to clipboard.",
                  setCopiedReact
                )
              }
              className="btn btn-sm btn-outline-light position-absolute"
              style={{ top: 10, right: 10 }}
            >
              {copiedReact ? (
                <i className="bi bi-clipboard-check-fill"></i>
              ) : (
                <i className="bi bi-clipboard"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiExamplePage;
