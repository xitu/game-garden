var W = 800,
    H = 600;
var roles = {};
var images = {};
var myName = '';
var isWalk = false;
var timers = {};
var roleImages = [];
var chatStorage = [];

$(function () {
    var context = document.querySelector('#stage').getContext('2d');
    context.canvas.width = W;
    context.canvas.height = H;
    //获取所有图片资源
    $.get("/getResources",
        function (data, textStatus) {
            var imgs = data.imgs;
            var promises = [];
            if (textStatus === 'success') {
                for (var i = 0; i < imgs.length; i++) {
                    promises.push(loadImages(imgs[i]))
                }
            }
            //所有图片加载完成后执行
            Promise
                .all(promises)
                .then(function (results) {
                    console.log('资源加载完成');
                    for (var i = 0; i < roleImages.length; i++) {
                        var img = images[roleImages[i]];
                        var width = img.width / 9;
                        var y = roleImages[i].split('_')[3]
                        $('.role-list').append('<div class="swiper-slide"><img data-name="' + roleImages[i] + '" src="' + img.src + '" style="width:' + width + 'px;height:' + img.height + 'px;object-position: left 0 top ' + y + 'px ;"></div>');

                        var swiper = new Swiper('.swiper-container', {
                            slidesPerView: 3,
                            paginationClickable: true,
                            spaceBetween: 0,
                            slideToClickedSlide: true,
                            centeredSlides: true,
                            spaceBetween: 10
                        });

                    }
                    //链接到服务器
                    var socket = io.connect('wss://chat.fmcat.top');
                    socket.on('connect', function (e) {
                        console.log('已连接到服务器');
                    });
                    //响应服务器下发初始化用户数据，包含所有在线的用户
                    socket.on('getUsers', function (data) {
                        roles = data.users;
                        chatStorage = data.chatStorage;
                        for (var i = 0; i < chatStorage.length; i++) {
                            $('.chat-list').append('<li>' + chatStorage[i] + '</li>')
                            chatToBottom();
                        }
                    });

                    

                    socket.on('actionCtrl', function (action) {
                        if (action.actionName === 'walk') {
                            walkCtrl(action.actionUser, action.actionValue);
                        } else if (action.actionName === 'jump') {
                            jumpCtrl(action.actionUser);
                        } else if (action.actionName === 'down') {
                            if (action.actionValue === 'down') {
                                changeRoleState(action.actionUser, 1)
                            } else if (action.actionValue === 'up') {
                                changeRoleState(action.actionUser, 0)
                            }
                        }
                    })

                    socket.on('addUser', function (r) {
                        if (r.code === 0) {
                            alert(r.msg);
                        } else {
                            roles[r.data.name] = r.data
                        }
                    })

                    socket.on('userJoin', function (r) {
                        if (r.code === 0) {
                            console.log(r.msg);
                        } else {
                            myName = r.data.name;
                            myRole = r.data;
                            roles[r.data.name] = r.data;
                            roleKeyBind(myName, socket);
                            $('.join-box').add('.mask-layer').remove();
                            $('#jiaodian').focus();
                        }
                    })
                    socket.on('userChat', function (r) {
                        roles[r.userName].chatText = r.chatText;
                        if (chatStorage.length > 100) {
                            chatStorage.shift();
                            $('.chat-list').find('li').eq(0).remove();
                            chatToBottom();
                        }
                        if (r.chatText !== '') {
                            chatStorage.push(r.userName + '：' + r.chatText);
                            $('.chat-list').append('<li>' + r.userName + '：' + r.chatText + '</li>')
                            chatToBottom();
                        }
                    })

                    socket.on('deleteUser', function (r) {
                        walkCtrl(r.userName, 'stop');
                        window.clearInterval(timers[r.userName]);
                        window.clearInterval(timers[r.userName + 'walk']);
                        delete roles[r.userName]
                    })

                    //画背景，人物
                    drawStage(context, '../images/bg.png');
                    drawRole(context);
                    // 初始化所有人物动作
                    for (var i in roles) {
                        changeRoleState(roles[i].name, 0);
                    }

                    //每秒24帧清空画布重新画背景，人物
                    setInterval(function () {
                        context.clearRect(0, 0, W, H);
                        drawStage(context, '../images/bg.png');
                        drawRole(context);
                        if (myName) {
                            socket.emit('positionSync', {
                                position_x: roles[myName].state.x,
                                actionUser: myName
                            });
                        }
                    }, 1000 / 24);

                    //输入昵称加入聊天室
                    $('#btn-join').on('click', function (e) {
                        var userName = $('#inp-join').val();
                        var roleImagesName = $('.swiper-slide-active img').attr('data-name');
                        socket.emit('userJoin', {
                            userName: userName,
                            roleImagesName: roleImagesName
                        })
                    })

                    $('#inp-join').on('keypress', function (e) {
                        if (e.keyCode === 13) {
                            $('#btn-join').click();
                        }
                    })

                    $('#chat').on('keypress', function (e) {
                        if (e.keyCode === 13) {
                            emitChat(myName, e.target.value, socket);
                        }
                    })

                    $('#jiaodian').on('keypress', function (e) {
                        if (e.keyCode === 13) {
                            $('#chat').focus();
                        }
                    })

                    $('.emit-btn').on('click', function () {
                        emitChat(myName, $('#chat').val(), socket);
                    })

                    $('#stage').on('click', function () {
                        $('#jiaodian').focus();
                    })

                    $(document).on('visibilitychange',function (e) {
                        if(!e.target.hidden){
                            socket.emit('reGetUser');
                        }
                    })

                    //绑定操控事件
                });
        },
        "json"
    );
})

function emitChat(myName, content, socket) {
    window.clearTimeout(timers[myName + 'chat']);
    roles[myName].chatText = content;
    socket.emit('userChat', {
        userName: myName,
        chatText: content
    })
    timers[myName + 'chat'] = setTimeout(function () {
        roles[myName].chatText = '';
        socket.emit('userChat', {
            userName: myName,
            chatText: ''
        })
    }, 5000);
    $('#jiaodian').focus();
    $('#chat').val('');
}


//图片资源加载成功后回调返回Promise
function loadImages(filename) {
    var bgImage = new Image();
    bgImage.src = '../images/' + filename + '.png';
    var p = new Promise(function (resolve, reject) {
        bgImage.onload = function () {
            if (filename.indexOf('/') !== -1) {
                filename = filename.split('/')[1]
                roleImages.push(filename)
            }
            images[filename] = bgImage;
            resolve(filename);
        }
    });
    return p;
}

//绘制舞台背景
function drawStage(ctx, imageUrl) {
    ctx.rect(0, 0, W, H);
    ctx.fillStyle = ctx.createPattern(images.bg, 'no-repeat');
    ctx.fill();
}

//根据人物数组绘制所有人物
function drawRole(context) {
    for (var i in roles) {
        if (roles[i].name == myName) {
            myRole = roles[i];
            continue
        }
        draw(roles[i], context);
    }
    if (myName) {
        draw(roles[myName], context);
    }


    function draw(item, context) {
        var img = images[item.roleImg]
        var role = item
        var deviationY = parseInt(item.roleImg.split('_')[3]);
        var roleWidth = img.width / 9;
        var nameWidth = 0;
        var count = 0;
        for (var i = 0; i < role.name.length; i++) {
            if (/[^\x00-\xff]/.test(role.name[i])) {
                count += 2;
            } else {
                count += 1;
            }
        }
        nameWidth = count * 6;

        //画人物动作
        context.save();
        //判断是否向左走，向左走得水平翻转人物
        if (role.state.isfilp) {
            context.translate(800, 0);
            context.scale(-1, 1);
            context.drawImage(img, role.state.imageIndex * img.width / 9, 0, img.width / 9, img.height, 800 - (role.state.x + img.width / 9), 480 - img.height - role.state.y + deviationY, img.width / 9, img.height);
        } else {
            context.drawImage(img, role.state.imageIndex * img.width / 9, 0, img.width / 9, img.height, role.state.x, 480 - img.height - role.state.y + deviationY, img.width / 9, img.height);
        }
        context.restore();
        //画人物名字框

        context.beginPath();
        context.lineJoin = "round";
        context.lineWidth = 8;
        context.strokeStyle = 'rgba(0,0,0,.4)';
        context.strokeRect(role.state.x + (roleWidth - nameWidth) / 2, 480 + 8 - role.state.y, nameWidth, 8);
        //写人物名字
        context.font = '12px 宋体';
        context.fillStyle = '#fff';
        context.fillText(role.name, role.state.x + (roleWidth - nameWidth) / 2, 480 + 16 - role.state.y);
        context.closePath();
        //如果有聊天文字，则开始绘制聊天框和文字
        if (role.chatText.length !== 0) {
            var length = role.chatText.length;
            drawChatText(context, role.name + '：' + role.chatText, role.state.x, role.state.y - deviationY, img.width / 9, img.height)
        }
    }
}

//聊天文字渲染
function drawChatText(context, text, x, y, roleWidth, roleHeight) {
    var len = text.length,
        count = 0,
        line = [],
        oneLine = '';
    //单行文字截取，一行14个字节长度。中文=2，英文=1
    for (var i = 0; i < len; i++) {
        if (/[^\x00-\xff]/.test(text[i])) {
            count += 2;
        } else {
            count += 1;
        }
        oneLine += text[i]
        if (count == 13) {
            if (/[^\x00-\xff]/.test(text[++i])) {
                line.push(oneLine)
                count = 0;
                oneLine = '';
                i--;
            }
        } else if (count == 14) {
            line.push(oneLine)
            oneLine = '';
            count = 0;
        }
    }
    line.push(oneLine)

    var textHeight = line.length * 16,
        starY = 480 - y - roleHeight - images.chat_bg3.height,
        startX = x + (roleWidth - images.chat_bg3.width) / 2;
    //画聊天框底边
    context.drawImage(images.chat_bg3, startX, starY, images.chat_bg3.width, images.chat_bg3.height);
    //画聊天框内容背景
    for (var i = 1; i < textHeight + 1; i++) {
        context.drawImage(images.chat_bg2, startX, starY - i, images.chat_bg2.width, images.chat_bg2.height);
    }
    //画聊天框顶边
    context.drawImage(images.chat_bg1, startX, starY - textHeight - images.chat_bg1.height, images.chat_bg1.width, images.chat_bg1.height);
    //在聊天框上写字
    for (var i = 0; i < line.length; i++) {
        context.beginPath();
        context.font = '12px 宋体';
        context.fillStyle = '#000';
        context.fillText(line[i], 5 + startX, starY - textHeight - images.chat_bg1.height + (i + 1) * 16);
        context.closePath();
    }
}

//更改人物状态
function changeRoleState(roleanme, state) {
    window.clearInterval(timers[roleanme])
    var rule = [0, 1, 2, 1],
        fun, speed = 0,
        index = 1;
    if (state == 0) {
        console.log('站');
        speed = 500;
        roles[roleanme].state.imageIndex = 0;
        fun = function () {
            if (index == rule.length) {
                index = 0;
            }
            roles[roleanme].state.imageIndex = rule[index++]
        }
    } else if (state == 1) {
        console.log('趴');
        speed = 0;
        fun = function () {
            index = 0;
            roles[roleanme].state.imageIndex = 8
        }
    } else if (state == 2) {
        console.log('走');
        speed = 150;
        rule = [3, 4, 5, 6];
        roles[roleanme].state.imageIndex = 1;
        fun = function () {
            if (index == rule.length) {
                index = 0;
            }
            roles[roleanme].state.imageIndex = rule[index++]
        }
    } else if (state == 3) {
        console.log('跳');
        speed = 0;
        fun = function () {
            index = 0;
            roles[roleanme].state.imageIndex = 7
        }
    }
    timers[roleanme] = setInterval(fun, speed);
}

//走路控制
function walkCtrl(name, state) {
    //如果状态是停止则清除定时器
    if (state === 'stop') {
        window.clearInterval(timers[name + 'walk']);
        if (name) {
            roles[name].state.isWalk = false;
            changeRoleState(name, 0)
        }
    } else {
        var roleWidth = images[roles[name].roleImg].width / 9;
        //先设置人物图片状态
        changeRoleState(name, 2)
        roles[name].state.isWalk = true;
        timers[name + 'walk'] = setInterval(function () {
            //判断左右更改人物水平位置
            if (state === 'right') {
                roles[name].state.isfilp = false;
                if (roles[name].state.x + roleWidth + 2 >= W) {
                    roles[name].state.x = W - roleWidth
                } else {
                    roles[name].state.x += 4
                }
            } else {
                roles[name].state.isfilp = true;
                if (roles[name].state.x <= 0) {
                    roles[name].state.x = 0
                } else {
                    roles[name].state.x -= 4
                }
            }
        }, 1000 / 24);
    }
}

function jumpCtrl(name) {
    var step = 12;
    if (roles[name].state.isJump) {
        return false
    }
    roles[name].state.isJump = true;
    changeRoleState(name, 3)
    window.clearInterval(timers[name + 'jump']);
    timers[name + 'jump'] = setInterval(function () {
        roles[name].state.y += step;
        step -= 1.5;
        if (roles[name].state.y <= 0) {
            roles[name].state.y = 0;
            window.clearInterval(timers[name + 'jump']);
            if (roles[name].state.isWalk) {
                changeRoleState(name, 2)
            } else {
                changeRoleState(name, 0)
            }
            roles[name].state.isJump = false;
        }
    }, 1000 / 24);
}

function roleKeyBind(myName, socket) {
    keyboardJS.watch($('#jiaodian')[0]);
    //跳跃
    keyboardJS.bind('space', function (e) {
        jumpCtrl(myName);
        socket.emit('actionCtrl', {
            actionName: 'jump',
            actionValue: '',
            actionUser: myName
        });
    });
    //向左走
    keyboardJS.bind('left', function (e) {
        if (!e.repeat && !isWalk) {
            isWalk = true;
            walkCtrl(myName, 'left')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'left',
                actionUser: myName
            });
        }
    }, function () {
        isWalk = false;
        walkCtrl(myName, 'stop')
        socket.emit('actionCtrl', {
            actionName: 'walk',
            actionValue: 'stop',
            actionUser: myName
        });
    });

    //向右走
    keyboardJS.bind('right', function (e) {
        if (!e.repeat && !isWalk) {
            walkCtrl(myName, 'right');
            isWalk = true;
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'right',
                actionUser: myName
            });
        }
    }, function () {
        isWalk = false;
        walkCtrl(myName, 'stop')
        socket.emit('actionCtrl', {
            actionName: 'walk',
            actionValue: 'stop',
            actionUser: myName
        });
    });
    //趴下
    keyboardJS.bind('down', function (e) {
        if (!e.repeat) {
            changeRoleState(myName, 1)
            socket.emit('actionCtrl', {
                actionName: 'down',
                actionValue: 'down',
                actionUser: myName
            });
        }
    }, function () {
        changeRoleState(myName, 0)
        socket.emit('actionCtrl', {
            actionName: 'down',
            actionValue: 'up',
            actionUser: myName
        });
    });

    keyboardJS.bind('down > left', function (e) {
        if (!e.repeat) {
            walkCtrl(myName, 'left')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'left',
                actionUser: myName
            });
        }
    }, function () {
        walkCtrl(myName, 'stop')
        socket.emit('actionCtrl', {
            actionName: 'walk',
            actionValue: 'stop',
            actionUser: myName
        });
        keyboardJS.pressKey('down');
    });

    keyboardJS.bind('down > right', function (e) {
        if (!e.repeat) {
            walkCtrl(myName, 'right')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'right',
                actionUser: myName
            });
        }
    }, function () {
        walkCtrl(myName, 'stop')
        socket.emit('actionCtrl', {
            actionName: 'walk',
            actionValue: 'stop',
            actionUser: myName
        });
        keyboardJS.pressKey('down');
    });

    keyboardJS.bind('left > right', function (e) {
        if (!e.repeat) {
            walkCtrl(myName, 'stop')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'stop',
                actionUser: myName
            });
            walkCtrl(myName, 'right')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'right',
                actionUser: myName
            });
        }
        // walkCtrl(myName, 'right')
    }, function () {
        walkCtrl(myName, 'stop')
        socket.emit('actionCtrl', {
            actionName: 'walk',
            actionValue: 'stop',
            actionUser: myName
        });
    });

    keyboardJS.bind('right > left', function (e) {
        if (!e.repeat) {
            walkCtrl(myName, 'stop')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'stop',
                actionUser: myName
            });
            walkCtrl(myName, 'left')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'left',
                actionUser: myName
            });
        }
    }, function () {
        walkCtrl(myName, 'stop')
        socket.emit('actionCtrl', {
            actionName: 'walk',
            actionValue: 'stop',
            actionUser: myName
        });
    });

    keyboardJS.bind('left > space', function (e) {
        jumpCtrl(myName);
        socket.emit('actionCtrl', {
            actionName: 'jump',
            actionValue: '',
            actionUser: myName
        });
    });

    keyboardJS.bind('right > space', function (e) {
        jumpCtrl(myName);
        socket.emit('actionCtrl', {
            actionName: 'jump',
            actionValue: '',
            actionUser: myName
        });
    });


    keyboardJS.bind('right > down', function (e) {
        if (!e.repeat) {
            walkCtrl(myName, 'stop')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'stop',
                actionUser: myName
            });
            changeRoleState(myName, 1)
            socket.emit('actionCtrl', {
                actionName: 'down',
                actionValue: 'down',
                actionUser: myName
            });
        }
    }, function () {
        changeRoleState(myName, 0)
        socket.emit('actionCtrl', {
            actionName: 'down',
            actionValue: 'up',
            actionUser: myName
        });
    });

    keyboardJS.bind('left > down', function (e) {
        if (!e.repeat) {
            walkCtrl(myName, 'stop')
            socket.emit('actionCtrl', {
                actionName: 'walk',
                actionValue: 'stop',
                actionUser: myName
            });
            changeRoleState(myName, 1)
            socket.emit('actionCtrl', {
                actionName: 'down',
                actionValue: 'down',
                actionUser: myName
            });
        }
    }, function () {
        changeRoleState(myName, 0)
        socket.emit('actionCtrl', {
            actionName: 'down',
            actionValue: 'up',
            actionUser: myName
        });
    });

    //虚拟键操控
    $('.gb-container').on('touchstart', '.ctrl-item', function (e) {
        console.log(e);
        var ctrlName = e.target.className.split(' ')[1];
        switch (ctrlName) {
            case 'left':
                isWalk = true;
                walkCtrl(myName, 'left')
                socket.emit('actionCtrl', {
                    actionName: 'walk',
                    actionValue: 'left',
                    actionUser: myName
                });
                break;
            case 'right':
                isWalk = true;
                walkCtrl(myName, 'right')
                socket.emit('actionCtrl', {
                    actionName: 'walk',
                    actionValue: 'right',
                    actionUser: myName
                });
                break;
            case 'bottom':
                changeRoleState(myName, 1)
                socket.emit('actionCtrl', {
                    actionName: 'down',
                    actionValue: 'down',
                    actionUser: myName
                });
                break;
            case 'A':
                jumpCtrl(myName);
                socket.emit('actionCtrl', {
                    actionName: 'jump',
                    actionValue: '',
                    actionUser: myName
                });
                break;
            case 'B':
                jumpCtrl(myName);
                socket.emit('actionCtrl', {
                    actionName: 'jump',
                    actionValue: '',
                    actionUser: myName
                });
                break;
        }
    })
    $('.gb-container').on('touchend', '.ctrl-item', function (e) {
        console.log(e);
        var ctrlName = e.target.className.split(' ')[1];
        switch (ctrlName) {
            case 'left':
                isWalk = false;
                walkCtrl(myName, 'stop')
                socket.emit('actionCtrl', {
                    actionName: 'walk',
                    actionValue: 'stop',
                    actionUser: myName
                });
                break;
            case 'right':
                isWalk = false;
                walkCtrl(myName, 'stop')
                socket.emit('actionCtrl', {
                    actionName: 'walk',
                    actionValue: 'stop',
                    actionUser: myName
                });
                break;
            case 'bottom':
                changeRoleState(myName, 0)
                socket.emit('actionCtrl', {
                    actionName: 'down',
                    actionValue: 'up',
                    actionUser: myName
                });
                break;
        }
    })

}

function chatToBottom() {
    $('.chat-list').scrollTop(100000000000000);
}