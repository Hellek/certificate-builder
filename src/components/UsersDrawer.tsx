import { Drawer, Input } from 'antd'

export const UsersDrawer = ({
  open,
  setOpen,
  users,
  setUsers,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  users: string[]
  setUsers: (users: string[]) => void
}) => (
  <Drawer
    open={open}
    title="Список имен"
    onClose={() => { setOpen(false) }}
  >
    <Input.TextArea
      placeholder={'Васильев Олег\nПетрова Екатерина'}
      value={users.join('\n')}
      className="!min-h-full"
      onChange={e => {
        let u = e.target.value.split('\n')
        if (u.length === 1 && u[0] === '') u = [] // not ['']
        setUsers(u)
      }}
    />
  </Drawer>
)
