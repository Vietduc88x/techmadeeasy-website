import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { About } from './About';

export function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/about#contact', { replace: true });
    requestAnimationFrame(() => document.getElementById('contact')?.scrollIntoView());
  }, [navigate]);

  return <About />;
}
