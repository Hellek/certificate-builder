'use client'
import { useState } from 'react'

import { AddFileDropzone } from '@/components/AddFileDropzone'
import { Composer } from '@/components/Composer'

enum Steps {
  ImageNotUploaded = 0,
  ImageBitmapCreated = 1,
}

export default function HomePage() {
  const [step, setStep] = useState<Steps>(0)
  const [imageBitmap, setImageBitmap] = useState<ImageBitmap | null>(null)

  const onFileSelected = (file: File) => {
    createImageBitmap(file).then(bitmap => {
      setImageBitmap(bitmap)
      setStep(Steps.ImageBitmapCreated)
    })
  }

  if (step === Steps.ImageNotUploaded) {
    return (
      <AddFileDropzone onFileSelected={onFileSelected} />
    )
  }

  if (step === Steps.ImageBitmapCreated && imageBitmap) {
    return (
      <Composer imageBitmap={imageBitmap} />
    )
  }

  return (
    <div>Ooops...</div>
  )
}
