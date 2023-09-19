import logo from '../img/logo-matchup2.png'
import * as React from "react";
import {
    AppBar,
    Box,
    Button,
    Checkbox, Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import theme from "../theme";
import {useNavigate} from "react-router-dom";
import {ROUTE_SIGN_IN, ROUTE_SIGN_UP} from "../App";
import ToggleColorModeButton from "../components/ToggleColorModeButton";



const AppBarIndex: React.FC<ToggleColorModeButtonProps> = ({ darkMode, onToggleColorModeClick }) => {
    const history = useNavigate();

    function isScrolled() {
        return window.scrollY > 2; // Defina o limite desejado
    }

    // Use o hook useScrollTrigger para detectar a rolagem
    const scrolled = useScrollTrigger({
        disableHysteresis: true, // O gatilho é ativado imediatamente quando você rola para cima
        threshold: 0, // Defina o limite de deslocamento
    });

    return (
        <AppBar
            position="fixed"
            color="default"
            elevation={0}
            sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: scrolled || isScrolled() ? '0px' : '50px', // Verifica se o usuário rolou a página
                marginTop: scrolled || isScrolled() ? '0px' : '15px', // Verifica se o usuário rolou a página
                transition: 'border-radius 0.3s ease, margin-top 0.3s ease', // Adiciona transições suaves
                bgcolor: 'background.default',
            }}
        >
            <Box

            >
                <Toolbar >
                    <Grid container spacing={3} alignContent='center'>
                        <Grid item xs textAlign="left" alignItems='left' marginTop="8px">
                            <img src={logo+''}/>
                        </Grid>
                        <Grid item xs={6} textAlign="center" margin="auto"  sx={{fontSize: '20px'}}>
                            <nav>
                                <Link
                                    variant="button"
                                    color={theme.palette.secondary.main}
                                    href="#"
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Funcionalidades
                                </Link>
                                <Link
                                    variant="button"
                                    color={theme.palette.secondary.main}
                                    href="#"
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Empresa
                                </Link>

                                <Link
                                    variant="button"
                                    color={theme.palette.secondary.main}
                                    href="#"
                                    sx={{my: 1, mx: 1.5}}
                                >
                                    Suporte
                                </Link>
                            </nav>
                        </Grid>
                        <Grid item xs textAlign="right">
                            <Box display="flex" justifyContent="flex-end">
                                <ToggleColorModeButton></ToggleColorModeButton>
                                <Button
                                    onClick={() => history(ROUTE_SIGN_UP)}
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}
                                    color="secondary"
                                >
                                    Cadastro
                                </Button>
                                <Button
                                    onClick={() => history(ROUTE_SIGN_IN)}
                                    variant="contained"
                                    sx={{ my: 1, mx: 1.5 }}
                                    color="primary"
                                >
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Box>
        </AppBar>
    )

}

export default AppBarIndex;
