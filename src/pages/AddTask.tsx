import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <TaskForm onClose={() => navigate('/')} />
    </div>
  );
};

export default AddTask;
