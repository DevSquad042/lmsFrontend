import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchCourses } from '../store/slices/courseSlice';
import { fetchPaidCourses } from '../store/slices/authSlice';
import CourseCard from '../Components/cards/CourseCard';
import Header2 from '../Components/shared/Header2';
import Footer from '../Components/Layout/Footer';
import styles from '../Styles/CategoryPage.module.css';

const MyCoursesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: allCourses, loading } = useSelector((state: RootState) => state.courses);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [paidCoursesFetched, setPaidCoursesFetched] = useState(false);

  useEffect(() => {
    if (allCourses.length === 0 && !loading) {
      dispatch(fetchCourses());
    }
    if (user && (!user.paidCourses || user.paidCourses.length === 0) && !paidCoursesFetched) {
      setPaidCoursesFetched(true);
      dispatch(fetchPaidCourses(user.id));
    }
  }, [dispatch, allCourses.length, loading, user, paidCoursesFetched]);

  useEffect(() => {
    if (user?.paidCourses && allCourses.length > 0) {
      const courses = allCourses.filter(course => user.paidCourses?.includes(course._id));
      setEnrolledCourses(courses);
    }
  }, [user, allCourses]);

  if (!user) return <p>Please log in to view your courses.</p>;
  // if (loading) return <p>Loading courses...</p>;
  if (enrolledCourses.length === 0) return <p>You have not enrolled in any courses yet.</p>;

  return (
    <>
      <Header2 />
      <div className={styles.pageContainer}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.mainLayout}>
              <main className={styles.main}>
                <header className={styles.header}>
                  <h1>My Enrolled Courses</h1>
                  <p className={styles.subtitle}>Courses you've purchased</p>
                </header>
                <section className={styles.courseSection}>
                  {enrolledCourses.length > 0 ? (
                    <div className={styles.grid}>
                      {enrolledCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <p>No enrolled courses found.</p>
                  )}
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCoursesPage;