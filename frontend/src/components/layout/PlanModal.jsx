import { useState } from 'react';

export default function PlanModal({ open, onClose }) {
  const [showUpgradeNote, setShowUpgradeNote] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setShowUpgradeNote(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">Creating a room is a Premium feature</h3>
        <p className="text-sm text-gray-500 mb-6 text-center">Compare modes and pick what works for you.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 p-5 flex flex-col">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Normal Mode</p>
            <p className="text-2xl font-extrabold text-gray-900 mb-4">Free</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6 flex-1">
              <li>✓ All lessons &amp; exercises</li>
              <li>✓ Placement test</li>
              <li>✓ Join a classroom with a code</li>
              <li>✓ Track your own progress</li>
            </ul>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm px-4 py-2.5 hover:bg-gray-50 transition-colors"
            >
              Continue with Normal Mode
            </button>
          </div>

          <div className="relative rounded-xl border-2 border-emerald-400 p-5 flex flex-col">
            <span className="absolute -top-3 left-5 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Teacher
            </span>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Premium Mode</p>
            <p className="text-2xl font-extrabold text-gray-900 mb-4">
              $9.99<span className="text-sm font-medium text-gray-400">/month</span>
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6 flex-1">
              <li>✓ Everything in Normal Mode</li>
              <li>✓ Create unlimited classrooms</li>
              <li>✓ Assign lessons to students</li>
              <li>✓ Track every student's results</li>
            </ul>
            {!showUpgradeNote ? (
              <button
                type="button"
                onClick={() => setShowUpgradeNote(true)}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 transition-colors"
              >
                Upgrade to Premium
              </button>
            ) : (
              <p className="text-xs text-gray-500 text-center px-1">
                Payments aren't set up yet — ask an admin to enable Premium on your account.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
