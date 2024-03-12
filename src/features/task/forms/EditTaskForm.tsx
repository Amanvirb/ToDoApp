import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { FieldValues, Resolver, useForm } from 'react-hook-form';
import { commonStyles } from '../../../app/common/styles/commonStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { router } from '../../../app/router/Routes';
import useEventListner from '../../../app/hooks/useEventListner';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppSelectList from '../../../app/common/components/AppSelectList';
import AppTextInput from '../../../app/common/components/AppTextInput';
import { selectOptions } from '../../../app/common/options/commonOptions';
import AppTitle from '../../../app/common/components/AppTitle';
import HomeIcon from '@mui/icons-material/Home';
import { yupResolver } from '@hookform/resolvers/yup';
import { addTaskValidationSchema } from './taskValidation';
import { ITask } from '../../../app/models/todo/task';


const EditTaskForm = () => {

    const [defaultValues, setDefaultValues] = useState(false);

    const { editTaskHandler, taskDetail } = useEventListner();

    const { id } = useParams<{ id: string }>();

    const {
        control,
        setValue,
        handleSubmit,
        reset,
        formState: {
            isValid
        },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(addTaskValidationSchema) as Resolver<Partial<ITask>>,
    });

    useEffect(() => {
        if (!defaultValues && taskDetail) {
            setValue("id", id);
            setValue("title", taskDetail.title);
            setValue("subtitle", taskDetail.subtitle);
            setValue("priority", taskDetail.priority);
            setValue("dateTime", taskDetail.dateTime);
            setValue("done", false);
        }
        setDefaultValues(true);
    }, [defaultValues, id, setValue, taskDetail])

    const submitHandler = (values: FieldValues) => {
        editTaskHandler(values);
        reset();
        router.navigate('/');
    }

    return (
        <Box component={"form"} >
            <ArrowBackIcon onClick={() => router.navigate(`/taskdetail/${id}`)} />
            <HomeIcon sx={{ ml: 2 }} onClick={() => router.navigate('/')} />

            <AppTitle title="Edit Task" />

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
                        Edit
                    </LoadingButton>
                </Box>
            </Stack>
        </Box>

    )
}

export default EditTaskForm;