"use client";
import React, { useState } from "react";
import styles from "./about.module.css";

function AboutPage() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback({ name: "", email: "", message: "", rating: 5 });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>About Long Power</h1>
        <p className={styles.subtitle}>Your Complete Fitness Companion</p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Section 1: What We Do */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.sectionText}>
              Long Power is a comprehensive fitness tracking platform designed
              to help you achieve your health and wellness goals. We provide
              powerful tools to monitor your daily activities, track your
              progress, and stay motivated on your fitness journey.
            </p>
            <p className={styles.sectionText}>
              Our platform offers personalized workout plans, calorie intake
              tracking, sleep monitoring, water consumption tracking, and
              detailed progress reports. Whether you're a beginner starting your
              fitness journey or an experienced athlete optimizing your
              performance, Long Power adapts to your needs.
            </p>
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <h3>Workout Tracking</h3>
                <p>
                  Log your exercises and monitor your performance with detailed
                  analytics
                </p>
              </div>
              <div className={styles.featureItem}>
                <h3>Health Metrics</h3>
                <p>Monitor sleep, water intake, steps, and weight progress</p>
              </div>
              <div className={styles.featureItem}>
                <h3>Progress Reports</h3>
                <p>
                  Visualize your journey with comprehensive reports and insights
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className={styles.feedbackSection}>
          <div className={styles.feedbackContent}>
            <h2 className={styles.sectionTitle}>Share Your Feedback</h2>
            <p className={styles.feedbackSubtitle}>
              We value your opinion. Help us improve by sharing your experience
              with Long Power.
            </p>

            {submitted ? (
              <div className={styles.successMessage}>
                <p>Thank you for your feedback! We appreciate your input.</p>
              </div>
            ) : (
              <form className={styles.feedbackForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={feedback.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={feedback.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="rating">Rating</label>
                  <select
                    id="rating"
                    name="rating"
                    value={feedback.rating}
                    onChange={(e) =>
                      setFeedback({
                        ...feedback,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className={styles.ratingSelect}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="3">⭐⭐⭐ Average</option>
                    <option value="2">⭐⭐ Poor</option>
                    <option value="1">⭐ Very Poor</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    value={feedback.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Share your thoughts, suggestions, or report issues..."
                  />
                </div>

                <button type="submit" className={styles.submitButton}>
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
