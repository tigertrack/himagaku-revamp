'use client';

import { useState } from 'react';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import awsconfig from '../../aws-export';

const userPool = new CognitoUserPool({
  UserPoolId: awsconfig.userPoolId || '',
  ClientId: awsconfig.userPoolWebClientId || '',
});

import React from 'react'
import Link from 'next/link';
const page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setverificationCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showVerification, setShowVerification] = useState(false)

  const handleSignUp = (event: React.FormEvent) => {
    setErrorMessage("")
    event.preventDefault();
    
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        if (err instanceof Error && (err as any).code === 'UsernameExistsException') {
          setShowVerification(true)
        } else {
          console.error(err.message);
          setErrorMessage(err.message);
        }
        return;
      }
      if (result) {
        console.log('user name is ' + result.user.getUsername());
      }
    });
  };

  const handleVerify = (event: React.FormEvent) => {
    setErrorMessage("")
    event.preventDefault();
    
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.error(err);
        setErrorMessage(err.message);
        return;
      }
      
      console.log('call result: ' + result);
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <main className="p-4 flex flex-col sm:items-center md:w-3/12">
        <h1 className="text-4xl mb-2">Create new account</h1>
        <h3 className="text-2xl font-light text-gray-500 leading-loose">
          Looking forward to have you onboard!
        </h3>
        {showVerification ? <form className="flex flex-col gap-5 mt-5 w-full">
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Verify registration
            </span>
            <input
              type="text"
              id="verify"
              name="verify"
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-teal-400 focus:ring-1"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setverificationCode(e.target.value)}
            />
            <small className='mt-2'>We have sent verification code to your email. it should be arrive within minutes.</small>
          </label>
          
          <div className="flex w-full gap-2">
            <button
              onClick={handleVerify}
              disabled={verificationCode.length === 0}
              className="bg-teal-700 hover:bg-teal-700 py-2 rounded-md grow disabled:cursor-not-allowed"
            >
              Verify
            </button>
            
          </div>
        </form> : <form className="flex flex-col gap-5 mt-5 w-full">
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Email
            </span>
            <input
              type="email"
              id="email"
              name="email"
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-teal-400 focus:ring-1"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Password
            </span>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-teal-400 focus:ring-1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Confirm Password
            </span>
            <input
              type="password"
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-teal-400 focus:ring-1"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <div className="flex w-full gap-2">
            <button
              onClick={handleSignUp}
              disabled={password !== confirmPassword || password.length === 0}
              className="bg-teal-700 hover:bg-teal-700 py-2 rounded-md grow disabled:cursor-not-allowed"
            >
              Register
            </button>
            <Link
              href="/login"
              className="text-center outline outline-teal-700 py-2 hover:outline-none hover:bg-teal-700 rounded-md grow"
            >
              Already have an account
            </Link>
          </div>
        </form>}

        {errorMessage.length > 0 && <div className="bg-red-500 mt-4 px-3 py-2 rounded-md w-full">
          {errorMessage}
        </div>}
      </main>
    </div>
  )
}

export default page