// import './App.css'
// import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import SignupLearner from "./components/Pages/Signup/SignupLearner";
import LoginLearner from "./components/Pages/Login/LoginLearner";
import CoursePage from "./components/Pages/Course";
import SignupInstructorPage from "./components/Pages/Signup/SignupInstructor";
import LoginInstructorPage from "./components/Pages/Login/LoginInstructor";
import CourseDetails from "./components/Pages/Course/CourseDetails";
import LearnerDashboard from "./components/Pages/LearnerDashboard";
import { useState } from "react";
import Profile from "./components/Pages/LearnerDashboard/Profile";
// import { styles } from "./style";

function App() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const dummyItems = [
    "Course 1",
    "Course 2",
    "Course 3",
    // ... Add more items as needed
  ];
  const handleRemoveFromWishlist = (item: string) => {
    setWishlistItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupLearner />} />
        <Route path="/login" element={<LoginLearner />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/course-details/:id" element={ <CourseDetails /> } />
        {/* <Route path="/courses" element={<CoursePage />} /> */}
        <Route path="/instructor/signup" element={<SignupInstructorPage />} />
        <Route path="/instructor/login" element={<LoginInstructorPage />} />

        <Route path="/learner/dashboard" element={<LearnerDashboard />} />
        <Route path="learner/dashboard/profile" element={<Profile />} />
        {/* <Route
          path="/wishlist"
          element={
            <WishlistIcon
              items={dummyItems}
              onRemove={handleRemoveFromWishlist}
            />
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
