import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="grow flex-center flex-col">
      <div>Page not found</div>
      <Button
        onClick={() => navigate(-1)}
        className="mt-2"
      >
        Go back
      </Button>
    </div>
  )
}

export default NotFound
