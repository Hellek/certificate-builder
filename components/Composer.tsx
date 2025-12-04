import { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, FloatingLabel, Label } from 'flowbite-react'
// import {
//   Button, Checkbox, ColorPicker, Divider,
//   InputNumber,
// } from 'antd'
import { incline } from 'lvovich'

import { UsersDrawer } from './UsersDrawer'

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
  const [printWithDativeIncline, setPrintWithDativeIncline] = useState(true)
  const [printWithUpperCase, setPrintWithUpperCase] = useState(true)
  const [printTextColor] = useState('#1c3055')
  const [printTextXPosition, setPrintTextXPosition] = useState(imageBitmap.width / 2)
  const [printTextYPosition, setPrintTextYPosition] = useState(690)
  const [printTextSize, setPrintTextSize] = useState(92)
  const [usersDrawerOpen, setUsersDrawerOpen] = useState(true)
  const [users, setUsers] = useState<string[]>([])

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

  // Preview text on canvas
  useEffect(() => {
    if (ctx === null) return

    // Draw image first
    ctx.drawImage(imageBitmap, 0, 0)

    // Draw preview text if there's a user name to preview
    const previewName = users.length > 0 ? users[0] : ''
    if (previewName) {
      let name = printWithDativeIncline ? inclineUserNameToDative(previewName) : previewName
      name = printWithUpperCase ? name.toUpperCase() : name

      ctx.font = printTextSize + 'px Roboto'
      ctx.fillStyle = printTextColor
      ctx.textAlign = 'center'
      ctx.fillText(name, printTextXPosition, printTextYPosition)
    }
  }, [
    ctx,
    imageBitmap,
    users,
    printTextXPosition,
    printTextYPosition,
    printTextSize,
    printTextColor,
    printWithUpperCase,
    printWithDativeIncline,
  ])

  const drawCert = (userName: string) => {
    if (canvasRef.current === null || ctx === null) return

    const namePosX = printTextXPosition
    const namePosY = printTextYPosition

    // Draw image
    ctx.drawImage(imageBitmap, 0, 0)

    // Draw text on image
    ctx.font = printTextSize + 'px Roboto'
    ctx.fillStyle = printTextColor
    ctx.textAlign = 'center'
    ctx.fillText(userName, namePosX, namePosY)
  }

  const downloadCanvasImage = (userName: string) => {
    if (canvasRef.current === null || ctx === null) return

    const link = document.createElement('a')
    link.href = canvasRef.current.toDataURL('image/png')
    link.download = userName
    link.click()
    link.remove()

    // Restore preview after download
    ctx.drawImage(imageBitmap, 0, 0)
    const previewName = users.length > 0 ? users[0] : ''
    if (previewName) {
      let name = printWithDativeIncline ? inclineUserNameToDative(previewName) : previewName
      name = printWithUpperCase ? name.toUpperCase() : name
      ctx.font = printTextSize + 'px Roboto'
      ctx.fillStyle = printTextColor
      ctx.textAlign = 'center'
      ctx.fillText(name, printTextXPosition, printTextYPosition)
    }
  }

  const drawAndDownloadCert = (userName: string) => {
    let name = printWithDativeIncline ? inclineUserNameToDative(userName) : userName
    name = printWithUpperCase ? name.toUpperCase() : name
    drawCert(name)
    downloadCanvasImage(name)
  }

  const runIterativeDrawing = () => {
    users.forEach(drawAndDownloadCert)
  }

  return (
    <div className="flex flex-col overflow-hidden max-h-screen">
      <header
        className="py-3 px-3 border-b-2 bg-white border-gray-600 flex items-center gap-2"
      >
        <Button
          color="blue"
          size="xs"
          className="max-w-40"
          onClick={() => setUsersDrawerOpen(true)}
        >
          {users.length ? 'Редактировать' : 'Добавить'} имена
        </Button>

        <Button
          color="blue"
          size="xs"
          className="max-w-40"
          disabled={!users.length}
          onClick={runIterativeDrawing}
        >
          Создать сертификаты
        </Button>

        <div className="flex items-center gap-2">
          <Checkbox
            id="incline-checkbox"
            checked={printWithDativeIncline}
            onChange={e => {
              setPrintWithDativeIncline(e.target.checked)
            }}
          />
          <Label htmlFor="incline-checkbox ">Дательный падеж</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="casing-checkbox"
            checked={printWithUpperCase}
            onChange={e => {
              setPrintWithUpperCase(e.target.checked)
            }}
          />
          <Label htmlFor="casing-checkbox">В верхнем регистре</Label>
        </div>

        <FloatingLabel
          label="Позиция по горизонтали"
          variant="outlined"
          sizing="md"
          className="w-[200px]"
          type="number"
          value={printTextXPosition}
          onChange={e => setPrintTextXPosition(Number(e.target.value))}
        />

        <FloatingLabel
          label="Позиция по вертикали"
          variant="outlined"
          sizing="md"
          className="w-[200px]"
          type="number"
          value={printTextYPosition}
          onChange={e => setPrintTextYPosition(Number(e.target.value))}
        />

        <FloatingLabel
          label="Размер шрифта"
          variant="outlined"
          sizing="md"
          type="number"
          value={printTextSize}
          onChange={e => setPrintTextSize(Number(e.target.value))}
        />

        {/* <ColorPicker defaultFormat="hex" defaultValue="1c3055" onChange={e => setPrintTextCole.toHex())} /> */}
      </header>

      <div className="grow overflow-auto flex-center">
        <canvas
          key="canvas"
          ref={canvasRef}
          width={imageBitmap.width}
          height={imageBitmap.height}
        />
      </div>

      <UsersDrawer
        open={usersDrawerOpen}
        setOpen={setUsersDrawerOpen}
        users={users}
        setUsers={setUsers}
      />
    </div>
  )
}
