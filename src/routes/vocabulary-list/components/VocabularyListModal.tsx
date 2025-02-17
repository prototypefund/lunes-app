import React, { ReactElement } from 'react'
import { Modal, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

import { CloseCircleIconWhite, ArrowRightIcon } from '../../../../assets/images'
import AudioPlayer from '../../../components/AudioPlayer'
import Button from '../../../components/Button'
import ImageCarousel from '../../../components/ImageCarousel'
import { BUTTONS_THEME } from '../../../constants/data'
import { Documents } from '../../../constants/endpoints'
import labels from '../../../constants/labels.json'
import SingleChoiceListItem from '../../choice-exercises/components/SingleChoiceListItem'

const ModalContainer = styled.View`
  background-color: ${props => props.theme.colors.lunesWhite};
  height: 100%;
  width: 100%;
`

const ModalHeader = styled.View`
  display: flex;
  align-items: flex-end;
  padding: 10px;
  border-bottom-color: ${props => props.theme.colors.lunesBlackUltralight};
  border-bottom-width: 1px;
  margin-bottom: 10px;
`

const ItemContainer = styled.View`
  padding: 5%;
  height: 45%;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  margin-top: -40%;
`

interface VocabularyListModalProps {
  documents: Documents
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  selectedDocumentIndex: number
  setSelectedDocumentIndex: (selectedDocumentIndex: number) => void
}

const VocabularyListModal = ({
  documents,
  isModalVisible,
  setIsModalVisible,
  selectedDocumentIndex,
  setSelectedDocumentIndex
}: VocabularyListModalProps): ReactElement => {
  const goToNextWord = (): void => {
    if (selectedDocumentIndex + 1 < documents.length) {
      setSelectedDocumentIndex(selectedDocumentIndex + 1)
    }
  }

  return (
    <Modal animationType='slide' transparent visible={isModalVisible}>
      <SafeAreaView>
        <ModalContainer>
          <ModalHeader>
            <CloseCircleIconWhite onPress={() => setIsModalVisible(false)} />
          </ModalHeader>
          <ImageCarousel images={documents[selectedDocumentIndex].document_image} />
          <AudioPlayer document={documents[selectedDocumentIndex]} disabled={false} />
          <ItemContainer>
            <SingleChoiceListItem
              answer={{
                word: documents[selectedDocumentIndex].word,
                article: documents[selectedDocumentIndex].article
              }}
              onClick={() => undefined}
              correct={false}
              selected={false}
              anyAnswerSelected={false}
              delayPassed={false}
              disabled
            />
          </ItemContainer>
          <ButtonContainer>
            {documents.length > selectedDocumentIndex + 1 ? (
              <Button
                label={labels.exercises.next}
                iconRight={ArrowRightIcon}
                onPress={goToNextWord}
                buttonTheme={BUTTONS_THEME.contained}
              />
            ) : (
              <Button
                label={labels.general.header.cancelExercise}
                onPress={() => setIsModalVisible(false)}
                buttonTheme={BUTTONS_THEME.contained}
              />
            )}
          </ButtonContainer>
        </ModalContainer>
      </SafeAreaView>
    </Modal>
  )
}

export default VocabularyListModal
