import './index.css'
import Header from '../header'

const notFound = () => (
  <div className="job-container">
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="pic12"
    />
    <h1 className="not-heading">Page Not Found</h1>
    <p className="not-sub-heading">
      Were sorry, the page you requested could not be found
    </p>
  </div>
)

export default notFound
