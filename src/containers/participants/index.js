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

import { events, status, participants } from "../home/database";

import "../home/index.css";

const Participants = (props) => {
  const [participantsData, setParticipantsData] = useState(() => {
    return participants;
  });

  const [singleParticipant, setSingleParticipant] = useState({
    id: "",
  });

  const [open, setOpen] = React.useState(false);

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
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Grid justify="flex-end" item xs={12}>
        <Paper className="paper sidebar-height-2" >
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
            <h2 className="h2">Participant Section</h2>
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
                <ListItem button>
                  {data.id ? (
                    <ListItemText primary={`${data.id}`} />
                  ) : (
                    <ListItemText primary={`${data.email}`} />
                  )}
                  <Tooltip title={title}>
                    <Badge
                      style={{ marginRight: "10px" }}
                      color={statusColor}
                      variant="dot"
                    ></Badge>
                  </Tooltip>
                  <Tooltip title={`Batteru Level: ${data.batteryLevel}`} >
                    <div className="progressbar-muz">
                    <CircularProgress
                      variant="determinate"
                      value={data.batteryLevel}
                    />
                    <div className="progressbar-muz-percentage">
                      {data.batteryLevel}
                    </div>
                    </div>
                  </Tooltip>
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
