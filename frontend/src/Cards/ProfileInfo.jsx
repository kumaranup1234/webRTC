import { getInitials } from "../utils/helper.js";


const ProfileInfo = ({ userInfo}) => {
    if (!userInfo){
        return null;
    }

    return <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 mb-1 ml-4">
            {getInitials(userInfo?.fullName)}
        </div>

        <div>
            {/* <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                Logout
            </button> */}
        </div>

    </div>

}

export default ProfileInfo