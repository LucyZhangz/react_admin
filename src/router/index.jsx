import App from "../App";
import NotFound from "../pages/notFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Layout from "../pages/layout/Layout";
import Basic from "../pages/Basic/Basic";
import Changetpassword from "../pages/Changetpassword/Changetpassword";
import RoleAdmin from "../pages/RoleAdmin/RoleAdmin";
const routes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Basic />}></Route>
        <Route path="/password" element={<Changetpassword />}></Route>
        {/* <Route path="/menu" element={<Menu />}></Route> */}
        <Route path="/role" element={<RoleAdmin />}></Route>
        {/* <Route path="/role" element={<RoleAdmin />}></Route> */}
        {/* <Route path="/department" element={<Department />}></Route> */}
        {/* <Route path="/staff" element={<Staff />}></Route> */}
        {/* <Route path="/exampaper" element={<ExamPaper />}></Route> */}
        {/* <Route path="/question" element={<Question />}></Route> */}
        {/* <Route path="/typetest" element={<TypeTest />}></Route> */}
        {/* <Route path="/plan" element={<TypeTest />}></Route> */}
        {/* <Route path="/query" element={<Query />}></Route> */}
        {/* <Route path="/affair" element={<Affair />}></Route> */}
        {/* <Route path="/scoreinquiry" element={<ScoreInquiry />}></Route> */}
        {/* <Route path="/recorded" element={<ScoreRecorded />}></Route> */}
        {/* <Route path="/entryrecorded" element={<EntryRecorded />}></Route> */}
        {/* <Route path="/taskschedule" element={<TaskSchedule />}></Route> */}
        {/* <Route path="/teacherschedule" element={<TeacherSchedule />}></Route> */}
        {/* <Route path="/changecourse" element={<ChangeCourse />}></Route> */}
        {/* <Route path="/coursesetting" element={<CourseSetting />}></Route> */}
        {/* <Route path="/class" element={<Class />}></Route> */}
        {/* <Route path="/student" element={<Student />}></Route> */}
        {/* <Route path="/classroom" element={<ClassRoom />}></Route> */}
        {/* <Route path="/subject" element={<Subject />}></Route> */}
        {/* <Route path="/grade" element={<Grade />}></Route> */}
        {/* <Route path="/term" element={<Term />}></Route> */}
      </Route>
      <Route path="/not" element={<NotFound />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route path="/home" element={<Home />}></Route>
    </Routes>
  </Router>
);

export default routes;
