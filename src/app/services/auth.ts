import Cookies from "js-cookie";
export const authService = {
    isUserAuthenticated: () => {
        const getUser = Cookies.get("currentUser");
        let user = getUser? JSON.parse(getUser) : null
        return user? user : null
    }
}