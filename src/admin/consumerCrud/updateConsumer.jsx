import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../adminMain/Title';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  form: {
      height: 'auto',
      padding: '15px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
}));

export default function UpdateConsumer(props) {
    const classes = useStyles();
    const history = useHistory();
    const [ active, setActive ] = useState(props.consumer.active);
    const [ consumerType, setConsumerType ] = useState(props.consumer.consumerType);
    const [ consumerFirstname, setConsumerFirstname ] = useState(props.consumer.firstname);
    const [ consumerLastname, setConsumerLastname ] = useState(props.consumer.lastname);
    const [ username, setUsername ] = useState(props.consumer.username);
    const [ phone, setPhone ] = useState(props.consumer.phone);
    const [ email, setEmail ] = useState(props.consumer.email);
    const [billingAddress, setBillingAddress] = useState(props.consumer.billingAddress);
    const [ shippingAddress, setShippingAddress ] = useState(props.consumer.shippingAddress);
    const [ instagram, setInstagram ] = useState(props.consumer.instagram);
    const [ birthdate, setBirthdate ] = useState(props.consumer.birthdate || '');
    const [ nationalIdType, setNationalIdType ] = useState(props.consumer.nationalIdType);
    const [ nationalId, setNationalId ] = useState(props.consumer.nationalId);
    const [ gender, setGender ] = useState(props.consumer.gender);
    const [loading, setLoading] = useState(false);
    const [buttonState, setButtonState] = useState(false);

    //Error states.
    const [errorMessage, setErrorMessage] = useState();
    const [snackBarError, setSnackBarError] = useState(false);


    const handleSubmit = async (e)=> {
      e.preventDefault();
      if(!active && 
        !consumerFirstname && 
        !consumerLastname && 
        !username && 
        !phone && 
        !email && 
        !billingAddress &&
        !shippingAddress &&
        !consumerType){
        setErrorMessage('Por favor completa todos los campos requeridos.');
        setSnackBarError(true);
        e.preventDefault();
      } else {
        setLoading(true);
        setButtonState(true);
        
        const data = {
            'active' : active,
            'consumerType': consumerType,
            'firstname' : consumerFirstname,
            'lastname' : consumerLastname,
            'username' : username,
            'phone' : phone,
            'email' : email,
            'billingAddress': billingAddress,
            'shippingAddress': shippingAddress,
            'instagram': instagram,
            'birthdate': birthdate,
            'nationalIdType': nationalIdType,
            'nationalId': nationalId,
            'gender': gender
        }

        const base_url= process.env.REACT_APP_BACKEND_URL + "/consumer/update";
        const response = await axios.post(base_url,data);
        if(response.data.success === false){
          setLoading(false);
          setButtonState(false);
          setErrorMessage(response.data.message);
          setSnackBarError(true);
        } else {
          setErrorMessage('Actualización de consumidor exitosa.');
          setSnackBarError(true);
          history.push('/admin/consumer/read');
        }
      }

    }

    return (
        <React.Fragment>
        {
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        }
          <Title>Consumidor</Title>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Grid container xs={6}>
                          <Grid item xs={12}>
                              <Checkbox 
                                  checked={active}
                                  color="primary" 
                                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  onChange={()=>{active?setActive(false):setActive(true)}}
                              /> Habilitado
                          </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                        <FormControl variant="outlined">
                            <InputLabel required id="consumerTypeLabel">Tipo de consumidor</InputLabel>
                            <Select
                            labelId="consumerType"
                            id="consumerType"
                            variant="outlined"
                            value={consumerType}
                            defaultValue="Particular"
                            onChange={(e)=>setConsumerType(e.target.value)}
                            label="consumerType"
                            >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
                            {['Particular', 'DAs', 'Corporativo', 'Prixer'].map((n) => (
                                <MenuItem key={n} value={n}>{n}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                display="inline"
                                id="consumerFirstname"
                                label="Nombres"
                                name="consumerFirstname"
                                autoComplete="consumerFirstname"
                                value={consumerFirstname}
                                onChange={(e) => {setConsumerFirstname(e.target.value);}}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                display="inline"
                                fullWidth
                                id="consumerLastname"
                                label="Apellidos"
                                name="consumerLastname"
                                autoComplete="consumerLastname"
                                value={consumerLastname}
                                onChange={(e) => {setConsumerLastname(e.target.value);}}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                rows={2}
                                id="username"
                                label="Nombre de usuario"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => {setUsername(e.target.value);}}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                rows={2}
                                id="phone"
                                label="Teléfono"
                                name="phone"
                                autoComplete="phone"
                                value={phone}
                                onChange={(e) => {setPhone(e.target.value);}}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                rows={2}
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value);}}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="date"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                defaultValue="2016-07-06"
                                rows={2}
                                id="birthdate"
                                label="Fecha de nacimiento"
                                name="birthdate"
                                autoComplete="birthdate"
                                //Las fechas no deben manejarse así.
                                value={(birthdate.split('T')[0])}
                                onChange={(e) => {setBirthdate(e.target.value)}}
                            />
                            </FormControl>
                        </Grid>
                    <Grid item xs={3} sm={2} md={2}>
                      <FormControl variant="outlined">
                        <Select
                          labelId="nationalIdType"
                          id="nationalIdType"
                          value={nationalIdType}
                          onChange={(e)=>setNationalIdType(e.target.value)}
                          label="nationalIdType"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          {['J', 'V', 'E'].map((n) => (
                            <MenuItem key={n} value={n}>{n}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                        <Grid item xs={9} md={4}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                rows={2}
                                id="nationalId"
                                label="ID nacional"
                                name="nationalId"
                                autoComplete="nationalId"
                                value={nationalId}
                                onChange={(e) => {setNationalId(e.target.value);}}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                rows={2}
                                id="gender"
                                label="Género"
                                name="gender"
                                autoComplete="gender"
                                value={gender}
                                onChange={(e) => {setGender(e.target.value);}}
                            />
                            </FormControl>
                        </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="instagram"
                            label="Instagram"
                            name="instagram"
                            autoComplete="instagram"
                            value={instagram}
                            onChange={(e) => {setInstagram(e.target.value);}}
                        />
                        </FormControl>
                    </Grid>
                    </Grid>
                    <Grid container style={{marginTop: 20}}>
                        <Title>Direcciones</Title>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                        <TextField
                            variant="outlined"
                            required
                            multiline
                            fullWidth
                            id="billingAddress"
                            label="Facturación"
                            name="billingAddress"
                            autoComplete="billingAddress"
                            value={billingAddress}
                            onChange={(e) => {setBillingAddress(e.target.value);}}
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" xs={12} fullWidth={true}>
                        <TextField
                            variant="outlined"
                            required
                            multiline
                            fullWidth
                            id="shippingAddress"
                            label="Entrega"
                            name="shippingAddress"
                            autoComplete="shippingAddress"
                            value={shippingAddress}
                            onChange={(e) => {setShippingAddress(e.target.value);}}
                        />
                        </FormControl>
                    </Grid>
                    </Grid>
                  <Button variant="contained" color="primary" type="submit" disabled={buttonState} style={{ marginTop: 20}}>
                    Actualizar
                  </Button>
                </Grid>
            </form>
            <Snackbar
              open={snackBarError}
              autoHideDuration={1000}
              message={errorMessage}
              className={classes.snackbar}
            />
        </React.Fragment>
      );
}