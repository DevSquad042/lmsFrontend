import React, { useState } from "react";

// CoursePage.tsx
// Full course detail page component (EXCLUDING Header & Footer).
// Uses Tailwind CSS classes. Drop this file into a React + Tailwind project.

type Lesson = {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
};

type SyllabusSection = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Review = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
};

type Course = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  thumbnail: string;
  instructor: {
    name: string;
    title?: string;
    avatar?: string;
  };
  description: string;
  syllabus: SyllabusSection[];
  reviews: Review[];
};

const mockCourse: Course = {
  id: "c1",
  title: "Introduction to User Experience Design",
  subtitle: "Design delightful digital experiences",
  price: 59.0,
  rating: 4.7,
  students: 12434,
  duration: "8h 30m",
  level: "Beginner",
  thumbnail:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
  instructor: {
    name: "Helen Watson",
    title: "Senior UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
  },
  description:
    `This course introduces the fundamental principles of User Experience (UX) design. You will learn how to structure information, design effective interactions, and craft delightful user journeys. Through hands-on exercises and real-world examples, you'll be able to build wireframes, prototypes and validate your designs with users.`,
  syllabus: [
    {
      id: "s1",
      title: "Introduction & Basics",
      lessons: [
        { id: "l1", title: "What is UX?", duration: "8m" },
        { id: "l2", title: "Design Thinking", duration: "12m" },
        { id: "l3", title: "User Research Overview", duration: "22m" },
      ],
    },
    {
      id: "s2",
      title: "Wireframing & Prototyping",
      lessons: [
        { id: "l4", title: "Low-fidelity Wireframes", duration: "18m" },
        { id: "l5", title: "Interactive Prototypes", duration: "26m" },
      ],
    },
    {
      id: "s3",
      title: "Testing & Iteration",
      lessons: [
        { id: "l6", title: "Usability Testing", duration: "20m" },
        { id: "l7", title: "Analyzing Feedback", duration: "15m" },
      ],
    },
  ],
  reviews: [
    {
      id: "r1",
      name: "Samuel Ade",
      rating: 5,
      date: "2025-07-12",
      text: "Great course — practical, clear and actionable.",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    },
    {
      id: "r2",
      name: "Adaobi K.",
      rating: 4,
      date: "2025-06-03",
      text: "Well structured but could use more real examples.",
    },
  ],
};

// Small UI components inside the same file for convenience
const Breadcrumb: React.FC<{ links: { label: string; path?: string }[] }> = ({
  links,
}) => {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      {links.map((link, i) => (
        <span key={i} className="mr-2">
          {i !== 0 && <span className="mx-1 text-gray-300">›</span>}
          {link.path ? (
            <a href={link.path} className="hover:underline">
              {link.label}
            </a>
          ) : (
            <span className="text-gray-700">{link.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

const StarRating: React.FC<{ rating: number; small?: boolean }> = ({ rating, small }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const size = small ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const filled = idx <= full || (half && idx === full + 1);
        return (
          <svg
            key={i}
            className={`${size} ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.965c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.49 2.684c-.785.57-1.84-.196-1.54-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.623 9.393c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69L9.05 2.927z"/>
          </svg>
        );
      })}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const Tabs: React.FC<{
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}> = ({ tabs, active, onChange }) => {
  return (
    <div className="flex items-center space-x-3 border-b mb-6">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`py-3 px-4 -mb-px text-sm font-medium ${
            t === active ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

const AccordionSection: React.FC<{ section: SyllabusSection }> = ({ section }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg p-4 mb-4">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h4 className="font-semibold">{section.title}</h4>
          <p className="text-sm text-gray-500">{section.lessons.length} lessons</p>
        </div>
        <div className="text-gray-500">{open ? '−' : '+'}</div>
      </button>

      {open && (
        <ul className="mt-4 space-y-2">
          {section.lessons.map((l) => (
            <li key={l.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                  ▶
                </div>
                <div>
                  <div className="font-medium">{l.title}</div>
                  <div className="text-sm text-gray-500">{l.duration}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{l.completed ? 'Completed' : ''}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main Page Component
export default function CoursePageBody() {
  const course = mockCourse;
  const [activeTab, setActiveTab] = useState<string>("Overview");

  return (
    <main className="max-w-6xl mx-auto p-6">
      <Breadcrumb
        links={[
          { label: "Home", path: "/" },
          { label: "Categories", path: "/categories" },
          { label: course.title },
        ]}
      />

      <div className="grid grid-cols-12 gap-8">
        {/* Left content (9/12) */}
        <div className="col-span-12 lg:col-span-8">
          {/* Hero */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full md:w-2/3 rounded-2xl shadow-md object-cover max-h-64"
            />

            <div className="w-full md:w-1/3 bg-white border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="text-sm text-gray-500">Instructor</div>
                  <div className="font-semibold">{course.instructor.name}</div>
                  <div className="text-xs text-gray-400">{course.instructor.title}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-2xl font-bold">${course.price.toFixed(2)}</div>
                <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl shadow hover:opacity-95">Enroll Now</button>
                <div className="mt-3 text-sm text-gray-500">{course.duration} • {course.level}</div>

                <div className="mt-4 flex items-center justify-between">
                  <StarRating rating={course.rating} />
                  <div className="text-sm text-gray-500">{course.students.toLocaleString()} students</div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button className="px-3 py-2 border rounded-md text-sm">Share</button>
                  <button className="px-3 py-2 border rounded-md text-sm">Wishlist</button>
                </div>
              </div>
            </div>
          </div>

          {/* Title & Tabs */}
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.subtitle}</p>

          <Tabs
            tabs={["Overview", "Syllabus", "Instructor", "Reviews"]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab content */}
          <div>
            {activeTab === "Overview" && (
              <section className="space-y-6">
                <div className="prose max-w-none">
                  <h3>Course Description</h3>
                  <p>{course.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What you'll learn</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    <li>Foundations of UX design</li>
                    <li>Conducting user research</li>
                    <li>Wireframing & prototyping</li>
                    <li>Usability testing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Instructor</h4>
                  <div className="flex items-start gap-4">
                    <img src={course.instructor.avatar} alt={course.instructor.name} className="h-16 w-16 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{course.instructor.name}</div>
                      <div className="text-sm text-gray-500">{course.instructor.title}</div>
                      <p className="mt-2 text-sm text-gray-600">Experienced UX designer with a decade of product design experience working with startups and large teams to craft delightful experiences.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Syllabus" && (
              <section>
                <h3 className="font-semibold mb-4">Syllabus</h3>
                {course.syllabus.map((s) => (
                  <AccordionSection key={s.id} section={s} />
                ))}
              </section>
            )}

            {activeTab === "Instructor" && (
              <section>
                <h3 className="font-semibold mb-3">About the Instructor</h3>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <img src={course.instructor.avatar} alt={course.instructor.name} className="h-20 w-20 rounded-full object-cover" />
                    <div>
                      <div className="text-lg font-semibold">{course.instructor.name}</div>
                      <div className="text-sm text-gray-500">{course.instructor.title}</div>
                      <p className="mt-2 text-sm text-gray-600">Helen has worked on cross-functional teams designing accessible, user-centered products. She loves mentoring new designers and running workshops.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "Reviews" && (
              <section>
                <h3 className="font-semibold mb-4">Student Reviews</h3>
                <div className="space-y-4">
                  {course.reviews.map((r) => (
                    <div key={r.id} className="bg-white border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <img src={r.avatar || 'https://placehold.co/48x48'} alt={r.name} className="h-12 w-12 rounded-full object-cover" />
                        <div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="font-semibold">{r.name}</div>
                              <div className="text-sm text-gray-500">{new Date(r.date).toLocaleDateString()}</div>
                            </div>
                            <StarRating rating={r.rating} small />
                          </div>
                          <p className="mt-2 text-sm text-gray-700">{r.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="mt-3 px-4 py-2 border rounded-md">Write a review</button>
                </div>
              </section>
            )}
          </div>

          {/* Testimonials Section */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4">What Our Customers Say About Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border rounded-lg p-4">
                <div className="text-sm text-gray-500">“Very helpful course for beginners.”</div>
                <div className="mt-3 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop" className="h-10 w-10 rounded-full object-cover" alt="" />
                  <div className="text-sm font-semibold">Anayo G.</div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <div className="text-sm text-gray-500">“Structured and practical.”</div>
                <div className="mt-3 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop" className="h-10 w-10 rounded-full object-cover" alt="" />
                  <div className="text-sm font-semibold">Bisi O.</div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <div className="text-sm text-gray-500">“I loved the exercises.”</div>
                <div className="mt-3 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop" className="h-10 w-10 rounded-full object-cover" alt="" />
                  <div className="text-sm font-semibold">Chinyere M.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Courses */}
          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4">More Courses Like This</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <img src={course.thumbnail} alt="related" className="h-36 w-full object-cover" />
                  <div className="p-3">
                    <div className="font-semibold">Beginner's Guide to Design</div>
                    <div className="text-sm text-gray-500 mt-1">$29.00 • 3.5h</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar (4/12) */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-2xl font-bold">${course.price.toFixed(2)}</div>
              <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl shadow">Start Course</button>
              <div className="mt-3 text-sm text-gray-500">Secure payment • 30-day money-back</div>
            </div>

            <div className="bg-white border rounded-2xl p-4 shadow-sm">
              <div className="text-sm text-gray-500">Course details</div>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>Duration: {course.duration}</li>
                <li>Level: {course.level}</li>
                <li>Students: {course.students.toLocaleString()}</li>
                <li>Rating: {course.rating} / 5</li>
              </ul>
            </div>

            <div className="bg-white border rounded-2xl p-4 shadow-sm">
              <div className="text-sm text-gray-500">Share</div>
              <div className="mt-3 flex items-center gap-2">
                <button className="p-2 border rounded-md">FB</button>
                <button className="p-2 border rounded-md">TW</button>
                <button className="p-2 border rounded-md">LI</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
