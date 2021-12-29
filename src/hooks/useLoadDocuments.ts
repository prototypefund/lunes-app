import { ARTICLES } from '../constants/data'
import { DisciplineType, DocumentType, ENDPOINTS } from '../constants/endpoints'
import { getFromEndpoint } from '../services/axios'
import useLoadAsync, { ReturnType } from './useLoadAsync'
import {shuffleArray} from "../services/helpers";

export interface AlternativeWordTypeFromServer {
  article: number
  alt_word: string
}

export interface DocumentTypeFromServer {
  id: number
  word: string
  article: number
  document_image: Array<{ id: number; image: string }>
  audio: string
  alternatives: AlternativeWordTypeFromServer[]
}

const formatServerResponse = (documents: DocumentTypeFromServer[]): DocumentType[] =>
  documents.map(document => ({
    ...document,
    article: ARTICLES[document.article],
    alternatives: document.alternatives.map(it => ({
      article: ARTICLES[it.article],
      word: it.alt_word
    }))
  })) ?? []

export const loadDocuments = async (discipline: DisciplineType): Promise<DocumentType[]> => {
  const url = ENDPOINTS.documents.replace(':id', `${discipline.id}`)

  const response = await getFromEndpoint<DocumentTypeFromServer[]>(url, discipline.apiKey)
  return formatServerResponse(response)
}

const useLoadDocuments = (discipline: DisciplineType, shuffle: Boolean = false): ReturnType<DocumentType[]> => {
  const documents: ReturnType<DocumentType[]> = useLoadAsync(loadDocuments, discipline)
  if (shuffle) {
    return documents.data ? { ...documents, data: shuffleArray(documents.data) } : documents
  }
  return documents
}

export default useLoadDocuments
