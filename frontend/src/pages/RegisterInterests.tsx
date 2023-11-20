import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    CssBaseline,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import {Field, Form, Formik, FieldProps} from 'formik';
import {
    getAllInterestDependencies,
    registerAll,
} from "../api/interest_requests/registerInterest";
import {languages} from "../resources/languages";
import RegisterDependencyDialog from "../components/dialog/RegisterDependencyDialog";
import {INTEREST_DEPENDENCIES, InterestDependency} from "../model/interest";
import MultipleSelect from "../components/fields/MultipleSelect";
import {useCustomTheme} from "../CustomThemeContext";
import getTheme from "../theme";

interface InterestFormValues {
    name: string;
    company: string;
    lowestPrice: number;
    highestPrice: number;
    dubbedLanguages: string[];
    subtitledLanguages: string[];
    ageRating: string;
    genres: string[];
    subgenres: string[];
    platforms: string[];
}


const RegisterInterests: React.FC = () => {
    const [dropdownData, setDropdownData] = useState<{ [key: string]: any[] }>({});

    const [name, setName] = useState<string>('');

    const [companies, setCompanies] = useState<InterestDependency[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<InterestDependency | null | string>(null);

    const [lowestPrice, setLowestPrice] = useState<number | string>('');
    const [highestPrice, setHighestPrice] = useState<number | string>('');

    const [dubbedLanguages, setDubbedLanguages] = useState<InterestDependency[]>(languages);
    const [selectedDubbedLanguages, setSelectedDubbedLanguages] = useState<InterestDependency[]>([]);

    const [subtitledLanguages, setSubtitledLanguages] = useState<InterestDependency[]>(languages);
    const [selectedSubtitledLanguages, setSelectedSubtitledLanguages] = useState<InterestDependency[]>([]);


    const [ageRatings, setAgeRatings] = useState<InterestDependency[]>();
    const [selectedAgeRating, setSelectedAgeRating] = useState<InterestDependency | null | string>();

    const [genres, setGenres] = useState<InterestDependency[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<InterestDependency[]>([]);

    const [subgenres, setSubgenres] = useState<InterestDependency[]>([]);
    const [selectedSubGenres, setSelectedSubGenres] = useState<InterestDependency[]>([]);

    const [platforms, setPlatforms] = useState<InterestDependency[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<InterestDependency[]>([]);

    //let dropDownLoader = [setCompany, setDubbedLanguages];

    const loadDropdowns = async () => {
        try {
            let data = await getAllInterestDependencies();
            setCompanies(data.companies);
            setAgeRatings(data.ageRatings);
            setGenres(data.genres);
            setSubgenres(data.subGenres);
            setPlatforms(data.platforms);

        } catch (error) {
            console.error('Error loading dropdowns:', error);
        }
    };

    useEffect(() => {
        loadDropdowns();
    }, []);

    const initialValues: InterestFormValues = {
        name: '',
        company: '',
        lowestPrice: 0,
        highestPrice: 0,
        dubbedLanguages: [],
        subtitledLanguages: [],
        ageRating: '',
        genres: [],
        subgenres: [],
        platforms: [],
    };

    const handleFormSubmit = async (values: InterestFormValues) => {
        try {
            console.log(values);
            await registerAll('interest', values);
            // Handle success, e.g., redirect or show a success message
        } catch (error) {
            console.error('Error registering interest:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Cadastrar Interesses
                </Typography>
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Field name="name">
                                    {({field}: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Nome do jogo..."
                                        />
                                    )}
                                </Field>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container flexDirection={'row'} spacing={3}>
                                    <Grid item md={10}>
                                        <Field name="company">
                                            {({field}: FieldProps) => (
                                                <FormControl fullWidth variant="outlined" required>
                                                    <InputLabel htmlFor="company">Empresas:</InputLabel>
                                                    <Select
                                                        {...field}
                                                        label="Empresas"
                                                        value={selectedCompany}
                                                        onChange={(e, child) => {
                                                            setSelectedCompany(e.target.value);
                                                        }}
                                                    >
                                                        {companies?.map((item) => (
                                                            <MenuItem value={Number(item.id)}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item md={2} alignItems={'center'}>
                                        <RegisterDependencyDialog
                                            type={INTEREST_DEPENDENCIES.COMPANY}
                                            dialogTitle={'Nova Empresa'}
                                            buttonText={''}
                                            label={'Nome da Empresa'}
                                            onDependencyRegistered={loadDropdowns}
                                            setDependency={setCompanies}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="lowestPrice">
                                    {({field}: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            label="Menor preço"
                                            inputProps={{min: 0, step: 0.01}}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="highestPrice">
                                    {({field}: FieldProps) => (
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            label="Maior preço"
                                            inputProps={{min: 0, step: 0.01}}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            <MultipleSelect
                                fieldName={'dubbingLanguages'}
                                label={'Dublado'}
                                placeholder={'Selecione as linguagens dubladas:'}
                                options={dubbedLanguages}
                                selectedOptions={selectedDubbedLanguages}
                                setSelectedOptions={setSelectedDubbedLanguages}
                            />


                            <MultipleSelect
                                fieldName={'subtitledLanguages'}
                                label={'Legendado'}
                                placeholder={'Selecione as linguagens legendadas:'}
                                options={subtitledLanguages}
                                selectedOptions={selectedSubtitledLanguages}
                                setSelectedOptions={setSelectedSubtitledLanguages}
                            />


                            <Grid item xs={12}>
                                <Field name="ageRating">
                                    {({field}: FieldProps) => (
                                        <FormControl fullWidth variant="outlined" required>
                                            <InputLabel htmlFor="ageRating">Classificação Indicativa:</InputLabel>
                                            <Select
                                                {...field}
                                                label="Classificação Indicativa"
                                                value={selectedAgeRating}
                                                onChange={(e, child) => {
                                                    setSelectedAgeRating(e.target.value);
                                                }}
                                            >
                                                {ageRatings?.map((item) => (
                                                    <MenuItem value={Number(item.id)}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container flexDirection={'row'} spacing={3}>
                                    <Grid item md={10}>
                                        <MultipleSelect
                                            fieldName={'genres'}
                                            label={'Generos'}
                                            placeholder={'Selecione os generos:'}
                                            options={genres}
                                            selectedOptions={selectedGenres}
                                            setSelectedOptions={setSelectedGenres}
                                        />
                                    </Grid>
                                    <Grid item md={2} alignItems={'center'}>
                                        <RegisterDependencyDialog
                                            type={INTEREST_DEPENDENCIES.GENRE}
                                            dialogTitle={'Novo Gênero'}
                                            buttonText={''}
                                            label={'Nome do Gênero'}
                                            onDependencyRegistered={loadDropdowns}
                                            setDependency={setGenres}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container flexDirection={'row'} spacing={3}>
                                    <Grid item md={10}>
                                        <MultipleSelect
                                            fieldName={'subGenres'}
                                            label={'Sub Generos'}
                                            placeholder={'Selecione os sub generos:'}
                                            options={subgenres}
                                            selectedOptions={selectedSubGenres}
                                            setSelectedOptions={setSelectedSubGenres}
                                        />
                                    </Grid>
                                    <Grid item md={2} alignItems={'center'}>
                                        <RegisterDependencyDialog
                                            type={INTEREST_DEPENDENCIES.SUBGENRE}
                                            dialogTitle={'Novo Sub Gênero'}
                                            buttonText={''}
                                            label={'Nome do Sub Gênero'}
                                            onDependencyRegistered={loadDropdowns}
                                            setDependency={setSubgenres}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container flexDirection={'row'} spacing={3}>
                                    <Grid item md={10}>

                                        <MultipleSelect
                                            fieldName={'platforms'}
                                            label={'Plataforma'}
                                            placeholder={'Selecione as plataformas:'}
                                            options={platforms}
                                            selectedOptions={selectedPlatforms}
                                            setSelectedOptions={setSelectedPlatforms}
                                        />
                                    </Grid>
                                    <Grid item md={2} alignItems={'center'}>
                                        <RegisterDependencyDialog
                                            type={INTEREST_DEPENDENCIES.PLATFORM}
                                            dialogTitle={'Nova Plataforma'}
                                            buttonText={''}
                                            label={'Nome da Plataforma'}
                                            onDependencyRegistered={loadDropdowns}
                                            setDependency={setPlatforms}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary">
                                    ENVIAR
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Container>
    );
};

export default RegisterInterests;
