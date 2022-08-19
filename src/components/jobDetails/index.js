import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobDetails = props => {
  const {job} = props
  const {
    company_logo_url: companyLogoUrl,
    company_website_url: companyWebsiteUrl,
    employment_type: employmentType,
    job_description: jobDescription,
    location,
    rating,
    package_per_annum: packagePerAnnum,
    life_at_company: lifeAtCompany,
    title,
    skills,
  } = job.job_details
  const {similar_jobs: similarJobs} = job
  const {description, image_url: imageUrl} = lifeAtCompany

  return (
    <div className="details1">
      <div className="details">
        <div className="job-223">
          <div className="job-1">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="icon"
            />
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
          <div className="job-item-details">
            <h1 className="job-title">Description</h1>
            <a className="job-title" href={companyWebsiteUrl}>
              Visit
            </a>
          </div>
          <p className="job-rating">{jobDescription}</p>
          <h1 className="job-title-1">Skills</h1>
          <div>
            <ul className="life-at">
              {skills &&
                skills.map(item => (
                  <>
                    {' '}
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="pp-1"
                    />
                    <p className="job-title">{item.name}</p>
                  </>
                ))}
            </ul>
          </div>

          <h1 className="job-title-1">Life at Company</h1>
          <div className="life-at">
            <p className="job-title">{description}</p>
            <img src={imageUrl} alt="life at company" className="pp" />
          </div>
        </div>{' '}
        <h1 className="job-title-1">Similar Jobs</h1>
        <div className="row">
          <ul>
            <li>
              {similarJobs &&
                similarJobs.map(item => (
                  <div className="job-224">
                    <div className="life-at">
                      <img
                        src={item.company_logo_url}
                        alt="similar job company logo"
                        className="pp-1"
                      />
                      <div>
                        <h1 className="job-title">{item.title}</h1>
                        <p className="job-rating">
                          <AiFillStar className="star" />
                          {item.rating}
                        </p>
                      </div>
                    </div>
                    <h1 className="job-title">Description</h1>
                    <p className="job-title">{item.job_description}</p>
                    <div className="life-at">
                      <p className="job-title">
                        <ImLocation />
                        {item.location}
                      </p>
                      <p className="job-title">
                        {' '}
                        <BsBriefcase /> {item.employment_type}
                      </p>
                    </div>
                  </div>
                ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JobDetails
