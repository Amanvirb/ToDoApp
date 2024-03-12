import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { INote, INoteAction, ITask } from '../../../app/models/todo/task';
import useUtilities from '../../../app/hooks/useUtilities';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import useEventListner from '../../../app/hooks/useEventListner';
import { useState } from 'react';
import EditTaskNotesForm from '../forms/EditTaskNotesForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface NoteProps {
  note: INote;
  taskDetail: ITask;
}

export default function NoteCard({ note, taskDetail }: NoteProps) {

  const [editNote, setEditNote] = useState(false);
  const { appFontSize } = useUtilities();
  const { deleteTaskNoteHandler } = useEventListner();


  const deleteNoteHandler = (values: INoteAction) => {
    deleteTaskNoteHandler(values);
  }

  const updateNoteHandler = () => {
    setEditNote(!editNote);
  }
  return (
    <Card elevation={0}>
      {editNote ?
        <EditTaskNotesForm taskDetail={taskDetail} note={note} updateNoteHandler={updateNoteHandler} />
        :
        <CardContent>
          <Stack
            direction='row'
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}>
            <Box component='div'>
              <Typography className='comment' sx={appFontSize} paragraph variant="body1">
                {note.detail}
              </Typography>
            </Box>
            <Box sx={{minWidth: 64}}>
              <Tooltip title="Delete Note" placement="top">
                <IconButton onClick={() => deleteNoteHandler({ taskId: taskDetail.id, noteId: note.id })}>
                  <DeleteIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Note" placement="top">
                <IconButton onClick={() => updateNoteHandler()}>
                  <EditIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </CardContent>
      }
    </Card>
  );
}