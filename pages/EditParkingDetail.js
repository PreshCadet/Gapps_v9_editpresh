import * as React from 'react';
import ServiceSetting from './ServiceSetting';
import Container from '@mui/material/Container';
import Typography  from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography'
import { useGlobalContext } from '../context/global';
import PolicyDetails from './PolicyDetails';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link'

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function EditParkingDetail (){
    const {parkingAreaName} = useGlobalContext()
    
    return (
    //  <React.Fragment>
    <Container component="main" maxWidth="lg" sx={{mb: 2, ml:11,mt:'10%'}}>
        <div role="presentation" onClick={handleClick}>
        <Breadcrumbs separator = '>' aria-label="breadcrumb">
        <Link href='/parkingDashboard' style={{ textDecoration: 'none', color: '#6F8191', fontSize:19 }}>
            Parking
          </Link>
          <Link href='/parkingArea' style={{ textDecoration: 'none', color: '#6F8191', fontSize:19 }}>
          {parkingAreaName}
          </Link>
          <Typography color="text.primary" sx={{fontSize:19}}> Edit {parkingAreaName}</Typography>
        </Breadcrumbs>
        </div>
        <Typography  sx={{mt:'1%',fontWeight:'1000',color:'black',fontSize:'43px'}}>Edit {parkingAreaName}</Typography>
        <Typography sx={{mt:'1%',color:'black',fontSize:'21px'}}>Fill out the fields below to edit service details</Typography>
        <PolicyDetails/>
    </Container>
    // {/* </React.Fragment>    */}
    )
}