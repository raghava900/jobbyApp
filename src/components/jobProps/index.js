import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const JobProps = props => {
  const {jobDetails} = props
  const {
    title,
    location,
    employmentType,
    companyLogoUrl,
    packagePerAnnum,
    rating,
    jobDescription,
  } = jobDetails

  return (
    <div className="job-22">
      <div className="job-1">
        <img src={companyLogoUrl} alt={title} className="icon" />
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
      <p className="job-rating">{jobDescription}</p>
    </div>
  )
}

export default JobProps
