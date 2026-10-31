import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';
import { GraduationCap, Lock, Mail, User, AlertCircle, Loader2, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register' | 'forgot'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setError('');
    setMessage('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Student',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const trimmedEmail = formData.email.trim().toLowerCase();

      if (activeTab === 'forgot') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match.');
        }

        const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: trimmedEmail,
            newPassword: formData.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Password reset failed.');

        setMessage('Password updated successfully! Please sign in with your new password.');
        setActiveTab('signin');
        setFormData({
          name: '',
          email: trimmedEmail,
          password: '',
          confirmPassword: '',
          role: 'Student',
        });
      } else if (activeTab === 'register') {
        if (!trimmedEmail.endsWith('@camp.ac.in')) {
          throw new Error('Only official college emails ending in @camp.ac.in are allowed to register.');
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match.');
        }

        const result = await register(
          formData.name,
          trimmedEmail,
          formData.password,
          formData.role
        );

        if (!result?.success) {
          throw new Error(result?.error || 'Registration failed.');
        }

        setFormData({
          name: '',
          email: trimmedEmail,
          password: '',
          confirmPassword: '',
          role: 'Student',
        });

        setActiveTab('signin');
        setMessage('Account created successfully! Please sign in.');
      } else {
        const result = await login(trimmedEmail, formData.password);

        if (!result?.success) {
          throw new Error(result?.error || 'Login failed.');
        }

        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl max-w-md w-full p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-2xl shadow-md mb-2">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">CampusFlow</h1>
          <p className="text-xs text-slate-500">Campus Management & Analytics Portal</p>
        </div>

        {/* Tab Switcher */}
        {activeTab !== 'forgot' ? (
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => handleTabSwitch('signin')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <button
              type="button"
              onClick={() => handleTabSwitch('signin')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </button>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">Reset Password</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="student@camp.ac.in"
                value={formData.email}
                onChange={handleChange}
                autoComplete={activeTab === 'signin' ? 'username' : 'off'}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600"
              />
            </div>
            {activeTab !== 'signin' && (
              <p className="text-[11px] text-slate-400 mt-1">
                Must be an official college address ending in <strong>@camp.ac.in</strong>
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase">
                {activeTab === 'forgot' ? 'New Password' : 'Password'}
              </label>
              {activeTab === 'signin' && (
                <button
                  type="button"
                  onClick={() => handleTabSwitch('forgot')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete={activeTab === 'signin' ? 'current-password' : 'new-password'}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {(activeTab === 'register' || activeTab === 'forgot') && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">
                {activeTab === 'forgot' ? 'Confirm New Password' : 'Confirm Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase">Role</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-600 bg-white"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : activeTab === 'signin' ? (
              'Sign In to Dashboard'
            ) : activeTab === 'forgot' ? (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Reset Password</span>
              </>
            ) : (
              'Register Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}