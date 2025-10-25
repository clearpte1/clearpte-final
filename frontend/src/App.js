// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import theme from './theme';
// import { User } from './types/user';
// import {
//   Header,
//   HomePage,
//   LoginModal,
//   Dashboard,
//   PracticeTests,
//   StudyMaterials,
//   ProgressTracking,
//   Profile
// } from './components';

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   const handleLogin = (credentials: { email: string; password: string }) => {
//     setUser({
//       name: credentials.email.split('@')[0],
//       email: credentials.email,
//       avatar: 'https://images.pexels.com/photos/5303547/pexels-photo-5303547.jpeg',
//       progress: {
//         totalTests: 15,
//         completedTests: 8,
//         averageScore: 78,
//         strongAreas: ['Reading', 'Listening'],
//         weakAreas: ['Speaking', 'Writing'],
//       }
//     });
//     setIsLoggedIn(true);
//     setLoginOpen(false);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setIsLoggedIn(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <div className="App">
//           <Header 
//             isLoggedIn={isLoggedIn}
//             user={user}
//             onLoginClick={() => setLoginOpen(true)}
//             onLogout={handleLogout}
//           />
//           <Routes>
//             <Route 
//               path="/" 
//               element={
//                 isLoggedIn ? (
//                   <Dashboard user={user} />
//                 ) : (
//                   <HomePage onGetStarted={() => setLoginOpen(true)} />
//                 )
//               } 
//             />
//             <Route 
//               path="/practice" 
//               element={<PracticeTests user={user} />} 
//             />
//             <Route 
//               path="/materials" 
//               element={<StudyMaterials user={user} />} 
//             />
//             <Route 
//               path="/progress" 
//               element={<ProgressTracking user={user} />} 
//             />
//             <Route 
//               path="/profile" 
//               element={<Profile user={user} setUser={setUser} />} 
//             />
//           </Routes>
//           <LoginModal 
//             open={loginOpen}
//             onClose={() => setLoginOpen(false)}
//             onLogin={handleLogin}
//           />
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;