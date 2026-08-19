import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryParams } from '@/types'
import {
  fetchCandidates,
  fetchCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from '../api/candidatesApi'
import type { CreateCandidateDto, UpdateCandidateDto } from '../types'

export const candidateKeys = {
  all: ['candidates'] as const,
  lists: () => [...candidateKeys.all, 'list'] as const,
  list: (params: QueryParams) => [...candidateKeys.lists(), params] as const,
  detail: (id: string) => [...candidateKeys.all, 'detail', id] as const,
}

export const useCandidatesQuery = (params: QueryParams) => {
  return useQuery({
    queryKey: candidateKeys.list(params),
    queryFn: () => fetchCandidates(params),
  })
}

export const useCandidateDetailQuery = (id: string) => {
  return useQuery({
    queryKey: candidateKeys.detail(id),
    queryFn: () => fetchCandidateById(id),
    enabled: !!id,
  })
}

export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCandidateDto) => createCandidate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() })
    },
  })
}

export const useUpdateCandidateMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCandidateDto) => updateCandidate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() })
    },
  })
}

export const useDeleteCandidateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCandidate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: candidateKeys.lists() })
    },
  })
}
