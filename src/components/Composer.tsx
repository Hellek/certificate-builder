import { useEffect, useRef, useState } from 'react'
import {
  Button, Checkbox, Divider,
} from 'antd'
import { incline } from 'lvovich'

const inclineUserNameToDative = (userName: string) => {
  const [last, first] = userName.split(' ')
  const res = incline({ first, last }, 'dative')

  return `${res.last} ${res.first}`
}

export const Composer = ({ imageBitmap }: {
  imageBitmap: ImageBitmap
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [applyDativeIncline, setApplyDativeIncline] = useState(true)
  const [users] = useState<string[]>([])

  // Set CanvasRenderingContext2D
  useEffect(() => {
    if (canvasRef.current === null) return

    const c = canvasRef.current.getContext('2d')

    if (!c) return

    setCtx(c)
  }, [imageBitmap])

  // Draw initital image
  useEffect(() => {
    if (ctx === null) return
    ctx.drawImage(imageBitmap, 0, 0)
  }, [ctx, imageBitmap])

  const drawCert = (userName: string) => {
    if (canvasRef.current === null || ctx === null) return
    // Draw image
    ctx.drawImage(imageBitmap, 0, 0)

    // Draw text on image
    ctx.font = '76px Roboto'
    ctx.fillStyle = '#545454'
    ctx.textAlign = 'center'
    ctx.fillText(userName.toUpperCase(), imageBitmap.width / 2, 778)

    // Download result
    const imgData = canvasRef.current.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = imgData
    link.download = userName
    link.click()
    link.remove()
    ctx.fillText('', imageBitmap.width / 2, 380)
  }

  const runIterativeDrawing = () => {
    if (applyDativeIncline) {
      users
        .map(inclineUserNameToDative)
        .forEach(drawCert)
    } else {
      users.forEach(drawCert)
    }
  }

  return (
    <div className="flex flex-col overflow-hidden max-h-screen">
      <header
        className="my-3 px-3 border-r dark:border-gray-600"
      >
        <Button
          ghost
          onClick={runIterativeDrawing}
        >
          Создать сертификаты
        </Button>

        <Divider type="vertical" className="bg-white mx-5" />

        <Checkbox
          checked={applyDativeIncline}
          className="text-white"
          onChange={e => {
            setApplyDativeIncline(e.target.checked)
          }}
        >
          Дательный падеж
        </Checkbox>
      </header>

      <div className="grow overflow-auto flex-center">
        <canvas
          key="canvas"
          ref={canvasRef}
          width={imageBitmap.width}
          height={imageBitmap.height}
        />
      </div>
    </div>
  )
}
