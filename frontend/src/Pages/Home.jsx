import CreateRoom from "../Components/CreateRoom.jsx";
import Logo from "../assets/logo.svg";
import Clock from "../Components/Clock.jsx";
import ProfileInfo from "../Cards/ProfileInfo.jsx";
import uiImage from "../assets/uielementLink.svg";


const Home = () => {
    const userInfo = {
        fullName : "Anup"
    }
    return (
        <div>
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-8 py-4">
                    <div className="flex items-center space-x-3">
                        <img src={Logo} alt="logo" className="h-10 w-10"/>
                        <h1 className="font-semibold text-xl text-gray-600 mb-3">Meet</h1>
                    </div>
                    <div className="flex items-end">
                        <Clock/>
                        <div className="ml-2">
                            <ProfileInfo userInfo={userInfo}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col mt-20">
                    <div className="ml-14">
                        <p className="text-4xl font-normal mb-2">
                            Video call and meetings
                        </p>
                        <p className="text-4xl font-normal mb-5">
                            for everyone.
                        </p>
                    </div>
                    <div className="ml-8">
                        <p className="text-xl font-normal px-6 text-gray-600">
                            Connect, collaborate and celebrate from anywhere with
                        </p>
                        <p className="text-xl font-normal px-6 text-gray-600">
                            Meet
                        </p>
                    </div>
                    <CreateRoom/>
                </div>
                <div className="flex flex-col mt-12">
                    <img src={uiImage} alt="get a link you share"
                         className="h-60 w-60 ml-56"/>
                    <div className="flex flex-col items-center">
                        <h1 className="ml-40 text-2xl text-gray-600 mt-8">
                            Get a link that you can share
                        </h1>
                        <p className="items-center ml-40">
                            Click <strong>New Meeting</strong> to get a link that you can send
                            to
                        </p>
                        <p className="items-center ml-40">
                            people that you want to meet with
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Home;