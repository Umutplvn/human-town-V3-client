import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  Typography,
} from "@mui/material";

import {
  IoChatbubblesOutline,
  IoDocumentOutline,
  IoWarningOutline,
  IoTrashOutline,
  IoArchiveOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { GoInbox } from "react-icons/go";
import { FiSend } from "react-icons/fi";

// CATEGORY DATA
const categories = [
  { id: "Chats", icon: <IoChatbubblesOutline size={22} /> },
  { id: "Inbox", icon: <GoInbox size={22} /> },
  { id: "Sent", icon: <FiSend size={22} /> },
  { id: "Drafts", icon: <IoDocumentOutline size={22} /> },
  { id: "Trash", icon: <IoTrashOutline size={22} /> },
  { id: "Spam", icon: <IoWarningOutline size={22} /> },
  { id: "Archive", icon: <IoArchiveOutline size={22} /> },
];

const settings = { id: "Settings", icon: <IoSettingsOutline size={22} /> };

export default function MailLayout() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerStep, setDrawerStep] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState("Chats");
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedMailCategory");
    if (saved) setSelectedCategory(saved);
  }, []);

  const mails = [1, 2, 3, 4].map((id) => ({
    id,
    title: `Mail Title ${id} - ${selectedCategory}`,
    preview: "Lorem ipsum dolor sit amet...",
    body: `This is the full content of mail ${id}.`,
  }));

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedMail(null);
    localStorage.setItem("selectedMailCategory", cat);
    if (isMobile) setDrawerStep("chats");
  };

  const handleOpenMail = (mail) => {
    setSelectedMail(mail);
    if (isMobile) setDrawerStep("content");
  };

  // -------------------------------------
  // CATEGORY LIST
  // -------------------------------------
  const CategoryList = () => (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        borderRight: "1px solid #f3f3f7",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "" : "space-between",
        backgroundColor: isMobile ? "#f3f3f7" : "transparent",
        paddingTop: isMobile ? 2 : 0,
        alignItems: "center",
      }}
    >
           {isMobile && <Typography
        sx={{
          width:"100%",
          padding: "1rem 0 1.5rem 2rem",
          fontSize: "1.5rem",
          fontWeight: "600",
          fontFamily: `"SF Pro Display", -apple-system, BlinkMacSystemFont, 'Inter', sans-serif`,
          
        }}
      >
        Mailboxes
      </Typography> 
      }
      <List
        sx={{
          width: isMobile ? "85%" : "80%",
          backgroundColor: "white",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: isMobile ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
          py: 0,
          my: 0,
         
        }}
      >
        {categories.map((c, index) => (
          <ListItemButton
            key={c.id}
            onClick={() => handleSelectCategory(c.id)}
            sx={{
              width: "100%",
              backgroundColor: selectedCategory === c.id ? "#f2f2f4" : "white",
              display: "flex",
              justifyContent: isMobile? "flex-start":"center",
              gap: "1rem",
              color:"#0A84FF",
              padding: "1rem",
              mt:isMobile?"0":"0.3rem",
              borderRadius: isMobile ? "0" : "1rem",
              "&:hover": { backgroundColor: "#ececee" },
              borderBottom:
                index !== categories.length - 1 && isMobile
                  ? "1px solid #f3f3f7"
                  : "none",
                 
            }}
          >
            {c.icon}
            {isMobile && (
              <Typography sx={{ fontSize: "1rem", fontWeight: 500, color:"black" }}>
                {c.id}
              </Typography>
            )}
          </ListItemButton>
        ))}
      </List>

      {/* SETTINGS (Aynı style'a uygun güncelliyoruz) */}
      <List
        sx={{
          pb: 2,
          width: isMobile ? "85%" : "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
          py: 0,
          mt: isMobile ? "1rem" : 0,
          boxShadow: isMobile ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
          padding: isMobile ? 0 : 1,
          cursor: "pointer",
          borderRadius:"2rem"
          
        }}
      >
        <ListItemButton
          onClick={() => handleSelectCategory("Settings")}
          sx={{
            width: "100%",
            borderRadius: "1rem",
            backgroundColor:"white",
            padding: "1rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-start",
            "&:hover": { backgroundColor: "#ececee" },
            color:"#0A84FF"
          }}
        >
          {settings.icon}
          {isMobile && (
            <Typography sx={{ fontSize: "1rem", fontWeight: 500, color:"black" }}>
              Settings
            </Typography>
          )}
        </ListItemButton>
      </List>
    </Box>
  );

  // -------------------------------------
  // CHAT LIST
  // -------------------------------------

  const ChatList = () => (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRight: !isMobile && "1px solid #f3f3f7",
        backgroundColor: isMobile ? "#f3f3f7" : "white",
      }}
    >
      {isMobile && (
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            cursor: "pointer",
          }}
          onClick={() => setDrawerStep("categories")}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "1.2rem" }} />
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {selectedCategory}
          </Typography>
        </Box>
      )}

      {!isMobile && (
        <Box sx={{ p: 2, fontWeight: "bold", fontSize: "1.2rem" }}>
          {selectedCategory}
        </Box>
      )}

      <Divider />

      <List>
        {mails.map((mail) => (
          <ListItemButton key={mail.id} onClick={() => handleOpenMail(mail)}>
            <ListItemText primary={mail.title} secondary={mail.preview} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  // -------------------------------------
  // MAIL CONTENT
  // -------------------------------------

  const MailContent = () => (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: isMobile ? "#f3f3f7" : "white",
      }}
    >
      {isMobile && (
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            cursor: "pointer",
          }}
          onClick={() => setDrawerStep("chats")}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "1.2rem" }} />
          <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {selectedCategory}
          </Typography>
        </Box>
      )}

      {selectedCategory === "Settings" ? (
        <Box sx={{ fontSize: "1.5rem", p: 2 }}>Ayarlar Sayfası</Box>
      ) : selectedMail ? (
        <>
          <Box sx={{ fontSize: "1rem", fontWeight: "bold", p: 2 }}>
            {selectedMail.title}
          </Box>
          <Box sx={{ p: 2 }}>{selectedMail.body}</Box>
        </>
      ) : (
        <Box sx={{ fontSize: "1.1rem", color: "#666", p: 2 }}>
          Mail seçiniz...
        </Box>
      )}
    </Box>
  );

  // -------------------------------------
  // DESKTOP LAYOUT
  // -------------------------------------

  const DesktopLayout = () => (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Box sx={{ width: 80 }}>
        <CategoryList />
      </Box>

      <Box sx={{ width: 300 }}>
        {selectedCategory !== "Settings" && <ChatList />}
        {selectedCategory === "Settings" && <MailContent />}
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {selectedCategory !== "Settings" && <MailContent />}
      </Box>
    </Box>
  );

  // -------------------------------------
  // MOBILE LAYOUT
  // -------------------------------------

  const MobileLayout = () => (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#f3f3f7",
      }}
    >
      {drawerStep === "categories" && <CategoryList />}
      {drawerStep === "chats" && <ChatList />}
      {drawerStep === "content" && <MailContent />}
    </Box>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
