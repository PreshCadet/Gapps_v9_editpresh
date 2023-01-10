import * as React from 'react';
import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';



const AddSlots = props => {

    const [parkingName, setParkingName] = React.useState(() => []);

    const handleChangeParkingName = (event, newParkingName) => {
      setParkingName(newParkingName);
    };

    
    return(
        <Box sx={{mb:3,display:'flex',flexDirection:"row", alignItems: 'center'}}>
          <Typography variant="subtitle1"  sx={{color: 'black'}} gutterBottom>Slot name {props.key}</Typography>

            {/* <TextField
              id="outlined-basic"
              label="Outlined"
              value={parkingName}
              onChange={handleChangeParkingName}
              variant="outlined"
              sx={{backgroundColor:'white', width:326}}
              placeholder="Enter Slot Name"
          /> */}

        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
    );
}

export default AddSlots;