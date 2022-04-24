//
//  SKParachute.m
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/10.
//  Copyright © 2017年 chc. All rights reserved.
//

#import "SKParachute.h"
#import "SKSharedAtles.h"
@implementation SKParachute

+ (instancetype)createFlyBomb {
    SKParachute *parachute = (SKParachute *)[SKParachute spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypeFlyBomb]];
    parachute.type = SKParachuteTypeBomb;
    parachute.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:parachute.size];
    return parachute;
}

+ (instancetype)createFlyBullet {
    SKParachute *parachute = (SKParachute *)[SKParachute spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypeFlyBullet]];
    parachute.type = SKParachuteTypeBullet;
    parachute.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:parachute.size];
    return parachute;
}

@end
