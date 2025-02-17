import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { ProgressBar as RNProgressBar } from 'react-native-paper'
import styled from 'styled-components/native'

import { CloseCircleIconWhite } from '../../assets/images'
import labels from '../constants/labels.json'
import { COLORS } from '../constants/theme/colors'
import { RoutesParams } from '../navigation/NavigationTypes'
import ConfirmationModal from './ConfirmationModal'
import { NavigationHeaderLeft } from './NavigationHeaderLeft'
import { NavigationTitle } from './NavigationTitle'

const HeaderText = styled.Text`
  font-size: ${props => props.theme.fonts.defaultFontSize};
  font-family: ${props => props.theme.fonts.contentFontRegular};
  color: ${props => props.theme.colors.lunesGreyMedium};
`

const ProgressBar = styled(RNProgressBar)`
  background-color: ${props => props.theme.colors.lunesBlackUltralight};
`

interface ExerciseHeaderProps {
  navigation: StackNavigationProp<RoutesParams, 'WordChoiceExercise' | 'ArticleChoiceExercise' | 'WriteExercise'>
  route: RouteProp<RoutesParams, 'WordChoiceExercise' | 'ArticleChoiceExercise' | 'WriteExercise'>
  currentWord: number
  numberOfWords: number
}

const ExerciseHeader = ({ navigation, route, currentWord, numberOfWords }: ExerciseHeaderProps): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const progressText = numberOfWords !== 0 ? `${currentWord + 1} ${labels.general.header.of} ${numberOfWords}` : ''

  useEffect(
    () =>
      navigation.setOptions({
        headerLeft: () => (
          <NavigationHeaderLeft onPress={() => setIsModalVisible(true)}>
            <CloseCircleIconWhite />
            <NavigationTitle>{labels.general.header.cancelExercise}</NavigationTitle>
          </NavigationHeaderLeft>
        ),
        headerRight: () => <HeaderText>{progressText}</HeaderText>,
        headerRightContainerStyle: {
          paddingHorizontal: 15,
          maxWidth: 100
        }
      }),
    [navigation, progressText, setIsModalVisible]
  )

  useEffect(() => {
    const showModal = (): boolean => {
      setIsModalVisible(true)
      return true
    }
    const bEvent = BackHandler.addEventListener('hardwareBackPress', showModal)
    return () => bEvent.remove()
  }, [])

  const goBack = (): void => {
    setIsModalVisible(false)
    navigation.navigate('Exercises', { ...route.params })
  }

  return (
    <>
      <ProgressBar progress={numberOfWords > 0 ? currentWord / numberOfWords : 0} color={COLORS.lunesGreenMedium} />

      <ConfirmationModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        text={labels.exercises.cancelModal.cancelAsk}
        confirmationButtonText={labels.exercises.cancelModal.cancel}
        cancelButtonText={labels.exercises.cancelModal.continue}
        confirmationAction={goBack}
      />
    </>
  )
}
export default ExerciseHeader
