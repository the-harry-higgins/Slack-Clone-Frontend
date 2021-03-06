import { handleNewMessage } from './messages';
import { addDmChannel } from './directMessages';

export const SET_SOCKET = 'slack-clone/socket/SET_SOCKET';

export const setSocket = socket => ({ type: SET_SOCKET, socket });

export const setupListeners = () => async (dispatch, getState) => {
  const { channels, directMessages, socket, currentuser } = getState();

  socket.connect();

  socket.emit('join personal room', currentuser.id);

  socket.emit('join rooms', [...channels.ids, ...directMessages.ids]);

  socket.on(`new dm channel`, dmChannel => {
    dispatch(addDmChannel(dmChannel));
    dispatch(addListenerForChannel(dmChannel));
  })

  socket.on('message', ({ channel, message }) => {
    dispatch(handleNewMessage(message, channel));
  });
}

export const addListenerForChannel = (channel) => async (dispatch, getState) => {
  const { socket } = getState();

  socket.emit('join rooms', [channel.id]);
}


export const removeListenerForChannel = (channel) => async (dispatch, getState) => {
  const { socket } = getState();

  socket.emit('leave room', channel.id);
}


export const sendMessage = (message) => async (dispatch, getState) => {
  const { currentchannel, currentuser, socket } = getState();

  socket.emit('message', {
    channel: currentchannel.id,
    user: currentuser,
    message
  });
}


export const notifyOtherUser = (dmChannel) => async (dispatch, getState) => {
  const { socket, currentuser } = getState();

  const to = dmChannel.otherUser.id;

  const channel = { ...dmChannel }

  channel.otherUser = currentuser;
  channel.notification = true;

  socket.emit('notify user', { channel, to });
}

