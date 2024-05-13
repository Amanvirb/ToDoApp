import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { FieldValues, Resolver, useForm } from 'react-hook-form';
import useEventListner from '../../../app/hooks/useEventListner';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import AppTextInput from '../../../app/common/components/AppTextInput';
import DoneIcon from '@mui/icons-material/Done';
import { INote } from '../../../app/models/todo/task';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNoteValidationSchema } from './taskValidation';


const AddTaskNotesForm = () => {
    const [defaultValues, setDefaultValues] = useState(false);

    const { addTaskNoteHandler } = useEventListner();

    const {
        control,
        setValue,
        handleSubmit,
        reset,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(addNoteValidationSchema) as Resolver<Partial<INote>>,
    });

    useEffect(() => {
        if (!defaultValues) {
            setValue("id", uuidv4());
            setValue("detail", "");
        }
        setDefaultValues(true);
    }, [defaultValues, setValue])

    const submitHandler = (values: FieldValues) => {
        addTaskNoteHandler(values);
        reset();
        setDefaultValues(false);
    }
    return (
        <Box component={"form"} sx={{ my: 1 }}>
            <Stack
                direction='row'
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1}>
                <AppTextInput multiline control={control} name='detail' label='New note' />
                <Box sx={{ minWidth: 64 }}>
                    <Tooltip title="Save" placement="top">
                        <IconButton type='submit' onClick={handleSubmit(submitHandler)}>
                            <DoneIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>

                </Box>
            </Stack>
        </Box>
    )
}

export default AddTaskNotesForm;