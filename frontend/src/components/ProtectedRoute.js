import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('role'); // Kullanıcı rolünü al
  console.log("User Role from localStorage:", userRole); // Debug için
  console.log("Required Role:", requiredRole); // Debug için

  // Eğer kullanıcı rolü yoksa veya eşleşmiyorsa NotFound sayfasına yönlendir
  if (!userRole || userRole !== requiredRole) {
    return <Navigate to="/notfound" />;
  }

  return children; // Yetkiliyse içeriği render et
};

export default ProtectedRoute;