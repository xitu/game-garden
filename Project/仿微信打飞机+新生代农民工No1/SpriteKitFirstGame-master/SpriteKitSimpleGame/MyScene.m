//
//  MyScene.m
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/8.
//  Copyright © 2017年 chc. All rights reserved.
//

#import "MyScene.h"

static const uint32_t bulletCategory     =  0x1 << 0;
static const uint32_t monsterCategory        =  0x1 << 1;
static const uint32_t airportCategory        =  0x1 << 2;

@interface MyScene () <SKPhysicsContactDelegate>
{
    int _count;
}

@property (nonatomic) SKSpriteNode *airport;
@property (nonatomic)NSTimeInterval lastSpawnTimeInterval;
@property (nonatomic)NSTimeInterval lastUpdateTimeInterval;

@end

@implementation MyScene

-(instancetype)initWithSize:(CGSize)size
{
    self = [super initWithSize:size];
    if (self) {
        self.backgroundColor = [UIColor whiteColor];
        //所有的位置都以左下角为起点
        
        //创建精灵(飞机)
        self.airport = [SKSpriteNode spriteNodeWithImageNamed:@"airport"];
        self.airport.position = CGPointMake(self.frame.size.width/2, 10);
        [self addChild:self.airport];
        
        self.physicsWorld.gravity = CGVectorMake(0,0);
        self.physicsWorld.contactDelegate = self;
        //设置物理世界大小
        self.airport.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:self.airport.size];
        //重力感应(Yes 不受重力感应)
        self.airport.physicsBody.dynamic = YES;
        
        self.airport.physicsBody.categoryBitMask = airportCategory;
        self.airport.physicsBody.contactTestBitMask = monsterCategory;
        self.airport.physicsBody.collisionBitMask = 0;
        //设为YES能够检测到碰撞，否则直接穿过去
        self.airport.physicsBody.usesPreciseCollisionDetection = YES;
        
    }
    return self;
}


- (void)update:(NSTimeInterval)currentTime {
    CFTimeInterval timeSinceLast = currentTime -self.lastUpdateTimeInterval;
    self.lastUpdateTimeInterval = timeSinceLast;
    if (timeSinceLast > 1) { // more than a second since last update
        timeSinceLast = 1.0 / 60.0;
        self.lastUpdateTimeInterval = currentTime;
    }
}

@end
