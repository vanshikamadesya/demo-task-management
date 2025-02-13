import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface TaskEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const TaskEditor = ({ value, onChange, className }: TaskEditorProps) => {
  return (
    <div className={`${className} border border-gray-300 dark:border-gray-600 rounded-lg w-full`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="!h-auto [&_.ql-editor]:!min-h-[150px] [&_.ql-editor]:!max-h-[300px] 
                   [&_.ql-editor]:overflow-y-auto [&_.ql-editor]:p-3 
                   [&_.ql-editor]:bg-white [&_.ql-editor]:text-black 
                   dark:[&_.ql-editor]:bg-gray-800 dark:[&_.ql-editor]:text-white 
                   [&_.ql-toolbar]:bg-gray-100 [&_.ql-toolbar]:border-gray-300 
                   dark:[&_.ql-toolbar]:bg-gray-700 dark:[&_.ql-toolbar]:border-gray-600 
                   dark:[&_.ql-toolbar] button:hover:bg-gray-600 
                   dark:[&_.ql-picker]:text-white dark:[&_.ql-stroke]:stroke-white border"
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />
      <style>
        {`
          .ql-editor {
            min-height: 150px;
            max-height: 300px;
            overflow-y: auto !important; /* Scrollbar when content overflows */
          }

          .ql-editor::placeholder {
            color: #9ca3af !important; /* Light gray */
          }
          .dark .ql-editor::placeholder {
            color: #d1d5db !important; /* Slightly darker gray for dark mode */
          }

          .dark .ql-toolbar button svg {
            fill: white !important;
            stroke: white !important;
          }
          .dark .ql-toolbar button:hover {
            background-color: #374151 !important;
          }

          .dark .ql-picker-label, 
          .dark .ql-picker-options {
            color: white !important;
          }

          /* Prevent Editor Expansion Issue */
          .ql-container {
            height: auto !important;
          }

          /* Fix Toolbar Overflow on Small Screens */
          @media (max-width: 640px) {
            .ql-toolbar {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 4px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TaskEditor;
