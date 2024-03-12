import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import useEventListner from '../../../app/hooks/useEventListner';
import { useParams } from 'react-router-dom';
import { INote, ITask } from '../../../app/models/todo/task';
import { useEffect, useState } from 'react';
import AppTextInput from '../../../app/common/components/AppTextInput';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

interface AddTaskNotesProps {
    taskDetail: ITask;
    note: INote;
    updateNoteHandler: () => void;
}

const EditTaskNotesForm = ({ taskDetail, note, updateNoteHandler }: AddTaskNotesProps) => {

    const [defaultValues, setDefaultValues] = useState(false);

    const { updateTaskNoteHandler } = useEventListner();

    const { id } = useParams<{ id: string }>();

    const {
        control,
        setValue,
        handleSubmit,
    } = useForm({
        mode: "all",
    });
    useEffect(() => {
        if (!defaultValues && note) {
            setValue("id", note.id);
            setValue("taskId", id);
            setValue("detail", taskDetail.notes.find(x => x.id === note.id)?.detail);
        }
        setDefaultValues(true);
    }, [defaultValues, id, note, setValue, taskDetail.notes])

    const submitHandler = (values: FieldValues) => {
        updateTaskNoteHandler(values);
        updateNoteHandler();
    }

    return (
        <Box component={"form"} sx={{ p: 1 }}>
            <Stack
                direction='row'
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1}>
                <AppTextInput control={control} multiline name='detail' label='Detail' />
                <Box sx={{ minWidth: 64 }}>
                    <Tooltip title="Save" placement="top">
                        <IconButton type='submit' onClick={handleSubmit(submitHandler)}>
                            <DoneIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel" placement="top">
                        <IconButton type='button' onClick={() => updateNoteHandler()}>
                            <CancelIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>
        </Box>
    )
}

export default EditTaskNotesForm;