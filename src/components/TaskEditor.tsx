import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

declare module 'react-dom/client' {
  interface Root {
    findDOMNode?: (instance: unknown) => Element | null;
  }
}

interface TaskEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const TaskEditor = ({ value, onChange, className }: TaskEditorProps) => {
  return (
    <div className={`${className} bg-white dark:bg-gray-700 rounded-md`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="dark:text-white"
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }}
      />
    </div>
  );
};

export default TaskEditor;
