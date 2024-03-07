import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/route"
export default async function page(){
    const session=await getServerSession(authOptions)
    console.log(session)
    console.log("Yash was here");
    return(
        <div>
            
            {session.user.username}
        </div>
    )
}