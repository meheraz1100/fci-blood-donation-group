import useAuth from "../../Hooks/useAuth";

const Profile = () => {

    const { user } = useAuth();

    return (
        <div className="text-center dark:text-white">
            <h1 className="text-3xl font-bold my-4">Name: {user?.displayName}</h1>
            <h1>{user?.email}</h1>
            <h1 className="text-xl my-4">Last Sign In : {user?.metadata?.lastSignInTime}</h1>
        </div>
    );
};

export default Profile;