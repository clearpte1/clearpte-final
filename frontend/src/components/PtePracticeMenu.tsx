// // import React, { useState } from 'react';
// // import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
// // import { Link } from 'react-router-dom';

// // interface PtePracticeMenuProps {
// //   isMobile?: boolean;
// // }

// // const PtePracticeMenu: React.FC<PtePracticeMenuProps> = ({ isMobile = false }) => {
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

// //   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const menuStructure = [
// //     {
// //       category: 'Speaking',
// //       items: [
// //         { label: 'Read Aloud AI Score', path: '/practice/speaking/read-aloud' },
// //         { label: 'Repeat Sentence AI Score', path: '/practice/speaking/repeat-sentence' },
// //         { label: 'Describe Image AI Score', path: '/practice/speaking/describe-image' },
// //         { label: 'Re-tell Lecture AI Score', path: '/practice/speaking/retell-lecture' },
// //         { label: 'Answer Short Question AI Score', path: '/practice/speaking/answer-short-question' },
// //         { label: 'Respond to a Situation (Core)', path: '/practice/speaking/respond-situation' },
// //       ],
// //     },
// //     {
// //       category: 'Writing',
// //       items: [
// //         { label: 'Summarize Written Text AI Score', path: '/practice/writing/summarize-text' },
// //         { label: 'Write Essay AI Score', path: '/practice/writing/write-essay' },
// //         { label: 'Summarize Written Text (Core)', path: '/practice/writing/summarize-text-core' },
// //         { label: 'Write Email (Core)', path: '/practice/writing/write-email' },
// //       ],
// //     },
// //     {
// //       category: 'Reading',
// //       items: [
// //         { label: 'Reading & Writing: Fill in the blanks', path: '/practice/reading/fill-blanks-rw' },
// //         { label: 'Multiple Choice (Multiple)', path: '/practice/reading/multiple-choice-multiple' },
// //         { label: 'Re-order Paragraphs', path: '/practice/reading/reorder-paragraphs' },
// //         { label: 'Reading: Fill in the Blanks', path: '/practice/reading/fill-blanks' },
// //         { label: 'Multiple Choice (Single)', path: '/practice/reading/multiple-choice-single' },
// //         { label: 'Highlight Incorrect Words', path: '/practice/reading/highlight-incorrect' },
// //         { label: 'Write From Dictation', path: '/practice/reading/write-from-dictation' },
// //       ],
// //     },
// //     {
// //       category: 'Listening',
// //       items: [
// //         { label: 'Summarize Spoken Text AI Score', path: '/practice/listening/summarize-spoken-text' },
// //         { label: 'Multiple Choice (Multiple)', path: '/practice/listening/multiple-choice-multiple' },
// //         { label: 'Fill in the Blanks', path: '/practice/listening/fill-blanks' },
// //         { label: 'Highlight Correct Summary', path: '/practice/listening/highlight-summary' },
// //         { label: 'Multiple Choice (Single)', path: '/practice/listening/multiple-choice-single' },
// //         { label: 'Select Missing Word', path: '/practice/listening/select-missing-word' },
// //         { label: 'Summarize Spoken Text (Core)', path: '/practice/listening/summarize-spoken-text-core' },
// //       ],
// //     },
// //     {
// //       category: 'More',
// //       items: [
// //         { label: 'Vocab Books', path: '/practice/more/vocab-books' },
// //         { label: 'Shadowing', path: '/practice/more/shadowing' },
// //         { label: 'AI Score Report Analysis', path: '/practice/more/ai-score-report' },
// //         { label: 'AI Study Plan', path: '/practice/more/ai-study-plan' },
// //         { label: 'Mock Tests', path: '/practice/more/mock-tests' },
// //         { label: 'Study Materials Download', path: '/practice/more/study-materials' },
// //       ],
// //     },
// //   ];

// //   return (
// //     <Box>
// //       {isMobile ? (
// //         <MenuItem onClick={handleClick}>PTE Practice</MenuItem>
// //       ) : (
// //         <Button color="inherit" onClick={handleClick} onMouseEnter={handleClick} sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.1rem' } }}>
// //           PTE Practice
// //         </Button>
// //       )}
// //       <Menu
// //         anchorEl={anchorEl}
// //         open={Boolean(anchorEl)}
// //         onClose={handleClose}
// //         onMouseLeave={isMobile ? undefined : handleClose}
// //         PaperProps={{
// //           style: {
// //             width: isMobile ? '98vw' : '90vw',
// //             maxWidth: isMobile ? '100vw' : '1200px',
// //             minWidth: isMobile ? '0' : '320px',
// //             display: 'flex',
// //             flexDirection: isMobile ? 'column' : 'row',
// //             padding: isMobile ? 4 : 16,
// //             overflowX: isMobile ? 'auto' : 'hidden',
// //             overflowY: 'auto',
// //             borderRadius: 16,
// //             boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
// //             background: '#fff',
// //           },
// //         }}
// //         MenuListProps={{
// //           sx: {
// //             display: 'flex',
// //             flexDirection: isMobile ? 'column' : 'row',
// //             width: '100%',
// //             p: 0,
// //             gap: isMobile ? 2 : 0,
// //           },
// //         }}
// //       >
// //         {menuStructure.map((section, idx) => (
// //           <Box
// //             key={section.category}
// //             sx={{
// //               flex: 1,
// //               p: isMobile ? 1 : 2,
// //               borderRight: !isMobile && idx !== menuStructure.length - 1 ? '1px solid #e0e0e0' : 'none',
// //               borderBottom: isMobile && idx !== menuStructure.length - 1 ? '1px solid #e0e0e0' : 'none',
// //               minWidth: isMobile ? '100%' : 180,
// //               maxWidth: isMobile ? '100%' : 240,
// //               background: isMobile ? '#fafbfc' : 'transparent',
// //             }}
// //           >
// //             <Typography
// //               variant={isMobile ? 'h6' : 'subtitle1'}
// //               fontWeight="bold"
// //               color="primary"
// //               gutterBottom
// //               sx={{ fontSize: isMobile ? '1.1rem' : '1rem', mb: 1 }}
// //             >
// //               {section.category}
// //             </Typography>
// //             {section.items.map((item) => (
// //               <MenuItem
// //                 key={item.path}
// //                 component={Link}
// //                 to={item.path}
// //                 onClick={handleClose}
// //                 sx={{
// //                   py: isMobile ? 1.2 : 0.5,
// //                   px: isMobile ? 2 : 1.5,
// //                   borderRadius: 2,
// //                   fontSize: isMobile ? '1rem' : '0.97rem',
// //                   mb: isMobile ? 0.5 : 0,
// //                   '&:hover': {
// //                     background: '#e3f2fd',
// //                   },
// //                 }}
// //               >
// //                 {item.label}
// //               </MenuItem>
// //             ))}
// //           </Box>
// //         ))}
// //       </Menu>
// //     </Box>
// //   );
// // };

// // export default PtePracticeMenu;

// import React, { useState } from 'react';
// import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

// interface PtePracticeMenuProps {
//   isMobile?: boolean;
// }

// const PtePracticeMenu: React.FC<PtePracticeMenuProps> = ({ isMobile = false }) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const menuStructure = [
//     {
//       category: 'Speaking',
//       items: [
//         { label: 'Read Aloud AI Score', path: '/practice/speaking/read-aloud' },
//         { label: 'Repeat Sentence AI Score', path: '/practice/speaking/repeat-sentence' },
//         { label: 'Describe Image AI Score', path: '/practice/speaking/describe-image' },
//         { label: 'Re-tell Lecture AI Score', path: '/practice/speaking/retell-lecture' },
//         { label: 'Answer Short Question AI Score', path: '/practice/speaking/answer-short-question' },
//         { label: 'Respond to a Situation (Core)', path: '/practice/speaking/respond-situation' },
//       ],
//     },
//     {
//       category: 'Writing',
//       items: [
//         { label: 'Summarize Written Text AI Score', path: '/practice/writing/summarize-text' },
//         { label: 'Write Essay AI Score', path: '/practice/writing/write-essay' },
//         { label: 'Summarize Written Text (Core)', path: '/practice/writing/summarize-text-core' },
//         { label: 'Write Email (Core)', path: '/practice/writing/write-email' },
//       ],
//     },
//     {
//       category: 'Reading',
//       items: [
//         { label: 'Reading & Writing: Fill in the blanks', path: '/practice/reading/fill-blanks-rw' },
//         { label: 'Multiple Choice (Multiple)', path: '/practice/reading/multiple-choice-multiple' },
//         { label: 'Re-order Paragraphs', path: '/practice/reading/reorder-paragraphs' },
//         { label: 'Reading: Fill in the Blanks', path: '/practice/reading/fill-blanks' },
//         { label: 'Multiple Choice (Single)', path: '/practice/reading/multiple-choice-single' },
//         { label: 'Highlight Incorrect Words', path: '/practice/reading/highlight-incorrect' },
//         { label: 'Write From Dictation', path: '/practice/reading/write-from-dictation' },
//       ],
//     },
//     {
//       category: 'Listening',
//       items: [
//         { label: 'Summarize Spoken Text AI Score', path: '/practice/listening/summarize-spoken-text' },
//         { label: 'Multiple Choice (Multiple)', path: '/practice/listening/multiple-choice-multiple' },
//         { label: 'Fill in the Blanks', path: '/practice/listening/fill-blanks' },
//         { label: 'Highlight Correct Summary', path: '/practice/listening/highlight-summary' },
//         { label: 'Multiple Choice (Single)', path: '/practice/listening/multiple-choice-single' },
//         { label: 'Select Missing Word', path: '/practice/listening/select-missing-word' },
//         { label: 'Summarize Spoken Text (Core)', path: '/practice/listening/summarize-spoken-text-core' },
//       ],
//     },
//     {
//       category: 'More',
//       items: [
//         { label: 'Vocab Books', path: '/practice/more/vocab-books' },
//         { label: 'Shadowing', path: '/practice/more/shadowing' },
//         { label: 'AI Score Report Analysis', path: '/practice/more/ai-score-report' },
//         { label: 'AI Study Plan', path: '/practice/more/ai-study-plan' },
//         { label: 'Mock Tests', path: '/practice/more/mock-tests' },
//         { label: 'Study Materials Download', path: '/practice/more/study-materials' },
//       ],
//     },
//   ];

//   return (
//     <Box>
//       {isMobile ? (
//         <MenuItem onClick={handleClick}>PTE Practice</MenuItem>
//       ) : (
//         <Button
//           color="inherit"
//           onClick={handleClick}
//           onMouseEnter={handleClick}
//           sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.1rem' } }}
//         >
//           PTE Practice
//         </Button>
//       )}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         onMouseLeave={isMobile ? undefined : handleClose}
//         PaperProps={{
//           style: {
//             width: isMobile ? '98vw' : '90vw',
//             maxWidth: isMobile ? '100vw' : '1200px',
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             padding: isMobile ? 4 : 16,
//             overflowX: 'hidden', // Prevent horizontal scrolling
//             overflowY: 'auto',
//             borderRadius: 16,
//             boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
//             background: '#fff',
//           },
//         }}
//         MenuListProps={{
//           sx: {
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             flexWrap: isMobile ? 'nowrap' : 'wrap', // Allow wrapping on desktop
//             width: '100%',
//             p: 0,
//             gap: isMobile ? 2 : 3, // Increase gap for better spacing
//           },
//         }}
//       >
//         {menuStructure.map((section, idx) => (
//           <Box
//             key={section.category}
//             sx={{
//               flex: isMobile ? '0 0 100%' : '1 1 200px', // On desktop, grow but with a minimum width; on mobile, full width
//               p: isMobile ? 1 : 2,
//               borderRight:
//                 !isMobile && idx !== menuStructure.length - 1
//                   ? '1px solid #e0e0e0'
//                   : 'none',
//               borderBottom:
//                 isMobile && idx !== menuStructure.length - 1
//                   ? '1px solid #e0e0e0'
//                   : 'none',
//               minWidth: isMobile ? '100%' : '200px', // Ensure a reasonable minimum width on desktop
//               background: isMobile ? '#fafbfc' : 'transparent',
//             }}
//           >
//             <Typography
//               variant={isMobile ? 'h6' : 'subtitle1'}
//               fontWeight="bold"
//               color="primary"
//               gutterBottom
//               sx={{ fontSize: isMobile ? '1.1rem' : '1rem', mb: 1 }}
//             >
//               {section.category}
//             </Typography>
//             {section.items.map((item) => (
//               <MenuItem
//                 key={item.path}
//                 component={Link}
//                 to={item.path}
//                 onClick={handleClose}
//                 sx={{
//                   py: isMobile ? 1.2 : 0.5,
//                   px: isMobile ? 2 : 1.5,
//                   borderRadius: 2,
//                   fontSize: isMobile ? '1rem' : '0.97rem',
//                   mb: isMobile ? 0.5 : 0,
//                   whiteSpace: 'normal', // Allow text to wrap
//                   wordBreak: 'break-word', // Prevent long words from overflowing
//                   '&:hover': {
//                     background: '#e3f2fd',
//                   },
//                 }}
//               >
//                 {item.label}
//               </MenuItem>
//             ))}
//           </Box>
//         ))}
//       </Menu>
//     </Box>
//   );
// };
import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography, Chip, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

interface MenuItemType {
  label: string;
  path: string;
  hasAI?: boolean;
  isCore?: boolean;
  icon?: string;
}

interface MenuSection {
  category: string;
  items: MenuItemType[];
}

interface PtePracticeMenuProps {
  isMobile?: boolean;
}

const PtePracticeMenu: React.FC<PtePracticeMenuProps> = ({ isMobile: propIsMobile = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) || propIsMobile;
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuStructure: MenuSection[] = [
    {
      category: 'Speaking',
      items: [
        { label: 'Read Aloud', path: '/practice/speaking/read-aloud', hasAI: true },
        { label: 'Repeat Sentence', path: '/practice/speaking/repeat-sentence', hasAI: true },
        { label: 'Describe Image', path: '/practice/speaking/describe-image', hasAI: true },
        { label: 'Re-tell Lecture', path: '/practice/speaking/retell-lecture', hasAI: true },
        { label: 'Answer Short Question', path: '/practice/speaking/answer-short-question', hasAI: true },
        { label: 'Respond to a Situation (Core)', path: '/practice/speaking/respond-situation', isCore: true },
      ],
    },
    {
      category: 'Writing',
      items: [
        { label: 'Summarize Written Text', path: '/practice/writing/summarize-text', hasAI: true },
        { label: 'Write Essay', path: '/practice/writing/write-essay', hasAI: true },
        { label: 'Summarize Written Text (Core)', path: '/practice/writing/summarize-text-core', isCore: true },
        { label: 'Write Email (Core)', path: '/practice/writing/write-email', isCore: true },
      ],
    },
    {
      category: 'Reading',
      items: [
        { label: 'Reading & Writing: Fill in the blanks', path: '/practice/reading/fill-blanks-rw' },
        { label: 'Multiple Choice (Multiple)', path: '/practice/reading/multiple-choice-multiple' },
        { label: 'Re-order Paragraphs', path: '/practice/reading/reorder-paragraphs' },
        { label: 'Reading: Fill in the Blanks', path: '/practice/reading/fill-blanks' },
        { label: 'Multiple Choice (Single)', path: '/practice/reading/multiple-choice-single' },
      ],
    },
    {
      category: 'Listening',
      items: [
        { label: 'Summarize Spoken Text', path: '/practice/listening/summarize-spoken-text', hasAI: true },
        { label: 'Multiple Choice (Multiple)', path: '/practice/listening/multiple-choice-multiple' },
        { label: 'Fill in the Blanks', path: '/practice/listening/fill-blanks' },
        { label: 'Highlight Correct Summary', path: '/practice/listening/highlight-summary' },
        { label: 'Multiple Choice (Single)', path: '/practice/listening/multiple-choice-single' },
        { label: 'Select Missing Word', path: '/practice/listening/select-missing-word' },
        { label: 'Highlight Incorrect Words', path: '/practice/listening/highlight-incorrect' },
        { label: 'Write From Dictation', path: '/practice/listening/write-dictation' },
        { label: 'Summarize Spoken Text (Core)', path: '/practice/listening/summarize-spoken-text-core', isCore: true },
      ],
    },
    // {
    //   category: 'More',
    //   items: [
    //     { label: 'Vocab Books', path: '/practice/more/vocab-books', icon: '📖' },
    //     { label: 'Shadowing', path: '/practice/more/shadowing', icon: '🎙️' },
    //     { label: 'AI Score Report Analysis', path: '/practice/more/ai-score-report', icon: '📊' },
    //     { label: 'AI Study Plan', path: '/practice/more/ai-study-plan', icon: '📅' },
    //     { label: 'Mock Tests', path: '/practice/more/mock-tests', icon: '📝' },
    //     { label: 'Study Materials Download', path: '/practice/more/study-materials', icon: '⬇️' },
    //   ],
    // },
  ];

  return (
    <Box>
      {isMobile ? (
        <MenuItem onClick={handleClick} sx={{ fontSize: '0.8rem', color: '#333' }}>
          PTE Practice
        </MenuItem>
      ) : (
        <Button
          color="inherit"
          onClick={handleClick}
          onMouseEnter={handleClick}
          sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', '&:hover': { color: '#4DB6AC', backgroundColor: 'transparent' } }}
        >
          PTE Practice
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={isMobile ? undefined : handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            maxWidth: isMobile ? '95vw' : '90vw',
            width: 'auto',
            maxHeight: isMobile ? '80vh' : 'auto',
            left: isMobile ? 0 : 'auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            padding: isMobile ? 8 : 16,
            overflowX: 'hidden',
            overflowY: isMobile ? 'auto' : 'hidden',
            borderRadius: isMobile ? 8 : 8,
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            background: '#fff',
            marginTop: isMobile ? 0 : '8px',
          },
        }}
        MenuListProps={{
          sx: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            width: '100%',
            p: 0,
            gap: isMobile ? 1 : 2,
          },
        }}
      >
        {menuStructure.map((section, idx) => (
          <Box
            key={section.category}
            sx={{
              flex: isMobile ? '0 0 100%' : '0 0 200px',
              p: isMobile ? 1 : 1.5,
              borderRight: !isMobile && idx !== menuStructure.length - 1 ? '1px solid #e0e0e0' : 'none',
              borderBottom: isMobile && idx !== menuStructure.length - 1 ? '1px solid #e0e0e0' : 'none',
              minWidth: isMobile ? '100%' : '200px',
              maxWidth: isMobile ? '100%' : '250px',
              background: isMobile ? '#fafbfc' : 'transparent',
            }}
          >
            <Typography
              variant={isMobile ? 'h6' : 'subtitle1'}
              fontWeight="bold"
              color="#1976D2"
              gutterBottom
              sx={{ fontSize: isMobile ? '0.9rem' : '0.85rem', mb: 1 }}
            >
              {section.category === 'Speaking' && '🎤 '}
              {section.category === 'Writing' && '✍️ '}
              {section.category === 'Reading' && '📖 '}
              {section.category === 'Listening' && '👂 '}
              {section.category === 'More' && '⚡ '}
              {section.category}
            </Typography>
            {section.items.map((item) => (
              <MenuItem
               className='pte-menu-item'
                key={item.path}
                component={Link}
                to={item.path}
                onClick={handleClose}
                sx={{
                  py: isMobile ? 1 : 0.5,
                  px: isMobile ? 2 : 1.5,
                  borderRadius: 2,
                  fontSize: isMobile ? '0.75rem' : '0.7rem',
                  mb: isMobile ? 0.5 : 0,
                  whiteSpace: 'nowrap',
                  color: '#333',
                  '&:hover': {
                    background: '#e3f2fd',
                  },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {item.icon && (
                    <Typography sx={{ fontSize: '0.8rem' }}>{item.icon}</Typography>
                  )}
                  <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.7rem' }} className='pte-menu-item-label'> 
                    {item.label.replace('AI Score', '').replace('(Core)', '').trim()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {item.hasAI && (
                    <Chip
                      label="AI Score"
                      size="small"
                      sx={{
                        bgcolor: '#E8F5E9',
                        color: '#2E7D32',
                        textDecoration: 'none',
                        fontSize: '0.6rem',
                        height: 18,
                      }}
                    />
                  )}
                  {item.isCore && (
                    <Chip
                      label="Core"
                      size="small"
                      sx={{
                        bgcolor: '#F3E5F5',
                        color: '#6A1B9A',
                        fontSize: '0.6rem',
                        height: 18,
                      }}
                    />
                  )}
                </Box>
              </MenuItem>
            ))}
          </Box>
        ))}
      </Menu>
    </Box>
  );
};

export default PtePracticeMenu;