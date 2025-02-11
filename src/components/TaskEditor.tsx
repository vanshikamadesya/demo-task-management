import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface TaskEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const TaskEditor = ({ value, onChange, className }: TaskEditorProps) => {
  return (
    <div
      className={`${className} bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg`}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Enter task description..."
        className="!min-h-[150px] [&_.ql-editor]:!min-h-[150px] [&_.ql-editor]:p-3 [&_.ql-editor]:bg-white [&_.ql-editor]:dark:bg-white [&_.ql-editor]:text-black [&_.ql-editor]:dark:text-black [&_.ql-toolbar]:dark:bg-gray-200 [&_.ql-toolbar]:dark:border-gray-400"
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />
    </div>
  );
};

export default TaskEditor;
