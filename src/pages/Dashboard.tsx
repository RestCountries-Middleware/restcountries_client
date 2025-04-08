import Navbar from "../components/NavBar";

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center "
        style={{ minHeight: "100vh", paddingTop: "40px" }}
      >
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="px-4 pb-4">
            <div className="d-flex justify-content-center pb-4">
              <img src="src/assets/favicon.png" alt="" height={80} />
            </div>

            <h2 className="text-center mb-4">
              Welcome to Your REST Countries API Dashboard
            </h2>
            <p className="text-center mb-5">
              Use your API key to query real-world data about countries from
              around the globe.
            </p>

            <hr />

            <div className="d-flex flex-column align-items-center">
              <div className="d-flex">
                <div className="col-4">
                  <h4 className="my-4"><i className="bi bi-check2-circle me-1"></i>Available Endpoint</h4>
                  <p>
                    <code>/getConuntry?countryName=</code>
                    <br />
                    Fetch information for a given country by its name.
                  </p>
                </div>

                <div className="col-4">
                  <h4 className="my-4"><i className="bi bi-database-check me-1"></i> Data You Can Retrieve</h4>
                  <ul>
                    <li>Country Name</li>
                    <li>Capital City</li>
                    <li>Languages</li>
                    <li>Currencies</li>
                    <li>Flag URL</li>
                  </ul>
                </div>

                <div className="col-4">
                  <h4 className="my-4"><i className="bi bi-key-fill me-1"></i> Authorization Required</h4>
                  <p>
                    All requests must include your API key in the header:
                    <br />
                    <code>x-api-key: {"{your-api-key}"}</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <small className="text-muted">
                You can test the API from the{" "}
                <a href="/apiexample">API Example</a> page.
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
