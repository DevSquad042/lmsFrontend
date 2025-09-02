// pages/MentorPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Instructor } from '../Types/Mentor';

const MentorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Assuming the route is /mentors/:id
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get<Instructor>(`YOUR_INSTRUCTOR_API_ENDPOINT/${id}`);
        setInstructor(response.data);
      } catch (err) {
        setError('Failed to fetch instructor details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInstructor();
    }
  }, [id]);

  if (loading) {
    return <div>Loading instructor profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!instructor) {
    return <div>Instructor not found.</div>;
  }

  return (
    <div className="mentor-page-container">
      <div className="mentor-header">
        <h1>{`${instructor.firstName} ${instructor.lastName}`}</h1>
        {/* Render other details like bio, expertise, and courses */}
      </div>
    </div>
  );
};

export default MentorPage;