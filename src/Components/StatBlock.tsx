
import './ComponentStyles/StactBlock.css'

const stats = [
  { value: '500+', title: 'Courses by our best mentors' },
  { value: '300+', title: 'Expert Instructors' },
  { value: '1000+', title: 'Enrolled Students' },
  { value: '50+', title: 'Active Programs' },
];

const StatBlock: React.FC = () => {
  return (
    <div className="stat-block">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`stat-item ${index < stats.length - 1 ? 'with-border' : ''}`}
        >
          <div className="stat-value">{stat.value}</div>
          <div className="stat-title">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StatBlock;


