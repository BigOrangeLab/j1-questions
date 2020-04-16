import React from 'react'
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Radio,
  Checkbox,
  Typography,
  FormControlLabel,
  RadioGroup,
  Box
} from '@material-ui/core'
import {useFilterStyles} from '../classes'
import {ManagedQuestionJSON} from '../types'

interface Props {
  managedQuestions: ManagedQuestionJSON;
  integrationClicked: Function;
  integration: string;
  allTags: string[];
  tagCheckClicked: Function;
  tags: string[];
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
          {[...Object.keys(props.managedQuestions.integrations), 'none'].map((integration: any) => (
            <RadioGroup className={classes.notFlex} value={props.integration} onChange={() => props.integrationClicked(integration)}>
              <FormControlLabel value={integration} control={<Radio/>} label={integration}/>
            </RadioGroup>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant='subtitle1'>Tags</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.notFlex}>
          {props.allTags.map((tag: string) => (
              <FormControlLabel value={tag} control={<Checkbox />} label={tag} onClick={(e:any) => props.tagCheckClicked(tag, e.target.checked)}/>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  )
}

export default Filters;
