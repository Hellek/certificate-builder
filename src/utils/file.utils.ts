import { AxiosResponse } from 'axios'

import { ONE_GIGABYTE, ONE_MEGABYTE } from './constants'

export const getHumanizedFileSize: (param: {
  bytes: number
  showBytesSuffix?: boolean
  hideDecimals?: boolean
}) => string = ({
  bytes,
  showBytesSuffix = true,
  hideDecimals = false,
}) => {
  let bytesString = ' MB'
  let integer = bytes / ONE_MEGABYTE

  if (bytes < 10240) {
    bytesString = ' KB'
    integer = bytes / 1024
  } else if (bytes > (ONE_MEGABYTE * 999)) {
    bytesString = ' GB'
    integer = bytes / ONE_GIGABYTE
  }

  return `${integer.toFixed(hideDecimals ? 0 : 2)}${showBytesSuffix ? bytesString : ''}`
}

export const downloadFile: (
  response: AxiosResponse,
  defaultFileName: string,
  fileType?: string,
) => void = (response, defaultFileName, fileType = 'application/zip') => {
  let filename = defaultFileName
  const disposition = response.headers['content-disposition']
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(disposition)
    if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '')
  }

  const URL = window.URL || window.webkitURL
  const blob = new Blob([response.data], { type: fileType })

  const link = document.createElement('a')
  const href = URL.createObjectURL(blob)
  link.setAttribute('href', href)
  link.setAttribute('download', filename)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}
