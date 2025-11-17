import { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";

// ICONS
import {
  IoChatbubblesOutline,
  IoSendOutline,
  IoMailUnreadOutline,
  IoDocumentOutline,
  IoWarningOutline,
  IoTrashOutline,
  IoArchiveOutline, // Yeni Archive ikonu
  IoSettingsOutline, // Yeni Settings ikonu
} from "react-icons/io5";
import { BsSendCheck } from "react-icons/bs";

// CATEGORY DATA WITH ICONS
const categories = [
  { id: "Chats", icon: <IoChatbubblesOutline size={22} /> },
  { id: "Inbox", icon: <IoMailUnreadOutline size={22} /> },
  { id: "Sent", icon: <BsSendCheck size={22} /> },
  { id: "Drafts", icon: <IoDocumentOutline size={22} /> },
  { id: "Trash", icon: <IoTrashOutline size={22} /> }, // Trash'i yukarı taşıdık
  { id: "Spam", icon: <IoWarningOutline size={22} /> }, // Spam'i yukarı taşıdık
  { id: "Archive", icon: <IoArchiveOutline size={22} /> }, // Yeni Archive
];

// Settings ayrı bir yerde olacak
const settings = { id: "Settings", icon: <IoSettingsOutline size={22} /> };

export default function MailLayout() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [drawerStep, setDrawerStep] = useState("categories"); // categories | chats | content
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMail, setSelectedMail] = useState(null);

  // Sayfa yüklendiğinde `localStorage`'dan kategoriyi al veya "Chats" olarak ayarla
  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedMailCategory");
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    } else if (selectedCategory === null) {
      setSelectedCategory("Chats"); // Başlangıçta "Chats" olarak ayarla (case-sensitive)
    }
  }, []);

  // Column widths (desktop)
  const categoryWidth = 90;
  const chatListWidth = 300;

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    // Seçimi `localStorage`'a kaydet
    localStorage.setItem("selectedMailCategory", cat);
    if (isMobile) setDrawerStep("chats");
  };

  const handleSelectMail = (mail) => {
    setSelectedMail(mail);
    if (isMobile) setDrawerStep("content");
  };

  const handleSelectSettings = () => {
    setSelectedCategory("Settings"); 
    localStorage.setItem("selectedMailCategory", "Settings");
    setSelectedMail(null); 
    if (isMobile) setDrawerStep("content"); 
  };

  // Fake mails
  const mails = [1, 2, 3, 4].map((id) => ({
    id,
    title: `Mail Title ${id} - ${selectedCategory}`,
    preview: "Lorem ipsum dolor sit amet...",
    body: `This is the full content of mail ${id} in ${selectedCategory}.`,
  }));

  // CATEGORY LIST COMPONENT
  const CategoryList = (
    <Box
      sx={{
        width: categoryWidth,
        height: "100%",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column", // Öğeleri dikeyde düzenlemek için
        justifyContent: "space-between", // Categories ve Settings'i ayırmak için
      }}
    >
      <List >
        {categories.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => handleSelectCategory(item.id)}
            sx={{
              padding: "0.7rem",
              borderRadius: "15px",
              mx: 2,
              my:0.8,
              justifyContent: "center",
              backgroundColor:
                selectedCategory === item.id ? "#ddd" : "transparent", 
              color: selectedCategory === item.id ? "#000" : "#000",
              "&:hover": {
                backgroundColor: "#eee", 
              },
            }}
          >
            {item.icon}
          </ListItemButton>
        ))}
      </List>

      {/* SETTINGS ICON */}
      <List sx={{ pb: 1 }}>
        <ListItemButton
          key={settings.id}
          onClick={handleSelectSettings}
          sx={{
            padding: "1rem",
            borderRadius: "10px",
            mx: 1,
            my: 1,
            justifyContent: "center",
            backgroundColor:
              selectedCategory === settings.id ? "#ddd" : "transparent",
            color: selectedCategory === settings.id ? "#000" : "#000",
            "&:hover": {
              backgroundColor: "#eee",
            },
          }}
        >
          {settings.icon}
        </ListItemButton>
      </List>
    </Box>
  );

  // CHAT LIST COMPONENT (Aynı kaldı)
  const ChatList = (
    <Box
      sx={{
        width: chatListWidth,
        height: "100%",
        borderRight: "1px solid #ddd",
      }}
    >
      {/* MOBILE BACK BUTTON */}
      {isMobile && (
        <Box
          sx={{
            padding: "1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => {
            setDrawerStep("categories");
            setSelectedMail(null);
          }} // selectedCategory'yi sıfırlamıyoruz ki `localStorage`'dan gelen kalsın
        >
          ← Categories
        </Box>
      )}

      {!isMobile && (
        <Box sx={{ p: 2, fontWeight: "bold", fontSize: "1.1rem" }}>
          {selectedCategory}
        </Box>
      )}

      <Divider />
      <List>
        {mails.map((mail) => (
          <ListItemButton
            key={mail.id}
            onClick={() => handleSelectMail(mail)}
            sx={{
              my: 1,
              backgroundColor: "#fff",
              borderRadius: "8px",
              mx: 1,
            }}
          >
            <ListItemText primary={mail.title} secondary={mail.preview} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  // MAIL CONTENT COMPONENT
  const MailContent = (
    <Box sx={{ p: 3, width: "100%", height: "100%", overflow: "auto" }}>
      {/* MOBILE BACK BUTTON */}
      {isMobile && (
        <Box
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            mb: 2,
          }}
          onClick={() => setDrawerStep("chats")}
        >
          ← Chats
        </Box>
      )}

      {selectedCategory === "Settings" ? (
        <Box sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
          Ayarlar Sayfası İçeriği
        </Box>
      ) : selectedMail ? (
        <>
          <Box sx={{ fontSize: "1.4rem", fontWeight: "bold", mb: 2 }}>
            {selectedMail.title}
          </Box>
          <Box sx={{ lineHeight: 1.6 }}>{selectedMail.body}</Box>
        </>
      ) : (
        <Box sx={{ fontSize: "1.2rem", color: "#666" }}>
          {selectedCategory} klasöründen mail seçiniz…
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* DESKTOP (3 Column Layout) */}
      {!isMobile && (
        <>
          <Box sx={{ width: categoryWidth }}>{CategoryList}</Box>
          <Box sx={{ width: chatListWidth }}>
            {/* Settings seçiliyse ChatList'i gösterme */}
            {selectedCategory && selectedCategory !== "Settings" && ChatList}
            {/* Settings seçiliyse içeriği göster */}
            {selectedCategory === "Settings" && MailContent}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {/* Settings seçiliyse MailContent zaten ChatList alanında gösterildiği için burada tekrar gösterme */}
            {selectedCategory !== "Settings" && MailContent}
          </Box>
        </>
      )}

      {/* MOBILE */}
      {isMobile && (
        <Box sx={{ width: "100%", height: "100%" }}>
          {drawerStep === "categories" && CategoryList}
          {drawerStep === "chats" && ChatList}
          {drawerStep === "content" && MailContent}
        </Box>
      )}
    </Box>
  );
}