import App from "../App";
import { Navigate } from "react-router";
import Placerouter from "../pages/login/Placerouter";
import NotFound from "../pages/notFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ChangePassword from "../pages/Changepassword/Changepassword";
import Layout from "../pages/layout/Layout";
import Menu from "../pages/01_Organization/01.menu/Menu";
import RoleAdmin from "../pages/01_Organization/02.RoleAdmin/RoleAdmin";
import Department from "../pages/01_Organization/03.department/Department";
import Staff from "../pages/02_WorkersManage/staff/Staff";
import ExamPaper from "../pages/03_TestManage/01.exampaper/ExamPaper";
import Question from "../pages/03_TestManage/02.question/Question";
import TypeTest from "../pages/03_TestManage/03.typetest/TypeTest";
import Plan from "../pages/04_ExamManage/01.plan/Plan";
import Query from "../pages/04_ExamManage/02.query/Query";
import Affair from "../pages/04_ExamManage/03.affair/Affair";
import ScoreInquiry from "../pages/05_ResultManage/01.scoreinquiry/ScoreInquiry";
import ScoreRecorded from "../pages/05_ResultManage/02.scorerecorded/ScoreRecorded";
import EntryRecorded from "../pages/05_ResultManage/03.entryrecorded/EntryRecorded";
import TaskSchedule from "../pages/06_ClassManage/01.taskschedule/TaskSchedule";
import TeacherSchedule from "../pages/06_ClassManage/02.teacherschedule/TeacherSchedule";
import ClassSchedule from "../pages/06_ClassManage/03.classSchedule/ClassSchedule";
import ChangeCourse from "../pages/06_ClassManage/04.changecourse/ChangeCourse";
import CourseSetting from "../pages/07_EducationManage/01.coursesetting/CourseSetting";
import Class from "../pages/07_EducationManage/02.class/Class";
import Student from "../pages/07_EducationManage/03.student/Student";
import CourseAdmin from "../pages/07_EducationManage/04.courseAdmin/CourseAdmin";
import ClassRoom from "../pages/07_EducationManage/05.classroom/ClassRoom";
import Subject from "../pages/07_EducationManage/06.subject/Subject";
import Grade from "../pages/07_EducationManage/07.grade/Grade";
import Term from "../pages/07_EducationManage/08.term/Term";

const routes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        {/* 个人中心 */}
        <Route path="/profile" element={<Profile />}></Route>
        {/* 修改密码 */}
        <Route path="/changepassword" element={<ChangePassword />}></Route>
        {/* 组织管理 */}
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/role" element={<RoleAdmin />}></Route>
        <Route path="/department" element={<Department />}></Route>
        {/* 职工管理 */}
        <Route path="/staff" element={<Staff />}></Route>
        {/* 试题管理 */}
        <Route path="/exampaper" element={<ExamPaper />}></Route>
        <Route path="/question" element={<Question />}></Route>
        <Route path="/typetest" element={<TypeTest />}></Route>
        {/* 考试管理 */}
        <Route path="/plan" element={<Plan />}></Route>
        <Route path="/query" element={<Query />}></Route>
        <Route path="/affair" element={<Affair />}></Route>
        {/* 成绩管理 */}
        <Route path="/scoreinquiry" element={<ScoreInquiry />}></Route>
        <Route path="/scorerecorded" element={<ScoreRecorded />}></Route>
        <Route path="/entryrecorded" element={<EntryRecorded />}></Route>
        {/* 课表管理 */}
        <Route path="/taskschedule" element={<TaskSchedule />}></Route>
        <Route path="/teacherschedule" element={<TeacherSchedule />}></Route>
        <Route path="/classschedule" element={<ClassSchedule />}></Route>
        <Route path="/changecourse" element={<ChangeCourse />}></Route>
        {/* 教务管理 */}
        <Route path="/coursesetting" element={<CourseSetting />}></Route>
        <Route path="/class" element={<Class />}></Route>
        <Route path="/student" element={<Student />}></Route>
        <Route path="/courseadmin" element={<CourseAdmin />}></Route>
        <Route path="/classroom" element={<ClassRoom />}></Route>
        <Route path="/subject" element={<Subject />}></Route>
        <Route path="/grade" element={<Grade />}></Route>
        <Route path="/term" element={<Term />}></Route>
      </Route>
      {/* 404页面 */}
      <Route path="*" element={<NotFound />}></Route>
      {/* 登录页面 */}
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </Router>
);

export default routes;
