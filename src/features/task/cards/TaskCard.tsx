import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ITask } from '../../../app/models/todo/task';
import useUtilities from '../../../app/hooks/useUtilities';
import { Box, CardHeader } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import useEventListner from '../../../app/hooks/useEventListner';
import { router } from '../../../app/router/Routes';
import React from 'react';
import { format } from 'date-fns';

interface TaskProps {
  task: ITask;
}

export default function TaskCard({ task }: TaskProps) {

  const { appFontSize, getPriority } = useUtilities();

  const { deleteTaskHandler, doneTaskHandler } = useEventListner();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    doneTaskHandler({ id: task.id, value: event.target.checked })
  };

  const deleteHandler = (id: string) => {
    deleteTaskHandler(id);
  }

  return (
    <Card sx={{ my: 0.5, backgroundColor: task.done ? '#c2e8ff' : 'white' }}>
      <CardHeader
        title={task.title}
        subheader={format(new Date(task.dateTime), 'dd MMM yyyy')} />
      <CardContent>
        <Typography variant='body1'>
          {task.subtitle}
        </Typography>
        <Typography sx={appFontSize} variant="body1">
          Priority:  {getPriority(task.priority)}
        </Typography>

      </CardContent>
      <CardActions>

        <Button size="small" onClick={() => deleteHandler(task.id)} >Delete</Button>
        <Button size="small" onClick={() => router.navigate(`/taskdetail/${task.id}`)} >View</Button>
        {!task.parentId &&
          <Button size="small" onClick={() => router.navigate(`/addsubtask/${task.id}`)} >Add SubTask</Button>
        }
        <Box component='div'>
          <Typography variant='body1'>Done
            <Checkbox
              id="Done"
              onChange={handleChange}
              checked={task.done}
              name="done"
              sx={{
                '& .MuiSvgIcon-root':
                  { fontSize: 24 }
              }}

            />
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}