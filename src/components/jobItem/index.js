import {Link} from 'react-router-dom'

import './index.css'

import JobProps from '../jobProps'

const JobItem = props => {
  const {jobDetails} = props
  const {imageUrl, name, id} = jobDetails
  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-item">
        <JobProps />
        <img src={imageUrl} alt="skills" />
        <p>{name}</p>
      </div>
    </Link>
  )
}

export default JobItem
