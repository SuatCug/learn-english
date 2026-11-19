import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ScrollToTop from '@/components/ScrollToTop';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import HomePage from '@/pages/HomePage';
import CategoryLevelsPage from '@/pages/CategoryLevelsPage';
import LevelCategoriesPage from '@/pages/LevelCategoriesPage';
import TopicListPage from '@/pages/TopicListPage';
import InfoPage from '@/pages/InfoPage';
import LessonPage from '@/pages/LessonPage';
import PlacementTestPage from '@/pages/PlacementTestPage';
import ExamsPage from '@/pages/ExamsPage';
import ExamPage from '@/pages/ExamPage';
import ProfilePage from '@/pages/ProfilePage';
import EditProfilePage from '@/pages/EditProfilePage';
import SchoolPage from '@/pages/SchoolPage';
import ClassroomDetailPage from '@/pages/ClassroomDetailPage';
import ClassroomStudentsPage from '@/pages/ClassroomStudentsPage';
import LiveGamePage from '@/pages/LiveGamePage';
import AiChatPage from '@/pages/AiChatPage';
import AiLevelsPage from '@/pages/AiLevelsPage';
import AiTopicsPage from '@/pages/AiTopicsPage';

function RequireAuth({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/topics/:category"
          element={
            <RequireAuth>
              <CategoryLevelsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/topics/:category/:level"
          element={
            <RequireAuth>
              <TopicListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/levels/:level"
          element={
            <RequireAuth>
              <LevelCategoriesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/info/:slug"
          element={
            <RequireAuth>
              <InfoPage />
            </RequireAuth>
          }
        />
        <Route
          path="/lesson/:topicId"
          element={
            <RequireAuth>
              <LessonPage />
            </RequireAuth>
          }
        />
        <Route
          path="/placement-test"
          element={
            <RequireAuth>
              <PlacementTestPage />
            </RequireAuth>
          }
        />
        <Route
          path="/exams"
          element={
            <RequireAuth>
              <ExamsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/exams/:level"
          element={
            <RequireAuth>
              <ExamPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/school"
          element={
            <RequireAuth>
              <SchoolPage />
            </RequireAuth>
          }
        />
        <Route path="/classrooms" element={<Navigate to="/school" replace />} />
        <Route
          path="/classroom/:id"
          element={
            <RequireAuth>
              <ClassroomDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/classroom/:id/students"
          element={
            <RequireAuth>
              <ClassroomStudentsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/classroom/:id/game/:roomCode"
          element={
            <RequireAuth>
              <LiveGamePage />
            </RequireAuth>
          }
        />
        <Route
          path="/ai-talk"
          element={
            <RequireAuth>
              <AiLevelsPage key="talk" section="talk" />
            </RequireAuth>
          }
        />
        <Route
          path="/ai-talk/level/:level"
          element={
            <RequireAuth>
              <AiTopicsPage key="talk" section="talk" />
            </RequireAuth>
          }
        />
        <Route
          path="/ai-talk/:id"
          element={
            <RequireAuth>
              <AiChatPage />
            </RequireAuth>
          }
        />
        <Route
          path="/ai-chat"
          element={
            <RequireAuth>
              <AiLevelsPage key="chat" section="chat" />
            </RequireAuth>
          }
        />
        <Route
          path="/ai-chat/level/:level"
          element={
            <RequireAuth>
              <AiTopicsPage key="chat" section="chat" />
            </RequireAuth>
          }
        />
        <Route
          path="/ai-chat/:id"
          element={
            <RequireAuth>
              <AiChatPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
