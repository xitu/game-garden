let socketio = {};
let socket_io = require('socket.io');

//获取io  
socketio.getSocketio = function (server) {
    let io = socket_io.listen(server);
    let users = {};
    let id2name = {};
    let userAction = {};
    let chatStorage =[];
    //冒险岛聊天室
    io.sockets.on('connection', function (socket) {
        let userId = socket.id;
        console.log(userId + '连接了');
        //给刚连接的用户发送所有玩家数据
        socket.emit('getUsers', {users,chatStorage});
        console.log(chatStorage);
        for(var i in userAction){
            var item = userAction[i].split('_');
            if (item[0] == 'walk') {
                socket.emit('actionCtrl', {actionName:item[0],actionValue:item[1],actionUser:item[2]});
            }
        }

        socket.on('reGetUser',function () {
            socket.emit('getUsers', {users,chatStorage});
        })

        socket.on('actionCtrl', (data) => {
            socket.broadcast.emit('actionCtrl', data);
            userAction[data.actionUser] = data.actionName + '_' + data.actionValue+'_'+data.actionUser;
        })

        socket.on('userJoin', (data) => {
            if (data.userName.length >= 7) {
                socket.emit('userJoin', {
                    code: 0,
                    msg: '昵称最多6个字！'
                });
                return false;
            } else if (users[data.userName]) {
                socket.emit('userJoin', {
                    code: 0,
                    msg: '重名啦！'
                });
                return false;
            }else if(id2name[userId]){
                socket.emit('userJoin', {
                    code: 0,
                    msg: '只能建一个角色'
                });
                return false
            }

            let newUser = {
                roleImg: data.roleImagesName,
                state: {
                    x: 20,
                    y: 0,
                    imageIndex: 0,
                    isfilp: false,
                    isJump: false,
                    isWalk: false
                },
                name: data.userName,
                chatText: ''
            }

            socket.emit('userJoin', {
                code: 1,
                msg: data.userName + '已加入聊天室成功',
                data: newUser
            });

            socket.broadcast.emit('addUser', {
                code: 1,
                msg: data.userName + '已加入聊天室成功',
                data: newUser
            });

            id2name[userId] = data.userName;
            users[id2name[userId]] = newUser;
        });

        socket.on('positionSync', function (data) {
            if (users[data.actionUser]) {
                users[data.actionUser].state.x = data.position_x
            }
        })

        
        socket.on('userChat', function (data) {
            users[data.userName].chatText = data.chatText;
            if (chatStorage.length>100) {
                chatStorage.shift();
            }
            if (data.chatText!=='') {
                chatStorage.push(data.userName+'：'+data.chatText)
            }
            io.sockets.emit('userChat', data);
        })

        socket.on('disconnect', function () {
            delete users[id2name[userId]];
            delete userAction[id2name[userId]]
            io.sockets.emit('deleteUser', {
                userName: id2name[userId]
            });
        })
    });
};



module.exports = socketio;