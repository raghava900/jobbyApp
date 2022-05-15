import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {itemDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    id,
    jobDescription,
    imageUrl,
    name,
    location,
    packagePerAnnum,
    rating,
  } = itemDetails
  return (
    <div className="jobItem">
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
        <h1 className="job-rating">Description</h1>
        <p className="job-rating">{jobDescription}</p>
      </div>
      )<h1 className="job-rating">Skills</h1>
      <img src={imageUrl} alt={name} />
      <h1 className="job-rating">Life at Company</h1>
    </div>
  )
}

export default JobItem
