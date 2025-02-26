import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import { User } from "../types/user";
import VerifyUser from "../components/VerifyUser";


  const LoginPage: React.FC = () => {
    const [showVerifyDialog, setShowVerifyDialog] = useState(false);
    const [token, setToken] = useState('');
    
    const handleVerifyUser = () => {
          setShowVerifyDialog(true);
    };

    const navigate = useNavigate();

    return (
      <Layout>
        <div className="hero py-32 bg-gray-700">
          <div className="hero-content grid md:grid-cols-2 gap-8">
            <div className="order-2">
              <img src="#" className="" alt="Hero" />
            </div>
            <div>
              <h1 className="text-5xl font-bold leading-normal text-white">
                Log In
              </h1>
            </div>

                <LoginForm 
                    onUserNotVerified={handleVerifyUser}
                    onSuccess={(nextState = '/games') => {
                        navigate(nextState);
                    }}
                />
                {showVerifyDialog &&
                    <VerifyUser 
                    onDismiss={() => {
                        setShowVerifyDialog(false);
                    }}
                    onSuccess={(nextState = '/games') => {
                        setShowVerifyDialog(false);
                        navigate(nextState);
                    }}
                    />
                }           
          </div>

        </div>              

      </Layout>
    );
  };

  export default LoginPage;