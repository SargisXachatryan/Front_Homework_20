import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getFollowers } from "../../../helpers/api"
import { Link } from "react-router-dom"
import { BASE, DEF } from "../../../helpers/default"

export const Followers = () => {
  const [followers, setFollowers] = useState<IUser[]>([])

  useEffect(() => {
    getFollowers()
      .then(res => {
        setFollowers(res.payload as IUser[])
      })
  }, [followers])

  return <div className="content">
    <div className="row">
      <h2>Followers</h2>
      {followers.map(user => (
        <div className="col-md-3" key={user.id}>
          <img
            className="profile-pic"
            src={user.picture ? BASE + user.picture : DEF}
            alt={`${user.name} ${user.surname}`}
          />
          <p>{user.name} {user.surname}</p>
          <Link to={'/profile/' + user.id}>
            <button className="btn btn-primary btn-sm mx-1">Account</button>
          </Link>
        </div>
      ))}
    </div>
  </div>
}
