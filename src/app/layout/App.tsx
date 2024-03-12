import CssBaseline from "@mui/material/CssBaseline";
import 'react-toastify/dist/ReactToastify.css';
import {
  Box, Container,
  ThemeProvider
} from '@mui/material';
import React, { useEffect } from 'react';
import theme from "../../app/styles/styles";
import { Outlet } from 'react-router-dom';
import "../layout/style.css";
import { useAppDispatch } from "../stores/configureStore";
import { initTasks } from "../../features/task/taskSlice";
import useEventListner from "../hooks/useEventListner";
import { ToastContainer } from 'react-toastify';


const App = () => {

  const dispatch = useAppDispatch();

  const { tasksLoaded } = useEventListner();

  useEffect(() => {

    if (!tasksLoaded) {
      dispatch(initTasks())
    }

  }, [dispatch, tasksLoaded])

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        <CssBaseline />
        <Box component='div'>
          <Container maxWidth="lg" sx={{ minHeight: '100vh', margin: '63px auto', bgcolor: '#a3c5f2' }}>
            <Outlet />
          </Container>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App;
