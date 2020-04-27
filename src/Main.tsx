import React, {useEffect, useContext} from 'react';
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
import { useWindowSize } from "@reach/window-size";
import {Question} from './types'
import Context from './AppContext'

const Main = () => {
  const {tags, integrations, search, tagFilter, categories, setIntegrations, setCategories, managedQuestions, setTags} = useContext(Context)
  const history = useHistory()
  const windowSize = useWindowSize()

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

  useEffect(() => {

    const searchString : string = '/filter?'
      + ((tags.length !== 0) ? `&tags=${tags.join(',')}` : "")
      + ((integrations.length !== 0) ? `&integrations=${integrations.join(',')}` : "")
      + ((search !== '') ? `&search=${search}` : "")
      + ((categories.length !== 0) ? `&categories=${categories.join(',')}` : "")
      + (`&tagFilter=${tagFilter}`)

    history.replace(searchString)

  }, [tags, integrations, search, tagFilter, categories])


  const filteredQuestions : Question[] = filterQuestions(
    managedQuestions.questions,
    integrations,
    tags,
    search,
    (tagFilter === 'any') ? FilterType.ANY : FilterType.ALL,
    categories
  )

  return (
    <>
      <Zoom in={managedQuestions.questions.length >= 1}>
        <div style={{display: windowSize.width > 750 ? 'flex' : 'block', marginTop: '1.5em'}}>
          <Filters
            integrationClicked={(integration: string) => handleChangeInMultiOptions(integration, setIntegrations)}
            setCategories={({category} : {category : string}) => handleChangeInMultiOptions(category, setCategories)}
            tagCheckClicked={(tag: string) => handleChangeInMultiOptions(tag, setTags)}/>

          <QuestionsDisplay questions={filteredQuestions} />
        </div>
      </Zoom>
    </>
  )
}

export default Main;
