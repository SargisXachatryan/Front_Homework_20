import { useOutletContext } from "react-router-dom"
import { privacyStatus } from "../../helpers/api"
import { IContext } from "../../helpers/types"

export const Privacy = () => {
    const { account, setAccount } = useOutletContext<IContext>()
    const switchTo = () => {
        privacyStatus()
        .then(res => {
            setAccount({...account, isPrivate:res.payload as number})
        })
    }
    return <div className=" break content">
        <p>Hey {account.name}, your account is <strong>{account.isPrivate == 1 ? "private":"public"}</strong></p>
        <img
            className="icon"
            onClick={switchTo}
            src={
                account.isPrivate ?
                "https://cdn0.iconfinder.com/data/icons/zondicons/20/lock-closed-512.png"
                :
                "https://cdn0.iconfinder.com/data/icons/zondicons/20/lock-open-256.png"
            }
        
        />
       
    </div>
}