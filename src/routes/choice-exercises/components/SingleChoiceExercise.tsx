import React, { useEffect, useState } from 'react'
import { SingleChoice } from './SingleChoice'
import { AlternativeWordType, DocumentType } from '../../../constants/endpoints'
import { DocumentResultType, RoutesParamsType } from '../../../navigation/NavigationTypes'
import { Answer, ARTICLES, BUTTONS_THEME, SIMPLE_RESULTS } from '../../../constants/data'
import Button from '../../../components/Button'
import { Text } from 'react-native'
import { styles } from '../../write-exercise/components/Actions'
import styled from 'styled-components/native'
import AudioPlayer from '../../../components/AudioPlayer'
import labels from '../../../constants/labels.json'
import ExerciseHeader from '../../../components/ExerciseHeader'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ImageCarousel from '../../../components/ImageCarousel'
import { COLORS } from '../../../constants/colors'

const ExerciseContainer = styled.View`
  background-color: ${COLORS.lunesWhite};
  height: 100%;
  width: 100%;
`

const ButtonContainer = styled.View`
  align-items: center;
  margin: 7% 0;
`

interface SingleChoiceExercisePropsType {
  documents: DocumentType[]
  documentToAnswers: (document: DocumentType) => Answer[]
  onExerciseFinished: (results: DocumentResultType[]) => void
  navigation: StackNavigationProp<RoutesParamsType, 'WordChoiceExercise' | 'ArticleChoiceExercise'>
  route: RouteProp<RoutesParamsType, 'WordChoiceExercise' | 'ArticleChoiceExercise'>
}

const ChoiceExerciseScreen = ({
  documents,
  documentToAnswers,
  onExerciseFinished,
  navigation,
  route
}: SingleChoiceExercisePropsType): JSX.Element => {
  const [currentWord, setCurrentWord] = useState<number>(0)
  const currentDocument = documents[currentWord]
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null)
  const [results, setResults] = useState<DocumentResultType[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const correctAnswerDelay = 700
  const [delayPassed, setDelayPassed] = useState<boolean>(false)
  const [correctAnswer, setCorrectAnswer] = useState<Answer>({
    article: currentDocument.article,
    word: currentDocument.word
  })

  // Prevent regenerating false answers on every render
  useEffect(() => {
    setAnswers(documentToAnswers(currentDocument))
    setCorrectAnswer({ word: currentDocument.word, article: currentDocument.article })
  }, [currentDocument, documentToAnswers])

  const count = documents.length

  const isAnswerEqual = (answer1: Answer | AlternativeWordType, answer2: Answer): boolean => {
    return answer1.article.id === answer2.article.id && answer1.word === answer2.word
  }

  const onClickAnswer = (selectedAnswer: Answer) => {
    setSelectedAnswer(selectedAnswer)
    const correctSelected = [correctAnswer, ...currentDocument.alternatives].find(it =>
      isAnswerEqual(it, selectedAnswer)
    )

    if (correctSelected !== undefined) {
      setCorrectAnswer(selectedAnswer)
      const result: DocumentResultType = { ...documents[currentWord], result: SIMPLE_RESULTS.correct }
      setResults([...results, result])
    } else {
      const result: DocumentResultType = { ...documents[currentWord], result: SIMPLE_RESULTS.incorrect }
      setResults([...results, result])
    }
    setTimeout(() => {
      setDelayPassed(true)
    }, correctAnswerDelay)
  }

  const onFinishWord = () => {
    const exerciseFinished = currentWord + 1 >= count
    if (exerciseFinished) {
      setCurrentWord(0)
      setSelectedAnswer(null)
      onExerciseFinished(results)
      setCurrentWord(0)
      setResults([])
    } else {
      setCurrentWord(prevState => prevState + 1)
    }
    setSelectedAnswer(null)
    setDelayPassed(false)
  }

  return (
    <ExerciseContainer>
      <ExerciseHeader
        navigation={navigation}
        route={route}
        currentWord={currentWord}
        numberOfWords={documents.length}
      />
      {documents[currentWord]?.document_image.length > 0 && (
        <ImageCarousel images={documents[currentWord]?.document_image} />
      )}
      <AudioPlayer document={documents[currentWord]} disabled={selectedAnswer === null} />
      <SingleChoice
        answers={answers}
        onClick={onClickAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        delayPassed={delayPassed}
      />
      <ButtonContainer>
        {selectedAnswer !== null && (
          <Button onPress={onFinishWord} theme={BUTTONS_THEME.dark}>
            <>
              <Text style={[styles.lightLabel, styles.arrowLabel]}>
                {currentWord + 1 >= count ? labels.exercises.showResults : labels.exercises.next}
              </Text>
            </>
          </Button>
        )}
      </ButtonContainer>
    </ExerciseContainer>
  )
}

export default ChoiceExerciseScreen
