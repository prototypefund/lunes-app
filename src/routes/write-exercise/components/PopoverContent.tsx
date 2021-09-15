import React from 'react'
import { InfoIcon } from '../../../../assets/images'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { COLORS } from '../../../constants/theme/colors'
import labels from '../../../constants/labels.json'
import styled from 'styled-components/native'

const StyledContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.lunesBlack};
  width: ${wp('80%')}px;
  height: 60px;
  padding-right: 8px;
  padding-left: 8px;
  padding-top: 9px;
  padding-right: 9px;
  border-radius: 2px;
`
const StyledMessage = styled.Text`
  color: ${COLORS.lunesWhite};
  font-size: ${wp('3.5%')}px;
  font-weight: normal;
  font-family: SourceSansPro-Regular;
  width: ${wp('60%')}px;
  margin-left: 8px;
`

const PopoverContent = () => (
  <StyledContainer>
    <InfoIcon width={30} height={30} />
    <StyledMessage>{labels.exercises.write.feedback.articleMissing}</StyledMessage>
  </StyledContainer>
)

export default PopoverContent
