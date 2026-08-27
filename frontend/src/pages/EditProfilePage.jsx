import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Lock, Save, ShieldAlert, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PasswordField from '@/components/auth/PasswordField';
import {
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} from '@/services/usersApi';
import { setCredentials, logout } from '@/app/authSlice';
import { getErrorMessage } from '@/lib/getErrorMessage';

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <Icon size={18} />
      </span>
      <div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function ProfileInfoForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const data = await updateProfile({ name, email }).unwrap();
      dispatch(setCredentials({ user: data.data.user, token }));
      setSuccess(true);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-100 p-6 space-y-4">
      <SectionHeader icon={User} title="Profile Information" subtitle="Update your personal information." />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
          Name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2.5 text-[15px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2.5 text-[15px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {error && <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>}
      {success && (
        <p className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
          <CheckCircle2 size={16} />
          Profile updated.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 text-sm transition-colors"
      >
        <Save size={16} />
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

function ChangePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-100 p-6 space-y-4">
      <SectionHeader icon={Lock} title="Change Password" subtitle="Choose a strong password to keep your account safe." />

      <PasswordField
        id="currentPassword"
        label="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        autoComplete="current-password"
      />
      <PasswordField
        id="newPassword"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="At least 6 characters"
        autoComplete="new-password"
      />
      <PasswordField
        id="confirmNewPassword"
        label="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />

      {error && <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>}
      {success && (
        <p className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
          <CheckCircle2 size={16} />
          Password updated.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 text-sm transition-colors"
      >
        <Lock size={16} />
        {isLoading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
}

function DeleteAccountForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const canSubmit = password && confirmText.trim().toUpperCase() === 'DELETE';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await deleteAccount({ password }).unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-6 space-y-4">
      <div className="flex items-start gap-3">
        <span className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <ShieldAlert size={18} />
        </span>
        <div>
          <h2 className="text-base font-bold text-rose-600">Danger Zone</h2>
          <p className="text-sm text-gray-500 mt-1">
            Permanently deletes your account, progress, and badges. If you teach any classrooms, those classrooms and
            their assignments are deleted too. This can't be undone.
          </p>
        </div>
      </div>

      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-white text-rose-600 text-sm font-semibold px-5 py-2.5 hover:bg-rose-50 transition-colors"
        >
          <Trash2 size={16} />
          Delete Account
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white border border-rose-100 p-4">
          <p className="text-sm font-semibold text-gray-900">
            Are you sure? This will permanently delete your account and everything in it.
          </p>

          <PasswordField
            id="deletePassword"
            label="Confirm your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <div>
            <label htmlFor="confirmDelete" className="block text-sm font-medium text-gray-700 mb-1.5">
              Type DELETE to confirm
            </label>
            <input
              id="confirmDelete"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[15px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
            />
          </div>

          {error && (
            <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              <Trash2 size={16} />
              {isLoading ? 'Deleting...' : 'Permanently Delete My Account'}
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirming(false);
                setPassword('');
                setConfirmText('');
                setError('');
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pb-20 pt-10 flex-1 w-full">
        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium px-3 py-1.5 hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Profile
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Edit Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account information and security settings.</p>

        <div className="mt-6 space-y-6">
          <ProfileInfoForm />
          <ChangePasswordForm />
          <DeleteAccountForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
