import {UpdateUserPayload, User} from "../../model/user";
import axios, {AxiosResponse} from "axios";
import {setUser} from "../../pages/home/Home";

const API_BASE_URL = 'http://localhost:8080/api/';

/*interface updateUserProp{
    user: User
}*/
export const updateUserData = async (user: UpdateUserPayload): Promise<User> => {
    try {
        let response: AxiosResponse<User, any>;
        response = await axios.put<User>(`${API_BASE_URL}update/user`, user);
        return response.data;
    } catch (error) {
        setUser();
        throw error;
    }

};