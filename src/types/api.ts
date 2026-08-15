/**
 * Shared API response types used across the project.
 */

/** Standard paginated API response wrapper */
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

/** Standard single-item API response */
export interface ApiResponse<T> {
  data: T
  message?: string
}

/** Common user/entity base fields */
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}
