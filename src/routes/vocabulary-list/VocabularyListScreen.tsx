import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { DocumentType } from '../../constants/endpoints'
import Title from '../../components/Title'
import VocabularyListItem from './components/VocabularyListItem'
import Loading from '../../components/Loading'
import { COLORS } from '../../constants/colors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RouteProp } from '@react-navigation/native'
import { RoutesParamsType } from '../../navigation/NavigationTypes'
import { StackNavigationProp } from '@react-navigation/stack'
import labels from '../../constants/labels.json'
import useLoadDocuments from '../../hooks/useLoadDocuments'
import VocabularyListModal from './components/VocabularyListModal'

export const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.lunesWhite,
    height: '100%',
    width: '100%',
    paddingBottom: 0,
    paddingTop: 32
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: wp('5%'),
    color: COLORS.lunesGreyDark,
    fontFamily: 'SourceSansPro-SemiBold',
    marginBottom: 4
  },
  list: {
    width: '100%'
  },
  description: {
    textAlign: 'center',
    fontSize: wp('4%'),
    color: COLORS.lunesGreyMedium,
    fontFamily: 'SourceSansPro-Regular'
  }
})

interface VocabularyListScreenPropsType {
  route: RouteProp<RoutesParamsType, 'VocabularyList'>
  navigation: StackNavigationProp<RoutesParamsType, 'VocabularyList'>
}

const VocabularyListScreen = ({ navigation, route }: VocabularyListScreenPropsType): JSX.Element => {
  const { trainingSetId } = route.params.extraParams
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState<number>(0)

  const { data: documents, error, loading } = useLoadDocuments(trainingSetId)

  const Header = (
    <Title>
      <>
        <Text style={styles.screenTitle}>{labels.exercises.vocabularyList.title}</Text>
        <Text style={styles.description}>
          {documents?.length} {documents?.length === 1 ? labels.home.word : labels.home.words}
        </Text>
      </>
    </Title>
  )

  const renderItem = ({ item, index }: { item: DocumentType; index: number }): JSX.Element => (
    <VocabularyListItem
      document={item}
      setIsModalVisible={() => {
        setIsModalVisible(true)
        setSelectedDocumentIndex(index)
      }}
    />
  )

  return (
    <View style={styles.root}>
      {!documents || !documents[selectedDocumentIndex] ? (
        <></>
      ) : (
        <VocabularyListModal
          documents={documents}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          selectedDocumentIndex={selectedDocumentIndex}
          setSelectedDocumentIndex={setSelectedDocumentIndex}
        />
      )}

      <Loading isLoading={loading}>
        <FlatList
          data={documents}
          style={styles.list}
          ListHeaderComponent={Header}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
        />
      </Loading>
      {error && <Text>{error.message}</Text>}
    </View>
  )
}

export default VocabularyListScreen
