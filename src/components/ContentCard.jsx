/* eslint-disable react/prop-types */
// import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ContentCard = ({ data, onCardClickHandler }) => {
  return (
    <Card
      sx={{ maxWidth: 270 }}
      onClick={() => onCardClickHandler()}
      style={{ cursor: "pointer" }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {data?.title?.length >= 17
            ? `${data?.title?.substring(0, 17)}...`
            : data?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.body?.length >= 55
            ? `${data?.body?.substring(0, 55)}...`
            : data?.bod}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
