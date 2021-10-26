import { ExerciseKeyType, ResultType, SimpleResultType } from '../constants/data'
import { DocumentsType, DocumentType } from '../constants/endpoints'

export interface DocumentResultType extends DocumentType {
  result: SimpleResultType
}

export type CountsType = {
  [key in SimpleResultType]: number
} & {
  total: number
}

export interface DisciplineData {
  id: number
  title: string
  numberOfChildren: number
  isLeaf: boolean
  apiKeyOfCustomDiscipline?: string
}

interface ResultScreenData {
  discipline: DisciplineData
  exercise: ExerciseKeyType
  results: DocumentResultType[]
  retryData?: { data: DocumentsType }
}

// https://github.com/Microsoft/TypeScript/issues/15300
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RoutesParamsType = {
  Home: undefined
  AddCustomDiscipline: undefined
  DisciplineSelection: {
    extraParams: {
      discipline: DisciplineData
      parentTitle?: string
    }
  }
  Exercises: {
    discipline: DisciplineData
  }
  VocabularyList: {
    discipline: DisciplineData
  }
  WordChoiceExercise: {
    discipline: DisciplineData
  }
  ArticleChoiceExercise: {
    discipline: DisciplineData
  }
  WriteExercise: {
    discipline: DisciplineData
    retryData?: { data: DocumentsType }
  }
  InitialSummary: {
    result: ResultScreenData
  }
  ResultsOverview: {
    result: ResultScreenData
  }
  ResultScreen: {
    result: ResultScreenData
    resultType: ResultType
    counts: CountsType
  }
  CorrectResults: undefined
  IncorrectResults: undefined
  AlmostCorrectResults: undefined
}
