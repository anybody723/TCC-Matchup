// routes
// theme
// components
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ThemeSettings from "./components/settings";
import ThemeProvider from "./theme";
import Router from "./routes";
import {closeSnackBar, FetchProfilePicture, FetchUserProfile} from "./redux/slices/app";
import {socket} from "./socket";
import {func} from "prop-types";
import {rootReducer} from "./redux/rootReducer";

const vertical = "bottom";
const horizontal = "center";

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function App() {
    const dispatch = useDispatch();
    const { user, profilePicture } = useSelector((state) => state.app);

    async function fetch (){
        await dispatch(FetchUserProfile());
        await dispatch(FetchProfilePicture(user?.id, 800, 800));
    }
    useEffect(() => {
        fetch();
    }, []);

    const {severity, message, open} = useSelector(
        (state) => state.app.snackbar
    );

    return (
        <>
            <ThemeProvider>
                <ThemeSettings>
                    {" "}
                    <Router/>{" "}
                </ThemeSettings>
            </ThemeProvider>

            {message && open ? (
                <Snackbar
                    anchorOrigin={{vertical, horizontal}}
                    open={open}
                    autoHideDuration={4000}
                    key={vertical + horizontal}
                    onClose={() => {
                        console.log("This is clicked");
                        dispatch(closeSnackBar());
                    }}
                >
                    <Alert
                        onClose={() => {
                            console.log("This is clicked");
                            dispatch(closeSnackBar());
                        }}
                        severity={severity}
                        sx={{width: "100%"}}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            ) : (
                <></>
            )}
        </>
    );
}

export default App;
