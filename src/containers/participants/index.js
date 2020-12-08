import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import PauseIcon from "@material-ui/icons/Pause";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import BackspaceIcon from "@material-ui/icons/Backspace";
import EditIcon from "@material-ui/icons/Edit";

import { events, status, participants } from "../home/database";

import "../home/index.css";

const Participants = (props) => {
  const [participantsData, setParticipantsData] = useState(() => {
    return participants;
  });

  const [singleParticipant, setSingleParticipant] = useState({
    id: "",
  });

  const [editParticipant, setEditParticipant] = useState({
    id: "",
    dataIndex: -1,
  });

  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setSingleParticipant({
      id: "",
    });
  };

  const openAddEventModal = () => {
    handleClickOpen();
  };

  const AddParticipant = () => {
    let participantClone = [...participantsData];
    singleParticipant.status = status.CONNECTED;
    singleParticipant.batteryLevel = 100;
    participantClone.push(singleParticipant);
    setParticipantsData(participantClone);
    handleClose();
  };

  const editParticipantModal = (dataIndex, id) => {
    let participantClone = [...participantsData];
    for (let i = 0; i < participantClone.length; i++) {
      if (i === dataIndex) {
        participantClone[i].id = id;
      }
    }
    setEditModalOpen(participantClone);
    setEditModalOpen(false);
  };

  const removeParticipants = (id) => {
    if (id) {
      var newParticipants = participantsData.filter((x) => x.id !== id);
    }
    setParticipantsData(newParticipants);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Participants</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="participantRef"
            label="Participant Id/Email"
            type="text"
            fullWidth
            size="medium"
            value={singleParticipant.id}
            onChange={(e) => {
              setSingleParticipant({
                ...singleParticipant,
                id: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={resetForm} color="primary">
            Reset
          </Button>
          <Button onClick={AddParticipant} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Participants</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="participantRef"
            label="Participant Id/Email"
            type="text"
            fullWidth
            size="medium"
            value={editParticipant.id}
            onChange={(e) => {
              setEditParticipant({
                ...editParticipant,
                id: editParticipant.id ? e.target.value : editParticipant.id,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEditModalOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              editParticipantModal(
                editParticipant.dataIndex,
                editParticipant.id
              );
            }}
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Grid justify="flex-end" item xs={3}>
        <Paper className="paper">
          <div style={{ padding: "16px" }}>
            <Button
              onClick={openAddEventModal}
              style={{
                float: "right",
              }}
              variant="contained"
              color="primary"
            >
              +
            </Button>
            <span>Participant Section</span>
          </div>
          <List component="nav" aria-label="main mailbox folders">
            {participantsData.map((data, index) => {
              let statusColor = "";
              let title = "";
              if (data.status === status.CONNECTED) {
                statusColor = "primary";
                title = "Online";
              } else if (data.status === status.NOTCONNECTED) {
                statusColor = "error";
                title = "NOT CONNECTED";
              } else if (data.status === status.READY) {
                statusColor = "secondary";
                title = "READY";
              }
              return (
                <ListItem>
                  <ListItemText primary={`${data.id}`} />
                  <Tooltip title={title}>
                    <Badge
                      style={{ marginRight: "10px" }}
                      color={statusColor}
                      variant="dot"
                    ></Badge>
                  </Tooltip>
                  <Tooltip title={`Batteru Level: ${data.batteryLevel}`}>
                    <CircularProgress
                      variant="determinate"
                      value={data.batteryLevel}
                    />
                  </Tooltip>
                  <BackspaceIcon
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => {
                      removeParticipants(data.id);
                    }}
                  />
                  <EditIcon
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => {
                      setEditParticipant({
                        ...editParticipant,
                        id: data.id,
                        dataIndex: index,
                      });
                      setEditModalOpen(true);
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </>
  );
};

export default Participants;
