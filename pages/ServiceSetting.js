import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Container from '@mui/material/Container';

//
import BookingAvailability from '../components/BookingAvailability';
import useLocalStorage from '../hooks/useLocalStorage';
import InputLabel from '@mui/material/InputLabel';
import { useGlobalContext } from '../context/global';
import { styled } from '@mui/material/styles';
// import BookingAvailability from '../components/BookingAvailability';
import {useEffect} from 'react';
import { Message } from '@mui/icons-material';


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


export default function ServiceSetting() {
  const { setCheckInOptions, setCheckInRestriction, setCheckInAndOutRestriction, setDailyCheckInRestriction, setDailyCheckInAndOutRestriction, setCalendarRestriction, bookingStart, bookingEnd, setMessage, validbookstart, validbookend, selected, setSelected, checkInOptions }  = useGlobalContext();
  const [weekday, setWeekday] = React.useState([]);

  const [serviceFee, setServiceFee] = React.useState('');
  const handleChangeServiceFee = (event) => {
    setServiceFee(event.target.value);
    setCheckInOptions(event.target.value);

    var content=(event.target.value);
    content !== null ? setChecked(true) : setChecked(false);
    // alert(content);
    // (content.toString() == "Require no check in") ? setChecked(true): setChecked(false);
    // // (event.target.value == "Require no check in") || (event.target.value == "Require check in") || (event.target.value == "Require check in and out") ? setChecked(false) : setChecked(true);
    // setChecked(true) ? alert("true") : null;
  };

  const handleWeekday = (event, newWeekday) => {
    setWeekday(newWeekday);
    setCalendarRestriction(newWeekday);
    if (newWeekday.length !== 0)  { 
      setSelected(true)
      // if (validbookstart && validbookend == true) {
      //   setSelected(true)
      // } else {
      //   null
      // }}
    }
     else { setSelected(false)}

  };


  const [checkIn, setCheckIn] = React.useState(false);

  const handleChangeCheckIn = (event) => {
    setCheckIn(event.target.checked);
    setCheckInRestriction(event.target.checked)
    
  };

  const [checkInAndOut, setCheckInAndOut] = React.useState(false);

  const handleChangeCheckInAndOut = (event) => {
    setCheckInAndOut(event.target.checked);
    setCheckInAndOutRestriction(event.target.checked);
  };



  const [latestBookingScheduleCheckIn, setLatestBookingScheduleCheckIn] = React.useState();
  const handleChangeLatestBookingScheduleCheckIn = (event) => {
    setLatestBookingScheduleCheckIn(event.target.value);
    setDailyCheckInRestriction(event.target.value);
    !(event.target.value) ? setValidcheckin(false) : setValidcheckin(true);
  };

  const [latestBookingScheduleCheckInAndOut, setLatestBookingScheduleCheckInAndOut] = React.useState();
  const handleChangeLatestBookingScheduleCheckInAndOut = (event) => {
    setLatestBookingScheduleCheckInAndOut(event.target.value);
    setDailyCheckInAndOutRestriction(event.target.value);
    !(event.target.value) ? setValidcheckinout(false) : setValidcheckinout(true);
  };

  const [checked, setChecked] = React.useState(false);
  const [validcheckin, setValidcheckin] = React.useState(false);
  const [validcheckinout, setValidcheckinout] = React.useState(false);
  return (

    <React.Fragment>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
          <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 3, mt: 2, fontWeight: 'bold' }} gutterBottom>Service schedule </Typography>
          <Typography component="subtitle1" variant="subtitle1" sx={{ color: '#6F8191', ml: 3, mt: -1 }} gutterBottom>Set days when the service will be able</Typography>
          <Box>
            <StyledToggleButtonGroup
              value={weekday}
              onChange={handleWeekday}
              selected={selected}
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
          {/* {selected === true ? alert("true") : alert("false")} */}
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
                {/* {checked === true ? alert("true") : alert("false")} */}
                <FormControl sx={{ my: 3, minWidth: 250, display: 'inline' }} fullwidth>
                  {/* <InputLabel id="demo-simple-select-autowidth-label">Select time</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth-label"
                    value={latestBookingScheduleCheckIn}
                    onChange={handleChangeLatestBookingScheduleCheckIn}

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
            {
              (selected && validbookstart && validbookend && checked) ? (checkInOptions === "Require check in") 
              ? (validcheckin) ? setMessage(false) : setMessage(true) : (checkInOptions === "Require check in and out") 
              ? (validcheckinout) ? setMessage(false) : setMessage(true) : setMessage(false) : setMessage(true)

            }
      
              
              
          </RadioGroup>
        </FormControl>


      </Paper>

    </React.Fragment>

  );
}


