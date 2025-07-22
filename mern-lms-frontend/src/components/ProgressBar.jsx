export default function ProgressBar({ completed, total }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="w-full bg-gray-200 rounded h-4 mb-4">
      <div
        className="bg-green-500 h-4 rounded"
        style={{ width: `${percent}%` }}
      ></div>
      <span className="text-sm ml-2">{percent}% completed</span>
    </div>
  );
}