import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getFollowings } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"
import { Link } from "react-router-dom"

export const Followings = () => {
  const [followings, setFollowings] = useState<IUser[]>([])

  useEffect(() => {
    getFollowings()
      .then(res => {
        setFollowings(res.payload as IUser[])
      })
  }, [followings])

  return <div className="content">
    <div className="row">
      <h2>Followings</h2>
      {followings.map(user => (
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