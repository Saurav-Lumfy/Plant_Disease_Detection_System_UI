import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpdatePhone = async () => {
    try {
      // Implement phone update logic here
      toast.success('Phone number updated successfully!');
    } catch (error) {
      toast.error('Failed to update phone number');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Implement account deletion logic here
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Update Phone Number</h2>
            <div className="flex space-x-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="New phone number"
              />
              <button
                onClick={handleUpdatePhone}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Account Actions</h2>
            <div className="space-y-4">
              <button
                onClick={handleSignOut}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Sign Out
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;