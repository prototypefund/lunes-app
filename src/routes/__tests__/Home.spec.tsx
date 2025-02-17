import { fireEvent, render } from '@testing-library/react-native'
import { mocked } from 'jest-mock'
import React from 'react'
import { ReactTestInstance } from 'react-test-renderer'

import labels from '../../constants/labels.json'
import { Return } from '../../hooks/useLoadAsync'
import { useLoadDisciplines } from '../../hooks/useLoadDisciplines'
import { useLoadGroupInfo } from '../../hooks/useLoadGroupInfo'
import useReadCustomDisciplines from '../../hooks/useReadCustomDisciplines'
import AsyncStorageService from '../../services/AsyncStorage'
import createNavigationMock from '../../testing/createNavigationPropMock'
import wrapWithTheme from '../../testing/wrapWithTheme'
import HomeScreen from '../HomeScreen'

jest.mock('@react-navigation/native')
jest.mock('../../hooks/useReadCustomDisciplines')
jest.mock('../../hooks/useLoadDisciplines')
jest.mock('../../hooks/useLoadGroupInfo')

const mockDisciplines = [
  {
    id: 1,
    title: 'First Discipline',
    description: 'Description1',
    icon: 'none',
    numberOfChildren: 1,
    isLeaf: false,
    parentTitle: null,
    needsTrainingSetEndpoint: false
  },
  {
    id: 2,
    title: 'Second Discipline',
    description: 'Description1',
    icon: 'none',
    numberOfChildren: 1,
    isLeaf: false,
    parentTitle: null,
    needsTrainingSetEndpoint: false
  }
]

const mockCustomDiscipline = {
  id: 1,
  title: 'Custom Discipline',
  description: 'Description',
  icon: 'none',
  numberOfChildren: 1,
  isLeaf: false,
  apiKey: 'test',
  parentTitle: null,
  needsTrainingSetEndpoint: false
}

describe('HomeScreen', () => {
  const navigation = createNavigationMock<'Home'>()

  const getReturnOf = <T,>(data: T): Return<T> => ({
    data,
    error: null,
    loading: false,
    refresh: () => undefined
  })

  it('should show discipline', async () => {
    mocked(useLoadDisciplines).mockReturnValueOnce(getReturnOf(mockDisciplines))
    mocked(useReadCustomDisciplines).mockReturnValue(getReturnOf([]))

    const { findByText } = render(<HomeScreen navigation={navigation} />, { wrapper: wrapWithTheme })
    expect(await findByText('First Discipline')).toBeDefined()
    expect(await findByText('Second Discipline')).toBeDefined()
  })

  it('should show custom discipline', async () => {
    await AsyncStorageService.setCustomDisciplines(['test'])
    mocked(useLoadDisciplines).mockReturnValueOnce(getReturnOf(mockDisciplines))
    mocked(useReadCustomDisciplines).mockReturnValue(getReturnOf(['abc']))
    mocked(useLoadGroupInfo).mockReturnValueOnce(getReturnOf(mockCustomDiscipline))

    const { findByText } = render(<HomeScreen navigation={navigation} />, { wrapper: wrapWithTheme })
    expect(await findByText('Custom Discipline')).toBeDefined()
  })

  it('should delete custom discipline', async () => {
    await AsyncStorageService.setCustomDisciplines(['test'])

    mocked(useLoadDisciplines).mockReturnValueOnce(getReturnOf(mockDisciplines))
    mocked(useReadCustomDisciplines).mockReturnValue(getReturnOf(['test']))
    mocked(useLoadGroupInfo).mockReturnValue(getReturnOf(mockCustomDiscipline))
    const spyOnDeletion = jest.spyOn(AsyncStorageService, 'deleteCustomDiscipline')

    const { findByText, findByTestId } = render(<HomeScreen navigation={navigation} />, {
      wrapper: wrapWithTheme
    })
    const customDiscipline = await findByText('Custom Discipline')
    expect(customDiscipline).toBeDefined()

    const row = await findByTestId('Swipeable')
    const swipeable = row.children[0] as ReactTestInstance
    swipeable.instance.openRight()

    const deleteIcon = await findByTestId('trash-icon')
    expect(deleteIcon).toBeDefined()
    await fireEvent.press(deleteIcon)

    const confirmationModelConfirmButton = await findByText(labels.home.deleteModal.confirm)
    fireEvent.press(confirmationModelConfirmButton)

    expect(spyOnDeletion).toHaveBeenCalledTimes(1)
    expect(spyOnDeletion).toHaveBeenCalledWith('test')
  })
})
