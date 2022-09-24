import React, {Dispatch, SetStateAction} from 'react';
import {FormControl, FormHelperText, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {EventTypes} from "../../interfaces/EventDetails";
import {useSelector} from "react-redux";
import {StateSelectors} from "../../redux-modules/selectores/stateSelectores";

interface Props {
    eventType: string,
    setEventType: Dispatch<SetStateAction<string>>,
    input1: string,
    setInput1: Dispatch<SetStateAction<string>>,
    input2: string,
    setInput2: Dispatch<SetStateAction<string>>,
}


const EventTypeSelector: React.FC<Props> = ({eventType, setEventType, input1, setInput1, input2, setInput2}) => {
    const {t} = useTranslation();
    const application = useSelector(StateSelectors.application);

    const [textHelper1, setTextHelper1] = React.useState("");
    const [textHelper2, setTextHelper2] = React.useState("");
    const [isDisableInput1, setIsDisableInput1] = React.useState(true);
    const [isDisableInput2, setIsDisableInput2] = React.useState(true);


    const handleCaseWedding = () => {
        setEventType(EventTypes.WEDDING);
        setTextHelper1(`* ${t('registration.event_selector.bride_name')}`);
        setTextHelper2(`* ${t('registration.event_selector.groom_name')}`);
        setIsDisableInput1(false);
        setIsDisableInput2(false);
    };


    const handleCasePrivateEvent = () => {
        setEventType(EventTypes.PRIVATE_EVENT);
        setTextHelper1(`* ${t('registration.event_selector.event_name')}`);
        setTextHelper2("");
        setInput2("");
        setIsDisableInput1(false);
        setIsDisableInput2(true);
    };

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        const selectedType = event.target.value;

        switch (selectedType) {
            case EventTypes.WEDDING:
                handleCaseWedding();
                break;
            case EventTypes.PRIVATE_EVENT:
                handleCasePrivateEvent();
                break;
            default:
                console.error("error: Undetectable type occurred")
        }
    };

    React.useEffect(() => {
        if (eventType === EventTypes.WEDDING) {
            handleCaseWedding();
        }  else if (eventType === EventTypes.PRIVATE_EVENT) {
            handleCasePrivateEvent();
        }
    }, []);

    return (
        <Grid>
            <Grid item xs={12} style={{marginBottom: "1vh"}}>
                <FormControl fullWidth sx={{minWidth: 120}}>
                    <Select
                        value={eventType}
                        onChange={(event: SelectChangeEvent) => handleChange(event)}
                        displayEmpty
                        disabled={application.isAppLoading}
                    >
                        <MenuItem value={EventTypes.WEDDING}>{t('registration.event_selector.type_wedding')}</MenuItem>

                        <MenuItem
                            value={EventTypes.PRIVATE_EVENT}>{t('registration.event_selector.private_event')}</MenuItem>
                    </Select>
                    <FormHelperText>{`* ${t('registration.event_selector.event_type')}`}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{minWidth: 120}}>
                        <TextField
                            variant="standard"
                            required
                            value={input1}
                            fullWidth
                            disabled={isDisableInput1 || application.isAppLoading}
                            id="owner_name1"
                            type="text"
                            name="owner_name1"
                            onChange={(event) => {
                                setInput1(event.target.value);
                            }}
                        />
                        <FormHelperText>{textHelper1}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{minWidth: 120}}>
                        <TextField
                            variant="standard"
                            required
                            value={input2}
                            fullWidth
                            id="owner_name2"
                            disabled={isDisableInput2 || application.isAppLoading}
                            type="text"
                            name="owner_name1"
                            onChange={(event) => {
                                setInput2(event.target.value);
                            }}
                        />
                        <FormHelperText>{textHelper2}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EventTypeSelector;
