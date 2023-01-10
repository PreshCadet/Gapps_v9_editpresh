import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import parking_logo_source from "/public/parking.svg";
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import Button from '@mui/material/Button';
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import ListIcon from '@mui/icons-material/List';
import UploadIcon from '@mui/icons-material/Upload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context/global';
import parkingdashboard_image_source from "../public/gaccessillustration.svg"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import QuestionModal from '../modals/QuestionModal';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
    color:
      theme.palette.mode === 'light' ? '#5BADFA' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: '#5BADFA',
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


export default function ParkingDashboard() {

  const { parkingAreaName, parkingAreaAddress, calendarRestriction, checkInOptions, earliestDateRestriction, cancellationRestriction, RTE, bookingStart, bookingEnd, paymentRestriction, setParkingStatus,parkingStatus } = useGlobalContext()
  const router = useRouter();
  const [selected, setSelected] = React.useState(false);
  const [selectedParking, setSelectedParking] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [filterActive, setFilterActive] = React.useState();
  const handleChangeFilterActive = (event) => {
    setFilterActive(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#3D4E5D',
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



  function createData(parkingAreaName, address, status, action) {
    return { parkingAreaName, address, status, action };
  }

  const rows = [];

  // const bookedRow = [] 
  for (let i = 0; i < parkingAreaName.length; i++) {
    rows.push(createData(parkingAreaName[i], parkingAreaAddress[i], 'Active', 'pj'));
  }



  function redirectToServiceSetting() {
    router.push('/EditServiceSetting')
  }

  function redirectToReview() {
    router.push('/EditReview')
  }

  function routeToParkingArea(index) {
    router.push({
      pathname: '/parkingArea',
      query: {
        index
      }
    })
  }
  const array = []
  const timeArray = ['7:00AM',
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
    '11:30 PM',
    '12:00 AM',]
     for (let i = 0; i <= 47; i++) {
    // Add each number to the array
    array.push(i);
  }

  const obj = Object.assign({}, array, timeArray)
  let serviceSchedule = calendarRestriction.map((day, dayIndex) => (
    <Box key={day} sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ width: 100 }}>
        <Typography>{day}</Typography>
      </Box>
      <Typography sx={{ ml: 5 }}>{obj[bookingStart[dayIndex]]}</Typography>
      <Typography sx={{ ml: 1 }}>-</Typography>
      <Typography sx={{ ml: 1 }}>{obj[bookingEnd[dayIndex]]}</Typography>
    </Box>

  ))


  async function patchParkingStatus(url = '', data = {}) {
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
  const week = [1, 2, 3, 4, 5]
  // function sendParkingStatus() {
  //   week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (parkingAreaName.map((parkingArea, index) => (
  //     patchParkingStatus('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
  //       {
  //         "parkingArea": parkingArea,
  //         "calendarRestriction": day + week,
  //         "updateKey": "parkingStatus",
  //         "updateValue": parkingStatus
  //       })
  //       .then((data) => {
  //         console.log(data); // JSON data parsed by `data.json()` call
  //       })))))))
  // }

  {!parkingStatus ? (week.map((week, weekIndex) => (calendarRestriction.map((day, dayIndex) => (parkingAreaName.map((parkingArea, index) => (
    patchParkingStatus('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
      {
        "parkingArea": parkingArea,
        "calendarRestriction": day + week,
        "updateKey": "parkingStatus",
        "updateValue": !parkingStatus
      })
      .then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
      })))))))):null}


  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

 
  // const handleCloseDialog = () => {
  //   setSelected(false);
  // };

  // console.log(selected)
  // console.log(parkingSta)
  console.log(parkingStatus)
  console.log(bookingStart,bookingEnd)


  return (
    <React.Fragment>
      <Box sx={{ width: "90%", height: "5%", ml: '5%', mr: '5%', mt: '8%', borderRadius: '50%' }}>
        <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
          <Image src={parking_logo_source} alt="company_logo" width={175} height={65} style={{ position: 'absolute', marginTop: 30, width: '105px', marginLeft: 30 }} />
          <Box sx={{ display: 'flex', flexDireciton: 'row' }}>
            <Typography component="h3" variant="h3" align="left" sx={{ ml: 19.5, color: 'black', fontWeight: 'bold' }}>
              Parking
            </Typography>
            <ToggleButton
              value="check"
              selected={parkingStatus}
              onChange={() => {
                // setSelected(!parkingStatus);
                setParkingStatus(!parkingStatus);
              }}
              // onClick={parkingStatus?sendParkingStatus:null}
              sx={{ ml: 'auto', borderColor: '#61B6EC' }}
            >
              <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Switch to inactive</Typography>
            </ToggleButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 20 }}>
            <Typography component="h6" variant="h6" sx={{ color: 'black' }} >
              Status
            </Typography>
            <Typography component="h6" variant="h6" sx={{ ml: 10, color: 'black' }} >
              Company site
            </Typography>
            <Typography component="h6" variant="h6" sx={{ ml: 10, color: 'black' }} >
              Description
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 20 }}>
            <Box sx={{ width: 100 }}>
              {parkingStatus ? (<CircleIcon sx={{ fontSize: 10, color: 'grey', mt: 1 }} />) : (<CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />)}
              <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5, color: 'grey' }} gutterBottom>
                {parkingStatus ? "Inactive" : "Active"}
              </Typography>
            </Box>
            <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 5, color: 'grey' }} gutterBottom>
              The Globe Tower
            </Typography>
            <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 10, color: 'grey' }} gutterBottom>
              Fixed rate car parking slots for our Ka-globe
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '90%', margin: 'auto' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Parking areas" {...a11yProps(0)} sx={{ fontSize: '21px' }} />
          <Tab label="Service settings" {...a11yProps(1)} sx={{ fontSize: '21px' }} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: '5%', alignItems: 'center' }}>
          <Typography sx={{ color: 'black' }}>Filter by:</Typography>
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
          <Box sx={{ ml: 'auto', mr: '4%' }}>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ width: 250, height: 50, backgroundColor: '#5BADFA', fontSize: 17 }}
            >
              Add new parking area
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <ListIcon />
                List manually
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <UploadIcon />
                Bulk upload
              </MenuItem>
            </StyledMenu>
          </Box>
        </Box>
        <TableContainer sx={{ width: '93%', margin: 'auto' }} component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow >
                <StyledTableCell sx={{ fontSize: 17 }}>Parking area name</StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: 17 }}>Address</StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: 17 }}>Status</StyledTableCell>
                <StyledTableCell align="left" sx={{ fontSize: 17 }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (

                <StyledTableRow key={row.parkingAreaName}>
                  <StyledTableCell component="th" scope="row" sx={{ fontSize: 16 }}>
                    <Button style={{ textDecoration: 'none', color: 'black' }} onClick={() => routeToParkingArea(row.parkingAreaName)}>{row.parkingAreaName ? row.parkingAreaName : "Not Specified"}</Button>
                  </StyledTableCell>
                  {row.address ?
                    (<StyledTableCell align="left" sx={{ fontSize: 16 }}>{row.address}</StyledTableCell>) :
                    (<StyledTableCell sx={{ fontStyle: 'italic' }}>Not specified</StyledTableCell>)}
                  {/* <StyledTableCell align="left" sx={{ fontSize: 16 }}>{row.address ? row.address : "Not specified"}</StyledTableCell> */}
                  <StyledTableCell align="left">
                    <Box sx={{ width: 100 }}>
                      {!parkingStatus?(selectedParking ? (<CircleIcon sx={{ fontSize: 10, color: 'grey', mt: 1 }} />) : (<CircleIcon sx={{ fontSize: 10, color: '#00DE9A', mt: 1 }} />)):(<CircleIcon sx={{ fontSize: 10, color: 'grey', mt: 1 }} />)}
                     
                      <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 0.5, color: 'grey' }} gutterBottom>
                      {!parkingStatus?(selectedParking ? "Inactive" : "Active"):"Inactive"}
                        {/* {selectedParking ? "Inactive" : "Active"} */}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <ToggleButton
                      value="check"
                      selected={selectedParking}
                      onChange={() => {
                        setSelectedParking(!selectedParking);
                      }}
                      sx={{ borderWidth: 0 }}
                    >
                      <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Switch to inactive</Typography>
                    </ToggleButton>
                    <Button
                      sx={{ borderWidth: 0 }}
                    >
                      <Typography sx={{ color: "#61B6EC", fontSize: 17 }}>Delete</Typography>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper variant="outlined" sx={{ ml: '4%', my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA', width: '55%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 17 }}>Service details</Typography>
            <Button variant="text" sx={{ ml: '80%', textDecoration: 'underline' }} onClick={redirectToServiceSetting}>Edit</Button>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>Service schedule</Typography>
            <div>{serviceSchedule}</div>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Check-in options</Typography>
            {/* <div>{serviceFee}</div> */}
            <div>{checkInOptions}</div>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ ml: '4%', my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA', width: '55%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 17 }}>Rules & guidelines</Typography>
            <Button variant="text" sx={{ ml: '77%', textDecoration: 'underline' }} onClick={redirectToReview}>Edit</Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Cost of service booking</Typography>
            <Typography>{paymentRestriction}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Earliest date employees can book</Typography>
            <Typography>{earliestDateRestriction} days before the booking</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Cancellation deadline</Typography>
            <Typography>{cancellationRestriction} minutes before the booking</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Policies</Typography>
            <Typography>{RTE}</Typography>
          </Box>
        </Paper>
      </TabPanel>

      <Image src={parkingdashboard_image_source} alt="success_logo" width={500} style={{ position: 'relative', marginLeft: "74%", paddingTop: '3%' }} />
      {parkingStatus ? ((<QuestionModal 
      title="Switch Parking service to inactive?" 
      body="Making this service inactive will automatically disable all parking areas" 
      status={parkingStatus} 
      successTitle='Service set up complete!' 
      successBody='You may now start managing the service you just finished setting up'
      />)): null}
      
      


        

    </React.Fragment>

  )
}