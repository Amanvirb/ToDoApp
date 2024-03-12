import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { FieldValues, Resolver, useForm } from 'react-hook-form';
import { commonStyles } from '../../../app/common/styles/commonStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { router } from '../../../app/router/Routes';
import useEventListner from '../../../app/hooks/useEventListner';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { selectOptions } from '../../../app/common/options/commonOptions';
import AppSelectList from '../../../app/common/components/AppSelectList';
import AppTextInput from '../../../app/common/components/AppTextInput';
import AppTitle from '../../../app/common/components/AppTitle';
import { addTaskValidationSchema } from './taskValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ITask } from '../../../app/models/todo/task';


const AddTaskForm = () => {
    const [defaultValues, setDefaultValues] = useState(false);

    const { setTaskHandler } = useEventListner();
    const { id } = useParams<{ id: string }>();

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: {
            isValid
        },
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(addTaskValidationSchema) as Resolver<Partial<ITask>>,
    });


    useEffect(() => {
        if (!defaultValues) {
            setValue("id", uuidv4());
            setValue("parentId", id || "");
            setValue("title", "");
            setValue("subtitle", "");
            setValue("priority", 1);
            setValue("dateTime", new Date());
            setValue("done", false);
            setValue("notes", []);
        }
        setDefaultValues(true);
    }, [defaultValues, id, setValue])


    const submitHandler = (values: FieldValues) => {
        setTaskHandler(values);
        setDefaultValues(false);
        reset();
    }

    return (
        <Box component={"form"}>
            <ArrowBackIcon onClick={() => router.navigate('/')} />
            <AppTitle title="Add New Task" />
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <AppTextInput control={control} name='title' label='Title' />
                <AppTextInput control={control} name='subtitle' label='subtitle' />
                <AppSelectList items={selectOptions} control={control} name='priority' label='Priority' />
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <LoadingButton
                        disabled={!isValid}
                        onClick={handleSubmit(submitHandler)}
                        type="submit"
                        sx={commonStyles.btnStyle}
                    >
                        Add
                    </LoadingButton>
                </Box>
            </Stack>
        </Box>

    )
}

export default AddTaskForm;