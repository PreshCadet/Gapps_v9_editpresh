import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { Link } from '@mui/material';
import { useRouter } from "next/router"
import Box from '@mui/material/Box';
import { useGlobalContext } from '../context/global';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';



export default function ImgMediaCard() {

  const router = useRouter();
  // getResult()
  function redirect() {
    router.push("/setupChecklist")
  }

  const { SSOuser} = useGlobalContext();

  // if (!SSOuser) {
  //   return <Backdrop
  //     sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //     open={true}
  //   // onClick={handleClose}
  //   >
  //     <CircularProgress color="inherit" />
  //   </Backdrop>
  // }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '15%' }}>
      <Card sx={{ maxWidth: 800, height: 400, display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          component="img"
          alt="bike"
          // height="496"
          image="Group 7822.png"
          sx={{ width: 450, backgroundPosition: 'center 20%' }}
        />
        <div style={{ marginLeft: 30, marginTop: 50 }}>
          <CardContent >
            <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              Welcome to G Access, {SSOuser.split(" ")[0]}!
              {/* Welcome to G Access, {SSOuser} */}
              {/* {getFirstName} */}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ pt: 3 }}>
              You are the assigned service administrator for
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
              Parking at The Globe Tower
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ pt: 3, mr: 5 }}>
              As the service admin, you will be the one to manage the appointment slots in your assigned Globe sites
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" variant="contained" sx={{ width: 211, height: 65, backgroundColor: '#5BADFA' }} onClick={redirect}><Typography>Get started</Typography></Button>
          </CardActions>
        </div>
      </Card>
    </Box>
  );
}
