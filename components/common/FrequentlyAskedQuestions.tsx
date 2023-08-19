import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FAQProps {
  FAQs: {
    question: string;
    answer: string;
  }[];
}

const FrequentlyAskedQuestions: React.FC<FAQProps> = ({ FAQs }) => {
  return (
    <div>
      {FAQs.map((FAQ, index) => (
        <Accordion key={`FAQ-${index}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{FAQ.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{FAQ.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FrequentlyAskedQuestions;
