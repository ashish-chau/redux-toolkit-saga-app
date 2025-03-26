import React from "react";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

const topics = ["All", "TV", "Audio", "Laptop", "Mobile", "Gaming", "Appliances"];

function Sidebar({ onCategorySelect }) {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          Categories
        </Typography>
      </div>
      <List>
        {topics.map((category, index) => (
          <ListItem button key={index} onClick={() => onCategorySelect(category)} sx={{cursor:"pointer"}}>
            <ListItemText primary={category}  />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
