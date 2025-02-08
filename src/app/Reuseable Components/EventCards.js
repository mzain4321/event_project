"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";

export default function EventCards({ dashboard }) {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // For editing
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [editedEvent, setEditedEvent] = useState({}); // Edited event details

    // Fetch events from the API
    const getEvents = async () => {
        const resp = await fetch("/API/Events", { method: "GET" });
        const data = await resp.json();
        setEvents(data["data"]);
    };

    useEffect(() => {
        getEvents();
    }, []);

    // Open modal for editing
    const handleEdit = (event) => {
        setSelectedEvent(event);
        setEditedEvent(event);
        setIsModalOpen(true);
    };

    // Handle event update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const resp = await fetch(`/API/Events/?id=${selectedEvent._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedEvent),
        });

        if (resp.ok) {
            setEvents((prev) =>
                prev.map((event) =>
                    event._id === selectedEvent._id ? { ...event, ...editedEvent } : event
                )
            );
            setIsModalOpen(false);
        }
        getEvents();
    };

    // Delete event
    const handleDelete = async (id) => {
        const resp = await fetch(`/API/Events/?id=${id}`, { method: "DELETE" });
        if (resp.ok) {
            setEvents((prev) => prev.filter((event) => event._id !== id));
        }
        getEvents();
    };

    // Publish event
    const handlePublish = async (id) => {
        const resp = await fetch(`/API/Events?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Published" }),
        });

        if (resp.ok) {
            toast.success("Event published Successfully!");
            setEvents((prev) =>
                prev.map((event) =>
                    event._id === id ? { ...event, status: "Published" } : event
                )
            );
        }
        getEvents();
    };

    const handleUnPublish = async (id) => {
        const resp = await fetch(`/API/Events?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "UnPublished" }),
        });

        if (resp.ok) {
            toast.success("Event UnPublished Successfully!");
            setEvents((prev) =>
                prev.map((event) =>
                    event._id === id ? { ...event, status: "UnPublished" } : event
                )
            );
        }
        getEvents();
    };

    return (
        <div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-10 my-10">
                {events
                    .filter((event) => (dashboard ? true : event.status === "Published")) // Filter based on status and dashboard
                    .map((event, index) => (
                        <div className="w-full flex justify-center rounded-2xl" key={index}>
                            <Card sx={{ maxWidth: "100%" }} className="bg-transparent shadow-2xl">
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            sx={{ bgcolor: red[500] }}
                                            className="bg-black"
                                            aria-label="recipe"
                                        >
                                            {index + 1}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={event.eventTitle}
                                    subheader={event.eventDate}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={event.image}
                                    alt="Event Image"
                                    className="h-[280px]"
                                />
                                <CardContent>
                                    <div>
                                        <p className="mb-4"><b>Description:</b> {event.eventDescription}</p>

                                        <p className="mb-4"><b>Starting Time:</b> {event.eventStartingTime}</p>

                                        <p className="mb-4"><b>Ending Time:</b> {event.eventEndingTime}</p>

                                        <p className="mb-4"><b>Location:</b> {event.eventLocation}</p>

                                        <p className="mb-4"><b>Number Of Persons:</b> {event.noOfPerson}</p>
                                        {dashboard && (
                                            <p className="mb-1"><b>Status:</b> {event.status || "Pending"}</p>
                                        )}

                                    </div>
                                </CardContent>
                                <CardActions className="flex justify-center gap-3 mb-3">
                                    {dashboard && (
                                        <>
                                            <Button
                                                variant="contained"
                                                className="bg-green-600 hover:scale-95"
                                                onClick={() => handleEdit(event)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className="bg-red-600 hover:scale-95"
                                                onClick={() => handleDelete(event._id)}
                                            >
                                                Delete
                                            </Button>
                                            {event.status === "Pending" && (
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        className="bg-black hover:scale-95"
                                                        disabled={event.status === "Published"}
                                                        onClick={() => handlePublish(event._id)}
                                                    >
                                                        Publish
                                                    </Button>

                                                </div>
                                            )}
                                            {event.status === "Published" && (
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        className="bg-black hover:scale-95"
                                                        onClick={() => handleUnPublish(event._id)}
                                                    >
                                                        UnPublish
                                                    </Button>
                                                </div>
                                            )}
                                            {event.status === "UnPublished" && (
                                                <div>
                                                <Button
                                                    variant="contained"
                                                    className="bg-black hover:scale-95"
                                                    disabled={event.status === "Published"}
                                                    onClick={() => handlePublish(event._id)}
                                                >
                                                    Publish
                                                </Button>

                                            </div>
                                            )}
                                        </>
                                    )}
                                </CardActions>


                            </Card>
                        </div>
                    ))}
            </div>


            {/* Modal for Editing */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="bg-white p-5 rounded-md w-[500px] mx-auto mt-[10%] shadow-lg">
                    <form onSubmit={handleUpdate}>
                        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                        <TextField
                            label="Event Title"
                            fullWidth
                            variant="outlined"
                            className="mb-4"
                            value={editedEvent.eventTitle || ""}
                            onChange={(e) =>
                                setEditedEvent({ ...editedEvent, eventTitle: e.target.value })
                            }
                            required
                        />
                        <TextField
                            label="Event Description"
                            fullWidth
                            variant="outlined"
                            className="mb-4"
                            value={editedEvent.eventDescription || ""}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    eventDescription: e.target.value,
                                })
                            }
                            required
                        />
                        <TextField
                            label="Starting Time"
                            fullWidth
                            type="time"
                            variant="outlined"
                            className="mb-4"
                            value={editedEvent.eventStartingTime || ""}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    eventStartingTime: e.target.value,
                                })
                            }
                            required
                        />
                        <TextField
                            label="Ending Time"
                            type="time"
                            fullWidth
                            variant="outlined"
                            className="mb-4"
                            value={editedEvent.eventEndingTime || ""}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    eventEndingTime: e.target.value,
                                })
                            }
                            required
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            variant="outlined"
                            className="mb-4"
                            value={editedEvent.eventLocation || ""}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    eventLocation: e.target.value,
                                })
                            }
                            required
                        />
                        <TextField
                            label="Number of Persons"
                            fullWidth
                            type="number"
                            variant="outlined"
                            className="mb-4"
                            value={editedEvent.noOfPerson || ""}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    noOfPerson: e.target.value,
                                })
                            }
                            required
                        />
                        <div className="flex justify-end gap-4">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}