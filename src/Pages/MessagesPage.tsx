
import Header2 from '../Components/shared/Header2'
import ProfileSidebar from '../Components/shared/ProfileSidebar'
import Footer from '../Components/Layout/Footer'
import Messages from '../Components/Messages' 

const  MessaagesPage: React.FC = () => {
  return (
    <div className="page-root">
      <Header2 />
      <div className="page-body" style={{ display: "flex", gap: 20 }}>
        <ProfileSidebar />
        <main style={{ flex: 1, padding: 24 }}>
          <Messages />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MessaagesPage;