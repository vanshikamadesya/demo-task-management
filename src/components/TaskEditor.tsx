import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface TaskEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const TaskEditor = ({ value, onChange, className }: TaskEditorProps) => {
  return (
    <div className={`${className} rounded-lg w-full border border-gray-400 dark:border-gray-600 p-2`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="!h-auto [&_.ql-editor]:!h-[200px] [&_.ql-editor]:max-h-[200px] 
                   [&_.ql-editor]:overflow-hidden [&_.ql-editor]:p-3 
                   [&_.ql-editor]:bg-white [&_.ql-editor]:text-black 
                   dark:[&_.ql-editor]:bg-gray-800 dark:[&_.ql-editor]:text-white 
                   [&_.ql-toolbar]:bg-gray-100 [&_.ql-toolbar]:border-none 
                   dark:[&_.ql-toolbar]:bg-gray-700 dark:[&_.ql-toolbar]:border-none 
                   dark:[&_.ql-toolbar] button:hover:bg-gray-600 
                   dark:[&_.ql-picker]:text-white dark:[&_.ql-stroke]:stroke-white"
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
          .ql-container {
            height: 210px !important;
            border: none !important;
          }

          .ql-editor {
            height: 200px !important;
            max-height: 200px !important;
            overflow-y: hidden;
          }

          /* Show scrollbar only when there is actual content */
          .ql-editor:not(:empty) {
            overflow-y: auto !important;
          }

          .ql-editor::placeholder {
            color: #9ca3af !important;
          }
          .dark .ql-editor::placeholder {
            color: #d1d5db !important;
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
