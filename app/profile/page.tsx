"use client";

import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";
import { User, UserRole } from "@/types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    phoneNumber: "",
    email: "",
  });

  // Section State
  const [skills, setSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);

  // Edit Mode State
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  // New Skill Input
  const [newSkill, setNewSkill] = useState("");

  // Options
  const availabilityOptions = [
    "Weekends",
    "Weekdays",
    "Mornings",
    "Afternoons",
    "Evenings",
  ];
  const preferenceOptions = [
    "Environment",
    "Education",
    "Social Causes",
    "Health",
    "Animals",
    "Arts & Culture",
    "Technology",
  ];

  useEffect(() => {
    // Mock data - will connect to API later
    const mockUser: User = {
      id: "1",
      email: "user@example.com",
      username: "volunteer123",
      displayName: "John Doe",
      avatarUrl: undefined,
      bio: "Passionate volunteer dedicated to making a difference in my community.",
      phoneNumber: "+1 (555) 123-4567",
      isEmailVerified: true,
      isActive: true,
      role: UserRole.USER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      xp: 1250,
      level: 5,
    };

    setUser(mockUser);
    setFormData({
      displayName: mockUser.displayName,
      bio: mockUser.bio || "",
      phoneNumber: mockUser.phoneNumber || "",
      email: mockUser.email,
    });

    // Initialize section state
    setSkills(["Gardening", "Teaching", "Event Planning", "Social Media"]);
    setAvailability(["Weekends", "Evenings"]);
    setPreferences(["Environment", "Education", "Social Causes"]);
    setLoading(false);
  }, []);

  const handleSave = () => {
    // TODO: Connect to API
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        displayName: user.displayName,
        bio: user.bio || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleToggleAvailability = (option: string) => {
    if (availability.includes(option)) {
      setAvailability(availability.filter((a) => a !== option));
    } else {
      setAvailability([...availability, option]);
    }
  };

  const handleTogglePreference = (option: string) => {
    if (preferences.includes(option)) {
      setPreferences(preferences.filter((p) => p !== option));
    } else {
      setPreferences([...preferences, option]);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              User not found
            </p>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile and preferences
          </p>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.displayName}
                  </h2>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  @{user.username}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Level{" "}
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {user.level || 1}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      XP{" "}
                    </span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {user.xp || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Display Name"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  disabled
                />
                <Input
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Display Name
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user.displayName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone Number
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user.phoneNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Bio
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user.bio || "No bio yet"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Skills
              {!isEditingSkills && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingSkills(true)}
                >
                  Edit
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {skill}
                  {isEditingSkills && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditingSkills ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill..."
                    className="max-w-xs"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button onClick={handleAddSkill} type="button">
                    Add
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditingSkills(false)}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingSkills(true)}
              >
                Add Skill
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Availability
              {!isEditingAvailability && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingAvailability(true)}
                >
                  Edit
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingAvailability ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleToggleAvailability(option)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                        availability.includes(option)
                          ? "bg-green-100 border-green-200 text-green-700 dark:bg-green-900 dark:border-green-800 dark:text-green-300"
                          : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <Button onClick={() => setIsEditingAvailability(false)}>
                  Save
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {availability.map((avail) => (
                    <span
                      key={avail}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                    >
                      {avail}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setIsEditingAvailability(true)}
                >
                  Update Availability
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Event Preferences
              {!isEditingPreferences && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingPreferences(true)}
                >
                  Edit
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingPreferences ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {preferenceOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleTogglePreference(option)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                        preferences.includes(option)
                          ? "bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900 dark:border-purple-800 dark:text-purple-300"
                          : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <Button onClick={() => setIsEditingPreferences(false)}>
                  Save
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {preferences.map((pref) => (
                    <span
                      key={pref}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setIsEditingPreferences(true)}
                >
                  Update Preferences
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
