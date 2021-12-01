import React, { ReactElement, FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
  title: string;
  children: ReactElement;
  defaultExpanded?: boolean;
  disabled?: boolean;
};

const SectionAccordion: FC<Props> = ({
  title,
  children,
  defaultExpanded = false,
  disabled = false,
}) => {
  return (
    <Accordion
      variant={'elevation'}
      sx={{ mt: 1 }}
      disabled={disabled}
      defaultExpanded={defaultExpanded}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant={'h6'}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default SectionAccordion;
