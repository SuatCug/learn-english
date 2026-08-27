import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ScrollToTop from '@/components/ScrollToTop';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import HomePage from '@/pages/HomePage';
import CategoryLevelsPage from '@/pages/CategoryLevelsPage';
import LevelCategoriesPage from '@/pages/LevelCategoriesPage';
import TopicListPage from '@/pages/TopicListPage';
import InfoPage from '@/pages/InfoPage';
import LessonPage from '@/pages/LessonPage';
import PlacementTestPage from '@/pages/PlacementTestPage';
import ProfilePage from '@/pages/ProfilePage';
import EditProfilePage from '@/pages/EditProfilePage';
import ClassroomsListPage from '@/pages/ClassroomsListPage';
import ClassroomDetailPage from '@/pages/ClassroomDetailPage';
import ClassroomStudentsPage from '@/pages/ClassroomStudentsPage';
import LiveGamePage from '@/pages/LiveGamePage';

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
          path="/classrooms"
          element={
            <RequireAuth>
              <ClassroomsListPage />
            </RequireAuth>
          }
        />
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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
