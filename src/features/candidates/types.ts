import type { Candidate } from '@/types'

export type { Candidate }

export interface CreateCandidateDto {
  fullName: string
  email: string
  phone: string
  jobTitleApplied: string
  jobId?: string
  cvUrl?: string
  experienceYears?: number
  note?: string
}

export interface UpdateCandidateDto extends Partial<CreateCandidateDto> {
  status?: Candidate['status']
}
