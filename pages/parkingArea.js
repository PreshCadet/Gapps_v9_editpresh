import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';

import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../context/global';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useLocalStorage from "../hooks/useLocalStorage"
import { ConstructionOutlined } from '@mui/icons-material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getWeek } from "date-fns";
import TextField from "@mui/material/TextField";
import SyncIcon from '@mui/icons-material/Sync';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


export default function ParkingArea() {
  const router = useRouter();
  const { parkingAreaFloor, parkingSlotNames, parkingAreaSlots, parkingAreaName, parkingAreaAddress } = useGlobalContext();
  const [selected, setSelected] = React.useState(false);
  const [filterActive, setFilterActive] = React.useState();
  const [error, setError] = React.useState("");
  const [valueCalendar, setValueCalendar] = React.useState(new Date());
  
  
  const weekOnCalendar = Math.ceil((valueCalendar.$D - valueCalendar.$W - 1) / 7) + 1
  

  const dateOptions = {
    weekday: "long",
  };
  const day = new Intl.DateTimeFormat("en-US", dateOptions).format(
    valueCalendar
  );

  const {
    query: { index }
  } = router
  const props = {
    index
  }

  // const indexOfParking = parkingAreaName.indexOf(props.index)

  const [indexOfParking,setIndexOfparking] = React.useState(0)
  useEffect(() => {
    const getData = () => {
      props.index ? setIndexOfparking(parkingAreaName.indexOf(props.index)) : setIndexOfparking(0)
    };
    getData();
  },[]);

  const handleChangeFilterActive = (event) => {
    setFilterActive(event.target.value);
  };




  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#6F8191',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#EDF3F8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



  function createData(slotId, slotName, status, action) {
    return { slotId, slotName, status, action };
  }



  const [lastRefreshed, setLastRefreshed] = useLocalStorage("lastRefreshed", '');

  // When the button is clicked, update the time
  function refresh() {
    const currentDate = new Date();
    setLastRefreshed(currentDate.toLocaleString());
    
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const presentDay = days[today.getDay()];
  const presentWeek =  Math.ceil((today.getDate()- today.getDay() - 1) / 7) + 1
 

  const [slotApi, setSlotApi] = React.useState()
  // const [filterSlots,setFilterSlots]= React.useState('')
  function FindSlotNumbers() {
    const options = {
      method: 'GET',
      // mode:'no-cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin':"*",
      }
    };
  
    fetch('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingareas', options)
      .then((response) => response.json())
      .then((response) => {
       {weekOnCalendar ? setSlotApi(response.ParkingAreas.filter(area => area.calendarRestriction === day+weekOnCalendar)[indexOfParking].slots) : setSlotApi(response.ParkingAreas.filter(area => area.calendarRestriction === presentDay+presentWeek)[indexOfParking].slots)}
        // setSlotApi(response.ParkingAreas.filter(area => area.calendarRestriction === day+weekOnCalendar)[indexOfParking].slots)
       
      })
      .catch(() => {
        setError("Failed to retrieve from api");
      });
  }

  useEffect(() => {
    const getData = () => {
      FindSlotNumbers();
    };
    getData();
  });



  function routetoEditParking() {
    router.push("/EditParkingDetail")
  }

  


  const parkingSlot = parkingAreaSlots[indexOfParking]

  

  // const [totalSlots, setTotalSlots] = React.useState(0)
  // {(typeof (parkingSlot.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue, 10), 0)) !== 'undefined')? setTotalSlots(parkingSlot.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue, 10), 0)) : setTotalSlots(0)}
  // if(parkingSlot.length >0){
    const totalSlots = parkingSlot.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue, 10), 0) 
  // }

  
  const slotStatus = []
  for (let i = 0; i < ((totalSlots) - (slotApi)); i++) {
    // Add each number to the array
    slotStatus.push("Booked");
  }

  for (let i = (totalSlots - slotApi); i < totalSlots; i++) {
    // Add each number to the array
    slotStatus.push("Active");
  }

  const lengthsOfParkingFloor = parkingSlotNames[indexOfParking].map(arr => arr.length)
  

  function groupBySize(arr, sizes) {
    const result = [];
    let i = 0;
    for (const size of sizes) {
      result.push(arr.slice(i, i + size));
      i += size;
    }
    return result;
  }

  const result = groupBySize(slotStatus, lengthsOfParkingFloor)




  function redOrBlack(status) {
    if (status === "Booked") {
      return <CircleIcon sx={{ fontSize: 10, color: '#FF0000', mt: 1 }} />
    }
    else {
      return <CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />
    }
  }

  let iterateParkingSlots = parkingAreaFloor[indexOfParking].map((parkingfloor, indexParkingFloor) =>

  (<Accordion defaultExpanded key={indexParkingFloor}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      sx={{ backgroundColor: '#3D4E5D' }}
    >
      <Typography sx={{ color: 'white' }}>{parkingfloor} slot/s</Typography>
     
    </AccordionSummary>
    <AccordionDetails>
      <TableContainer sx={{ width: '95%', margin: 'auto', my: '2%' }} component={Paper}>
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: '2%', alignItems: 'center' }}>
          <FormControl variant="outlined">
            <Input
              id="input-with-icon-adornment"
              placeholder='Type search here'
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Typography sx={{ color: 'black', ml: '5%' }}>Filter by:</Typography>
          <FormControl sx={{ my: 2, ml: 3.5, minWidth: '120px', backgroundColor: 'white' }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth-label"
              value={filterActive}
              onChange={handleChangeFilterActive}
              label="Status"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button variant="text" sx={{ ml: 'auto', mr: 2, textDecoration: 'underline', color: '#5BADFA', fontSize: 17 }}>+Add new slot</Button>
        </Box>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow >
              <StyledTableCell sx={{ fontSize: 17 }}>Slot ID</StyledTableCell>
              <StyledTableCell align="left" sx={{ fontSize: 17 }}>Slot name</StyledTableCell>
              <StyledTableCell align="left" sx={{ fontSize: 17 }}>Status</StyledTableCell>
              <StyledTableCell align="left" sx={{ fontSize: 17 }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>




            {parkingSlotNames[indexOfParking][indexParkingFloor].map((row, index) => (
              <StyledTableRow key={row}>
                <StyledTableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                  {/* <Link href='/parkingArea' style={{ textDecoration: 'none', color: 'black' }}>{row.slotId}</Link> */}
                  {/* {row.slotId} */}
                  {/* ID{index + indexParkingFloor + indexParkingFloor} */}
                  ID{index}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: 16 }}>{row}</StyledTableCell>
                <StyledTableCell align="left">
                  <Box sx={{ width: 200 }}>
                    {redOrBlack(result[indexParkingFloor][index])}
                    {/* <CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} /> */}
                    <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5 }} >
                      {/* {slotStatus[indexParkingFloor + index + indexParkingFloor]} */}
                      {/* {updatedSlotStatus[indexParkingFloor][index]} */}
                      {result[indexParkingFloor][index]}
                    </Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button variant="text" sx={{ textDecoration: 'underline', color: '#5BADFA', fontSize: 17 }}>Delete</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </AccordionDetails>
  </Accordion>))


  return (
    <React.Fragment>
      <Box sx={{ width: "90%", height: "5%", ml: '5%', mr: '5%', mt: '8%', borderRadius: '50%' }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs separator='>' aria-label="breadcrumb">
            <Link href='/parkingDashboard' style={{ textDecoration: 'none', color: '#6F8191', fontSize: 19 }}>
              Parking
            </Link>
            {/* <Typography color="text.primary" sx={{fontSize:19}}>{parkingAreaName}</Typography> */}
            <Typography color="text.primary" sx={{ fontSize: 19 }}>{props.index}</Typography>
          </Breadcrumbs>
        </div>
        <Paper variant="outlined" sx={{ my: { md: 1, lg: 3 }, p: { md: 2, lg: 3 } }}>
          <Box sx={{ display: 'flex', flexDireciton: 'row', ml: 2 }}>
            <Box sx={{ width: 550 }}>
              <Typography component="h3" variant="h3" align="left" sx={{ color: 'black', fontWeight: 'bold' }}>
                {/* {parkingAreaName} */}
                {props.index}
              </Typography>
            </Box>

            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
              sx={{ ml: "auto", borderColor: '#61B6EC', borderRadius: 2 }}
            >
              <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Switch to inactive</Typography>
            </ToggleButton>
            <Button variant="outlined" sx={{ ml: 3, width: '100px', borderRadius: 2 }} onClick={routetoEditParking}>
              <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Edit</Typography>
            </Button>
            <Button variant="outlined" sx={{ ml: 3, width: '100px', borderRadius: 2 }}>
              <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Delete</Typography>
            </Button>

          </Box>


          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, ml: 2 }}>
            <Typography component="h6" variant="h6" sx={{ color: 'black' }} >
              Status
            </Typography>
            <Typography component="h6" variant="h6" sx={{ ml: 10, color: 'black' }} >
              Address
            </Typography>

          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 2 }}>
            <Box sx={{ width: 100 }}>
              {selected ? (<CircleIcon sx={{ fontSize: 10, color: 'grey', mt: 1 }} />) : (<CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />)}
              <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5, color: 'grey' }} gutterBottom>
                {selected ? "Inactive" : "Active"}
              </Typography>
            </Box>
            <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 5, color: 'grey' }} gutterBottom>
              {parkingAreaAddress[indexOfParking]}
            </Typography>

          </Box>
        </Paper>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pb: 2 }}>
        <Typography sx={{ fontWeight: 'bold', ml: '5%', color: 'black', fontSize: '17px' }}> Area floors</Typography>
        <Typography sx={{ color: 'black', fontSize: '17px', ml: '45%' }}>Last updated: {lastRefreshed.toLocaleString()}</Typography>
        <Button variant="text" onClick={refresh} sx={{ fontSize: '17px', borderRadius: 2, color: "#61B6EC", ml: '1%', mr:'1%' }} startIcon={<SyncIcon />}>Refresh now</Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Choose booking date"
            value={valueCalendar}
            onChange={(date) => {
              setValueCalendar(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ width: '90%', margin: 'auto' }}>
        {iterateParkingSlots}
      </Box>
    </React.Fragment>
  )
}



