import {
  React,
  TouchableOpacity,
  CloseButton,
  useState,
  Modal,
  View,
  ProgressBar,
  COLORS,
  styles,
  Image,
  Text,
  IDocumentProps,
  useFocusEffect,
  ENDPOINTS,
  axios,
  IVocabularyTrainerScreen,
  AnswerSection,
  BackHandler,
} from './imports';

const VocabularyTrainerExerciseScreen = ({
  navigation,
  route,
}: IVocabularyTrainerScreen) => {
  const {extraParams} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentWordNumber, setCurrentWordNumber] = useState(1);
  const [documents, setDocuments] = useState<IDocumentProps[]>([]);
  const [count, setCount] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [index, setIndex] = useState(0);
  const [document, setDocument] = useState<IDocumentProps>();
  const [progressStep, setProgressStep] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
    return true;
  };

  const increaseProgress = React.useCallback(() => {
    setProgressValue((prevValue) => prevValue + progressStep);
  }, [progressStep]);

  React.useEffect(() => {
    setDocument(documents[index]);
  }, [index, documents]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={showModal} style={styles.headerLeft}>
          <CloseButton />
          <Text style={styles.title}>End Session</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <Text
            style={
              styles.headerText
            }>{`${currentWordNumber} of ${count}`}</Text>
        </View>
      ),
    });
  }, [navigation, currentWordNumber, count]);

  const resetStates = () => {
    setCurrentWordNumber(1);
    setIndex(0);
    setProgressValue(0);
  };

  useFocusEffect(
    React.useCallback(() => {
      resetStates();

      const getDocuments = async () => {
        try {
          const documentsRes = await axios.get(
            ENDPOINTS.documents.all.replace(':id', `${extraParams.id}`),
          );

          setDocuments(documentsRes.data);
          setCount(documentsRes.data.length);
          setDocument(documentsRes.data[0]);
          setProgressStep(
            documentsRes.data.length && 1 / documentsRes.data.length,
          );
        } catch (error) {
          console.error(error);
        }
      };

      getDocuments();
    }, [extraParams]),
  );

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', showModal);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', showModal);
    };
  }, []);

  return (
    <View>
      <ProgressBar
        progress={progressValue}
        color={COLORS.lunesGreenMedium}
        style={styles.progressBar}
        accessibilityComponentType
        accessibilityTraits
      />

      <Image
        source={{
          uri: document?.image,
        }}
        style={styles.image}
      />

      <AnswerSection
        count={count}
        index={index}
        setIndex={setIndex}
        currentWordNumber={currentWordNumber}
        setCurrentWordNumber={setCurrentWordNumber}
        document={document}
        setDocuments={setDocuments}
        increaseProgress={increaseProgress}
        navigation={navigation}
        extraParams={{...extraParams, totalCount: count}}
      />

      <Modal
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

export default VocabularyTrainerExerciseScreen;
