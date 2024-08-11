import { useState, useEffect } from "react";
import {
  newSupportTicket,
  getSupportTicketByUserId,
  getSupportTicket,
  addMessageToTicket,
} from "../db/support";
import { uploadImg } from "../db/storage";

export function GetSupportTickets(userId) {
  const [openTickets, setOpenTickets] = useState([]);
  const [closeTickets, setCloseTickets] = useState([]);

  async function getTickets() {
    const r = await getSupportTicketByUserId(userId);

    setOpenTickets(r);
  }

  useEffect(() => {
    getTickets();
  }, []);

  return { openTickets, getTickets };
}

export function Ticket(id) {
  const [ticket, setTicket] = useState(null);

  async function getTicket() {
    const r = await getSupportTicket(id);

    setTicket(r);
  }

  useEffect(() => {
    getTicket();
  }, []);

  return { ticket, getTicket };
}

export function NewTicket(open, newTicket = true) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setSubject("");
    setMessage("");
    setError("");
    setFile(null);
  }, [open]);

  async function send(id) {
    console.log("Sending ticket ...", newTicket, id);
    if (!id) return false;
    if (!subject && newTicket) {
      setError("Subject must be provided");
      return false;
    }
    if (!message) {
      setError("Message must be provided");
      return false;
    }

    let uploaded = null;
    if (file) {
      uploaded = await uploadImg(userId, file, "support");
    }

    const msg = { message, file: uploaded };

    if (newTicket) {
      const nm = await newSupportTicket(id, subject, msg);
    } else {
      const m = await addMessageToTicket(id, msg);
    }
    // const all = await getAlertsByUserId(userId);
    // setAlertsHook(all);
    // listenToAlerts(userId, setAlertsHook);

    return true;
  }

  return { subject, setSubject, message, setMessage, file, setFile, send };
}
