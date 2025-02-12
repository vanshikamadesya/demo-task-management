import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div className="w-full min-h-screen px-8 ">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold mt-9 ">Manage Your Tasks</h1>
      </div>
      <TaskList />
    </div>
  );
};

export default Home;
