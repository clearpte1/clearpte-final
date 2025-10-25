// // All components have been moved to the src/components/ folder for better structure and reusability.
// // Please import components from './components' instead.

// export * from './components';

// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   CardActions,
//   Avatar,
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Chip,
//   LinearProgress,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Paper,
//   Badge,
//   Tabs,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Fab,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   AccountCircle,
//   Dashboard as DashboardIcon,
//   Quiz,
//   Book,
//   TrendingUp,
//   Settings,
//   Logout,
//   PlayArrow,
//   School,
//   Psychology,
//   Download,
//   ExpandMore,
//   Star,
//   Timer,
//   CheckCircle,
//   Add,
//   Mic,
//   Edit,
//   VolumeUp,
//   Visibility,
//   ArrowBack,
// } from '@mui/icons-material';
// import { useNavigate, Link } from 'react-router-dom';

// // Header Component
// // export const Header = ({ isLoggedIn, user, onLoginClick, onLogout }) => {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
// //   const navigate = useNavigate();

// //   const handleMenu = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const handleMobileMenu = (event) => {
// //     setMobileMenuAnchor(event.currentTarget);
// //   };

// //   const handleMobileMenuClose = () => {
// //     setMobileMenuAnchor(null);
// //   };

// //   const handleLogout = () => {
// //     onLogout();
// //     handleClose();
// //     navigate('/');
// //   };

// //   const menuItems = [
// //     { label: 'Home', path: '/' },
// //     ...(isLoggedIn ? [
// //       { label: 'PTE Practice', path: '/practice' },
// //       { label: 'Study Materials', path: '/materials' },
// //       { label: 'Progress', path: '/progress' }
// //     ] : [])
// //   ];

// //   return (
// //     <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
// //       <Toolbar>
// //         <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
// //           <Box
// //             component="img"
// //             src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM0REI2QUMiLz4KPHR2eHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCI+QTwvdGV4dD4KPC9zdmc+"
// //             sx={{ width: 40, height: 40, mr: 2 }}
// //           />
// //           <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
// //             Clear PTE
// //           </Typography>
          
// //           {/* Desktop Navigation */}
// //           <Box sx={{ ml: 4, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
// //             {menuItems.map((item) => (
// //               <Button key={item.path} color="inherit" component={Link} to={item.path}>
// //                 {item.label}
// //               </Button>
// //             ))}
// //           </Box>
// //         </Box>

// //         {/* Desktop Right Side */}
// //         <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
// //           {isLoggedIn ? (
// //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //               <IconButton onClick={handleMenu} sx={{ p: 0 }}>
// //                 <Avatar sx={{ bgcolor: 'primary.main' }}>
// //                   {user?.name?.charAt(0).toUpperCase()}
// //                 </Avatar>
// //               </IconButton>
// //               <Menu
// //                 anchorEl={anchorEl}
// //                 open={Boolean(anchorEl)}
// //                 onClose={handleClose}
// //               >
// //                 <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
// //                   <Settings sx={{ mr: 1 }} /> Profile
// //                 </MenuItem>
// //                 <MenuItem onClick={handleLogout}>
// //                   <Logout sx={{ mr: 1 }} /> Logout
// //                 </MenuItem>
// //               </Menu>
// //             </Box>
// //           ) : (
// //             <Box sx={{ display: 'flex', gap: 2 }}>
// //               <Button color="inherit" onClick={onLoginClick}>Login</Button>
// //               <Button variant="contained" onClick={onLoginClick}>Sign Up</Button>
// //             </Box>
// //           )}
// //         </Box>

// //         {/* Mobile Menu Button */}
// //         <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
// //           {isLoggedIn ? (
// //             <IconButton onClick={handleMenu} sx={{ p: 0 }}>
// //               <Avatar sx={{ bgcolor: 'primary.main' }}>
// //                 {user?.name?.charAt(0).toUpperCase()}
// //               </Avatar>
// //             </IconButton>
// //           ) : (
// //             <IconButton onClick={handleMobileMenu} color="inherit">
// //               <MenuIcon />
// //             </IconButton>
// //           )}
// //         </Box>

// //         {/* Mobile Menu */}
// //         <Menu
// //           anchorEl={mobileMenuAnchor}
// //           open={Boolean(mobileMenuAnchor)}
// //           onClose={handleMobileMenuClose}
// //           sx={{ display: { xs: 'block', md: 'none' } }}
// //         >
// //           {menuItems.map((item) => (
// //             <MenuItem 
// //               key={item.path} 
// //               onClick={() => { 
// //                 navigate(item.path); 
// //                 handleMobileMenuClose(); 
// //               }}
// //             >
// //               {item.label}
// //             </MenuItem>
// //           ))}
// //           {!isLoggedIn && [
// //             <MenuItem key="login" onClick={() => { onLoginClick(); handleMobileMenuClose(); }}>
// //               Login
// //             </MenuItem>,
// //             <MenuItem key="signup" onClick={() => { onLoginClick(); handleMobileMenuClose(); }}>
// //               Sign Up
// //             </MenuItem>
// //           ]}
// //         </Menu>

// //         {/* Logged in user mobile menu */}
// //         {isLoggedIn && (
// //           <Menu
// //             anchorEl={anchorEl}
// //             open={Boolean(anchorEl)}
// //             onClose={handleClose}
// //             sx={{ display: { xs: 'block', md: 'none' } }}
// //           >
// //             {menuItems.map((item) => (
// //               <MenuItem 
// //                 key={item.path} 
// //                 onClick={() => { 
// //                   navigate(item.path); 
// //                   handleClose(); 
// //                 }}
// //               >
// //                 {item.label}
// //               </MenuItem>
// //             ))}
// //             <Divider />
// //             <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
// //               <Settings sx={{ mr: 1 }} /> Profile
// //             </MenuItem>
// //             <MenuItem onClick={handleLogout}>
// //               <Logout sx={{ mr: 1 }} /> Logout
// //             </MenuItem>
// //           </Menu>
// //         )}
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // Hero Section Component
// // const HeroSection = ({ onGetStarted }) => {
// //   return (
// //     <Box
// //       sx={{
// //         background: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
// //         py: 8,
// //         position: 'relative',
// //         overflow: 'hidden',
// //       }}
// //     >
// //       <Container maxWidth="lg">
// //         <Grid container spacing={4} alignItems="center">
// //           <Grid item xs={12} md={6}>
// //             <Typography variant="h1" sx={{ mb: 2, fontWeight: 700 }}>
// //               Practice PTE Academic & PTE Core with{' '}
// //               <Box component="span" sx={{ color: 'primary.main' }}>
// //                 AI Scorings
// //               </Box>{' '}
// //               for{' '}
// //               <Box component="span" sx={{ color: 'secondary.main' }}>
// //                 FREE
// //               </Box>
// //             </Typography>
// //             <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
// //               Join 100,000 PTE test takers to practice
// //             </Typography>
// //             <Button
// //               variant="contained"
// //               size="large"
// //               onClick={onGetStarted}
// //               sx={{ py: 2, px: 4, fontSize: '1.1rem' }}
// //             >
// //               Practice Now
// //             </Button>
// //             <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
// //               <Chip label="NEW" color="secondary" size="small" />
// //               <Typography variant="body2" color="text.secondary">
// //                 AI-powered instant scoring
// //               </Typography>
// //             </Box>
// //           </Grid>
// //           <Grid item xs={12} md={6}>
// //             <Box
// //               component="img"
// //               src="https://images.pexels.com/photos/18069239/pexels-photo-18069239.png"
// //               alt="PTE Practice Platform"
// //               sx={{
// //                 width: '100%',
// //                 height: 'auto',
// //                 borderRadius: 2,
// //                 boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
// //               }}
// //             />
// //           </Grid>
// //         </Grid>
// //       </Container>
// //     </Box>
// //   );
// // };

// // AI Practice Platform Section
// // const AIPracticeSection = () => {
// //   return (
// //     <Container maxWidth="lg" sx={{ py: 8 }}>
// //       <Typography variant="h2" align="center" sx={{ mb: 6 }}>
// //         PTE AI Practice Platform
// //       </Typography>
// //       <Grid container spacing={4} alignItems="center">
// //         <Grid item xs={12} md={6}>
// //           <Card sx={{ p: 3 }}>
// //             <CardContent>
// //               <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
// //                 Speaking & Writing AI Scorings
// //               </Typography>
// //               <List>
// //                 <ListItem>
// //                   <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText primary="Real-time AI feedback" />
// //                 </ListItem>
// //                 <ListItem>
// //                   <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText primary="Evaluate speaking pronunciation & fluency" />
// //                 </ListItem>
// //                 <ListItem>
// //                   <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText primary="Check writing grammar and spelling" />
// //                 </ListItem>
// //                 <ListItem>
// //                   <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText primary="Synchronous practice without delay like a 4.0%" />
// //                 </ListItem>
// //               </List>
// //               <Button variant="outlined" sx={{ mt: 2 }}>
// //                 Practice Now
// //               </Button>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={12} md={6}>
// //           <Box
// //             component="img"
// //             src="https://images.pexels.com/photos/9783353/pexels-photo-9783353.jpeg"
// //             alt="AI Practice Interface"
// //             sx={{
// //               width: '100%',
// //               height: 300,
// //               objectFit: 'cover',
// //               borderRadius: 2,
// //               boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
// //             }}
// //           />
// //         </Grid>
// //       </Grid>
// //     </Container>
// //   );
// // };

// // Study Tools Section
// // const StudyToolsSection = () => {
// //   const tools = [
// //     {
// //       title: 'Vocab Book',
// //       icon: <Book color="primary" />,
// //       description: 'comprehensive vocabulary',
// //       color: '#FF5722'
// //     },
// //     {
// //       title: 'Shadowing',
// //       icon: <VolumeUp color="primary" />,
// //       description: 'improve fluency by mimicking',
// //       color: '#4DB6AC'
// //     },
// //     {
// //       title: 'AI Analysis',
// //       icon: <Psychology color="primary" />,
// //       description: 'smart practice analytics',
// //       color: '#FF9800'
// //     },
// //     {
// //       title: 'View More',
// //       icon: <Add color="primary" />,
// //       description: 'explore more tools',
// //       color: '#9C27B0'
// //     }
// //   ];

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 6 }}>
// //       <Typography variant="h3" align="center" sx={{ mb: 4 }}>
// //         PTE Study Tools
// //       </Typography>
// //       <Grid container spacing={3}>
// //         {tools.map((tool, index) => (
// //           <Grid item xs={12} sm={6} md={3} key={index}>
// //             <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
// //               <Box sx={{ mb: 2 }}>
// //                 <Avatar sx={{ bgcolor: tool.color, mx: 'auto', width: 56, height: 56 }}>
// //                   {tool.icon}
// //                 </Avatar>
// //               </Box>
// //               <Typography variant="h6" sx={{ mb: 1 }}>
// //                 {tool.title}
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 {tool.description}
// //               </Typography>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // };

// // Study Materials Section
// // const StudyMaterialsSection = () => {
// //   return (
// //     <Box sx={{ bgcolor: 'background.default', py: 6 }}>
// //       <Container maxWidth="lg">
// //         <Typography variant="h3" align="center" sx={{ mb: 4 }}>
// //           Download PTE Study Materials
// //         </Typography>
// //         <Card sx={{ p: 4, textAlign: 'center' }}>
// //           <Typography variant="h5" sx={{ mb: 2 }}>
// //             Study Materials
// //           </Typography>
// //           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
// //             Useful study materials created by Clear PTE's PTE teaching experts.
// //           </Typography>
// //           <Button variant="contained" startIcon={<Download />}>
// //             Download
// //           </Button>
// //         </Card>
// //       </Container>
// //     </Box>
// //   );
// // };

// // Knowledge Sections
// // const KnowledgeSections = () => {
// //   const sections = [
// //     {
// //       title: 'PTE Academic Guide',
// //       description: 'What is the meaning of PTE? The full form of PTE is the Pearson Test of English, normally referring to the academic version. It is also known as PTE-A: Pearson Academic.',
// //       link: 'View more'
// //     },
// //     {
// //       title: 'PTE Speaking Guide',
// //       description: 'Read Aloud tips: Read Aloud (RA) is one of the most difficult question types in PTE Speaking. Pronunciation and fluency are much more important in scoring than content.',
// //       link: 'View more'
// //     },
// //     {
// //       title: 'PTE Writing Guide',
// //       description: 'Summarise Written Text exam tips: Summarise Written Text is a simple question type. There are two keys in answering it: first key points in the passage, and is to construct the key points into a grammatically correct sentence.',
// //       link: 'View more'
// //     },
// //     {
// //       title: 'PTE Reading Guide',
// //       description: 'Multiple Choice Single Answer exam tips: The Reading Multiple Choice Single Answer (MCSA) question type requires you to only a very small proportion of the MCSA question type.',
// //       link: 'View more'
// //     },
// //     {
// //       title: 'PTE Listening Guide',
// //       description: 'Summarise Spoken Text exam tips: Summarise Spoken Text (SST) is actually a very simple question type in PTE. Focus on the grammar and spelling of your written answer.',
// //       link: 'View more'
// //     }
// //   ];

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 6 }}>
// //       <Typography variant="h3" align="center" sx={{ mb: 4 }}>
// //         PTE Knowledge
// //       </Typography>
// //       <Grid container spacing={3}>
// //         {sections.map((section, index) => (
// //           <Grid item xs={12} md={6} key={index}>
// //             <Card sx={{ height: '100%', p: 3 }}>
// //               <CardContent>
// //                 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
// //                   {section.title}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// //                   {section.description}
// //                 </Typography>
// //                 <Button size="small" color="primary">
// //                   {section.link} →
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // };

// // Home Page Component
// // export const HomePage = ({ onGetStarted }) => {
// //   return (
// //     <Box>
// //       <HeroSection onGetStarted={onGetStarted} />
// //       <AIPracticeSection />
// //       <StudyToolsSection />
// //       <StudyMaterialsSection />
// //       <KnowledgeSections />
// //     </Box>
// //   );
// // };

// // Login Modal Component
// // export const LoginModal = ({ open, onClose, onLogin }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isSignUp, setIsSignUp] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onLogin({ email, password });
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
// //       <DialogTitle>
// //         {isSignUp ? 'Create Account' : 'Sign In to Clear PTE'}
// //       </DialogTitle>
// //       <form onSubmit={handleSubmit}>
// //         <DialogContent>
// //           <TextField
// //             fullWidth
// //             label="Email"
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             margin="normal"
// //             required
// //           />
// //           <TextField
// //             fullWidth
// //             label="Password"
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             margin="normal"
// //             required
// //           />
// //           {isSignUp && (
// //             <TextField
// //               fullWidth
// //               label="Confirm Password"
// //               type="password"
// //               margin="normal"
// //               required
// //             />
// //           )}
// //         </DialogContent>
// //         <DialogActions sx={{ p: 3, gap: 2 }}>
// //           <Button onClick={onClose}>Cancel</Button>
// //           <Button
// //             type="submit"
// //             variant="contained"
// //             fullWidth
// //           >
// //             {isSignUp ? 'Create Account' : 'Sign In'}
// //           </Button>
// //         </DialogActions>
// //       </form>
// //       <Box sx={{ textAlign: 'center', pb: 2 }}>
// //         <Button
// //           onClick={() => setIsSignUp(!isSignUp)}
// //           color="primary"
// //         >
// //           {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
// //         </Button>
// //       </Box>
// //     </Dialog>
// //   );
// // };

// // Dashboard Component
// // export const Dashboard = ({ user }) => {
// //   const navigate = useNavigate();

// //   const stats = [
// //     { title: 'Total Tests', value: user?.progress?.totalTests || 0, icon: <Quiz color="primary" /> },
// //     { title: 'Completed', value: user?.progress?.completedTests || 0, icon: <CheckCircle color="success" /> },
// //     { title: 'Average Score', value: `${user?.progress?.averageScore || 0}%`, icon: <Star color="warning" /> },
// //     { title: 'Time Saved', value: '24h', icon: <Timer color="info" /> },
// //   ];

// //   const quickActions = [
// //     { title: 'Start Practice Test', icon: <PlayArrow />, action: () => navigate('/practice') },
// //     { title: 'Study Materials', icon: <Book />, action: () => navigate('/materials') },
// //     { title: 'View Progress', icon: <TrendingUp />, action: () => navigate('/progress') },
// //     { title: 'AI Analysis', icon: <Psychology />, action: () => navigate('/practice') },
// //   ];

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Typography variant="h3" sx={{ mb: 4 }}>
// //         Welcome back, {user?.name}!
// //       </Typography>

// //       {/* Stats Cards */}
// //       <Grid container spacing={3} sx={{ mb: 4 }}>
// //         {stats.map((stat, index) => (
// //           <Grid item xs={12} sm={6} md={3} key={index}>
// //             <Card sx={{ p: 3, textAlign: 'center' }}>
// //               <Box sx={{ mb: 2 }}>{stat.icon}</Box>
// //               <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
// //                 {stat.value}
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 {stat.title}
// //               </Typography>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Quick Actions */}
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={8}>
// //           <Card sx={{ p: 3 }}>
// //             <Typography variant="h5" sx={{ mb: 3 }}>
// //               Quick Actions
// //             </Typography>
// //             <Grid container spacing={2}>
// //               {quickActions.map((action, index) => (
// //                 <Grid item xs={12} sm={6} key={index}>
// //                   <Button
// //                     fullWidth
// //                     variant="outlined"
// //                     startIcon={action.icon}
// //                     onClick={action.action}
// //                     sx={{ p: 2, justifyContent: 'flex-start' }}
// //                   >
// //                     {action.title}
// //                   </Button>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </Card>
// //         </Grid>
        
// //         <Grid item xs={12} md={4}>
// //           <Card sx={{ p: 3 }}>
// //             <Typography variant="h6" sx={{ mb: 2 }}>
// //               Progress Overview
// //             </Typography>
// //             <Box sx={{ mb: 2 }}>
// //               <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                 Overall Progress
// //               </Typography>
// //               <LinearProgress 
// //                 variant="determinate" 
// //                 value={(user?.progress?.completedTests / user?.progress?.totalTests) * 100} 
// //                 sx={{ height: 8, borderRadius: 4 }}
// //               />
// //             </Box>
// //             <Box sx={{ mb: 2 }}>
// //               <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
// //                 Strong Areas
// //               </Typography>
// //               {user?.progress?.strongAreas?.map((area, index) => (
// //                 <Chip key={index} label={area} size="small" sx={{ mr: 1, mb: 1 }} />
// //               ))}
// //             </Box>
// //             <Box>
// //               <Typography variant="body2" sx={{ color: 'warning.main', mb: 1 }}>
// //                 Areas for Improvement
// //               </Typography>
// //               {user?.progress?.weakAreas?.map((area, index) => (
// //                 <Chip key={index} label={area} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
// //               ))}
// //             </Box>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </Container>
// //   );
// // };

// // Practice Tests Component
// // export const PracticeTests = ({ user }) => {
// //   const [selectedTab, setSelectedTab] = useState(0);
// //   const [selectedTestType, setSelectedTestType] = useState(null);

// //   const testTypes = [
// //     { 
// //       title: 'Full Length Test', 
// //       duration: '3 hours', 
// //       questions: 79, 
// //       description: 'Complete PTE Academic test simulation',
// //       color: '#4DB6AC'
// //     },
// //     { 
// //       title: 'Speaking Test', 
// //       duration: '30 mins', 
// //       questions: 15, 
// //       description: 'Focus on speaking skills',
// //       color: '#FF5722',
// //       subTests: [
// //         { name: 'Read Aloud', aiScore: true, description: 'Read text aloud with proper pronunciation' },
// //         { name: 'Repeat Sentence', aiScore: true, description: 'Listen and repeat sentences accurately' },
// //         { name: 'Describe Image', aiScore: true, description: 'Describe the image shown in detail' },
// //         { name: 'Re-tell Lecture', aiScore: true, description: 'Summarize academic lecture content' },
// //         { name: 'Answer Short Question', aiScore: true, description: 'Answer factual questions briefly' },
// //         { name: 'Respond to a situation', aiScore: false, core: true, description: 'Respond to given situation appropriately' }
// //       ]
// //     },
// //     { 
// //       title: 'Writing Test', 
// //       duration: '60 mins', 
// //       questions: 12, 
// //       description: 'Essay and summarize tasks',
// //       color: '#2196F3',
// //       subTests: [
// //         { name: 'Summarize Written Text', aiScore: true, description: 'Summarize academic text in one sentence' },
// //         { name: 'Write Essay', aiScore: true, description: 'Write 200-300 word argumentative essay' },
// //         { name: 'Summarize Written Text', aiScore: false, core: true, description: 'Core version summarization task' },
// //         { name: 'Write Email', aiScore: false, core: true, description: 'Write formal or informal email response' }
// //       ]
// //     },
// //     { 
// //       title: 'Reading Test', 
// //       duration: '45 mins', 
// //       questions: 20, 
// //       description: 'Reading comprehension',
// //       color: '#4CAF50',
// //       subTests: [
// //         { name: 'Reading & Writing: Fill in the blanks', description: 'Complete text with appropriate words' },
// //         { name: 'Multiple Choice (Multiple)', description: 'Select multiple correct answers' },
// //         { name: 'Re-order Paragraphs', description: 'Arrange paragraphs in correct sequence' },
// //         { name: 'Reading: Fill in the Blanks', description: 'Complete text with drag-and-drop words' },
// //         { name: 'Multiple Choice (Single)', description: 'Select one correct answer' }
// //       ]
// //     },
// //     { 
// //       title: 'Listening Test', 
// //       duration: '45 mins', 
// //       questions: 18, 
// //       description: 'Audio-based questions',
// //       color: '#FF9800',
// //       subTests: [
// //         { name: 'Summarize Spoken Text', aiScore: true, description: 'Write summary of spoken content' },
// //         { name: 'Multiple Choice (Multiple)', description: 'Select multiple correct answers from audio' },
// //         { name: 'Fill in the Blanks', description: 'Complete transcript while listening' },
// //         { name: 'Highlight Correct Summary', description: 'Choose best summary of audio content' },
// //         { name: 'Multiple Choice (Single)', description: 'Select one correct answer from audio' },
// //         { name: 'Select Missing Word', description: 'Choose word that completes the audio' },
// //         { name: 'Highlight Incorrect Words', description: 'Identify words that differ from audio' },
// //         { name: 'Write From Dictation', description: 'Type the sentence you hear' },
// //         { name: 'Summarize Spoken Text', aiScore: false, core: true, description: 'Core version spoken summary' }
// //       ]
// //     }
// //   ];

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Typography variant="h3" sx={{ mb: 4 }}>
// //         Practice Tests
// //       </Typography>

// //       <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ mb: 3 }}>
// //         <Tab label="Available Tests" />
// //         <Tab label="My Results" />
// //         <Tab label="AI Analysis" />
// //       </Tabs>

// //       {selectedTab === 0 && (
// //         <Box>
// //           {selectedTestType ? (
// //             // Show detailed sub-tests for selected test type
// //             <Box>
// //               <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
// //                 <IconButton onClick={() => setSelectedTestType(null)} sx={{ mr: 2 }}>
// //                   <ArrowBack />
// //                 </IconButton>
// //                 <Typography variant="h4" sx={{ color: selectedTestType.color }}>
// //                   {selectedTestType.title}
// //                 </Typography>
// //               </Box>
              
// //               <Grid container spacing={3}>
// //                 {selectedTestType.subTests?.map((subTest, index) => (
// //                   <Grid item xs={12} md={6} lg={4} key={index}>
// //                     <Card sx={{ 
// //                       p: 2, 
// //                       height: '100%',
// //                       border: `2px solid ${selectedTestType.color}20`,
// //                       borderRadius: 2
// //                     }}>
// //                       <CardContent sx={{ pb: 1 }}>
// //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
// //                           <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
// //                             {subTest.name}
// //                           </Typography>
// //                           <Box sx={{ display: 'flex', gap: 0.5 }}>
// //                             {subTest.aiScore && (
// //                               <Chip 
// //                                 label="AI Score" 
// //                                 size="small" 
// //                                 sx={{ 
// //                                   bgcolor: 'primary.main', 
// //                                   color: 'white',
// //                                   fontSize: '0.7rem',
// //                                   height: 20
// //                                 }} 
// //                               />
// //                             )}
// //                             {subTest.core && (
// //                               <Chip 
// //                                 label="Core" 
// //                                 size="small" 
// //                                 variant="outlined"
// //                                 sx={{ 
// //                                   borderColor: 'secondary.main',
// //                                   color: 'secondary.main',
// //                                   fontSize: '0.7rem',
// //                                   height: 20
// //                                 }} 
// //                               />
// //                             )}
// //                           </Box>
// //                         </Box>
// //                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.4 }}>
// //                           {subTest.description}
// //                         </Typography>
// //                         <Button 
// //                           variant="contained" 
// //                           startIcon={<PlayArrow />} 
// //                           size="small"
// //                           fullWidth
// //                           sx={{ 
// //                             bgcolor: selectedTestType.color,
// //                             '&:hover': { bgcolor: selectedTestType.color + 'CC' }
// //                           }}
// //                         >
// //                           Start Practice
// //                         </Button>
// //                       </CardContent>
// //                     </Card>
// //                   </Grid>
// //                 ))}
// //               </Grid>
              
// //               {selectedTestType.title === 'Full Length Test' && (
// //                 <Card sx={{ mt: 3, p: 4, textAlign: 'center', bgcolor: 'primary.light' }}>
// //                   <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
// //                     Complete PTE Academic Test
// //                   </Typography>
// //                   <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
// //                     Take the full 3-hour PTE Academic test with all sections including Speaking, Writing, Reading, and Listening
// //                   </Typography>
// //                   <Button 
// //                     variant="contained" 
// //                     size="large" 
// //                     startIcon={<PlayArrow />}
// //                     sx={{ py: 2, px: 4 }}
// //                   >
// //                     Start Full Test
// //                   </Button>
// //                 </Card>
// //               )}
// //             </Box>
// //           ) : (
// //             // Show main test type selection
// //             <Grid container spacing={3}>
// //               {testTypes.map((test, index) => (
// //                 <Grid item xs={12} md={6} key={index}>
// //                   <Card 
// //                     sx={{ 
// //                       p: 3, 
// //                       height: '100%',
// //                       cursor: 'pointer',
// //                       border: `2px solid ${test.color}20`,
// //                       transition: 'all 0.3s ease',
// //                       '&:hover': {
// //                         border: `2px solid ${test.color}`,
// //                         transform: 'translateY(-4px)',
// //                         boxShadow: `0 8px 25px ${test.color}30`
// //                       }
// //                     }}
// //                     onClick={() => setSelectedTestType(test)}
// //                   >
// //                     <CardContent>
// //                       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// //                         <Avatar sx={{ bgcolor: test.color, mr: 2, width: 48, height: 48 }}>
// //                           {test.title === 'Full Length Test' ? <Quiz /> :
// //                            test.title === 'Speaking Test' ? <Mic /> :
// //                            test.title === 'Writing Test' ? <Edit /> :
// //                            test.title === 'Reading Test' ? <Book /> :
// //                            <VolumeUp />}
// //                         </Avatar>
// //                         <Box>
// //                           <Typography variant="h6" sx={{ fontWeight: 600 }}>
// //                             {test.title}
// //                           </Typography>
// //                           <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
// //                             <Chip label={test.duration} size="small" sx={{ bgcolor: test.color + '20' }} />
// //                             <Chip label={`${test.questions} questions`} size="small" variant="outlined" />
// //                           </Box>
// //                         </Box>
// //                       </Box>
// //                       <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
// //                         {test.description}
// //                       </Typography>
// //                       {test.subTests && (
// //                         <Typography variant="body2" sx={{ color: test.color, fontWeight: 500 }}>
// //                           {test.subTests.length} question types available →
// //                         </Typography>
// //                       )}
// //                     </CardContent>
// //                   </Card>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           )}
// //         </Box>
// //       )}

// //       {selectedTab === 1 && (
// //         <Card>
// //           <CardContent>
// //             <Typography variant="h6" sx={{ mb: 2 }}>
// //               Recent Test Results
// //             </Typography>
// //             <TableContainer>
// //               <Table>
// //                 <TableHead>
// //                   <TableRow>
// //                     <TableCell>Test Type</TableCell>
// //                     <TableCell>Question Type</TableCell>
// //                     <TableCell>Date</TableCell>
// //                     <TableCell>Score</TableCell>
// //                     <TableCell>Status</TableCell>
// //                     <TableCell>Actions</TableCell>
// //                   </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                   {[
// //                     { type: 'Speaking Test', questionType: 'Read Aloud', date: '2024-01-15', score: 78, status: 'Completed' },
// //                     { type: 'Speaking Test', questionType: 'Describe Image', date: '2024-01-15', score: 82, status: 'Completed' },
// //                     { type: 'Writing Test', questionType: 'Write Essay', date: '2024-01-12', score: 75, status: 'Completed' },
// //                     { type: 'Listening Test', questionType: 'Summarize Spoken Text', date: '2024-01-10', score: 80, status: 'Completed' },
// //                     { type: 'Reading Test', questionType: 'Multiple Choice (Single)', date: '2024-01-08', score: 85, status: 'Completed' },
// //                     { type: 'Speaking Test', questionType: 'Repeat Sentence', date: '2024-01-07', score: 72, status: 'Completed' },
// //                     { type: 'Writing Test', questionType: 'Summarize Written Text', date: '2024-01-05', score: 88, status: 'Completed' },
// //                     { type: 'Listening Test', questionType: 'Write From Dictation', date: '2024-01-03', score: 91, status: 'Completed' },
// //                   ].map((result, index) => (
// //                     <TableRow key={index}>
// //                       <TableCell>{result.type}</TableCell>
// //                       <TableCell>{result.questionType}</TableCell>
// //                       <TableCell>{result.date}</TableCell>
// //                       <TableCell>
// //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                           <Typography variant="body2">{result.score}/90</Typography>
// //                           <Chip 
// //                             label={result.score >= 85 ? 'Excellent' : result.score >= 75 ? 'Good' : 'Needs Practice'} 
// //                             size="small"
// //                             color={result.score >= 85 ? 'success' : result.score >= 75 ? 'warning' : 'error'}
// //                           />
// //                         </Box>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Chip label={result.status} color="success" size="small" />
// //                       </TableCell>
// //                       <TableCell>
// //                         <Button size="small" startIcon={<Visibility />}>
// //                           View Details
// //                         </Button>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))}
// //                 </TableBody>
// //               </Table>
// //             </TableContainer>
// //           </CardContent>
// //         </Card>
// //       )}

// //       {selectedTab === 2 && (
// //         <Grid container spacing={3}>
// //           <Grid item xs={12} md={6}>
// //             <Card sx={{ p: 3 }}>
// //               <Typography variant="h6" sx={{ mb: 2 }}>
// //                 AI Performance Analysis by Section
// //               </Typography>
// //               <Box sx={{ mb: 3 }}>
// //                 <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Speaking</Typography>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Read Aloud - Fluency</Typography>
// //                   <LinearProgress variant="determinate" value={85} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">85/100</Typography>
// //                 </Box>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Read Aloud - Pronunciation</Typography>
// //                   <LinearProgress variant="determinate" value={78} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">78/100</Typography>
// //                 </Box>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Describe Image - Content</Typography>
// //                   <LinearProgress variant="determinate" value={82} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">82/100</Typography>
// //                 </Box>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Repeat Sentence - Accuracy</Typography>
// //                   <LinearProgress variant="determinate" value={90} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">90/100</Typography>
// //                 </Box>
// //               </Box>
              
// //               <Box sx={{ mb: 3 }}>
// //                 <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Writing</Typography>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Essay - Grammar</Typography>
// //                   <LinearProgress variant="determinate" value={82} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">82/100</Typography>
// //                 </Box>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Essay - Vocabulary</Typography>
// //                   <LinearProgress variant="determinate" value={90} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">90/100</Typography>
// //                 </Box>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Summarize Written Text - Accuracy</Typography>
// //                   <LinearProgress variant="determinate" value={88} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">88/100</Typography>
// //                 </Box>
// //               </Box>

// //               <Box sx={{ mb: 2 }}>
// //                 <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Reading & Listening</Typography>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Reading Comprehension</Typography>
// //                   <LinearProgress variant="determinate" value={88} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">88/100</Typography>
// //                 </Box>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Fill in the Blanks</Typography>
// //                   <LinearProgress variant="determinate" value={75} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">75/100</Typography>
// //                 </Box>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="caption" color="text.secondary">Write From Dictation</Typography>
// //                   <LinearProgress variant="determinate" value={92} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
// //                   <Typography variant="caption" color="text.secondary">92/100</Typography>
// //                 </Box>
// //               </Box>
// //             </Card>
// //           </Grid>
          
// //           <Grid item xs={12} md={6}>
// //             <Card sx={{ p: 3 }}>
// //               <Typography variant="h6" sx={{ mb: 2 }}>
// //                 AI Recommendations by Question Type
// //               </Typography>
// //               <List dense>
// //                 <ListItem>
// //                   <ListItemIcon><Mic color="primary" /></ListItemIcon>
// //                   <ListItemText 
// //                     primary="Read Aloud - Pronunciation"
// //                     secondary="Focus on word stress patterns in academic vocabulary"
// //                   />
// //                 </ListItem>
// //                 <ListItem>
// //                   <ListItemIcon><Edit color="primary" /></ListItemIcon>
// //                   <ListItemText 
// //                     primary="Essay Writing - Structure"
// //                     secondary="Work on clear topic sentences and transitions"
// //                   />
// //                 </ListItem>
// //                 <ListItem>
// //                   <ListItemIcon><VolumeUp color="primary" /></ListItemIcon>
// //                   <ListItemText 
// //                     primary="Listening Fill in Blanks"
// //                     secondary="Practice note-taking with academic lectures"
// //                   />
// //                 </ListItem>
// //                 <ListItem>
// //                   <ListItemIcon><Psychology color="primary" /></ListItemIcon>
// //                   <ListItemText 
// //                     primary="Describe Image - Content"
// //                     secondary="Include more specific details and comparisons"
// //                   />
// //                 </ListItem>
// //                 <ListItem>
// //                   <ListItemIcon><Book color="primary" /></ListItemIcon>
// //                   <ListItemText 
// //                     primary="Re-order Paragraphs"
// //                     secondary="Focus on logical connectors and coherence"
// //                   />
// //                 </ListItem>
// //               </List>
              
// //               <Divider sx={{ my: 2 }} />
              
// //               <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
// //                 Weekly Practice Plan
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 • <strong>Monday</strong>: Read Aloud + Pronunciation drills<br/>
// //                 • <strong>Tuesday</strong>: Essay writing + Grammar review<br/>
// //                 • <strong>Wednesday</strong>: Listening practice + Note-taking<br/>
// //                 • <strong>Thursday</strong>: Describe Image + Vocabulary<br/>
// //                 • <strong>Friday</strong>: Reading comprehension + Speed<br/>
// //                 • <strong>Weekend</strong>: Full mock tests + Review
// //               </Typography>
// //             </Card>
// //           </Grid>

// //           {/* Question Type Performance Chart */}
// //           <Grid item xs={12}>
// //             <Card sx={{ p: 3 }}>
// //               <Typography variant="h6" sx={{ mb: 3 }}>
// //                 Performance by Question Type (Last 30 Days)
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 {[
// //                   { type: 'Read Aloud', score: 78, attempts: 12, trend: 'up' },
// //                   { type: 'Describe Image', score: 82, attempts: 8, trend: 'up' },
// //                   { type: 'Write Essay', score: 75, attempts: 6, trend: 'stable' },
// //                   { type: 'Summarize Written Text', score: 88, attempts: 10, trend: 'up' },
// //                   { type: 'Multiple Choice (Reading)', score: 85, attempts: 15, trend: 'up' },
// //                   { type: 'Fill in Blanks (Listening)', score: 72, attempts: 14, trend: 'down' },
// //                   { type: 'Write From Dictation', score: 92, attempts: 20, trend: 'up' },
// //                   { type: 'Repeat Sentence', score: 90, attempts: 18, trend: 'stable' },
// //                 ].map((item, index) => (
// //                   <Grid item xs={12} sm={6} md={3} key={index}>
// //                     <Paper sx={{ p: 2, textAlign: 'center' }}>
// //                       <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
// //                         {item.type}
// //                       </Typography>
// //                       <Typography variant="h5" sx={{ color: 'primary.main', mb: 1 }}>
// //                         {item.score}%
// //                       </Typography>
// //                       <Typography variant="caption" color="text.secondary">
// //                         {item.attempts} attempts
// //                       </Typography>
// //                       <Box sx={{ mt: 1 }}>
// //                         <Chip 
// //                           label={item.trend === 'up' ? '↗ Improving' : item.trend === 'down' ? '↘ Declining' : '→ Stable'}
// //                           size="small"
// //                           color={item.trend === 'up' ? 'success' : item.trend === 'down' ? 'error' : 'default'}
// //                         />
// //                       </Box>
// //                     </Paper>
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             </Card>
// //           </Grid>
// //         </Grid>
// //       )}
// //     </Container>
// //   );
// // };

// // Study Materials Component  
// // export const StudyMaterials = ({ user }) => {
// //   const materials = [
// //     {
// //       title: 'PTE Academic Official Guide',
// //       type: 'PDF',
// //       size: '15.2 MB',
// //       downloads: 1250,
// //       image: 'https://images.pexels.com/photos/5185074/pexels-photo-5185074.jpeg'
// //     },
// //     {
// //       title: 'Speaking Practice Templates',
// //       type: 'PDF',
// //       size: '3.1 MB', 
// //       downloads: 890,
// //       image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg'
// //     },
// //     {
// //       title: 'Vocabulary Builder',
// //       type: 'PDF',
// //       size: '8.5 MB',
// //       downloads: 2100,
// //       image: 'https://images.pexels.com/photos/5303547/pexels-photo-5303547.jpeg'
// //     }
// //   ];

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Typography variant="h3" sx={{ mb: 4 }}>
// //         Study Materials
// //       </Typography>
      
// //       <Grid container spacing={3}>
// //         {materials.map((material, index) => (
// //           <Grid item xs={12} md={4} key={index}>
// //             <Card>
// //               <CardMedia
// //                 component="img"
// //                 height="200"
// //                 image={material.image}
// //                 alt={material.title}
// //               />
// //               <CardContent>
// //                 <Typography variant="h6" sx={{ mb: 1 }}>
// //                   {material.title}
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
// //                   <Chip label={material.type} size="small" />
// //                   <Chip label={material.size} size="small" variant="outlined" />
// //                 </Box>
// //                 <Typography variant="body2" color="text.secondary">
// //                   {material.downloads} downloads
// //                 </Typography>
// //               </CardContent>
// //               <CardActions>
// //                 <Button startIcon={<Download />} fullWidth variant="contained">
// //                   Download
// //                 </Button>
// //               </CardActions>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // };

// // Progress Tracking Component
// // export const ProgressTracking = ({ user }) => {
// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Typography variant="h3" sx={{ mb: 4 }}>
// //         Progress Tracking
// //       </Typography>
      
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={8}>
// //           <Card sx={{ p: 3 }}>
// //             <Typography variant="h6" sx={{ mb: 3 }}>
// //               Score Progress Over Time
// //             </Typography>
// //             <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', borderRadius: 1 }}>
// //               <Typography color="text.secondary">Chart visualization would be displayed here</Typography>
// //             </Box>
// //           </Card>
// //         </Grid>
        
// //         <Grid item xs={12} md={4}>
// //           <Card sx={{ p: 3, mb: 3 }}>
// //             <Typography variant="h6" sx={{ mb: 2 }}>
// //               Current Statistics
// //             </Typography>
// //             <Box sx={{ mb: 2 }}>
// //               <Typography variant="body2" color="text.secondary">Overall Score</Typography>
// //               <Typography variant="h4" color="primary.main">78/90</Typography>
// //             </Box>
// //             <Box sx={{ mb: 2 }}>
// //               <Typography variant="body2" color="text.secondary">Tests Completed</Typography>
// //               <Typography variant="h6">8 of 15</Typography>
// //             </Box>
// //             <Box>
// //               <Typography variant="body2" color="text.secondary">Study Streak</Typography>
// //               <Typography variant="h6">12 days</Typography>
// //             </Box>
// //           </Card>
          
// //           <Card sx={{ p: 3 }}>
// //             <Typography variant="h6" sx={{ mb: 2 }}>
// //               Next Goals
// //             </Typography>
// //             <List dense>
// //               <ListItem>
// //                 <ListItemIcon><Star color="warning" /></ListItemIcon>
// //                 <ListItemText primary="Reach 80+ overall score" />
// //               </ListItem>
// //               <ListItem>
// //                 <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
// //                 <ListItemText primary="Complete 5 more tests" />
// //               </ListItem>
// //             </List>
// //           </Card>
// //         </Grid>
// //       </Grid>
// //     </Container>
// //   );
// // };

// // Profile Component
// // export const Profile = ({ user, setUser }) => {
// //   const [editing, setEditing] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: user?.name || '',
// //     email: user?.email || '',
// //     targetScore: '79',
// //     testDate: '2024-03-15'
// //   });

// //   const handleSave = () => {
// //     setUser({ ...user, ...formData });
// //     setEditing(false);
// //   };

// //   return (
// //     <Container maxWidth="md" sx={{ py: 4 }}>
// //       <Typography variant="h3" sx={{ mb: 4 }}>
// //         Profile Settings
// //       </Typography>
      
// //       <Card sx={{ p: 4 }}>
// //         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
// //           <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>
// //             {user?.name?.charAt(0).toUpperCase()}
// //           </Avatar>
// //           <Box>
// //             <Typography variant="h5">{user?.name}</Typography>
// //             <Typography color="text.secondary">{user?.email}</Typography>
// //           </Box>
// //           <Box sx={{ ml: 'auto' }}>
// //             <Button
// //               startIcon={<Edit />}
// //               onClick={() => setEditing(!editing)}
// //               variant={editing ? "outlined" : "contained"}
// //             >
// //               {editing ? 'Cancel' : 'Edit Profile'}
// //             </Button>
// //           </Box>
// //         </Box>

// //         {editing ? (
// //           <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
// //             <TextField
// //               label="Full Name"
// //               value={formData.name}
// //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //             />
// //             <TextField
// //               label="Email"
// //               type="email"
// //               value={formData.email}
// //               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //             />
// //             <TextField
// //               label="Target Score"
// //               type="number"
// //               value={formData.targetScore}
// //               onChange={(e) => setFormData({ ...formData, targetScore: e.target.value })}
// //             />
// //             <TextField
// //               label="Test Date"
// //               type="date"
// //               value={formData.testDate}
// //               onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
// //               InputLabelProps={{ shrink: true }}
// //             />
// //             <Button variant="contained" onClick={handleSave}>
// //               Save Changes
// //             </Button>
// //           </Box>
// //         ) : (
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={6}>
// //               <Typography variant="body2" color="text.secondary">Target Score</Typography>
// //               <Typography variant="h6">79/90</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <Typography variant="body2" color="text.secondary">Test Date</Typography>
// //               <Typography variant="h6">March 15, 2024</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <Typography variant="body2" color="text.secondary">Member Since</Typography>
// //               <Typography variant="h6">January 2024</Typography>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <Typography variant="body2" color="text.secondary">Tests Completed</Typography>
// //               <Typography variant="h6">8</Typography>
// //             </Grid>
// //           </Grid>
// //         )}
// //       </Card>
// //     </Container>
// //   );
// // };