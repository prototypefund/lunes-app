import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import styled from 'styled-components/native'

import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import MenuItem from '../components/MenuItem'
import Title from '../components/Title'
import { DisciplineType } from '../constants/endpoints'
import labels from '../constants/labels.json'
import { useLoadDisciplines } from '../hooks/useLoadDisciplines'
import { RoutesParamsType } from '../navigation/NavigationTypes'

const Root = styled.View`
  background-color: ${props => props.theme.colors.lunesWhite};
  height: 100%;
`

const ItemText = styled.View`
  flex-direction: row;
  align-items: center;
`

const StyledList = styled(FlatList as new () => FlatList<DisciplineType>)`
  width: 100%;
`

const Description = styled.Text<{ selected: boolean }>`
  text-align: center;
  font-size: ${props => props.theme.fonts.defaultFontSize};
  font-family: ${props => props.theme.fonts.contentFontRegular};
  padding-left: 5px;
  font-weight: ${props => props.theme.fonts.lightFontWeight};
  color: ${prop => (prop.selected ? prop.theme.colors.lunesWhite : prop.theme.colors.lunesGreyMedium)};
`

const BadgeLabel = styled.Text<{ selected: boolean }>`
  font-family: ${props => props.theme.fonts.contentFontBold};
  font-weight: ${props => props.theme.fonts.defaultFontWeight};
  min-width: ${wp('6%')}px;
  height: ${wp('4%')}px;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  color: ${prop => (prop.selected ? prop.theme.colors.lunesGreyMedium : prop.theme.colors.lunesWhite)};
  background-color: ${prop => (prop.selected ? prop.theme.colors.lunesWhite : prop.theme.colors.lunesGreyMedium)};
  font-size: ${prop => prop.theme.fonts.smallFontSize};
`

interface DisciplineSelectionScreenPropsType {
  route: RouteProp<RoutesParamsType, 'DisciplineSelection'>
  navigation: StackNavigationProp<RoutesParamsType, 'DisciplineSelection'>
}

const DisciplineSelectionScreen = ({ route, navigation }: DisciplineSelectionScreenPropsType): JSX.Element => {
  const { extraParams } = route.params
  const { discipline } = extraParams

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { data: disciplines, error, loading, refresh } = useLoadDisciplines(discipline)

  useFocusEffect(
    useCallback(() => {
      setSelectedId(-1)
    }, [])
  )

  const ListItem = ({ item }: { item: DisciplineType }): JSX.Element | null => {
    if (item.numberOfChildren === 0) {
      return null
    }
    const selected = item.id === selectedId
    const descriptionForWord = item.numberOfChildren === 1 ? labels.home.word : labels.home.words
    const descriptionForUnit = item.numberOfChildren === 1 ? labels.home.unit : labels.home.units
    const description = discipline.isLeaf ? descriptionForWord : descriptionForUnit

    return (
      <MenuItem selected={selected} title={item.title} icon={item.icon} onPress={() => handleNavigation(item)}>
        <ItemText>
          <BadgeLabel selected={selected}>{item.numberOfChildren}</BadgeLabel>
          <Description selected={selected}>{description}</Description>
        </ItemText>
      </MenuItem>
    )
  }

  const handleNavigation = (selectedItem: DisciplineType): void => {
    setSelectedId(selectedItem.id)
    if (!discipline.isLeaf) {
      navigation.push('DisciplineSelection', {
        extraParams: {
          discipline: selectedItem,
          parentTitle: discipline.title
        }
      })
    } else {
      navigation.navigate('Exercises', {
        discipline: {
          id: selectedItem.id,
          title: selectedItem.title,
          numberOfWords: selectedItem.numberOfChildren
        }
      })
    }
  }
  return (
    <Root>
      <StatusBar backgroundColor='blue' barStyle='dark-content' />
      <Title
        title={discipline.title}
        description={`${discipline.numberOfChildren} ${
          discipline.numberOfChildren === 1 ? labels.home.unit : labels.home.units
        }`}
      />
      <Loading isLoading={loading}>
        <>
          <ErrorMessage error={error} refresh={refresh} />
          <StyledList
            data={disciplines}
            renderItem={ListItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </>
      </Loading>
    </Root>
  )
}

export default DisciplineSelectionScreen
