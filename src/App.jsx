import React from 'react';
import { MotionConfig } from 'motion/react';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LandingPage />
    </MotionConfig>
  );
}