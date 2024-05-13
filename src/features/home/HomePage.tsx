import useEventListner from "../../app/hooks/useEventListner";
import { Box, Button, Grid, Stack } from "@mui/material";
import AppTitle from "../../app/common/components/AppTitle";
import CommonButton from "../../app/common/components/CommonButton";
import TaskList from "../task/TaskList";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const HomePage = () => {
  const { deleteAllTaskHandler } = useEventListner();

  return (
    <Box component='div'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction='row'
            justifyContent="space-between"
            alignItems="center"
            spacing={1}>
            <Box component='div'>
              {/* <img src='../images/logo.svg' /> */}
              <AccountBalanceIcon />
            </Box>
            <Box sx={{ minWidth: 64 }}>
              <AppTitle title="ToDo App" />
            </Box>
          </Stack>

          <Box sx={{ textAlign: 'center', p:4 }}>
            <CommonButton btnText="Add Task" route="/addtask" />
            <Button
              color="warning"
              variant="contained"
              size="medium"
              sx={{ ml: 1 }}
              onClick={() => deleteAllTaskHandler()}>Delete all task
            </Button>
          </Box>
          <TaskList />
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage;