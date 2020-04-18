import React from 'react'
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Radio,
  Chip,
  Typography,
  FormControlLabel,
  RadioGroup,
  Box,
  Button,
  Avatar
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'
import {Link} from 'react-router-dom'
import DoneIcon from '@material-ui/icons/Done';
// import CloseIcon from '@material-ui/icons/Close';

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrationClicked: Function;
  integration: string;
  allTags: string[];
  tagCheckClicked: Function;
  tags: string[];
  search: string;
}

const Filters = (props: Props) => {
  const classes = useFilterStyles()

  return (
    <Paper className={classes.root}>
      <Paper className={classes.title}>
        <Box p={3}>
          <Typography variant='h6'>Filters</Typography>
        </Box>
      </Paper>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant='subtitle1'>Integrations</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.notFlex}>
          {[...Object.keys(props.managedQuestions.integrations), 'none'].map((integration: any, index: number) => (
            <RadioGroup key={index} className={classes.notFlex} value={props.integration} onChange={() => props.integrationClicked(integration)}>
              <FormControlLabel value={integration} control={<Radio color='primary'/>} label={integration}/>
            </RadioGroup>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant='subtitle1'>Tags</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.flexWrap}>
          {props.allTags
            .sort()
            .map((tag: string, index : number) => (
              <Chip
                variant='outlined'
                avatar={props.tags.includes(tag) ? <Avatar><DoneIcon /></Avatar> : undefined}
                className={classes.tag}
                key={index}
                onClick={() => props.tagCheckClicked(tag)}
                color={props.tags.includes(tag) ? 'primary' : 'secondary'}
                label={tag}
              />
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Link style={{textDecoration: 'none'}} to={`/integration/${props.integration}/tags/${JSON.stringify(props.tags)}/search/${props.search !== '' ? props.search : 'none'}`}>
        <br/>
        <Button variant='contained' color='primary' className={classes.button}>
          Share Results
        </Button>
      </Link>
    </Paper>
  )
}

export default Filters;
