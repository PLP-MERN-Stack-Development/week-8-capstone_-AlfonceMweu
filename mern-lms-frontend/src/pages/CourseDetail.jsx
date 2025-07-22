import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import ProgressBar from "../components/ProgressBar";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(() => setCourse(null));

    // Real-time updates
    const socket = io("http://localhost:5000");
    socket.on("courseUpdated", updatedCourse => {
      if (updatedCourse._id === id) setCourse(updatedCourse);
    });
    return () => socket.disconnect();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  // For now, completed lessons is hardcoded as 2
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="mb-4">{course.description}</p>
      <ProgressBar completed={2} total={course.lessons.length} />
      <h3 className="text-xl font-semibold mb-2">Lessons</h3>
      <ul>
        {course.lessons.map((lesson, idx) => (
          <li key={idx} className="mb-2 p-2 border rounded">
            <div className="font-semibold">{lesson.title}</div>
            <div>{lesson.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}