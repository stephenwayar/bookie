import axios, { AxiosInstance } from "axios";
import { User, UserKey } from "@/redux/types/user.types";
import { getCookieItem } from "@/helpers/functions/cookie";

const http: AxiosInstance = axios.create({
  withCredentials: true,
});

const httpNoAuth: AxiosInstance = axios.create({
  withCredentials: false,
});

// Adding an interceptor to the HTTP client to handle requests.
http.interceptors.request.use(async config => {
  if (typeof document !== 'undefined') {
    // Client request: retrieve the user information from the cookies.
    const user: User = getCookieItem(UserKey.BOOKIE_USER);
    // Extract the JWT token from the user data.
    const jwt = user?.access_token;
    // Construct the authorization token if JWT is present.
    const AUTH_TOKEN = jwt ? `bearer ${jwt}` : null;

    // If AUTH_TOKEN exists, add it to the request headers.
    if (AUTH_TOKEN) {
      config.headers['Authorization'] = AUTH_TOKEN;
    }
  } else {
    // Server request
    console.log('Request running on server. Authorisation credentials are missing')
  }

  // Return the request to proceed.
  return config
})

export { httpNoAuth, http };