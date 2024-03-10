import Cookies from "js-cookie";
export const authService = {
    isUserAuthenticated: () => {
        const getUser = Cookies.get("currentUser");
        let user = getUser? JSON.parse(getUser) : null
        console.log(user, typeof(user))
        return user? user : null
    }
}