import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { bold } from "ansi-colors";
import moment from "moment/moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ErrorIcon from '@material-ui/icons/Error';
import GridCommonList from "../components/GridCommonList";

const useStyles = makeStyles(theme => ({
  expansionHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: bold
  },
  expansionSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  listItemView: {
    border: "1px solid lightGrey"
  },
  card: {
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.12)",
    borderRight: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "0"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  headingBold: {
    fontWeight: bold
  },
  gridBottomBorder: {
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    paddingBottom: "10px"
  },
  table: {
    border: "1px solid rgba(224, 224, 224, 1)"
  },
  abnormalColor: {
    color: "#ff4f33"
  }
}));

const SubjectDashboardProfileTab = ({ profile }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Fragment>
      <ExpansionPanel expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div>
            <h5>Registartion Details</h5>
            <p>
              Registartion Date: {moment(new Date(profile.registrationDate)).format("DD-MM-YYYY")}
            </p>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item xs={12}>
            <List>
              {profile.observations.map(element => {
                return (
                  <Fragment>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row" width="50%">
                            {element.concept["name"]}
                          </TableCell>
                          <TableCell align="left" width="50%">
                            {"Coded" === element.concept.dataType ? (
                                <div>
                                  {element.value.map(it => it.abnormal ? 
                                  <span className={classes.abnormalColor}>
                                    <ErrorIcon  fontSize="small"/>
                                    {it.name}
                                  </span>
                                  :<span>{it.name}</span>)
                                  .reduce((prev, curr) => [prev, ', ', curr])}
                                </div>
                            ) : ["Date", "DateTime", "Time", "Duration"].includes(
                                element.concept.dataType
                              ) ? (
                              <div>
                                {moment(new Date(element.value)).format("DD-MM-YYYY HH:MM A")}
                              </div>
                            ) : (
                              <div>{element.value}</div>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Fragment>
                );
              })}
            </List>
            <Button color="primary">VOID</Button>
            <Button color="primary">EDIT</Button>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.expansionHeading}>Relatives</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridCommonList gridListDetails = {profile.relationships}/>
        </ExpansionPanelDetails>
        <Button color="primary">ADD RELATIVE</Button>
      </ExpansionPanel>
    </Fragment>
  );
};

export default SubjectDashboardProfileTab;
