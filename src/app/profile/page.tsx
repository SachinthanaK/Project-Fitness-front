"use client";
import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { toast } from "react-toastify";

interface ProfileData {
  name: string;
  email: string;
  age: number;
  height: number | null;
  weight: number | null;
  goal: string;
  gender: string;
  activityLevel: string;
  dob: string;
  stats: {
    workoutsCompleted: number;
    totalCaloriesBurned: number;
    averageSteps: number;
    streakDays: number;
  };
  recentActivity: Array<{
    id: number;
    type: string;
    name: string;
    date: string;
    duration?: string;
    calories?: number;
    steps?: number;
  }>;
}

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    age: 0,
    height: 0,
    weight: 0,
    goal: "",
    gender: "",
    activityLevel: "",
    dob: "",
    stats: {
      workoutsCompleted: 0,
      totalCaloriesBurned: 0,
      averageSteps: 0,
      streakDays: 0,
    },
    recentActivity: [],
  });

  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    dob: "",
    height: 0,
    weight: 0,
    goal: "",
    activityLevel: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/user/profile",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.ok) {
        setProfile(data.data);
        setEditedProfile({
          name: data.data.name,
          email: data.data.email,
          dob: data.data.dob,
          height: data.data.height || 0,
          weight: data.data.weight || 0,
          goal: data.data.goal,
          activityLevel: data.data.activityLevel,
        });
      } else {
        toast.error("Failed to fetch profile data", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error loading profile", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editedProfile),
        }
      );

      const data = await response.json();

      if (data.ok) {
        toast.success("Profile updated successfully", {
          position: "top-center",
        });
        setIsEditing(false);
        fetchUserProfile(); // Refresh profile data
      } else {
        toast.error(data.message || "Failed to update profile", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile", { position: "top-center" });
    }
  };

  const handleCancel = () => {
    setEditedProfile({
      name: profile.name,
      email: profile.email,
      dob: profile.dob,
      height: profile.height || 0,
      weight: profile.weight || 0,
      goal: profile.goal,
      activityLevel: profile.activityLevel,
    });
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h1 className={styles.pageTitle}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.contentWrapper}>
        {/* Profile Card - Full Width */}
        <div className={`${styles.profileCard} ${styles.fullWidth}`}>
          <div className={styles.profileTop}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                <span className={styles.avatarText}>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <button className={styles.changePhotoBtn}>Change Photo</button>
            </div>

            <div className={styles.profileInfo}>
              {!isEditing ? (
                <>
                  <h2 className={styles.userName}>{profile.name}</h2>
                  <p className={styles.userEmail}>{profile.email}</p>
                  <p className={styles.userBio}>
                    {profile.age} years old | {profile.gender} |{" "}
                    {profile.activityLevel}
                  </p>
                  <button className={styles.editBtn} onClick={handleEdit}>
                    Edit Profile
                  </button>
                </>
              ) : (
                <div className={styles.editForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedProfile.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={editedProfile.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Activity Level</label>
                      <select
                        name="activityLevel"
                        value={editedProfile.activityLevel}
                        onChange={handleChange}
                      >
                        <option value="sedentary">Sedentary</option>
                        <option value="lightly active">Lightly Active</option>
                        <option value="moderately active">
                          Moderately Active
                        </option>
                        <option value="very active">Very Active</option>
                        <option value="extra active">Extra Active</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.editActions}>
                    <button className={styles.saveBtn} onClick={handleSave}>
                      Save Changes
                    </button>
                    <button className={styles.cancelBtn} onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {profile.stats.workoutsCompleted}
              </div>
              <div className={styles.statLabel}>Workouts</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {profile.stats.totalCaloriesBurned.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Calories Burned</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {profile.stats.averageSteps.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Avg Steps/Day</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{profile.stats.streakDays}</div>
              <div className={styles.statLabel}>Day Streak 🔥</div>
            </div>
          </div>
        </div>

        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Body Metrics */}
          <div className={styles.metricsCard}>
            <h3 className={styles.cardTitle}>Body Metrics</h3>
            <div className={styles.metricsGrid}>
              {!isEditing ? (
                <>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Height</span>
                    <span className={styles.metricValue}>
                      {profile.height || "N/A"} {profile.height ? "cm" : ""}
                    </span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Weight</span>
                    <span className={styles.metricValue}>
                      {profile.weight || "N/A"} {profile.weight ? "kg" : ""}
                    </span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Goal</span>
                    <span className={styles.metricValue}>{profile.goal}</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricLabel}>Gender</span>
                    <span className={styles.metricValue}>{profile.gender}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={editedProfile.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={editedProfile.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Fitness Goal</label>
                    <select
                      name="goal"
                      value={editedProfile.goal}
                      onChange={handleChange}
                    >
                      <option value="weightLoss">Weight Loss</option>
                      <option value="weightGain">Weight Gain</option>
                      <option value="muscleGain">Muscle Gain</option>
                      <option value="general">General Fitness</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className={styles.settingsCard}>
            <h3 className={styles.cardTitle}>Account Settings</h3>
            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <span>Email Notifications</span>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <span>Push Notifications</span>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <span>Weekly Progress Reports</span>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingItem}>
                <span>Make Profile Public</span>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
            <div className={styles.dangerZone}>
              <button className={styles.deleteBtn}>Delete Account</button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Recent Activity */}
          {profile.recentActivity.length > 0 && (
            <div className={styles.activityCard}>
              <h3 className={styles.cardTitle}>Recent Activity</h3>
              <div className={styles.activityList}>
                {profile.recentActivity.map((activity) => (
                  <div key={activity.id} className={styles.activityItem}>
                    <div className={styles.activityIcon}>
                      {activity.type === "Workout"
                        ? "💪"
                        : activity.type === "Calories"
                        ? "🍎"
                        : "👟"}
                    </div>
                    <div className={styles.activityInfo}>
                      <div className={styles.activityName}>{activity.name}</div>
                      <div className={styles.activityDate}>{activity.date}</div>
                    </div>
                    <div className={styles.activityMeta}>
                      {activity.duration && (
                        <span className={styles.activityDuration}>
                          {activity.duration}
                        </span>
                      )}
                      {activity.calories && (
                        <span className={styles.activityCalories}>
                          {activity.calories} cal
                        </span>
                      )}
                      {activity.steps && (
                        <span className={styles.activitySteps}>
                          {activity.steps.toLocaleString()} steps
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
