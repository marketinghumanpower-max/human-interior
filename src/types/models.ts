import type { BaseEntity } from './api'

/** User role definitions */
export type UserRole = 'admin' | 'recruiter' | 'interviewer' | 'candidate'

/** Current authenticated user domain model */
export interface User extends BaseEntity {
  email: string
  fullName: string
  avatarUrl?: string
  role: UserRole
  phone?: string
  isActive: boolean
}

/** Job posting domain model */
export interface Job extends BaseEntity {
  title: string
  code: string
  department: string
  location: string
  workType: 'full-time' | 'part-time' | 'contract' | 'remote'
  experienceLevel: string
  salaryRange?: string
  description: string
  requirements: string[]
  benefits: string[]
  status: 'draft' | 'published' | 'closed'
  deadline?: string
}

/** Candidate application status */
export type CandidateStatus =
  | 'applied'
  | 'screening'
  | 'interviewing'
  | 'offered'
  | 'hired'
  | 'rejected'

/** Candidate domain model */
export interface Candidate extends BaseEntity {
  fullName: string
  email: string
  phone: string
  avatarUrl?: string
  jobTitleApplied: string
  jobId?: string
  status: CandidateStatus
  appliedDate: string
  cvUrl?: string
  experienceYears?: number
  note?: string
}

/** Standard query pagination and filter parameters */
export interface QueryParams {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  [key: string]: unknown
}
