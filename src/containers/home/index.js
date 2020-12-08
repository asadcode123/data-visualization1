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

import { events, status, participants } from "./database";
import Participants from "../participants";
import DataVisualization from "../visualization";

import "./index.css";

const Home = (props) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const [eventsData, setEvents] = useState(() => {
    return events;
  });

  const [participantsData, setParticipantsData] = useState(() => {
    return participants;
  });

  const [singleEvent, setSingleEvent] = useState({
    id: 0,
    name: "",
    startDate: "",
    endDate: "",
    isAsync: true,
  });

  const [open, setOpen] = React.useState(false);

  const resetForm = () => {
    setSingleEvent({
      ...singleEvent,
      id: 0,
      name: "",
      startDate: "",
      endDate: "",
      isAsync: true,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const openAddEventModal = () => {
    handleClickOpen();
  };

  const AddEvent = () => {
    singleEvent.id = Math.floor(Math.random() * 10000000000);
    let eventsClone = [...eventsData];
    eventsClone.push(singleEvent);
    setEvents(eventsClone);
    handleClose();
  };

  return (
    <div className="root">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Events</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="event-name"
            label="Event Name"
            type="text"
            fullWidth
            size="medium"
            value={singleEvent.name}
            onChange={(e) => {
              setSingleEvent({ ...singleEvent, name: e.target.value });
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={singleEvent.startDate}
            onChange={(e) => {
              setSingleEvent({ ...singleEvent, startDate: e.target.value });
            }}
          />
          <br />
          <br />
          <TextField
            style={{
              width: "100%",
            }}
            value={singleEvent.endDate}
            id="datetime-local"
            label="End Date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setSingleEvent({ ...singleEvent, endDate: e.target.value });
            }}
          />
          <br />
          <br />
          <label>Async or Moderate</label>
          <Switch
            onChange={(e) => {
              setSingleEvent({ ...singleEvent, isAsync: !e.target.checked });
            }}
            value={singleEvent.isAsync}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={resetForm} color="primary">
            Reset
          </Button>
          <Button onClick={AddEvent} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
          <Paper className="header_custom" >Data Visualization</Paper>
      </Grid>
      <Grid
        style={{
          padding: "16px",
        }}
        container
        spacing={3}
        
      >
        <Grid item xs={3}>
          <Grid justify="flex-end" item xs={12} >
            <Paper className="paper sidebar-height-1">
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
                <h2 className="h2">Event Info Section</h2>
              </div>
              <List component="nav" aria-label="main mailbox folders">
                {eventsData.map((data, index) => {
                  return (
                    <ListItem button>
                      <ListItemText primary={`${data.id} ${data.name}`} />
                      <Button
                        startIcon={<PlayArrowIcon />}
                        style={{
                          float: "right",
                          marginLeft: "2px",
                        }}
                        variant="contained"
                        color="primary"
                      ></Button>
                      <Button
                        startIcon={<PauseIcon />}
                        style={{
                          float: "right",
                          marginLeft: "2px",
                        }}
                        variant="contained"
                        color="primary"
                      ></Button>
                      <Button
                        startIcon={<StopIcon />}
                        style={{
                          float: "right",
                          marginLeft: "2px",
                        }}
                        variant="contained"
                        color="primary"
                      ></Button>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
          <br />
          <Participants />
        </Grid>
        <Grid item xs={9}>
          <Paper className="paper min-height-visualization">
            <h2 className="visualization-h2 text-center" >Main Data Visualization Section</h2>
            <DataVisualization />
          </Paper>
          <br />
          <Paper className="paper min-height-footer">
            <h2 className="visualization-h2 text-center">Footer</h2>
          </Paper>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Home;
