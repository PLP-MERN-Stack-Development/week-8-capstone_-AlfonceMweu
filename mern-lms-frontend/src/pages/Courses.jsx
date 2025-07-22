import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id} className="mb-2 p-2 border rounded">
            <div className="font-semibold">{course.title}</div>
            <Link to={`/courses/${course._id}`} className="font-semibold text-blue-600 hover:underline">
      {course.title}
    </Link>
            <div>{course.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}