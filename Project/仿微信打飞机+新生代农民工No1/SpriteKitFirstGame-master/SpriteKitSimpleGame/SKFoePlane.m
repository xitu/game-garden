//
//  SKFoePlane.m
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/9.
//  Copyright © 2017年 chc. All rights reserved.
//

#import "SKFoePlane.h"
#import "SKSharedAtles.h"
@implementation SKFoePlane

+ (instancetype)createBigPlane {
    SKFoePlane *foePlane = (SKFoePlane *)[SKFoePlane spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypeBigFoePlane]];
    foePlane.hp = 10; 
    foePlane.type = SKFoePlaneTypeBig;
    foePlane.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:foePlane.size];
    return foePlane;
}

+ (instancetype)createMediumPlane {
    SKFoePlane *foePlane = (SKFoePlane *)[SKFoePlane spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypeMediumFoePlane]];
    foePlane.hp = 5;
    foePlane.type = SKFoePlaneTypeMedium;
    foePlane.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:foePlane.size];
    return foePlane;
}

+ (instancetype)createSmallPlane {
    SKFoePlane *foePlane = (SKFoePlane *)[SKFoePlane spriteNodeWithTexture:[SKSharedAtles textureWithType:SKTextureTypeSmallFoePlane]];
    foePlane.hp = 1;
    foePlane.type = SKFoePlaneTypeSmall;
    foePlane.physicsBody = [SKPhysicsBody bodyWithRectangleOfSize:foePlane.size];
    return foePlane;

}

@end
