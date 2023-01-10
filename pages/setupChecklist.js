import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
// import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PolicyDetails from './PolicyDetails';
import ServiceSetting from './ServiceSetting';
import Review from './Review';
import parking_logo_source from "/public/parking.svg";
import Image from 'next/image'
// import ResponsiveDialog from '../components/popUp';
import { useRouter } from "next/router";
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import success_logo_source from "../public/success-svgrepo-com.svg";
import { useEffect } from 'react';
import { useGlobalContext } from '../context/global';


const steps = ['Service settings', 'Parking areas & slots', ' Rules & guidelines'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ServiceSetting />;
    case 1:
      return <PolicyDetails />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const {
    parkingAreaName,
    parkingAreaAddress,
    parkingAreaSlots,
    paymentRestriction,
    cancellationRestriction,
    earliestDateRestriction,
    checkInOptions,
    checkInRestriction,
    checkInAndOutRestriction,
    dailyCheckInRestriction,
    dailyCheckInAndOutRestriction,
    paidAmount,
    gcashNumber,
    calendarRestriction,
    parkingStatus,
    RTE,
    message
  } = useGlobalContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const router = useRouter();

  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    // setOpen(false);
    router.push('/parkingDashboard')
  };


  async function postParkingArea(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const week = [1,2,3,4,5]

if (activeStep===3) {
  // useEffect(() => {
  //   const getData = () => {
    
week.map((week,weekIndex)=>(calendarRestriction.map((day,dayIndex)=>(parkingAreaName.map((parkingArea,index)=>(
  postParkingArea('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
    {
      "parkingArea": parkingArea,
      "parkingAddress": parkingAreaAddress[index],
      "dedicateSlots":parseInt(parkingAreaSlots[index].reduce((accumulator,currentValue)=>accumulator + parseInt(currentValue, 10), 0)),
      "slots": parseInt(parkingAreaSlots[index].reduce((accumulator,currentValue)=>accumulator + parseInt(currentValue, 10), 0)),
      "paymentRestriction" : paymentRestriction,
      "paymentAmount": paidAmount,
      "public-key": gcashNumber,
      "cancellationRestriction" : cancellationRestriction,
      "earliestDateRestriction" : earliestDateRestriction,
      "checkInOptions": checkInOptions,
      "checkInHealthRestriction" : checkInRestriction,
      "checkInAndOutHealthRestriction" : checkInAndOutRestriction,
      "dailyCheckInRestriction" : dailyCheckInRestriction,
      "dailyCheckInAndOutRestriction" : dailyCheckInAndOutRestriction,
      "calendarRestriction":day+week,
      "week":week,
      "service":"Parking",
      "parkingStatus":parkingStatus,
      "RTE":RTE
      // "public-key":"pk_a7b27edb128f36f1584fc5c8e4db8d8f"
    })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    })
))))))

   
    






    // parkingAreaName.map((parkingArea,index)=>(
    //   postParkingArea('https://zh66xn42vk.execute-api.ap-southeast-1.amazonaws.com/stage/parkingarea',
    //     {
    //       "parkingArea": parkingArea,
    //       "parkingAddress": parkingAreaAddress[index],
    //       "dedicateSlots":parseInt(parkingAreaSlots[index].reduce((accumulator,currentValue)=>accumulator + parseInt(currentValue, 10), 0)),
    //       "slots": parseInt(parkingAreaSlots[index].reduce((accumulator,currentValue)=>accumulator + parseInt(currentValue, 10), 0)),
    //       "paymentRestriction" : paymentRestriction,
    //       "paymentAmount": paidAmount,
    //       "gcashNumber": gcashNumber,
    //       "cancellationRestriction" : cancellationRestriction,
    //       "earliestDateRestriction" : earliestDateRestriction,
    //       "checkInOptions": checkInOptions,
    //       "checkInHealthRestriction" : checkInRestriction,
    //       "checkInAndOutHealthRestriction" : checkInAndOutRestriction,
    //       "dailyCheckInRestriction" : dailyCheckInRestriction,
    //       "dailyCheckInAndOutRestriction" : dailyCheckInAndOutRestriction,
    //       "calendarRestriction":calendarRestriction
    //     })
    //     .then((data) => {
    //       console.log(data); // JSON data parsed by `data.json()` call
    //     })
    // ))
      
  //   };
  //   getData();
  // }, []);
}
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box >
        <Typography component="h3" variant="h3" align="left" sx={{ mt: 20, ml: 15, color: 'black', fontWeight: 'bold' }}>
          Set up parking service
        </Typography>
        <Image src={parking_logo_source} alt="company_logo" width={175} height={65} style={{ position: 'absolute', marginTop: 15, width: 60, marginLeft: 120 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: 25, mt: 2 }}>
          <Typography component="h6" variant="h6" sx={{ color: 'black' }} >
            Company site
          </Typography>
          <Typography component="h6" variant="h6" sx={{ ml: 5, color: 'black' }} >
            Description
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', ml: 25 }}>
          <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'grey' }} gutterBottom>
            The Globe Tower
          </Typography>
          <Typography component="subtitle1" variant="subtitle1" sx={{ ml: 5, color: 'grey' }} gutterBottom>
            Fixed rate car parking slots for our Ka-globe
          </Typography>
        </Box>
      </Box>

      <Stepper activeStep={activeStep} sx={{ pt: 1, pb: 1, width: '50%', ml: 3, mt: 5 }} alternativeLabel>
        {steps.map((label) => (
          <Step key={label} sx={{ fontSize: 40,".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
            color: "#1976d2",
  
            outlineWidth: "1.5px",
            outlineColor: "#0064D8",
            outlineStyle: "solid",
            outlineOffset: "5px",
            borderRadius: "18px"
          },
          "svg:not(:root)":{
            fontSize: "100%",
            mt:-1
          },   }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Container component="main" maxWidth="lg" sx={{ mb: 2, ml: 11 }}>
        {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 3 }, backgroundColor: '#F4F8FC' }}> */}
        {activeStep === steps.length ? (
          <React.Fragment>
            <Dialog
              // fullScreen
              fullScreen={fullScreen}
              open="true"
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              sx={{ backgroundColor: '#22222279', textAlign: 'center' }}
            >
              <Box sx={{ justifyContent: 'center', mt: 5 }}>
                <Image src={success_logo_source} alt="success_logo" width={135} height={135} />
              </Box>
              <DialogTitle id="responsive-dialog-title" sx={{justifyContent:'center'}}>
                {"Service Setup Complete"}
              </DialogTitle>
              <DialogContent sx={{ pl: 5, pr: 5 }}>
                <DialogContentText>
                  You may now start managing the service you just finished setting up
                </DialogContentText>
              </DialogContent>
              {/* <DialogActions sx={{alignContent:'center'}} > */}
              {/* <Button autoFocus onClick={handleClose}>
                      Disagree
                    </Button> */}
                  <Box sx={{justifyContent: 'center'}}>
              <Button onClick={handleClose} autoFocus variant='contained' sx={{ backgroundColor: '#5BADFA', maxWidth: 200, mb: 5,}}>
                Okay, got it!
              </Button>
              </Box>
              {/* </DialogActions> */}
            </Dialog>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button variant="outlined" onClick={handleBack} sx={{ mt: 3, mr: '88%' }}>
                  Previous
                </Button>
              )}
              <Button
                disabled={message}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Save' : 'Next'}
              </Button>
            </Box>
           
          </React.Fragment>
        )}
        {/* </Paper> */}
      </Container>
    </ThemeProvider>
  );
}
