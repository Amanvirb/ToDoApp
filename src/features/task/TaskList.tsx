import { Box } from '@mui/material';
import AppTitle from '../../app/common/components/AppTitle';
import useEventListner from '../../app/hooks/useEventListner';
import { ITask } from '../../app/models/todo/task';
import TaskCard from './cards/TaskCard';

const TaskList = () => {

    const { tasksList } = useEventListner();

    const mainTasks = tasksList.filter(x => !x.parentId);
    
    return (
        <Box component='div' >
            {mainTasks.length > 0 ?
                mainTasks.map((task: ITask) => (
                    <TaskCard key={task.id} task={task} />
                ))
                :
                <AppTitle title="No task found, add new task" />
            }
        </Box>
    )
}

export default TaskList;