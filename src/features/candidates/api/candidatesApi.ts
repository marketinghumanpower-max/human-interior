import axiosClient from '@/api/axiosClient'
import type { PaginatedResponse, ApiResponse, QueryParams } from '@/types'
import type { Candidate, CreateCandidateDto, UpdateCandidateDto } from '../types'

export async function fetchCandidates(
  params: QueryParams
): Promise<PaginatedResponse<Candidate>> {
  return axiosClient.get('/candidates', { params })
}

export async function fetchCandidateById(
  id: string
): Promise<ApiResponse<Candidate>> {
  return axiosClient.get(`/candidates/${id}`)
}

export async function createCandidate(
  data: CreateCandidateDto
): Promise<ApiResponse<Candidate>> {
  return axiosClient.post('/candidates', data)
}

export async function updateCandidate(
  id: string,
  data: UpdateCandidateDto
): Promise<ApiResponse<Candidate>> {
  return axiosClient.patch(`/candidates/${id}`, data)
}

export async function deleteCandidate(id: string): Promise<void> {
  return axiosClient.delete(`/candidates/${id}`)
}
