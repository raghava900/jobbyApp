import './index.css'

const ProfileBio = props => {
  const {product} = props
  const {profileNameUrl, name, shortBio} = product
  return (
    <div className="pro-1">
      <img src={profileNameUrl} alt={name} />
      <h1 className="profile-heading">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}

export default ProfileBio
