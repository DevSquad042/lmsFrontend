
import instructor1 from '../assets/Images/instructor1.png';
import instructor2 from '../assets/Images/instructor2.png';
import Button from './shared/Buttons';
import './ComponentStyles/Instructor.css';

const InstructorJourney: React.FC = () => {
  return (
    <div className="section-container">
      {/* First Instructor Section */}
      <div className="instuctor">
        <img src={instructor1} alt="Instructor" />
        <div className="text-container">
          <h3>Become an Instructor</h3>
          <p>
            Instructors from around the world teach millions of students on Byway. <br />
            We provide the tools and skills to teach what you love.
          </p>
          <Button className='instructor-button'
            label="Start your Instructor Journey"
            
            showArrow
          />
        </div>
      </div>

      {/* Second Instructor Section */}
      <div className="instuctor">
        <div className="text-container">
          <h3>Transform your life through education</h3>
          <p>
            Learners around the world are launching new careers, advancing in <br />
            their fields, and enriching their lives.
          </p>
          <Button className='instructor-button'
            label="Checkout Courses"
         
            showArrow/>
        </div>
        <img src={instructor2} alt="Instructor" />
      </div>
    </div>
  );
};

export default InstructorJourney;


