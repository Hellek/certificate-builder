import { Drawer, Textarea } from 'flowbite-react'

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
    onClose={() => { setOpen(false) }}
    className="flex flex-col"
  >
    <Drawer.Header title="Список имен" />

    <Drawer.Items className="grow">
      <Textarea
        placeholder={'Васильев Олег\nПетрова Екатерина'}
        value={users.join('\n')}
        className="min-h-full"
        onChange={e => {
          let u = e.target.value.split('\n')
          if (u.length === 1 && u[0] === '') u = [] // not ['']
          setUsers(u)
        }}
      />
    </Drawer.Items>
  </Drawer>
)
