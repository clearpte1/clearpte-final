import { Paper, Typography,  useTheme } from "@mui/material";
import { useMediaQuery, Box } from "@mui/system";



interface InstructionSection {
  title: string;
  items: string[];
}

interface InstructionsCardProps {
  title: string;
  sections: InstructionSection[];
}

const InstructionsCard: React.FC<InstructionsCardProps> = ({ title, sections }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme)?.breakpoints?.down('sm'));

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, position: { lg: 'sticky' }, top: { lg: '1.5rem' } }}>
      <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="medium" mb={2}>
        📝 {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {sections.map((section, index) => (
          <Box key={index}>
            <Typography variant="subtitle2" fontWeight="medium">
              {section.title}:
            </Typography>
            <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
              {section.items.map((item, i) => (
                <li key={i}>
                  <Typography variant={isMobile ? 'caption' : 'body2'}>
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default InstructionsCard;