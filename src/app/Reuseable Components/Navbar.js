"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";

// Pages and Settings
const pages = ["Home", "About", "Events", "Contact", "EventForm"];

function ResponsiveAppBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [signedInUser, setSignedInUser] = useState(null);
    const router = useRouter();

    // Sidebar Handlers
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavigate = (page) => {
        setIsSidebarOpen(false); // Close the sidebar after navigation
        router.push(`/${page}`);
    };

    const handleLogout = ()=>{
        localStorage.removeItem('signedInUser');
        setSignedInUser(null);
        router.push("/");
   }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('signedInUser'));
        if (user) {
            setSignedInUser(user);
        }
    },[setSignedInUser])

    return (
        <AppBar position="fixed" className="bg-[#fff000] py-1 shadow-sm">
            <Container maxWidth="xl">
                <Toolbar className="flex justify-between gap-5">
                    {/* Logo */}
                    <Image
                        src="/Icons/ProjectLogo.png"
                        width={30}
                        height={30}
                        alt="Project image"
                        className="w-[55px] h-[55px] lg:w-[65px] lg:h-[65px] rounded-[100%]"
                    />

                    {/* Title */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "Times New Roman",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        MS-EventSphere
                    </Typography>

                    {/* Mobile Sidebar Toggle Button */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="toggle sidebar"
                            onClick={handleToggleSidebar}
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Desktop Menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                md: "flex",
                                justifyContent: "center",
                                gap: "40px",
                            },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => router.push(`/${page}`)}
                                sx={{
                                    my: 2,
                                    color: router.pathname === `/${page}` ? "blue" : "black",
                                    display: "block",
                                    letterSpacing: "1px",
                                    font: "small",
                                }}
                                className="hover:scale-95"
                            >
                                {page.replace("-", " ").toUpperCase()}
                            </Button>
                        ))}
                    </Box>
                    <div>
                        <div>
                            {signedInUser ? (
                                <div className="flex gap-4 items-center">
                                 <p className="text-black"><b>Email :</b> {signedInUser.email}</p>
                                <button className="bg-black text-white px-8 py-2 rounded-xl tracking-wider hover:scale-95" onClick={handleLogout}>
                                    Logout
                                </button>
                                </div>
                                
                            ) : <div className="flex items-center text-black font-semibold">
                                    <p>No User Signed In!!!</p>
                                </div>}
                        </div>

                    </div>
                </Toolbar>
            </Container>

            {/* Sidebar */}
            {isSidebarOpen && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "300px",
                        boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.3)",
                        zIndex: 1300,
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                        transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
                        transition: "transform 0.3s ease-in-out",
                    }}
                    className="bg-[#fff000]"
                >
                    {/* Sidebar Header: Logo and Title */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px", // Add space below the header
                        }}
                    >
                        <Image
                            src="/Icons/ProjectLogo.png"
                            width={30}
                            height={30}
                            alt="Project Logo"
                            className="w-[55px] h-[55px] lg:w-[65px] lg:h-[65px] rounded-[100%]"
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontFamily: "Times New Roman",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "black",
                            }}
                        >
                            MS-EventSphere
                        </Typography>
                    </Box>

                    {/* Close Button */}
                    <IconButton
                        onClick={handleToggleSidebar}
                        sx={{ alignSelf: "flex-end", marginBottom: "20px" }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Sidebar Links */}
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={() => handleNavigate(page)}
                            sx={{
                                textAlign: "center",
                                color: "black",
                                padding: "10px 0",
                                justifyContent: "flex-center",
                            }}
                        >
                            {page.replace("-", " ").toUpperCase()}
                        </Button>
                    ))}
                </Box>
            )}
        </AppBar>
    );
}

export default ResponsiveAppBar;