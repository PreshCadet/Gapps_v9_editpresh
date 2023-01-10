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
import PolicyDetails from '../PolicyDetails';
import ServiceSetting from '../ServiceSetting';
import Review from '../Review';
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
import success_logo_source from "../../public/success-svgrepo-com.svg";

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';


export default function addslotverification() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    var floor = "1F";
    
return (

      <Container component="main" maxWidth="lg" sx={{ mb: 2, ml: 11 }}>
  
          <React.Fragment>
            <Dialog
              // fullScreen
              fullScreen={fullScreen}
              open="true"
            //   onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
              sx={{ backgroundColor: '#22222279', textAlign: 'center' }}
            >
              <Box sx={{ justifyContent: 'center', mt: 5 }}>
                <Image src={success_logo_source} alt="success_logo" width={135} height={135} />
              </Box>
              <DialogTitle id="responsive-dialog-title" sx={{width:500}}>
               <b>{"Add slot to "} {floor}</b>
              </DialogTitle>
              <DialogContent sx={{  textAlign: 'left', ml:6 }}>
              <div>
                <FormControl>
                <FormHelperText sx={{fontSize:18}}>Slot name<i>(optional)</i></FormHelperText>
                <OutlinedInput placeholder="Enter slot name" sx={{width:"195%", borderRadius:3}}/>
                </FormControl>
              </div>
                {/* <DialogContentText sx={{fontSize:18}}>
                Are you sure you want to remove {namevar} from the [parking area/area floor/slot] list?
                  </DialogContentText> */}
              </DialogContent>


              {/* <DialogActions sx={{alignContent:'center'}} > */}
              {/* <Button autoFocus onClick={handleClose}>
                      Disagree
                    </Button> */}
              {/* <Button onClick={handleClose} autoFocus variant='contained' sx={{ backgroundColor: '#5BADFA', maxWidth: 200, mb: 5, ml: 21.5 }}>
               */}
               <div sx={{ display: "flex", direction: "row"}}>
               <Button autoFocus variant='outlined' sx={{ backgroundColor: '#FFF',  mb: 5 , width: '35%'}}>
                Cancel, go back
              </Button>
              <Button autoFocus variant='contained' sx={{ backgroundColor: '#5BADFA', mb: 5, ml: 2, width: '35%'}}>
                Proceed
              </Button>
              </div>
              {/* </DialogActions> */}
            </Dialog>
          </React.Fragment>
        </Container>
  );
}