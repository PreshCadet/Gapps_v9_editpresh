import * as React from 'react';
// import ServiceSetting from './ServiceSetting';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography'
import { useGlobalContext } from '../context/global';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link'
import success_logo_source from "../public/success-svgrepo-com.svg";
import question_logo_source from "../public/question.svg";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import BookingAvailability from '../components/BookingAvailability';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image'
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/router'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(1.3),
        border: "1px solid lightgray",
        width: "58px",
        fontSize: "14px",
        '&:not(:first-of-type)': {
            borderRadius: 50,
            borderLeft: "1px solid lightgray"
        },
        '&:first-of-type': {
            borderRadius: 50,
        },
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: '#559FF5'
        }
    },
}));
export default function EditServiceSetting() {
    const router = useRouter()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { checkInOptions, checkInRestriction, checkInAndOutRestriction, dailyCheckInRestriction, dailyCheckInAndOutRestriction, calendarRestriction, parkingAreaName, setCheckInOptions, setCheckInRestriction, setCheckInAndOutRestriction, setDailyCheckInRestriction, setDailyCheckInAndOutRestriction} = useGlobalContext();

    // const [weekday, setWeekday] = React.useState([]);
    const [weekday, setWeekday] = React.useState(calendarRestriction);
    const handleWeekday = (event, newWeekday) => {
        setWeekday(newWeekday);
        //   setCalendarRestriction(newWeekday)
       
        
    };


    // const [checkIn, setCheckIn] = React.useState(false);
    const [checkIn, setCheckIn] = React.useState(checkInRestriction);
    const handleChangeCheckIn = (event) => {
        setCheckIn(event.target.checked);
        //   setCheckInRestriction(event.target.checked)
    };

    // const [checkInAndOut, setCheckInAndOut] = React.useState(false);
    const [checkInAndOut, setCheckInAndOut] = React.useState(checkInAndOutRestriction);
    const handleChangeCheckInAndOut = (event) => {
        setCheckInAndOut(event.target.checked);
        //   setCheckInAndOutRestriction(event.target.checked);
    };



    // const [latestBookingScheduleCheckIn, setLatestBookingScheduleCheckIn] = React.useState();
    const [latestBookingScheduleCheckIn, setLatestBookingScheduleCheckIn] = React.useState(dailyCheckInRestriction);
    const handleChangeLatestBookingScheduleCheckIn = (event) => {
        setLatestBookingScheduleCheckIn(event.target.value);
        //   setDailyCheckInRestriction(event.target.value)
        
    };

    const [latestBookingScheduleCheckInAndOut, setLatestBookingScheduleCheckInAndOut] = React.useState(dailyCheckInAndOutRestriction);
    const handleChangeLatestBookingScheduleCheckInAndOut = (event) => {
        setLatestBookingScheduleCheckInAndOut(event.target.value);
        //   setDailyCheckInAndOutRestriction(event.target.value);
    };

    // const [serviceFee, setServiceFee] = React.useState('');
    const [serviceFee, setServiceFee] = React.useState(checkInOptions);
    const handleChangeServiceFee = (event) => {
        setServiceFee(event.target.value);
        //   setCheckInOptions(event.target.value)

    };



    async function patchServiceSetting(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    //    console.log(parkingAreaName)
    function saveUpdate() {
        const week = [1, 2, 3, 4, 5]


        if (serviceFee === "Require no check in") {
            week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (parkingAreaName.map((parkingArea, index) => (

                patchServiceSetting('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
                    {
                        "parkingArea": parkingArea,
                        "calendarRestriction": day + week,
                        "updateKey": "checkInOptions",
                        "updateValue": serviceFee
                    })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    })
            ))))))
        }
        else if (serviceFee === "Require check in") {
            week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (parkingAreaName.map((parkingArea, index) => (

                patchServiceSetting('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
                    {
                        "parkingArea": parkingArea,
                        "calendarRestriction": day + week,
                        "updateKey": "checkInOptions",
                        "updateValue": serviceFee
                    })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    }),
                patchServiceSetting('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
                    {
                        "parkingArea": parkingArea,
                        "calendarRestriction": day + week,
                        "updateKey": "checkInHealthRestriction",
                        "updateValue": checkIn
                    })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    }), patchServiceSetting('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
                        {
                            "parkingArea": parkingArea,
                            "calendarRestriction": day + week,
                            "updateKey": "dailyCheckInRestriction",
                            "updateValue": latestBookingScheduleCheckIn
                        })
                        .then((data) => {
                            console.log(data); // JSON data parsed by `data.json()` call
                        })
            ))))))
        }
        else if (serviceFee === "Require check in and out") {
            week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (parkingAreaName.map((parkingArea, index) => (

                patchServiceSetting('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
                    {
                        "parkingArea": parkingArea,
                        "calendarRestriction": day + week,
                        "updateKey": "checkInOptions",
                        "updateValue": serviceFee
                    })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    }),
                patchServiceSetting('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
                    {
                        "parkingArea": parkingArea,
                        "calendarRestriction": day + week,
                        "updateKey": "checkInAndOutHealthRestriction",
                        "updateValue": checkInAndOut
                    })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    }),
                patchServiceSetting('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
                    {
                        "parkingArea": parkingArea,
                        "calendarRestriction": day + week,
                        "updateKey": "dailyCheckInAndOutRestriction",
                        "updateValue": latestBookingScheduleCheckInAndOut
                    })
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                    })
            ))))))
        }
        setCheckInRestriction(checkIn)
        setCheckInAndOutRestriction(checkInAndOut);
        setDailyCheckInRestriction(latestBookingScheduleCheckIn)
        setDailyCheckInAndOutRestriction(latestBookingScheduleCheckInAndOut);
        setCheckInOptions(serviceFee)
        setOpenCheckedModal(false)
        setOpenModal(false)
        router.push('/parkingDashboard')
    }

    const [openModal, setOpenModal] = React.useState(false)
    function clickModal() {
        setOpenModal(true)
    }
    const handleClose = () => {
        setOpenModal(false);
    };
    const [openCheckedModal, setOpenCheckedModal] = React.useState(false)
    function proceedStatus() {
        setOpenCheckedModal(true)
    }



    console.log(checkInOptions, checkInAndOutRestriction, checkInRestriction, dailyCheckInRestriction, dailyCheckInAndOutRestriction, calendarRestriction, parkingAreaName)

    return (
        //  <React.Fragment>
        <Container component="main" maxWidth="lg" sx={{ mb: 2, ml: 11, mt: '10%' }}>
            {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ color: 'grey', fontSize: '21px' }}>Service setting</Typography>
                <Typography sx={{ ml: '1%', fontWeight: 'bold', color: 'black', fontSize: '21px' }}> &gt; </Typography>
                <Typography sx={{ ml: '1%', fontWeight: 'bold', color: 'black', fontSize: '21px' }}>Edit service details</Typography>
            </Box> */}
            <Breadcrumbs separator='>' aria-label="breadcrumb">
                <Link href='/parkingDashboard' style={{ textDecoration: 'none', color: '#6F8191', fontSize: 19 }}>
                    Service setting
                </Link>
                {/* <Link href='/parkingArea' style={{ textDecoration: 'none', color: '#6F8191', fontSize: 19 }}>
                    {parkingAreaName}
                </Link> */}
                <Typography color="text.primary" sx={{ fontSize: 19, fontWeight: 'bold' }}> Edit service details</Typography>
            </Breadcrumbs>
            <Typography sx={{ mt: '1%', fontWeight: '1000', color: 'black', fontSize: '43px' }}>Edit service details</Typography>
            <Typography sx={{ mt: '1%', color: 'black', fontSize: '21px' }}>Fill out the fields below to edit service details</Typography>
            {/* <ServiceSetting /> */}

            <Paper variant="outlined" sx={{ my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', flexDirection: "column" }}>
                    <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 3, mt: 2, fontWeight: 'bold' }} gutterBottom>Service schedule </Typography>
                    <Typography component="subtitle1" variant="subtitle1" sx={{ color: '#6F8191', ml: 3, mt: -1 }} gutterBottom>Set days when the service will be able</Typography>
                    <Box>
                        <StyledToggleButtonGroup
                            value={weekday}
                            onChange={handleWeekday}
                            aria-label="text formatting"
                            size='large'
                            sx={{ ml: 3, mt: 2 }}
                        >
                            <ToggleButton value="Monday" aria-label="monday">
                                M
                            </ToggleButton>
                            <ToggleButton value="Tuesday" aria-label="tuesday">
                                T
                            </ToggleButton>
                            <ToggleButton value="Wednesday" aria-label="wednesday">
                                W
                            </ToggleButton>
                            <ToggleButton value="Thursday" aria-label="thursday">
                                Th
                            </ToggleButton>
                            <ToggleButton value="Friday" aria-label="friday">
                                F
                            </ToggleButton>
                            <ToggleButton value="Saturday" aria-label="saturday">
                                S
                            </ToggleButton>
                            <ToggleButton value="Sunday" aria-label="sunday">
                                Su
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Box>
                </Box>
                <Box sx={{ ml: 3, mt: 2 }}>
                    {weekday.length !== 0 ? (<Typography component="b1" variant="b1" sx={{ color: 'black', display: 'block' }} gutterBottom>Set booking schedule</Typography>) : null}
                    <Box>
                        {weekday.includes("Monday") ? (<BookingAvailability day="Monday" />) : null}
                        {weekday.includes("Tuesday") ? (<BookingAvailability day="Tuesday" />) : null}
                        {weekday.includes("Wednesday") ? (<BookingAvailability day="Wednesday" />) : null}
                        {weekday.includes("Thursday") ? (<BookingAvailability day="Thursday" />) : null}
                        {weekday.includes("Friday") ? (<BookingAvailability day="Friday" />) : null}
                        {weekday.includes("Saturday") ? (<BookingAvailability day="Saturday" />) : null}
                        {weekday.includes("Sunday") ? (<BookingAvailability day="Sunday" />) : null}
                        {/* <BookingAvailability day="Monday" /> */}
                        {/* {bookingDay} */}
                    </Box>
                </Box>
            </Paper>

            <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
                <Typography sx={{ ml: 3, fontWeight: 'bold' }}>Check-in options</Typography>
                <FormControl sx={{ ml: 3, display: 'block' }}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={serviceFee}
                        onChange={handleChangeServiceFee}
                    >
                        <FormControlLabel value="Require no check in" control={<Radio />} label="No check-in needed" />


                        <FormControlLabel value="Require check in" control={<Radio />} label="Require check-in only" />
                        {serviceFee === "Require check in" ? (
                            <Paper variant="outlined" sx={{ mr: 10, my: { md: 0, lg: 0 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }}>

                                <FormControlLabel
                                    control={
                                        <Checkbox checked={checkIn} onChange={handleChangeCheckIn} name="checkin" />
                                    }
                                    label="Accomplish health declaration before check-in"
                                />
                                <Box>
                                    <Typography component="b1" variant="b1" sx={{ color: 'black' }} gutterBottom>
                                        Latest check-in time
                                    </Typography>
                                </Box>
                                <FormControl sx={{ my: 3, minWidth: 250, display: 'inline' }} fullwidth>
                                    {/* <InputLabel id="demo-simple-select-autowidth-label">Select time</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth-label"
                                        value={latestBookingScheduleCheckIn}
                                        onChange={handleChangeLatestBookingScheduleCheckIn}
                                        // label="Select time"
                                        // placeholder="Select time"

                                        sx={{ width: 150 }}
                                    >
                                        <MenuItem value={'12:00 AM'}>12:00 AM</MenuItem>
                                        <MenuItem value={'12:30 AM'}>12:30 AM</MenuItem>
                                        <MenuItem value={'1:00 AM'}>1:00 AM</MenuItem>
                                        <MenuItem value={'1:30 AM'}>1:30 AM</MenuItem>
                                        <MenuItem value={'2:00 AM'}>2:00 AM</MenuItem>
                                        <MenuItem value={'2:30 AM'}>2:30 AM</MenuItem>
                                        <MenuItem value={'3:00 AM'}>3:00 AM</MenuItem>
                                        <MenuItem value={'3:30 AM'}>3:30 AM</MenuItem>
                                        <MenuItem value={'4:00 AM'}>4:00 AM</MenuItem>
                                        <MenuItem value={'4:30 AM'}>4:30 AM</MenuItem>
                                        <MenuItem value={'5:00 AM'}>5:00 AM</MenuItem>
                                        <MenuItem value={'5:30 AM'}>5:30 AM</MenuItem>
                                        <MenuItem value={'6:00 AM'}>6:00 AM</MenuItem>
                                        <MenuItem value={'6:30 AM'}>6:30 AM</MenuItem>
                                        <MenuItem value={'7:00 AM'}>7:00 AM</MenuItem>
                                        <MenuItem value={'7:30 AM'}>7:30 AM</MenuItem>
                                        <MenuItem value={'8:00 AM'}>8:00 AM</MenuItem>
                                        <MenuItem value={'8:30 AM'}>8:30 AM</MenuItem>
                                        <MenuItem value={'9:00 AM'}>9:00 AM</MenuItem>
                                        <MenuItem value={'9:30 AM'}>9:30 AM</MenuItem>
                                        <MenuItem value={'10:00 AM'}>10:00 AM</MenuItem>
                                        <MenuItem value={'10:30 AM'}>10:30 AM</MenuItem>
                                        <MenuItem value={'11:00 AM'}>11:00 AM</MenuItem>
                                        <MenuItem value={'11:30 AM'}>11:30 AM</MenuItem>
                                        <MenuItem value={'12:00 PM'}>12:00 PM</MenuItem>
                                        <MenuItem value={'12:30 PM'}>12:30 PM</MenuItem>
                                        <MenuItem value={'1:00 PM'}>1:00 PM</MenuItem>
                                        <MenuItem value={'1:30 PM'}>1:30 PM</MenuItem>
                                        <MenuItem value={'2:00 PM'}>2:00 PM</MenuItem>
                                        <MenuItem value={'2:30 PM'}>2:30 PM</MenuItem>
                                        <MenuItem value={'3:00 PM'}>3:00 PM</MenuItem>
                                        <MenuItem value={'3:30 PM'}>3:30 PM</MenuItem>
                                        <MenuItem value={'4:00 PM'}>4:00 PM</MenuItem>
                                        <MenuItem value={'4:30 PM'}>4:30 PM</MenuItem>
                                        <MenuItem value={'5:00 PM'}>5:00 PM</MenuItem>
                                        <MenuItem value={'5:30 PM'}>5:30 PM</MenuItem>
                                        <MenuItem value={'6:00 PM'}>6:00 PM</MenuItem>
                                        <MenuItem value={'6:30 PM'}>6:30 PM</MenuItem>
                                        <MenuItem value={'7:00 PM'}>7:00 PM</MenuItem>
                                        <MenuItem value={'7:30 PM'}>7:30 PM</MenuItem>
                                        <MenuItem value={'8:00 PM'}>8:00 PM</MenuItem>
                                        <MenuItem value={'8:30 PM'}>8:30 PM</MenuItem>
                                        <MenuItem value={'9:00 PM'}>9:00 PM</MenuItem>
                                        <MenuItem value={'9:30 PM'}>9:30 PM</MenuItem>
                                        <MenuItem value={'10:00 PM'}>10:00 PM</MenuItem>
                                        <MenuItem value={'10:30 PM'}>10:30 PM</MenuItem>
                                        <MenuItem value={'11:00 PM'}>11:00 PM</MenuItem>
                                        <MenuItem value={'11:30 PM'}>11:30 PM</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                                <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'grey', display: 'block' }} gutterBottom>
                                    {latestBookingScheduleCheckIn ? `Employees must check in by ${latestBookingScheduleCheckIn}. If not checked in before this time, booking will be forfeited. ` : null}
                                </Typography>
                            </Paper>) : null}


                        <FormControlLabel value="Require check in and out" control={<Radio />} label="Require check-in and check-out" />
                        {serviceFee === "Require check in and out" ? (
                            <Paper variant="outlined" sx={{ mr: 10, my: { md: 0, lg: 0 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={checkInAndOut} onChange={handleChangeCheckInAndOut} inputProps={{ 'aria-label': 'controlled' }} name="checkInandOut" />
                                    }
                                    label="Accomplish health declaration before check-in"
                                />
                                <Box>
                                    <Typography component="b1" variant="b1" sx={{ color: 'black' }} gutterBottom>
                                        Latest check-in time
                                    </Typography>
                                </Box>
                                <FormControl sx={{ my: 3, minWidth: 250, display: 'inline' }}>
                                    {/* <InputLabel id="demo-simple-select-autowidth-label">days</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth-label"
                                        value={latestBookingScheduleCheckInAndOut}
                                        onChange={handleChangeLatestBookingScheduleCheckInAndOut}
                                        // label=""
                                        // placeholder="Select time"
                                        sx={{ width: 150 }}
                                    >
                                        <InputLabel>Select time</InputLabel>
                                        <MenuItem value={'12:00 AM'}>12:00 AM</MenuItem>
                                        <MenuItem value={'12:30 AM'}>12:30 AM</MenuItem>
                                        <MenuItem value={'1:00 AM'}>1:00 AM</MenuItem>
                                        <MenuItem value={'1:30 AM'}>1:30 AM</MenuItem>
                                        <MenuItem value={'2:00 AM'}>2:00 AM</MenuItem>
                                        <MenuItem value={'2:30 AM'}>2:30 AM</MenuItem>
                                        <MenuItem value={'3:00 AM'}>3:00 AM</MenuItem>
                                        <MenuItem value={'3:30 AM'}>3:30 AM</MenuItem>
                                        <MenuItem value={'4:00 AM'}>4:00 AM</MenuItem>
                                        <MenuItem value={'4:30 AM'}>4:30 AM</MenuItem>
                                        <MenuItem value={'5:00 AM'}>5:00 AM</MenuItem>
                                        <MenuItem value={'5:30 AM'}>5:30 AM</MenuItem>
                                        <MenuItem value={'6:00 AM'}>6:00 AM</MenuItem>
                                        <MenuItem value={'6:30 AM'}>6:30 AM</MenuItem>
                                        <MenuItem value={'7:00 AM'}>7:00 AM</MenuItem>
                                        <MenuItem value={'7:30 AM'}>7:30 AM</MenuItem>
                                        <MenuItem value={'8:00 AM'}>8:00 AM</MenuItem>
                                        <MenuItem value={'8:30 AM'}>8:30 AM</MenuItem>
                                        <MenuItem value={'9:00 AM'}>9:00 AM</MenuItem>
                                        <MenuItem value={'9:30 AM'}>9:30 AM</MenuItem>
                                        <MenuItem value={'10:00 AM'}>10:00 AM</MenuItem>
                                        <MenuItem value={'10:30 AM'}>10:30 AM</MenuItem>
                                        <MenuItem value={'11:00 AM'}>11:00 AM</MenuItem>
                                        <MenuItem value={'11:30 AM'}>11:30 AM</MenuItem>
                                        <MenuItem value={'12:00 PM'}>12:00 PM</MenuItem>
                                        <MenuItem value={'12:30 PM'}>12:30 PM</MenuItem>
                                        <MenuItem value={'1:00 PM'}>1:00 PM</MenuItem>
                                        <MenuItem value={'1:30 PM'}>1:30 PM</MenuItem>
                                        <MenuItem value={'2:00 PM'}>2:00 PM</MenuItem>
                                        <MenuItem value={'2:30 PM'}>2:30 PM</MenuItem>
                                        <MenuItem value={'3:00 PM'}>3:00 PM</MenuItem>
                                        <MenuItem value={'3:30 PM'}>3:30 PM</MenuItem>
                                        <MenuItem value={'4:00 PM'}>4:00 PM</MenuItem>
                                        <MenuItem value={'4:30 PM'}>4:30 PM</MenuItem>
                                        <MenuItem value={'5:00 PM'}>5:00 PM</MenuItem>
                                        <MenuItem value={'5:30 PM'}>5:30 PM</MenuItem>
                                        <MenuItem value={'6:00 PM'}>6:00 PM</MenuItem>
                                        <MenuItem value={'6:30 PM'}>6:30 PM</MenuItem>
                                        <MenuItem value={'7:00 PM'}>7:00 PM</MenuItem>
                                        <MenuItem value={'7:30 PM'}>7:30 PM</MenuItem>
                                        <MenuItem value={'8:00 PM'}>8:00 PM</MenuItem>
                                        <MenuItem value={'8:30 PM'}>8:30 PM</MenuItem>
                                        <MenuItem value={'9:00 PM'}>9:00 PM</MenuItem>
                                        <MenuItem value={'9:30 PM'}>9:30 PM</MenuItem>
                                        <MenuItem value={'10:00 PM'}>10:00 PM</MenuItem>
                                        <MenuItem value={'10:30 PM'}>10:30 PM</MenuItem>
                                        <MenuItem value={'11:00 PM'}>11:00 PM</MenuItem>
                                        <MenuItem value={'11:30 PM'}>11:30 PM</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                                <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'grey', display: 'block' }} gutterBottom>
                                    {latestBookingScheduleCheckInAndOut ? `Employees must check in by ${latestBookingScheduleCheckInAndOut}. If not checked in before this time, booking will be forfeited. ` : null}
                                </Typography>
                            </Paper>) : null}


                    </RadioGroup>
                </FormControl>


            </Paper>

            <Button variant="contained" onClick={clickModal} sx={{ ml: '84%', width: 180, height: 50, background: '#5BADFA' }}>Save</Button>

            {openModal ? (<Dialog
                // fullScreen
                fullScreen={fullScreen}
                open={openModal}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{ backgroundColor: '#22222279', textAlign: 'center' }}
            >
                <Box sx={{ justifyContent: 'center', mt: 5 }}>
                    <Image src={question_logo_source} alt="question_logo" width={135} height={135} />
                </Box>
                <DialogTitle id="responsive-dialog-title">

                    <div >
                        <b><p>Save changes</p></b>
                    </div>

                </DialogTitle>
                <DialogContent sx={{ pl: 5, pr: 5 }}>
                    <DialogContentText sx={{ fontSize: 18 }}>

                        <div >
                            <p>Are you sure you want to save changes made to this?</p>
                        </div>

                    </DialogContentText>
                </DialogContent>

                <div sx={{ display: "flex", direction: "row" }}>
                    <Button autoFocus variant='outlined' onClick={handleClose} sx={{ backgroundColor: '#FFF', mb: 5, width: '35%' }}>
                        Cancel, go back
                    </Button>
                    <Button autoFocus variant='contained' onClick={proceedStatus} sx={{ backgroundColor: '#5BADFA', mb: 5, ml: 2, width: '35%' }}>
                        Proceed
                    </Button>
                </div>

            </Dialog>
            ) : null}

            {openCheckedModal ? (<Dialog
                // fullScreen
                fullScreen={fullScreen}
                open={openCheckedModal}
                // onClose={sendApi}
                aria-labelledby="responsive-dialog-title"
                sx={{ backgroundColor: '#22222279', textAlign: 'center' }}
            >
                <Box sx={{ justifyContent: 'center', mt: 5 }}>
                    <Image src={success_logo_source} alt="success_logo" width={135} height={135} />
                </Box>
                <DialogTitle id="responsive-dialog-title">

                    <div>
                        <p>Changes saved!</p>
                    </div>

                </DialogTitle>
                <DialogContent sx={{ pl: 5, pr: 5, width: 500 }}>
                    <DialogContentText>

                        <div>
                            <p>Service setting details have been updated</p>
                        </div>

                    </DialogContentText>
                </DialogContent>
                <Button autoFocus variant='contained' onClick={saveUpdate} sx={{ backgroundColor: '#5BADFA', maxWidth: 200, mb: 5, ml: '33%' }}>
                    Okay, got it!
                </Button>
            </Dialog>) : null}

        </Container>
        // {/* </React.Fragment>    */}
    )
}