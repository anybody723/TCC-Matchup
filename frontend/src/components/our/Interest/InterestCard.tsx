import React, {useState} from 'react';
import {
    Typography,
    Button,
    Grid, Card, CardContent, Avatar, Stack, Chip,
} from '@mui/material';
import {Interest} from "../../../model/interest";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import {grey} from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import {linkInterestToUser, unlinkInterestToUser} from "../../../api/user_requests/link_interest";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {showSnackbar} from "../../../redux/slices/app";
import {FRIENDSHIP_STATUS} from "../../../model/friendship";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {PersonRemove, Remove} from "@mui/icons-material";

interface InterestCardProps {
    interest: Interest;
}

const InterestCard: React.FC<InterestCardProps> = ({interest}) => {
    const theme = useTheme();
    const [isExpanded, setExpanded] = useState(false);
    const {token} = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
    };

    const handleAddInterest = async () => {
        await linkInterestToUser(token, interest.id);
        // @ts-ignore
        dispatch(showSnackbar({severity: 'success', message: 'Interesse adicionado!'}));
    };

    const handleRemoveInterest = async () => {
        await unlinkInterestToUser(token, interest.id);
        // @ts-ignore
        dispatch(showSnackbar({severity: 'success', message: 'Interesse removido!'}));
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{minHeight: isExpanded ? '250px' : '200px'}}
            >
                <img
                    src={interest.formattedImages[0]}
                    alt={interest.name+".png"}
                    //sx={{height: 128, width: 128}}
                />
                <CardHeader
                    title={interest.name}
                    subheader={interest.company?.name}
                    titleTypographyProps={{align: 'center'}}
                    subheaderTypographyProps={{align: 'center'}}

                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        backgroundColor: (theme) => grey[900],
                        mb:"5px"
                    }}
                />
                {isExpanded && (
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Description: {interest.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lowest Price: ${interest.lowestPrice}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Highest Price: ${interest.highestPrice}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Age Rating: {interest.ageRating?.name}
                        </Typography>
                        {/*/*
                        #0162c4
                        #fda92d
                        #1ccaff
                        #ff3030
                        */}
                        <Typography variant="body2" color="text.secondary">
                            Gêneros:
                        </Typography>
                        <Stack style={{display: 'flex', overflowX: 'auto'}}>
                            {interest && interest.genres.length != 0
                                && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                    {interest.genres.map((genre, index) => (
                                        <Chip key={index} label={genre.name+""} style={{margin: 0}} sx={{backgroundColor: "#7635dc"}}/>
                                    ))}
                                </Stack>)
                            }
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            Subgêneros:
                        </Typography>
                        {interest && interest.genres.length != 0
                            && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                {interest.subGenres.map((subGenre, index) => (
                                    <Chip key={index} label={subGenre.name+""} style={{margin: 4}} sx={{backgroundColor: "#0162c4"}}/>
                                ))}
                            </Stack>)
                        }
                        <Typography variant="body2" color="text.secondary">
                            Plataformas:
                        </Typography>
                        {interest && interest.genres.length != 0
                            && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                {interest.platforms.map((platform, index) => (
                                    <Chip key={index} label={platform.name+""} style={{margin: 4}} sx={{backgroundColor: "#fda92d"}}/>
                                ))}
                            </Stack>)
                        }
                        <Typography variant="body2" color="text.secondary">
                            Dublado:
                        </Typography>
                        {interest && interest.genres.length != 0
                            && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                {interest.dubbingLanguages.map((dubbingLanguage, index) => (
                                    <Chip key={index} label={dubbingLanguage.id+""} style={{margin: 4}} sx={{backgroundColor: "#1ccaff"}}/>
                                ))}
                            </Stack>)
                        }
                        <Typography variant="body2" color="text.secondary">
                            Legendado:
                        </Typography>
                        {interest && interest.genres.length != 0
                            && (<Stack direction={'row'} justifyContent={"start"} spacing={5}>
                                {interest.subtitleLanguages.map((subtitleLanguage, index) => (
                                    <Chip key={index} label={subtitleLanguage.id+""} style={{margin: 4}} sx={{backgroundColor: "#ff3030"}}/>
                                ))}
                            </Stack>)
                        }
                    </CardContent>
                )}
                <CardActions>
                    <Button
                        onClick={() => {
                            interest.added ? handleRemoveInterest() : handleAddInterest();
                            interest.added = !interest.added;
                        }}
                        fullWidth
                        title={interest.added ? "Remover Interesse" : "Adicionar Interesse"}
                        startIcon={interest.added ? <Remove/> : <AddIcon/>}
                        variant="outlined"
                    >
                        {interest.added ? "Remover" : "Adicionar"}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default InterestCard;
