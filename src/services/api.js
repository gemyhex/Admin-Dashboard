import instance from '@/plugins/axios'

export const httpRequest = (url, options = { method: 'GET' }) => {
  // Default configurations for all requests
  const defaultOptions = {
    responseType: 'json', // Default to JSON unless overridden
    headers: {
      'Content-Type': 'application/json' // Default header
    }
  }

  // Merge default options with provided options
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers // Merge headers explicitly
    }
  }

  return instance(url, config)
}
