import { Stack, Typography } from "@mui/material";

interface FeatureProps {
    feature: {
        title: string;
        description: string;
        image: string;
        imageLabel: string;
    };
}

export default function HomeFeature ({ feature }: FeatureProps) {
    const { title, description, image, imageLabel } = feature;
    return (
      <Stack alignItems={"center"} spacing={2} sx={{paddingX: 2}}>
        <Typography component="h3" variant="h6" fontWeight={800} gutterBottom>
          { title }
        </Typography>
        <img src={image} alt={imageLabel} height={"100px"}/>
        <Typography component="p" variant="body1" textAlign="center">
          { description }
        </Typography>
      </Stack>
    );
  }