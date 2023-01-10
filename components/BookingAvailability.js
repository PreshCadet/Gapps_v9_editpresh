import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import useLocalStorage from '../hooks/useLocalStorage';
import { useGlobalContext } from '../context/global';




const BookingAvailability = props => {
  const {bookingStart,setBookingStart,bookingEnd,setBookingEnd, setValidbookstart, setValidbookend, selected} = useGlobalContext();


  const [bookingScheduleStart, setBookingScheduleStart] = React.useState(bookingStart);
  const handleChangeBookingScheduleStart = (event) => {
    setBookingScheduleStart(event.target.value);
    setBookingStart([...bookingStart,event.target.value])
    !(event.target.value) ? setValidbookstart(false) : setValidbookstart(true)
  };

  const [bookingScheduleEnd, setBookingScheduleEnd] = React.useState(bookingEnd);
  const handleChangeBookingScheduleEnd = (event) => {
    setBookingScheduleEnd(event.target.value);
    setBookingEnd([...bookingEnd,event.target.value])
    !(event.target.value) ? setValidbookend(false) : setValidbookend(true)
  };

  const array = [];
  const timeArray = [
    '12:00 AM',
    '12:30 AM',
    '1:00 AM',
    '1:30 AM',
    '2:00 AM',
    '2:30 AM',
    '3:00 AM',
    '3:30 AM',
    '4:00 AM',
    '4:30 AM',
    '5:00 AM',
    '5:30 AM',
    '6:00 AM',
    '6:30 AM',
    '7:00 AM',
    '7:30 AM',
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM'
  ]
  for (let i = 0; i <= 47; i++) {
    // Add each number to the array
    array.push(i);
  }
  let MenuItemsStart = array.map((index) => (
    <MenuItem key={index} value={index}>{timeArray[index]}</MenuItem>))

  const subArr = array.slice(bookingScheduleStart)

  let MenuItemsEnd = subArr.map((index) => (
    <MenuItem key={index} value={index+1}>{timeArray[index]}</MenuItem>))

  return (
    <Box sx={{ mb: 1, display: 'flex', flexDirection: "row", alignItems: 'center', alignContent: 'stretch' }}>
      <Box sx={{ width: 100 }}>
        <Typography sx={{ color: 'black', ml: 3 }}>{props.day}</Typography>
      </Box>
      <FormControl sx={{ my: 2, ml: 3.5, alignItems: 'center' }}>
        <InputLabel id="demo-simple-select-label">Select time</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth-label"
          value={bookingScheduleStart}
          onChange={handleChangeBookingScheduleStart}
          label="Select time"
          sx={{ width: 150 }}
        // placeholder='Select time'
        >
          {MenuItemsStart}
        </Select>
      </FormControl>
      <Typography sx={{ color: 'black', ml: 3 }}>-</Typography>
      <FormControl sx={{ my: 2, ml: 3.5, alignItems: 'center' }}>
        <InputLabel id="demo-simple-select-label">Select time</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth-label"
          value={bookingScheduleEnd > bookingScheduleStart ? bookingScheduleEnd : null}
          onChange={handleChangeBookingScheduleEnd}
          label="Select time"
          sx={{ width: 150 }}
        >
          {MenuItemsEnd}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BookingAvailability;