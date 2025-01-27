import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import '../../assets/index.css';

export default function MediaCard(props) {

  const role = sessionStorage.getItem('role');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteProduct() {
    const token = sessionStorage.getItem('token');
    const REGISTRATION_URL = `http://localhost:8080/api/products/${props.id}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      axios.delete(REGISTRATION_URL, config).then(() => {
        handleClose();
        notify('success');
        window.location.replace('/dashboard');
      })
    } catch (err) {
      notify('error');
      console.log(err);
    }
  }

  const notify = (str) => {
    if (str === 'success') {
      toast.success("Product deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        icon: false
      });
    }
    if (str === 'error') {
      toast.error("Please check credentials", {
        position: toast.POSITION.TOP_RIGHT,
        icon: false
      });
    }
  }

  function redirectTo() {
    sessionStorage.setItem('id', props.id);
    window.location.replace('/productDetails');
  }

  function modify(){

  }

  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={props.imageUrl}
          title="Addidas"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={redirectTo} variant='contained' style={{ background: '#3f51b5' }}>Buy</Button>
          <div className='actions'>
            {role === 'ADMIN' ? <EditIcon onClick={modify} sx={{ fontSize: 'medium' }} /> : ''}
            {role === 'ADMIN' ? <DeleteIcon onClick={handleClickOpen} sx={{ fontSize: 'medium' }} /> : ''}
          </div>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm deletion of product!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={deleteProduct}>Ok</Button>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer theme="colored" autoClose={10000} hideProgressBar={false} pauseOnHover/>
    </div>
  );
}