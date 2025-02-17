import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'

import { Discipline } from '../../constants/endpoints'
import labels from '../../constants/labels.json'
import createNavigationMock from '../../testing/createNavigationPropMock'
import {
  mockUseLoadAsyncLoading,
  mockUseLoadAsyncWithData,
  mockUseLoadAsyncWithError
} from '../../testing/mockUseLoadFromEndpoint'
import wrapWithTheme from '../../testing/wrapWithTheme'
import CustomDisciplineItem from '../CustomDisciplineItem'

describe('Components', () => {
  describe('CustomDisciplineItem', () => {
    const navigation = createNavigationMock<'Home'>()
    const mockData: Discipline = {
      id: 1,
      title: 'Custom Discipline',
      description: 'description',
      icon: 'none',
      numberOfChildren: 1,
      parentTitle: null,
      needsTrainingSetEndpoint: false,
      isLeaf: false,
      apiKey: 'abc'
    }

    const renderCustomDisciplineItem = (): RenderAPI =>
      render(
        <CustomDisciplineItem
          apiKey='abc'
          selectedId='0'
          setSelectedId={jest.fn()}
          navigation={navigation}
          refresh={jest.fn()}
        />,
        { wrapper: wrapWithTheme }
      )

    it('should display data', () => {
      mockUseLoadAsyncWithData(mockData)
      const { getByText } = renderCustomDisciplineItem()
      expect(getByText('Custom Discipline')).toBeDefined()
      expect(getByText(`1 ${labels.general.rootDiscipline}`)).toBeDefined()
    })

    it('should display loading', () => {
      mockUseLoadAsyncLoading()
      const { getByTestId } = renderCustomDisciplineItem()
      expect(getByTestId('loading')).toBeDefined()
    })

    it('should display error', () => {
      mockUseLoadAsyncWithError('Network Error')
      const { getByText } = renderCustomDisciplineItem()
      expect(getByText(`${labels.home.errorLoadCustomDiscipline} abc`)).toBeDefined()
    })
  })
})
