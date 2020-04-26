import React, {useEffect, useState} from 'react';
import './App.css';
import {useHistory} from 'react-router-dom'
import QuestionsDisplay from './components/QuestionsDisplay'
import Filters from './components/Filters'
import filterQuestions, { FilterType } from './methods/filterQuestions'
import uniqueArray from './methods/uniqueArray'
import {
  Box,
  Zoom,
} from '@material-ui/core'
import {ManagedQuestionJSON} from './types'
import queryString from 'query-string'
import { useWindowSize } from "@reach/window-size";
import {Question} from './types'


interface Props {
  managedQuestions: ManagedQuestionJSON;
  allTags: string[];
  search: string;
  allCategories: string[];
}

const Main = (props: Props) => {
  const history = useHistory()
  const windowSize = useWindowSize()

  const params = queryString.parse(history.location.search)
  if (typeof params.integrations !== 'string') {
    params.integrations = ''
  }
  if (typeof params.tags !== 'string') {
    params.tags = ''
  }
  if (typeof params.tagFilter !== 'string') {
    params.tagFilter = ''
  }

  const handleChangeInMultiOptions = (option: string, setOptions : Function) => {
    setOptions((prev: string[]) => {
      if (prev.includes(option)) {
        const index = prev.indexOf(option);
        if (index > -1) {
          prev.splice(index, 1);
        }
      } else {
        prev.push(option)
      }
      prev = uniqueArray(prev)
      return prev
    })
  }

  const [integrations, setIntegrations] = useState<string[]>((params.integrations !== '') ? params.integrations.split(',') : [])
  const [tags, setTags] = useState<string[]>((params.tags !== '') ? params.tags.split(',') : [])
  const [tagFilter, setFilterLogic] = useState<string>((params.tagFilter !== '') ? params.tagFilter : 'all')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {

    const searchString : string = '/filter?'
      + ((tags.length !== 0) ? `&tags=${tags.join(',')}` : "")
      + ((integrations.length !== 0) ? `&integrations=${integrations.join(',')}` : "")
      + ((props.search !== '') ? `&search=${props.search}` : "")
      + ((tagFilter !== '') ? `&tagFilter=${tagFilter}` : "")

    history.replace(searchString)

  }, [tags, integrations, props.search, tagFilter, categories])


  const filteredQuestions : Question[] = filterQuestions(
    props.managedQuestions.questions,
    integrations,
    tags,
    props.search,
    (tagFilter === 'any') ? FilterType.ANY : FilterType.ALL,
    categories
  )

  return (
    <>
      <Zoom in={props.managedQuestions.questions.length >= 1}>
        <Box mt={2} style={{display: windowSize.width > 750 ? 'flex' : 'block'}}>
          <Filters
            managedQuestions={props.managedQuestions}
            allTags={props.allTags}
            integrations={integrations}
            integrationClicked={(integration: string) => handleChangeInMultiOptions(integration, setIntegrations)}
            tags={tags}
            filter={tagFilter}
            setFilterLogic={setFilterLogic}
            allCategories={props.allCategories}
            categories={categories}
            setCategories={({category} : {category : string}) => handleChangeInMultiOptions(category, setCategories)}
            tagCheckClicked={(tag: string) => handleChangeInMultiOptions(tag, setTags)}/>

          <QuestionsDisplay
            totalCount={props.managedQuestions.questions.length}
            questions={filteredQuestions}
          />
        </Box>
      </Zoom>
    </>
  )
}

export default Main;
