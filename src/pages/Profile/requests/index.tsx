import { useEffect, useState } from "react";
import { IResponse, IUserRequest } from "../../../helpers/types";
import { acceptRequest, declineRequest, getRequests } from "../../../helpers/api";
import { Link } from "react-router-dom";
import { BASE, DEF } from "../../../helpers/default";

export const Requests = () => {
    const [requests, setRequests] = useState<IUserRequest[]>([]);

    useEffect(() => {
        getRequests()
            .then((res: IResponse) => {
                if (res.status === "ok") {
                    setRequests(res.payload as IUserRequest[])
                }
            })
            .catch(err => console.error(err))
    }, [requests])

    const handleAccept = (id: number) => {
        acceptRequest(id)
        .then(res=>{
            console.log(res);
        })
    }

    const handleDecline = (id:number) => {
        declineRequest(id)
        .then(res=>{
            console.log(res);
        })
    }

    return (
        <div className="content">
            <small>Found {requests.length} request{requests.length > 1 ? "s" : ""}</small>
            <div className="row">
                {requests.map(user => (
                    <div className="col-md-3" key={user.user.id}>
                        <img
                            className="profile-pic"
                            src={user.user.picture ? BASE + user.user.picture : DEF}
                            alt={`${user.user.name} ${user.user.surname}`}
                        />
                        <p>{user.user.name} {user.user.surname}</p>
                        <Link to={'/profile/' + user.user.id}>
                            <button className="btn btn-primary btn-sm mx-1">Account</button>
                        </Link>
                        <button
                            onClick={() => handleAccept(user.id)}
                            className="btn btn-success btn-sm mx-1">
                            Accept</button>
                        <button
                            onClick={()=>handleDecline(user.id)}
                            className="btn btn-danger btn-sm mx-1">
                            Decline</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
