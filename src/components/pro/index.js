import {Component} from 'react'
import Cookies from 'js-cookie'
import Profile from '../profile'

class Pro extends Component {
  state = {profileArray: []}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const JWT = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.profile_details.map(pink => ({
        profileImagUrl: pink.profile_image_url,
        name: pink.name,
        shortBio: pink.short_bio,
      }))
      this.setState({profileArray: updatedData})
    }
  }

  render() {
    const {profileArray} = this.state
    return (
      <div className="pro-1">
        {profileArray.map(each => (
          <Profile key={each.id} product={each} />
        ))}
      </div>
    )
  }
}

export default Pro
