import { createServer } from 'http'
import { Server } from 'socket.io'
import short from 'short-uuid'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

type UserRegister = {
  senderColor: string
  isConnected: boolean
}
type RoomRegister = Map<string, UserRegister>
type MainChatRegister = Map<string, RoomRegister>

/*  
  Cada roomId es una key, en la que se almacenan los paticipantes 
  del room (ninkname)  y el color para cada un
*/
const mainChatRegister: MainChatRegister = new Map()

const colorArray = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF',
]

const getUserSenderColor = (
  roomsRegister: MainChatRegister,
  room: string,
  nickname: string,
) => {
  let roomRegister = roomsRegister.get(room)
  if (!roomRegister) return null
  let userRegister = roomRegister.get(nickname)
  if (!userRegister) return null
  return userRegister.senderColor
}

const getRoomAssignedColors = (roomsRegister: MainChatRegister, room: string) => {
  let roomRegister = roomsRegister.get(room)
  if (!roomRegister) return []
  const assignedColors: string[] = []
  for (let nickname of roomRegister.keys()) {
    assignedColors.push(roomRegister.get(nickname)!.senderColor)
  }
  return assignedColors
}

const getAvailableColor = (assignedColors: string[], allColors: string[]) => {
  const indexedAssignedColors = new Set(assignedColors)
  const availableColors = allColors.filter(
    (color) => !indexedAssignedColors.has(color),
  )
  const randomIndex = Math.floor(Math.random() * availableColors.length)
  return availableColors[randomIndex]
}

io.on('connection', (socket) => {
  socket.on('RoomIdJoin', (message) => {
    socket.join(message.room)
    socket.emit('RoomIdJoin', {
      message: 'Te haz unido al Chat. Registra tu nombre para continuar',
    })
  })

  socket.on('NotificationRoomJoin', (message) => {
    const assignedColors = getRoomAssignedColors(mainChatRegister, message.room)
    const senderColor = getAvailableColor(assignedColors, colorArray)

    let roomRegister = mainChatRegister.get(message.room)
    if (!roomRegister) {
      roomRegister = new Map()
      mainChatRegister.set(message.room, roomRegister)
    }

    roomRegister.set(message.nickname, {
      senderColor: senderColor,
      isConnected: true,
    })

    console.log(mainChatRegister)
    socket.emit('NotificationRoomJoinOk', {
      message: 'Bienvenido al chat',
    }) /*Para el que se acaba de unir */
    socket.to(message.room).emit('NotificationRoomJoin', {
      nickname: message.nickname,
    }) /*Para los que ya estan -- se escucha en ChatPage */
  })

  socket.on('RoomIdCreate', () => {
    const room = short.generate()
    socket.join(room)
    socket.emit('RoomIdCreate', {
      message: 'Se ha creado la sala, registra tu nombre para continuar',
      room: room,
    })
  })

  socket.on('Message', (message) => {
    if (message.message == null) {
      return console.log(`Cliente conectado: ${message.sender} al grupo:` + ` ${message.room}`,
      )
    }
    let nicknameColor = getUserSenderColor(
      mainChatRegister,
      message.room,
      message.sender,
    )
    if (!nicknameColor) return
    socket.to(message.room).emit('Message', {
      message: message.message,
      room: message.room,
      sender: message.sender,
      senderColor: nicknameColor,
    })
  })
})

httpServer.listen(3000, "0.0.0.0")
console.log('Server Running')
