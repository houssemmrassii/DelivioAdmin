import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../firebaseConfig'; // Adjust the path based on your project structure
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing passwords

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

      // Save user data to Firestore
      await addDoc(collection(db, 'users'), {
        firstName,
        lastName,
        email,
        hashedPassword,
        agreePolicy,
      });

      console.log('User registered successfully!');
      
      // Clear form fields after successful signup (optional)
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAgreePolicy(false);
    } catch (error) {
      // Handle error, e.g., display error message to user
    }
  };

  return (
    <div className="wrap-login-page sign-up">
      <div className="flex-grow flex flex-column justify-center gap30">
        <a href="index.html" id="site-logo-inner">
          {/* Your logo component here */}
        </a>
        <div className="login-box">
          <div>
            <h3>Create your account</h3>
            <div className="body-text">Enter your personal details to create an account</div>
          </div>
          <form className="form-login flex flex-column gap24" onSubmit={handleSignup}>
            <div className="flex gap10">
              <input
                className="flex-grow"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="flex-grow"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              className="flex-grow"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="password-input"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="flex justify-between items-center">
              <div className="flex gap10">
                <input
                  type="checkbox"
                  id="signed"
                  checked={agreePolicy}
                  onChange={(e) => setAgreePolicy(e.target.checked)}
                />
                <label className="body-text" htmlFor="signed">
                  Agree with Privacy Policy
                </label>
              </div>
            </div>
            <button type="submit" className="tf-button w-full">
              Sign Up
            </button>
          </form>
          <div>
            <div className="text-tiny mb-16 text-center">Or continue with social account</div>
            <div className="flex gap16 mobile-wrap">
              {/* Add social login buttons here */}
              <Link to="/" className="tf-button style-2 w-full">
                {/* Example Google Sign In Button */}
                <span className="tf-color-3">Sign in with Google</span>
              </Link>
              <Link to="/" className="tf-button style-2 w-full">
                {/* Example Facebook Sign In Button */}
                <span className="tf-color-3">Sign in with Facebook</span>
              </Link>
            </div>
          </div>
          <div className="body-text text-center">
            Already have an account? <Link to="/login" className="body-text tf-color">Login Now</Link>
          </div>
        </div>
      </div>
      <div className="text-tiny">Copyright © 2024 Remos, All rights reserved.</div>
    </div>
  );
};

export default SignupPage;
