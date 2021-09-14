import { Socket } from 'socket.io';
import jwtDecoder from './libs/JWT/jwtDecoder';
import logger from './libs/pino'

 
function startSocket(io){
    logger.info('[socket.io] socket is started')
   
    io.use(async (socket, next) => { 
        try { 
            const authToken = socket.handshake.auth.sessionID

            if(authToken){
                const {id, name} = await jwtDecoder(authToken)
                socket.sessionID = authToken
                socket.userID = id
                socket.username = name  
            }else return next(new Error('Authentication Error: no found token'))

            return next()
        }catch(err){
            return next(new Error('Authentication Error: invalid token'))
        }
   })
   
    io.on('connection', (socket) => {
        
        socket.emit('session', {
            sessionID: socket.sessionID,
            userID: socket.userID
        })  

        logger.info(`a user connected: ${socket.id}`);

        socket.join(socket.userID)

        socket.on('disconnect', async () => {
            const matchingSockets = await io.in(socket.userID).allSockets()
            const isDisconnected = matchingSockets.size === 0
            if(isDisconnected) {
                socket.broadcast.emit('user disconnected', socket.userID)
            }

            logger.info(`a user disconnected: ${socket.id}`)
            
        })
        
        socket.on("private message", ({content, to}) => {
            socket.to(to).to(socket.userID).emit("private message", {
                content, 
                from: socket.userID,
                to,
            });
        });
    });
}

export default startSocket
