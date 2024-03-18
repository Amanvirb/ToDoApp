import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useUtilities from '../../../app/hooks/useUtilities';
import { Box, CardHeader, Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import useEventListner from '../../../app/hooks/useEventListner';
import { router } from '../../../app/router/Routes';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { INote, ITask } from '../../../app/models/todo/task';
import TaskCard from './TaskCard';
import AddTaskNotesForm from '../forms/AddTaskNotesForm';
import NoteCard from './NoteCard';
import { format } from 'date-fns';
import HomeIcon from '@mui/icons-material/Home';

export default function TaskDetailCard() {
  const { id } = useParams<{ id: string }>();

  const { appFontSize, getPriority } = useUtilities();

  const { deleteTaskHandler, taskDetailHandler, doneTaskHandler,
    taskDetail, taskDetailLoaded, tasksList } = useEventListner();

  useEffect(() => {
    if (id && (taskDetail?.id !== id)) {
      taskDetailHandler(id);
    }
  }, [id, taskDetail?.id, taskDetailHandler, taskDetailLoaded])

  const subTasks = tasksList.filter(x => x.parentId && x.parentId === id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (id) {
      doneTaskHandler({ id: id, value: event.target.checked })
    }
  };

  const deleteHandler = (id: string) => {
    deleteTaskHandler(id);
  }


  return (
    <Card sx={{ border: 1, m: 2 }}>
      <ArrowBackIcon onClick={() => router.navigate(-1)} />
      <HomeIcon sx={{ ml: 2 }} onClick={() => router.navigate('/')} />
      {id && taskDetail ?
        <Box component='div'>
          <Card sx={{ border: 1, m: 2, backgroundColor: taskDetail?.done ? '#c2e8ff' : 'white' }}>
            <CardHeader
              title={taskDetail.title}
              subheader={format(new Date(taskDetail.dateTime), 'dd MMM yyyy')} />
            <CardContent>
              <Typography variant='body1'>
                {taskDetail.subtitle}
              </Typography>
              <Typography sx={appFontSize} variant="body1">
                Priority:  {getPriority(taskDetail.priority)}
              </Typography>
              <Box component='div'>
                Notes:
                {taskDetail.notes.map((note: INote) => (
                  <Box key={note.id}>
                    <NoteCard note={note} taskDetail={taskDetail} />
                    <Divider />
                  </Box>
                ))}
                <AddTaskNotesForm />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => { router.navigate(`/edittask/${id}`) }}>Edit</Button>
              <Button size="small" onClick={() => deleteHandler(id)} >Delete</Button>
              <Box component='div'>
                <Typography variant='body1'>Done
                  <Checkbox
                    id="Done"
                    onChange={handleChange}
                    checked={taskDetail.done}
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
          <CardContent>
            <Typography>Subtasks:</Typography>
            {subTasks.length > 0 ?
              subTasks.map((subTask: ITask) => (
                <TaskCard key={subTask.id} task={subTask} />
              ))
              :
              <p>You don't have any subtask</p>
            }
          </CardContent>
        </Box>
        :
        <p>Data not found</p>
      }
    </Card>
  );
}