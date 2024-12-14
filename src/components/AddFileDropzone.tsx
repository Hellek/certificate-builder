import './AddFileDropzone.css'

import { ChangeEvent, useRef } from 'react'
import { FileDrop, FileDropProps } from 'react-file-drop'

export const acceptableExtensions = ['png']
export const acceptForInput = acceptableExtensions.map(ext => `.${ext}`).join(', ')

export const AddFileDropzone = ({
  onFileSelected,
}: {
  onFileSelected: (file: File) => void
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const emitClickOnFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const uploadingHandler = async (files: FileList) => {
    onFileSelected(files[0])
  }

  const handleFileDrop: FileDropProps['onFrameDrop'] = event => {
    if (!event.dataTransfer) return
    uploadingHandler(event.dataTransfer.files)
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return
    uploadingHandler(event.target.files)
  }

  return (
    <div className="grow flex">
      <FileDrop
        onFrameDrop={handleFileDrop}
        onTargetClick={emitClickOnFileInput}
        className="file-drop grow cursor-pointer hover:border-4 hover:text-blue-500 border-blue-500 border-dashed"
      >
        <div className="file-drop-inner-wrapper text-center">
          <h2>Кликни или перемести сюда<br />изображение основу</h2>
        </div>
      </FileDrop>

      <input
        onChange={handleFileInputChange}
        ref={fileInputRef}
        type="file"
        accept={acceptForInput}
        className="hidden"
      />
    </div>
  )
}
