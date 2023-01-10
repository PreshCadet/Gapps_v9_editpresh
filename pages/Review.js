import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// import Container from '@mui/material/Container';
//
// import Editor from "../components/Editor";
// import useLocalStorage from '../hooks/useLocalStorage';
import { useGlobalContext } from '../context/global';
// import RichTextEditor from "react-rte";
// import MUIRichTextEditor from "mui-rte";
// import { convertToRaw } from 'draft-js'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Image from 'next/image';
import Link from 'next/link';
// import RichTextEditor from "react-rte";
// import { EditorState } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
// // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw } from 'draft-js'
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Editor } from 'slate-react';
// import { Value } from 'slate';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { convert } from 'html-to-text';
import { convertFromHTML, convertToRaw } from 'draft-js';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];




export default function AddressForm() {
  const { setPaidAmount, setGcashNumber, setPaymentRestriction, setCancellationRestriction, setEarliestDateRestriction, setRTE, RTE, setMessage } = useGlobalContext()

  setMessage(true);
  const [radiobooking, setRadiobooking] = React.useState(false);
  const [validearly, setValidearly] = React.useState(false);
  const [validcancel, setValidcancel] = React.useState(false);
  const [validprice, setValidprice] = React.useState(false);
  const [publickey, setPublickey] = React.useState(false);
  // const [validpolicy, setValidpolicy] = React.useState(false);

  // amount to be paid
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const handleChange = event => {
    setValue(event.target.value);
    setPaidAmount(event.target.value);
    if (!Number.isInteger(Number(event.target.value))) {
      setError(true);
      setValidprice(false);
    } else {
      setError(false);
      setValidprice(true);
    }
  };

  //phone number
  // const phoneRegex = /^(09|\+639)\d{9}$/
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = React.useState(false);

  const handleChangeNumber = (event) => {
    setPhoneNumber(event.target.value);
    setGcashNumber(event.target.value);
    !(event.target.value) ? setPublickey(false) : setPublickey(true);
    // if (!phoneRegex.test(event.target.value)) {
    //   setErrorPhoneNumber(true);
    // } else {
    //   setErrorPhoneNumber(false);
    // }
  };

  const [costOfServiceBooking, setcostOfServiceBooking] = React.useState('');

  const handleChangeCostOfServiceBooking = (event) => {
    setcostOfServiceBooking(event.target.value);
    setPaymentRestriction(event.target.value)

    var content=(event.target.value);
    //Insert Paid

    content !== "" ? content === "Paid" ? setRadiobooking(false) : setRadiobooking(true) : setRadiobooking(false);
  };

  const [cancelDeadline, setCancelDeadline] = React.useState('');
  const [errorCancellationDeadline, setErrorCancellationDeadline] = React.useState('');

  const handleChangeCancelDeadline = (event) => {
    setCancelDeadline(event.target.value);
    setCancellationRestriction(event.target.value);

    var content=(event.target.value);
    content !== "" ? setValidcancel(true) : setValidcancel(false);


    if (event.target.value) {
      setErrorCancellationDeadline('')
    }
    else {
      setErrorCancellationDeadline('solid red 2px')
    }
  };

  const [earliestBook, setEarliestBook] = React.useState('');
  const [errorEarliestDate, setErrorEarliestDate] = React.useState('');
  const [isnotempty, setIsnotempty] = React.useState(false);

  const handleChangeEarliestBook = (event) => {
    setEarliestBook(event.target.value);
    setEarliestDateRestriction(event.target.value)
    
    var content=(event.target.value);
    content !== "" ? setValidearly(true) : setValidearly(false);

    if (event.target.value) {
      setErrorEarliestDate('')

    }
    else {
      setErrorEarliestDate('solid red 2px')
    }
  };

  const save = (data) => {
    console.log(data);
  };

  // const [valueRTE, setValueRTE] = React.useState("");
  // const onChangeRTE = (text) => {
  //   setValueRTE(text.getCurrentContent().getPlainText());
  //   // setRTE(text)
  // };

  // const handleChangeRTE = (event) => {
  //   const plainText = event.getCurrentContent().getPlainText() // for plain text
  //   // const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
  //   // rteContent && setValueRTE(JSON.stringify(rteContent))
  //   setValueRTE(plainText);
  //   setRTE(plainText)
  // };




  // const myTheme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#000000"
  //     }
  //   }
  // });

  // Object.assign(myTheme, {
  //   overrides: {
  //     MUIRichTextEditor: {
  //       root: {
  //         backgroundColor: "white"
  //       },
  //       toolbar: {
  //         border: "1px solid gray",
  //         backgroundColor: "darkgray",
  //         borderTopLeftRadius: "18px",
  //         borderTopRightRadius: "18px",
  //         borderBottomLeftRadius: "4px",
  //         borderBottomRightRadius: "4px"
  //       },
  //       container: {
  //         display: "flex",
  //         flexDirection: "column"
  //       },
  //       editor: {
  //         backgroundColor: "white",
  //         padding: "20px",
  //         height: "200px",
  //         maxHeight: "200px",
  //         overflow: "auto",
  //         borderRight: "1px solid gray",
  //         borderBottom: "1px solid gray",
  //         borderLeft: "1px solid gray",
  //         borderBottomLeftRadius: "18px",
  //         borderBottomRightRadius: "18px"
  //       },
  //       placeHolder: {
  //         backgroundColor: "white",
  //         paddingLeft: 20,
  //         width: "inherit",
  //         borderRight: "1px solid gray",
  //         borderTop: "1px solid gray",
  //         borderLeft: "1px solid gray",
  //         marginTop: -3
  //       },
  //       anchorLink: {
  //         color: "#333333",
  //         textDecoration: "underline"
  //       }
  //     }
  //   }
  // });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopOver = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //  console.log(valueRTE)

  const [length, setLength] = React.useState(0);


  return (

    <React.Fragment>

      <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
        <Box>
          <Typography sx={{ ml: 3, fontWeight: 'bold' }}>Rules & guidelines</Typography>
          <Typography sx={{ ml: 3, mt: 2 }}>Cost of service booking</Typography>
        </Box>
        <FormControl sx={{ ml: 3, display: 'block' }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={costOfServiceBooking}
            onChange={handleChangeCostOfServiceBooking}
          >
            <FormControlLabel value="Free of charge" control={<Radio />} label="Free of charge" />
            <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
          </RadioGroup>
        </FormControl>

        {costOfServiceBooking === 'Paid' ?
          (<Paper variant="outlined" sx={{ mr: 10, ml: 10, my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 }, backgroundColor: '#FAFAFA' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography component="b1" variant="b1" sx={{ color: 'black' }} gutterBottom>
                Booking Price
              </Typography>
              <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 26 }} gutterBottom>
                Your GCash Getpaid account public key
              </Typography>
              <IconButton aria-describedby={id} onClick={handleClick}>
                <HelpIcon sx={{ color: '#1D64D8', mt: -1 }} />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopOver}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
              >
                <Box sx={{ height: 500, width: 500, background: '#1D64D8', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 17, mt: 2 }}>What is GCash Getpaid Payment Portal?</Typography>
                  <ul>
                    <li><Typography sx={{ p: 1, fontSize: 17 }}>This is a tool to equip businesses to receive GCash payments from customers. You will need to sign up for an account <Link style={{ color: 'white', fontWeight: 'bold' }} href="https://getpaid.gcash.com/" target="_blank">here</Link> to connect it to your GAccess service.</Typography></li>
                    <li><Typography sx={{ p: 1, fontSize: 17 }}>On your account, go to the Integration tab to copy the public key.</Typography></li>
                  </ul>
                  {/* <Image src={question_logo_source} alt="question_logo" width={135} height={135} /> */}
                </Box>
              </Popover>
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormControl>

                <TextField
                  variant="outlined"
                  value={value}
                  onChange={handleChange}
                  error={error}
                  helperText={error ? 'Please enter a valid amount' : ''}
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">PHP</InputAdornment>, min: 0
                  }}

                />
              </FormControl>
              <FormControl sx={{ ml: 6, width: 400 }} >
                <TextField
                  required
                  value={phoneNumber}
                  variant="outlined"
                  onChange={handleChangeNumber}
                  // error={errorPhoneNumber}
                  // helperText={errorPhoneNumber ? 'Please enter a valid phone number' : ''}
                  placeholder="Enter public key"
                  InputProps={{ min: 0 }}
                />
              </FormControl>
            </Box>
          </Paper>)
          : null}


        <Box>
          <Box>
            <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 3 }} gutterBottom>
              Earliest date employees can book
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
              id="outlined-number"
              // label="Number of Slots"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={earliestBook}
              onChange={handleChangeEarliestBook}
              sx={{ width: '86px', ml: 3, border: errorEarliestDate, borderRadius: 2 }}
              inputProps={{ min: 0, }}
              placeholder="0"
            />
            <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'black', ml: 3 }}>days before the booking</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box>
            <Typography component="b1" variant="b1" sx={{ color: 'black', ml: 3 }} gutterBottom>
              Cancellation deadline
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
              id="outlined-number"
              // label="Number of Slots"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={cancelDeadline}
              onChange={handleChangeCancelDeadline}
              sx={{ width: '86px', ml: 3, border: errorCancellationDeadline, borderRadius: 2 }}
              inputProps={{ min: 0 }}
              placeholder="0"
            />
            <Typography component="subtitle1" variant="subtitle1" sx={{ color: 'black', ml: 3 }}>minutes before the booking</Typography>
          </Box>
          <Typography component="subtitle1" variant="subtitle1" sx={{ color: '#6F8191', display: 'block', ml: 3 }} gutterBottom>
            Employees can cancel <strong>{Math.floor((cancelDeadline) / 60)} hour and {(cancelDeadline) % 60} minutes </strong>  before the booking
          </Typography>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ my: { md: 3, lg: 5 }, p: { md: 2, lg: 3 } }}>
        <Box sx={{ ml: 3 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Policies</Typography>
          <Typography variant="body1" color="#6F8191" sx={{ mt: 1 }}>
            Enter guidelines, rules, regulations, or directions for your service
          </Typography>
          <Box sx={{ width: '778px', height: '587px', mt: 2 }}>
            {/* <ThemeProvider theme={myTheme}>
              <MUIRichTextEditor
                label="Type something here..."
                onSave={save}
                inlineToolbar={true}
                onChange={handleChangeRTE}
              />
            </ThemeProvider> */}
            {/* <RichTextEditor
              value={editorValue}
              onChange={onChange}
              // toolbarConfig={toolbarConfig}
              className="editor"
              placeholder="Enter your text here..." /> */}
            {/* <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={handleEditorState}
            /> */}

            {/* <ReactQuill
              theme="snow"
              placeholder="Type here"
              value={valueRTE}
              onChange={onChangeRTE}
              modules={modules}
            // style={style}
            /> */}
            {/* <Editor value={values} onChange={(newValue) => setValues(newValue)} /> */}
            <QuillNoSSRWrapper
              modules={modules}
              formats={formats}
              theme="snow"
              placeholder='Lorem ipsum '
              onChange={(content) => {
                // var htmlToRtf = require('html-to-rtf');
                setRTE(convert(content));
                ((convert(content)).length !== 0) ? (((convert(content)).length === 1) ? ((content === "<p><br></p>") ? setIsnotempty(false) : setIsnotempty(true)) : null) : setIsnotempty(false)

            //   sx: {{".ql-editor": 
            //   height:"500px"
            // }}
              }}
            />
    
            {(radiobooking) && (validearly) && (validcancel) && (isnotempty===true) ? setMessage(false) : !(radiobooking) && (validearly) && (validcancel) && (isnotempty===true) ? (validprice) && (publickey) ? setMessage(false): setMessage(true) : setMessage(true) }

          </Box>
        </Box>
      </Paper>
      
    </React.Fragment>
  );
}