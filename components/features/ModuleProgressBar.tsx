import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
}));

function ModuleProgressBar(
  props: LinearProgressProps & { 
    progress: number,
    minprogress?: number,
    width?: number }, 
) {
  let width = 200;
  
  if (typeof props.width !== 'undefined') {
    width = props.width;
  }

  if (typeof props.minprogress !== 'undefined') {
    let progressDiff = props.minprogress - props.progress;

    return (
      <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ minWidth: width*(props.minprogress/100) }}>
          <BorderLinearProgress
            variant="determinate"
            value={progressDiff > 0 ? props.progress/props.minprogress*100 : 100} 
            color="error"
          />
        </Box>
        <Box sx={{ minWidth: width*((100-props.minprogress)/100), mr: 1 }}>
          <BorderLinearProgress
            variant="determinate"
            value={progressDiff > 0 ? 0 : (props.progress-props.minprogress)/(100-props.minprogress)*100}
            {...props}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(props.progress,)}%`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        ({props.minprogress}% de progreso mínimo requerido)
      </Typography>
      </>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: width, mr: 1 }}>
        <BorderLinearProgress variant="determinate" value={props.progress} {...props} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(props.progress,)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default ModuleProgressBar;