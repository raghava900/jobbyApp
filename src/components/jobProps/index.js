import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcase} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobProps = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    location,
    employmentType,
    companyLogoUrl,
    packagePerAnnum,
    rating,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-22">
        <div className="job-1">
          <img src={companyLogoUrl} alt="company logo" className="icon" />
          <div>
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              <AiFillStar className="star" />
              {rating}
            </p>
          </div>
        </div>
        <div className="job-44">
          <div className="job-33">
            <p className="job-title">
              <ImLocation />
              {location}
            </p>
            <p className="job-title">
              {' '}
              <BsBriefcase /> {employmentType}
            </p>
          </div>
          <p className="job-title">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="job-title">Description</h1>
        <p className="job-rating">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobProps
