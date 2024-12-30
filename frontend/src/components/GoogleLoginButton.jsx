import React, { useEffect } from "react";

const GoogleLoginButton = () => {
  // Handle the login response
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token:", response.credential);

    // You can send this token to your backend for validation
  };

  useEffect(() => {
    // Ensure the Google API is loaded before trying to initialize
    if (window.google && window.google.accounts) {
      // Initialize the Google Sign-In button
      window.google.accounts.id.initialize({
        client_id: "YOUR_CLIENT_ID", // Replace with your Google client ID
        callback: handleCredentialResponse,
      });

      // Render the button
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-button"),
        { theme: "outline", size: "large" } // Customize button options
      );
    } else {
      console.error("Google API not loaded. Make sure you have included the script.");
    }
  }, []);

  return (
    <div>
      <h1>Google Login</h1>
      {/* Google login button container */}
      <div id="google-login-button"></div>
    </div>
  );
};

export default GoogleLoginButton;
