
import './Header3.css';
import Logo from '../../assets/logo/Logo.png'
import { AiOutlineStar } from "react-icons/ai";

const Header3: React.FC = () => {
  return (
    <header className="header">
      <div className="nav">
        <img src={Logo} alt="Byway Logo" className="logo" />
     <div className='nav-left'>
        < AiOutlineStar size={24} /> 
        <h3>Providing Rating</h3>
     </div>
      
      </div>

    </header>
  );
};

export default Header3;