import './index.css'

const ProfileBio = props => {
  const {product} = props
  const {profile_image_url: profileImgUrl, name, short_bio: shortBio} = product
  return (
    <div className="pro-1">
      <img src={profileImgUrl} alt="profile" />
      <h1 className="profile-heading">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}

export default ProfileBio
