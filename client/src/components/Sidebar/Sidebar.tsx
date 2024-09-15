import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Typography from "@mui/material/Typography";
import { useMediaQuery } from "react-responsive";
import { MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import LogoC from "../../assets/logo.png";
import axios from "axios";
import { backendUrl } from "../../App";
// Sample user data
// const user = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   avatar: "https://i.pravatar.cc/300", // Placeholder image URL
// };

const link = ["overview", "products", "orders"];

const icons = [<InboxIcon />, <MailIcon />, <MdOutlineMenu />];

// compnent
export default function SideBarAdmin() {
  const [user, setUser] = React.useState<any>({});
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  // const isLargeScreen = useMediaQuery({ query: "(min-width: 600px)" });
  const isLargeScreen = true;

  React.useEffect(() => {
    setOpen(isLargeScreen);
    const getUser = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const userRes = await axios.get(`${backendUrl}/api/customers/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(userRes.data.customer);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, [isLargeScreen]);

  const toggleDrawer = (newOpen: any) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  const handleRedirection = (index: number) => {
    navigate(`/admin/${link[index]}`);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      onClick={isLargeScreen ? undefined : toggleDrawer(false)}
    >
      <Link to="/admin/overview">
        <div className="flex flex-row items-center gap-2 sm:gap-2 md:gap-4 xl:gap-4 h-12 m-2">
          {/* <img src={LogoC} alt="" height={30} width={30} /> */}
          <h1 className=" text-xs font-bold  text-center text-primary font-sans md:text-xl lg:text-xl">
            Laxmi Crate Industries
          </h1>
        </div>
      </Link>
      <Divider />
      <List>
        {["Overview", "Products", "Orders"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleRedirection(index)}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ mt: "auto", p: 2, textAlign: "center" }}>
        <Typography variant="h6" component="div" sx={{ mt: 1 }}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Button onClick={handleLogout} className="text-primary">
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      {!isLargeScreen && (
        <Button onClick={toggleDrawer(true)} className="block">
          <MdOutlineMenu size={30} />
        </Button>
      )}
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        variant={isLargeScreen ? "persistent" : "temporary"}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
