import {Suspense, lazy} from "react";
import {Navigate, useRoutes} from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth";

// config
import {DEFAULT_PATH} from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<LoadingScreen/>}>
            <Component {...props} />
        </Suspense>
    );
};

export const ROUTE_PROFILE_RESEARCH = "/busca_de_usuários";

export const ROUTE_MY_PROFILE = "/meu-perfil";

export const ROUTE_PROFILE = "/perfil";

export const ROUTE_PAGE_NOT_FOUND = "/404";

export const ROUTE_REGISTER_INTERESTS = "cadastro_de_interesses";

export const ROUTE_INTERESTS = "/interesses";

export const ROUTE_LOGIN = "login";

export const ROUTE_INDEX = "introdução";

export const ROUTE_CHAT = "/chat";


export default function Router() {
    return useRoutes([
        {
            path: "/auth",
            element: <AuthLayout/>,
            children: [
                {path: ROUTE_LOGIN, element: <LoginPage/>},
                {path: "register", element: <RegisterPage/>},
                {path: "cadastro", element: <SignUp/>},
                {path: "reset-password", element: <ResetPasswordPage/>},
                {path: "new-password", element: <NewPasswordPage/>},
                {path: "verify", element: <VerifyPage/>},
            ],
        },
        {
            path: "/",
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to={DEFAULT_PATH} replace/>, index: true},
                {path: "index", element: <AppIndex/>},
                {path: "/app", element: <ProfileSearch/>},
                {path: "/chat", element: <GeneralApp/>},
                {path: "group", element: <Group/>},
                {path: "settings", element: <Settings/>},
                {path: "conversation", element: <Conversation/>},
                {path: "chats", element: <Chats/>},
                {path: "contact", element: <Contact/>},
                {path: ROUTE_MY_PROFILE, element: <MyProfile/>},
                {path: ROUTE_PROFILE_RESEARCH, element: <ProfileSearch/>},
                {path: `${ROUTE_PROFILE}/:usernamePathVariable`, element: <Profile/>},
                {path: "old-profile", element: <GeneralInfo/>},
                {path: ROUTE_REGISTER_INTERESTS, element: <RegisterInterest/>},
                {path: `${ROUTE_INTERESTS}/:usernamePathVariable`, element: <InterestManagement/>},

                {path: "call", element: <CallPage/>},

                {path: ROUTE_PAGE_NOT_FOUND, element: <Page404/>},
                {path: "*", element: <Navigate to="/404" replace/>},
            ],
        },
        {
            path: "/índice",
            children: [
                {element: <Navigate to={ROUTE_INDEX} replace/>, index: true},
                {path: ROUTE_INDEX, element: <AppIndex/>},
            ],
        },

        {path: "*", element: <Navigate to="/404" replace/>},
    ]);
}

const AppIndex = Loadable(lazy(() => import("../pages/our/AppIndex")));
const GeneralInfo = Loadable(lazy(() => import("../containers/options/GeneralInfo")));
const RegisterInterest = Loadable(lazy(() => import("../pages/our/RegisterInterests")));
const InterestManagement = Loadable(lazy(() => import("../pages/our/InterestManagement")));

const GeneralApp = Loadable(lazy(() => import("../pages/dashboard/GeneralApp")));

const Conversation = Loadable(
    lazy(() => import("../pages/dashboard/Conversation"))
);
const Chats = Loadable(lazy(() => import("../pages/dashboard/Chats")));
const Group = Loadable(lazy(() => import("../pages/dashboard/Group")));
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));
const Contact = Loadable(lazy(() => import("../sections/Dashboard/Contact")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const SignUp = Loadable(lazy(() => import("../pages/our/SignUp")));
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPasswordPage = Loadable(
    lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
    lazy(() => import("../pages/auth/NewPassword"))
);

// Settings
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const MyProfile = Loadable(
    lazy(() => import("../pages/dashboard/Settings/MyProfile"))
);
const Profile = Loadable(
    lazy(() => import("../pages/dashboard/Profile"))
);
const ProfileSearch = Loadable(
    lazy(() => import("../pages/dashboard/ProfileSearch"))
);
