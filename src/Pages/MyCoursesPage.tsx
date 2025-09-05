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
    console.log("MyCoursesPage useEffect - user:", user);
    console.log("MyCoursesPage - localStorage user:", localStorage.getItem("user"));
    if (allCourses.length === 0 && !loading) {
      dispatch(fetchCourses());
    }
    if (user && !paidCoursesFetched) {
      setPaidCoursesFetched(true);
      // Use _id if available, otherwise fall back to id
      const userId = user._id || user.id;
      console.log("MyCoursesPage - attempting to fetch paid courses for userId:", userId);
      console.log("MyCoursesPage - current user.paidCourses:", user.paidCourses);
      if (userId && !userId.startsWith('temp-')) {
        dispatch(fetchPaidCourses(userId));
      } else {
        console.log("MyCoursesPage - skipping fetchPaidCourses due to invalid userId");
      }
    }
  }, [dispatch, allCourses.length, loading, user, paidCoursesFetched]);

  useEffect(() => {
    if (user?.paidCourses && allCourses.length > 0) {
      console.log("MyCoursesPage - user.paidCourses:", user.paidCourses);
      console.log("MyCoursesPage - allCourses length:", allCourses.length);
      console.log("MyCoursesPage - allCourses IDs:", allCourses.map(c => c._id));

      const courses = allCourses.filter(course => {
        const isEnrolled = user.paidCourses?.includes(course._id);
        console.log(`MyCoursesPage - checking course ${course._id} (${course.title}): ${isEnrolled ? 'ENROLLED' : 'NOT ENROLLED'}`);
        return isEnrolled;
      });

      console.log("MyCoursesPage - filtered enrolledCourses:", courses.map(c => ({ _id: c._id, title: c.title })));
      console.log("MyCoursesPage - setting enrolledCourses to:", courses.length, "courses");
      setEnrolledCourses(courses);
    } else {
      console.log("MyCoursesPage - conditions not met:", {
        hasPaidCourses: !!user?.paidCourses,
        paidCoursesLength: user?.paidCourses?.length,
        allCoursesLength: allCourses.length,
        paidCourses: user?.paidCourses
      });
      setEnrolledCourses([]); // Clear enrolled courses if conditions not met
    }
  }, [user?.paidCourses, allCourses]);

  if (!user) return <p>Please log in to view your courses.</p>;
  // if (loading) return <p>Loading courses...</p>;
  // if (enrolledCourses.length === 0) return <p>You have not enrolled in any courses yet.</p>;

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
                        <CourseCard key={course._id} course={course} />
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