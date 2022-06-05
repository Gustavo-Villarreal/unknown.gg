import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure({
    ...config,
    Auth: {
        ...config,
        cookieStorage: {
            domain: "localhost",
            path: "/",
            expires: 365,
            sameSite: "strict",
            secure: process.env.REACT_APP_AMPLIFY_COOKIE_DOMAIN !== "localhost",
        }
    }
})