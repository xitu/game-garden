//
//  SKMainScene.m
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/9.
//  Copyright © 2017年 chc. All rights reserved.
//

//增加屏幕适配
#define WIDTH [UIScreen mainScreen].bounds.size.width

#define HEIGHT [UIScreen mainScreen].bounds.size.height

#import "SKMainScene.h"
#import "SKSharedAtles.h"
#import "SKParachute.h"

@interface SKMainScene ()<SKPhysicsContactDelegate>
{
    int _smallPlaneTime;
    int _mediumPlaneTime;
    int _bigPlaneTime;
    int _adjustmentBackgroundPosition;
    
    int _flyBombTime;
    int _flyBulletTime;
    
    int _bombCount;       //炸弹数量
    NSInteger _bulletType; //1. 1发  2.   2发
    
    //场景背景节点精灵存放数组
    NSMutableArray *_NearbyArray;
    
    SKLabelNode *_scoreLabel;
    SKSpriteNode *_playerPlane;
    SKSpriteNode *_background1;
    SKSpriteNode *_background2;
    
    SKSpriteNode *_bomb;     //炸弹
    SKLabelNode *_bombLabel;    //炸弹数量
    
    SKSpriteNode *_bullet;   //子弹
    
    CGFloat _bulletSpeed;
    CGFloat _planeSpeed;
    
    SKAction *_smallFoePlaneHitAction;
    SKAction *_mediumFoePlaneHitAction;
    SKAction *_bigFoePlaneHitAction;
    SKAction *_smallFoePlaneBlowupAction;
    SKAction *_mediumFoePlaneBlowupAction;
    SKAction *_bigFoePlaneBlowupAction;
    
}

@end

@implementation SKMainScene

-(instancetype)initWithSize:(CGSize)size {
    self = [super initWithSize:size];
    if (self) {
        _bulletSpeed = 0.3;
        _planeSpeed = 1;
        [self initPhysicsWorld];
        [self initAction];
        [self initBackground];
        [self initScore];
        [self initPlayerPlane];
        [self firingBullets];
        
        _bombCount = 0;
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(restart) name:@"restartNotification" object:nil];
    }
    return self;
}

- (void)setConfig:(GlobalConfig *)config {
    _config = config;
    _bulletSpeed = _config.bulletSpeed;
    
    [_bullet removeFromParent];
    [_bullet removeAllActions];
    [self removeActionForKey:@"Bullets"];
    SKAction *action = [SKAction runBlock:^{
        [self createBulletsWithType:_bulletType];
    }];
    SKAction *interval = [SKAction waitForDuration:_bulletSpeed];
    [self runAction:[SKAction repeatActionForever:[SKAction sequence:@[action,interval]]]withKey:@"Bullets"];
}

- (void)initPhysicsWorld {
    self.physicsWorld.contactDelegate = self;
    self.physicsWorld.gravity = CGVectorMake(0, 0);
}
#pragma mark - init

- (void)initAction {
    _smallFoePlaneHitAction = [SKSharedAtles hitActionWithFoePlaneType:SKFoePlaneTypeSmall];
    _mediumFoePlaneHitAction = [SKSharedAtles hitActionWithFoePlaneType:SKFoePlaneTypeMedium];
    _bigFoePlaneHitAction = [SKSharedAtles hitActionWithFoePlaneType:SKFoePlaneTypeBig];
    
    _smallFoePlaneBlowupAction = [SKSharedAtles blowupActionWithFoePlaneType:SKFoePlaneTypeSmall];
    _mediumFoePlaneBlowupAction = [SKSharedAtles blowupActionWithFoePlaneType:SKFoePlaneTypeMedium];
    _bigFoePlaneBlowupAction = [SKSharedAtles blowupActionWithFoePlaneType:SKFoePlaneTypeBig];
}

- (void)initBackground {
    
    _adjustmentBackgroundPosition = self.size.height;
    _background1 = [SKSpriteNode spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypeBackground]];
    _background1.position = CGPointMake(self.size.width/2, 0);
    _background1.anchorPoint = CGPointMake(0.5, 0.0);
    _background1.zPosition = 0;
    _background1.xScale=1.5;
    _background1.yScale=1.5;
    
    _background2 = [SKSpriteNode spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypeBackground]];
    _background2.anchorPoint = CGPointMake(0.5, 0.0);
    _background2.position = CGPointMake(self.size.width / 2, HEIGHT - 1);
    _background2.zPosition = 0;
    _background2.xScale=1.5;
    _background2.yScale=1.5;
    
    
    [self addChild:_background1];
    [self addChild:_background2];
    
    [_NearbyArray addObject:_background1];
    [_NearbyArray addObject:_background2];
    
    [self runAction:[SKAction repeatActionForever:[SKAction playSoundFileNamed:@"game_music.mp3" waitForCompletion:YES]]];
}

- (void)initScore{
    
    _scoreLabel = [SKLabelNode labelNodeWithFontNamed:@"MarkerFelt-Thin"];
    _scoreLabel.text = @"0000";
    _scoreLabel.zPosition = 2;
    _scoreLabel.fontColor = [SKColor blackColor];
    _scoreLabel.horizontalAlignmentMode = SKLabelHorizontalAlignmentModeLeft;
    _scoreLabel.position = CGPointMake(50 , self.size.height - 52);
    [self addChild:_scoreLabel];
}

//初始化飞机
- (void)initPlayerPlane{
    
    _playerPlane = [SKSpriteNode spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypePlayerPlane]];
    _playerPlane.position = CGPointMake(160, 50);
    _playerPlane.zPosition = 1;
    _playerPlane.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:CGSizeMake(_playerPlane.size.width-20, _playerPlane.size.height) ];
    _playerPlane.physicsBody.categoryBitMask = SKRoleCategoryPlayerPlane;
    _playerPlane.physicsBody.collisionBitMask = 0;
    _playerPlane.physicsBody.contactTestBitMask = SKRoleCategoryFoePlane;
    [self addChild:_playerPlane];
    [_playerPlane runAction:[SKSharedAtles playerPlaneAction]];
}

//执行炮弹动画
- (void)firingBullets {
    _bulletType = 1; //默认1发炮弹
    SKAction *action = [SKAction runBlock:^{
        [self createBulletsWithType:_bulletType];
    }];
    SKAction *interval = [SKAction waitForDuration:_bulletSpeed];
    //场景循环炮弹的动画
    [self runAction:[SKAction repeatActionForever:[SKAction sequence:@[action,interval]]]withKey:@"Bullets"];
}

//创建炮弹
- (void)createBulletsWithType:(NSInteger)bulletType {
    _bullet = [SKSpriteNode spriteNodeWithTexture:[SKSharedAtles textureWithSKTextureTypeBulletType:bulletType]];
    _bullet.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:_bullet.size];
    _bullet.physicsBody.categoryBitMask = SKRoleCategoryBullet;
    _bullet.physicsBody.collisionBitMask = SKRoleCategoryFoePlane;
    _bullet.physicsBody.contactTestBitMask = SKRoleCategoryFoePlane;
    _bullet.zPosition = 1;
    _bullet.position = CGPointMake(_playerPlane.position.x, _playerPlane.position.y+ (_playerPlane.size.height/2)+5);
    [self addChild:_bullet];
    
    SKAction *actionMove = [SKAction moveTo:CGPointMake(_playerPlane.position.x, self.size.height) duration:0.8];
    SKAction *actionMoveDone = [SKAction removeFromParent];
    [_bullet runAction:[SKAction sequence:@[actionMove,actionMoveDone]]];
    [self runAction:[SKAction playSoundFileNamed:@"bullet.mp3" waitForCompletion:NO]];
}

#pragma mark - update
- (void)update:(NSTimeInterval)currentTime {
    if (!self.config) {
        self.paused = YES;
        return;
    }
    
    [self createFoePlane];
    [self createParachute];
    [self scrollBackground];
}
//创建敌机
- (void)createFoePlane {
    _smallPlaneTime++;
    _mediumPlaneTime++;
    _bigPlaneTime++;
    
    SKFoePlane * (^createFoePlane)(SKFoePlaneType) = ^(SKFoePlaneType type){
        int x = (arc4random() % 220) + 35;
        SKFoePlane *foePlane = nil;
        switch (type) {
            case 1:
                foePlane = [SKFoePlane createBigPlane];
                break;
            case 2:
                foePlane = [SKFoePlane createMediumPlane];
                break;
            case 3:
                foePlane = [SKFoePlane createSmallPlane];
                break;
                
            default:
                break;
        }
        
        foePlane.zPosition = 1;
        foePlane.name = @"foePlane";
        foePlane.physicsBody.dynamic= YES;
        //categoryBitMask  设置物理体标识符
        foePlane.physicsBody.categoryBitMask = SKRoleCategoryFoePlane;
        //collisionBitMask  设置碰撞标识符  (非零 决定了物体能否碰撞反应)
        foePlane.physicsBody.collisionBitMask = SKRoleCategoryBullet;
        //contactTestBitMask 设置可以那类物理体碰撞  ->触发检测碰撞事件
        foePlane.physicsBody.contactTestBitMask = SKRoleCategoryBullet;
        foePlane.position = CGPointMake(x, self.size.height);
        
        return foePlane;
    };
    
    if (_smallPlaneTime > 25)
    {
        float speed = (arc4random() % 3) + self.config.smallPlaneSpeed;
        SKFoePlane *foePlane = createFoePlane(SKFoePlaneTypeSmall);
        [self addChild:foePlane];
        [foePlane runAction:[SKAction sequence:@[[SKAction moveToY:0 duration:speed],[SKAction removeFromParent]]]];
        
        _smallPlaneTime = 0;
    }
    
    if (_mediumPlaneTime > 400)
    {
        float speed = (arc4random() % 3) + self.config.mediumPlaneSpeed;
        SKFoePlane *foePlane = createFoePlane(SKFoePlaneTypeMedium);
        [self addChild:foePlane];
        [foePlane runAction:[SKAction sequence:@[[SKAction moveToY:0 duration:speed],[SKAction removeFromParent]]]];
        
        _mediumPlaneTime = 0;
    }
    
    if (_bigPlaneTime > 700)
    {
        float speed = (arc4random() % 3) + self.config.bigPlaneSpeed;
        SKFoePlane *foePlane = createFoePlane(SKFoePlaneTypeBig);
        [self addChild:foePlane];
        [foePlane runAction:[SKAction sequence:@[[SKAction moveToY:0 duration:speed],[SKAction removeFromParent]]]];
        [self runAction:[SKAction playSoundFileNamed:@"enemy2_out.mp3" waitForCompletion:NO]];
        
        _bigPlaneTime = 0;
    }
}

- (void)createParachute {
    _flyBombTime++;
    _flyBulletTime++;
    
    SKParachute *(^createParachute)(SKParachuteType) = ^(SKParachuteType type) {
        int x = (arc4random() % 220) + 35;
        
        SKParachute *parachute = nil;
        switch (type) {
            case 1:
                parachute = [SKParachute createFlyBomb];
                break;
            case 2:
                parachute = [SKParachute createFlyBullet];
                break;
            default:
                break;
        }
        parachute.zPosition = 1;
        parachute.physicsBody.categoryBitMask = SKRoleCategoryParachute;
        parachute.physicsBody.collisionBitMask = SKRoleCategoryPlayerPlane;
        parachute.physicsBody.contactTestBitMask = SKRoleCategoryPlayerPlane;
        parachute.position = CGPointMake(x, self.size.height);
        
        return parachute;
    };
    
    if (_flyBulletTime >= 700) {
        float speed = 10;
        SKParachute *parachute = createParachute(SKParachuteTypeBullet);
        SKAction *action = [SKAction moveBy:CGVectorMake(20,20) duration:2];
        [parachute runAction:[SKAction sequence:@[action,[SKAction moveToY:0 duration:speed],[SKAction removeFromParent]]]];
        [self addChild:parachute];
        _flyBulletTime = 0;
    }
    if (_flyBombTime >= 1000) {
        float speed = 10;
        SKParachute *parachute = createParachute(SKParachuteTypeBomb);
        SKAction *action = [SKAction moveBy:CGVectorMake(20,-40) duration:2];
        [parachute runAction:[SKAction sequence:@[action,[SKAction moveToY:0 duration:speed],[SKAction removeFromParent]]]];
        [self addChild:parachute];
        _flyBombTime = 0;
    }

    
}

//场景移动
- (void)scrollBackground {
     _adjustmentBackgroundPosition--;
    if (_adjustmentBackgroundPosition <= 0) {
        _adjustmentBackgroundPosition = HEIGHT;
    }
    [_background1 setPosition:CGPointMake(self.size.width / 2, _adjustmentBackgroundPosition - HEIGHT)];
    [_background2 setPosition:CGPointMake(self.size.width / 2, _adjustmentBackgroundPosition - 1)];
}

///*设置背景图片滚动的方法*/
//-(void)BackMove:(CGFloat)moveSpeed
//{
//    
//    for (int i=0; i<_NearbyArray.count; i++) {
//        SKSpriteNode *TempSprite=[_NearbyArray objectAtIndex:i];
//    
//        [TempSprite setPosition:CGPointMake(TempSprite.position.x,TempSprite.position.y-moveSpeed)];
//    }
//    //循环滚动算法
//    SKSpriteNode *RollOneSprite=[_NearbyArray objectAtIndex:0];
//    SKSpriteNode *RollTwoSprite=[_NearbyArray objectAtIndex:1];
////    SKSpriteNode *ThreeBackSprit=[_NearbyArray objectAtIndex:2];
//    
//    if (RollOneSprite.position.y>(self.frame.size.height/2+self.frame.size.height))
//    {
//        RollOneSprite.position=CGPointMake(RollOneSprite.position.x, -(self.frame.size.height/2+self.frame.size.height-30));
//        
//    }
//    if (RollTwoSprite.position.y>(self.frame.size.height/2+self.frame.size.height)) {
//        RollTwoSprite.position=CGPointMake(RollOneSprite.position.x, -(self.frame.size.height/2+self.frame.size.height-30));
//        
//    }
////    if (ThreeBackSprit.position.y>(self.frame.size.height/2+self.frame.size.height)) {
////        ThreeBackSprit.position=CGPointMake(RollOneSprite.position.x, -(self.frame.size.height/2+self.frame.size.height-30));
////        
////    }
//}

- (void)playerPlaneCollisionAnimation:(SKSpriteNode *)sprite{
    [self removeActionForKey:@"Bullets"];
    [self removeAllActions];
    [sprite runAction:[SKSharedAtles playerPlaneBlowupAction] completion:^{
        [self runAction:[SKAction sequence:@[[SKAction playSoundFileNamed:@"game_over.mp3" waitForCompletion:YES],[SKAction runBlock:^{
            
            SKLabelNode *label = [SKLabelNode labelNodeWithFontNamed:@"MarkerFelt-Thin"];
            label.text = @"GameOver";
            label.zPosition = 2;
            label.fontColor = [SKColor blackColor];
            label.position = CGPointMake(self.size.width / 2 , self.size.height / 2 + 20);
            [self addChild:label];
            
        }]]] completion:^{
            [[NSNotificationCenter defaultCenter]postNotificationName:@"gameOverNotification" object:nil];
        }];
    }];
}


- (void)foePlaneCollisionAnimation:(SKFoePlane *)sprite{
    
    if (![sprite actionForKey:@"dieAction"]) {
        SKAction *hitAction = nil;
        SKAction *blowupAction = nil;
        NSString *soundFileName = nil;
        switch (sprite.type) {
            case SKFoePlaneTypeBig:
            {
                
                sprite.hp--;
                hitAction = _bigFoePlaneHitAction;
                blowupAction = _bigFoePlaneBlowupAction;
                soundFileName = @"enemy2_down.mp3";
            }
                break;
            case SKFoePlaneTypeMedium:
            {
                sprite.hp--;
                hitAction = _mediumFoePlaneHitAction;
                blowupAction = _mediumFoePlaneBlowupAction;
                soundFileName = @"enemy3_down.mp3";
            }
                break;
            case SKFoePlaneTypeSmall:
            {
                sprite.hp--;
                hitAction = _smallFoePlaneHitAction;
                blowupAction = _smallFoePlaneBlowupAction;
                soundFileName = @"enemy1_down.mp3";
            }
                break;
            default:
                break;
        }
        if (!sprite.hp) {
            [sprite removeAllActions];
            [sprite runAction:blowupAction withKey:@"dieAction"];
            [self changeScore:sprite.type];
            [self runAction:[SKAction playSoundFileNamed:soundFileName waitForCompletion:NO]];
        }else{
            [sprite runAction:hitAction];
        }
    }
}

- (void)parachuteCollisionAnimation:(SKParachute *)parachute {

    switch (parachute.type) {
        case 1:
        {
            //炸药
            _bombCount++;
            
            if (!_bomb) {
                _bomb = [SKSpriteNode spriteNodeWithTexture:[SKSharedAtles textureWithBomb]];
                _bomb.zPosition = 1;
                _bomb.physicsBody.categoryBitMask = 9;  //
                _bomb.physicsBody.collisionBitMask = 0;
                _bomb.physicsBody.contactTestBitMask = 0;
                _bomb.position = CGPointMake(self.size.width-100, 50);
                [self addChild:_bomb];
            }
            
            if (!_bombLabel) {
                _bombLabel = [SKLabelNode labelNodeWithFontNamed:@"MarkerFelt-Thin"];
                _bombLabel.text = [NSString stringWithFormat:@"*%d",_bombCount];
                _bombLabel.zPosition = 1;
                _bombLabel.fontColor = [SKColor colorWithRed:0.53 green:0.22 blue:0.22 alpha:1.00];
                _bombLabel.horizontalAlignmentMode = SKLabelHorizontalAlignmentModeLeft;
                _bombLabel.position = CGPointMake(self.size.width-80 , 50);
                [self addChild:_bombLabel];
            }else {
                _bombLabel.text = [NSString stringWithFormat:@"*%d",_bombCount];
            }
        }
            break;
        case 2:
        {
            
            //子弹
            if (_bulletType == 1) {
                
                [_bullet removeFromParent];
                [_bullet removeAllActions];
                [self removeActionForKey:@"Bullets"];
                
                SKAction *action = [SKAction runBlock:^{
                    [self createBulletsWithType:2];
                }];
                SKAction *interval = [SKAction waitForDuration:_bulletSpeed];
                [self runAction:[SKAction repeatActionForever:[SKAction sequence:@[action,interval]]]withKey:@"Bullets"];
                _bulletType = 2;
            }
            else if (_bulletType == 2) {
                
                if (_bulletSpeed <= 0.1) {
                    return;
                }
                
                [_bullet removeFromParent];
                [_bullet removeAllActions];
                [self removeActionForKey:@"Bullets"];
                
                SKAction *action = [SKAction runBlock:^{
                    [self createBulletsWithType:2];
                }];

                SKAction *interval = [SKAction waitForDuration:_bulletSpeed-0.1];
                [self runAction:[SKAction repeatActionForever:[SKAction sequence:@[action,interval]]]withKey:@"Bullets"];
                
            }
            
        }
            break;
            
        default:
            break;
    }
    
}



- (void)changeScore:(SKFoePlaneType)type{
    
    int score = 0;
    switch (type) {
        case SKFoePlaneTypeBig:
            score = 3000;
            break;
        case SKFoePlaneTypeMedium:
            score = 600;
            break;
        case SKFoePlaneTypeSmall:
            score = 100;
            break;
        default:
            break;
    }
    [_scoreLabel runAction:[SKAction runBlock:^{
        
        _scoreLabel.text = [NSString stringWithFormat:@"%d",_scoreLabel.text.intValue + score];
    }]];
}

- (void)bombAllFoePlant {
    
    [self enumerateChildNodesWithName:@"foePlane" usingBlock:^(SKNode * _Nonnull node, BOOL * _Nonnull stop) {
        
        if ([node isKindOfClass:[SKFoePlane class]]) {
            SKFoePlane *foePlane = (SKFoePlane *)node;
            [self foePlantBoom:foePlane];
        }

    }];
}

- (void)foePlantBoom:(SKFoePlane *)sprite{
    
    if (![sprite actionForKey:@"BOOMAction"]) {
        SKAction *hitAction = nil;
        SKAction *blowupAction = nil;
        NSString *soundFileName = nil;
        sprite.hp=0;
        switch (sprite.type) {
            case SKFoePlaneTypeBig:
            {
                hitAction = _bigFoePlaneHitAction;
                blowupAction = _bigFoePlaneBlowupAction;
                soundFileName = @"enemy2_down.mp3";
            }
                break;
            case SKFoePlaneTypeMedium:
            {
                hitAction = _mediumFoePlaneHitAction;
                blowupAction = _mediumFoePlaneBlowupAction;
                soundFileName = @"enemy3_down.mp3";
            }
                break;
            case SKFoePlaneTypeSmall:
            {
                hitAction = _smallFoePlaneHitAction;
                blowupAction = _smallFoePlaneBlowupAction;
                soundFileName = @"enemy1_down.mp3";
            }
                break;
            default:
                break;
        }
        if (!sprite.hp) {
            [sprite removeAllActions];
            [sprite runAction:blowupAction withKey:@"BOOMAction"];
            [self changeScore:sprite.type];
            [self runAction:[SKAction playSoundFileNamed:soundFileName waitForCompletion:NO]];
        }else{
            [sprite runAction:hitAction];
        }
    }
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    for (UITouch *touch in touches) {
        CGPoint location = [touch locationInNode:self];
        if (CGRectContainsPoint(_bomb.frame, location)) {
            _bombCount--;
            if (_bombCount>0) {
                [_bombLabel setText:[NSString stringWithFormat:@"*%d",_bombCount]];
                [self bombAllFoePlant];
                
            }else if(_bombCount == 0){
                [_bomb removeFromParent];
                [_bombLabel removeFromParent];
                [self bombAllFoePlant];
                _bomb = nil;
                _bombLabel = nil;

            }
        }
    }
}



//移动
- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event{
    
    for (UITouch *touch in touches) {
        
        CGPoint location = [touch locationInNode:self];
        if (CGRectContainsPoint(_bomb.frame, location)) {
            break;
        }
        
        
        //超出屏幕
        if (location.x >= self.size.width - (_playerPlane.size.width / 2)) {
            location.x = self.size.width - (_playerPlane.size.width / 2);
        }else if (location.x <= (_playerPlane.size.width / 2)) {
            location.x = _playerPlane.size.width / 2;
        }
        
        if (location.y >= self.size.height - (_playerPlane.size.height / 2)) {
            location.y = self.size.height - (_playerPlane.size.height / 2);
        }else if (location.y <= (_playerPlane.size.height / 2)) {
            location.y = (_playerPlane.size.height / 2);
        }
        
        SKAction *action = [SKAction moveTo:CGPointMake(location.x, location.y) duration:0.1];
        
        [_playerPlane runAction:action];
    }
}

- (void)restart {
    [self removeAllChildren];
    [self removeAllActions];
    _bomb = nil;
    _bombLabel = nil;
    [self cleatTime];
    [self initBackground];
    [self initScore];
    [self initPlayerPlane];
    [self firingBullets];
    
}

- (void)cleatTime {
    _smallPlaneTime = 0;
    _mediumPlaneTime = 0;
    _bigPlaneTime = 0;
    _flyBombTime = 0;
    _flyBulletTime = 0;
}

#pragma mark - 物理碰撞
- (void)didBeginContact:(SKPhysicsContact *)contact{
    
    if (contact.bodyA.categoryBitMask & SKRoleCategoryFoePlane || contact.bodyB.categoryBitMask & SKRoleCategoryFoePlane) {
        
        SKFoePlane *sprite = (contact.bodyA.categoryBitMask & SKRoleCategoryFoePlane) ? (SKFoePlane *)contact.bodyA.node : (SKFoePlane *)contact.bodyB.node;
        if (contact.bodyA.categoryBitMask & SKRoleCategoryPlayerPlane || contact.bodyB.categoryBitMask & SKRoleCategoryPlayerPlane) {
            SKSpriteNode *playerPlane = (contact.bodyA.categoryBitMask & SKRoleCategoryPlayerPlane) ? (SKSpriteNode *)contact.bodyA.node : (SKSpriteNode *)contact.bodyB.node;
            [self playerPlaneCollisionAnimation:playerPlane];
        }else{
            SKSpriteNode *bullet = (contact.bodyA.categoryBitMask & SKRoleCategoryFoePlane) ? (SKFoePlane *)contact.bodyB.node : (SKFoePlane *)contact.bodyA.node;
            [bullet removeFromParent];
            [self foePlaneCollisionAnimation:sprite];
        }
    }
    else if (contact.bodyA.categoryBitMask & SKRoleCategoryParachute || contact.bodyB.categoryBitMask & SKRoleCategoryParachute) {
        SKParachute *parachute = (contact.bodyA.categoryBitMask & SKRoleCategoryParachute) ? (SKParachute *)contact.bodyA.node : (SKParachute *)contact.bodyB.node;
        if (contact.bodyA.categoryBitMask & SKRoleCategoryPlayerPlane || contact.bodyB.categoryBitMask &SKRoleCategoryPlayerPlane) {
            [parachute removeAllActions];
            [parachute removeFromParent];
//            SKSpriteNode *parachute = (contact.bodyA.categoryBitMask & SKRoleCategoryParachute) ? (SKSpriteNode *)contact.bodyA.node : (SKSpriteNode *)contact.bodyB.node;
            [self parachuteCollisionAnimation:parachute];
        }
    }
}

- (void)didEndContact:(SKPhysicsContact *)contact{
    
}



@end
