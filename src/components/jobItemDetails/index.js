import {Component} from 'react'
import JobItem from '../jobItem'

import './index.css'

class JobItemDetails extends Component {
  state = {list: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/:${id}`
    const response = await fetch(jobDetailsApiUrl)
    const data = await response.json()
    const fetchedData = data.skills.map(pro => ({
      imageUrl: pro.image_url,
      name: pro.name,
    }))
    this.setState({list: fetchedData})
  }

  render() {
    const {list} = this.state
    return (
      <div className="job-container">
        {list.map(each => (
          <JobItem key={each.id} jobDetails={each} />
        ))}
      </div>
    )
  }
}

export default JobItemDetails
