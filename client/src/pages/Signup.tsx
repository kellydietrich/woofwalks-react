import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate }from "react-router-dom";
import Layout from "../components/Layout";
import RegisterUserForm from "../components/RegisterUser";


  const SignupPage: React.FC = () => {
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
                Sign Up (Register User)
              </h1>
            </div>
                <RegisterUserForm
                onRegistrationSuccess={() => {
                  navigate("/login")
                }}/>
          </div>
        </div>              

      </Layout>
    );
  };

  export default SignupPage;