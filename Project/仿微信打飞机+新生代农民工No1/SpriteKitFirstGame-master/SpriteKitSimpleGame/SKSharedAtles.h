//
//  SKSharedAtles.h
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/9.
//  Copyright © 2017年 chc. All rights reserved.
//



#import <SpriteKit/SpriteKit.h>
#import "SKFoePlane.h"



//纹理类型
typedef NS_ENUM(int, SKTextureType) {
    SKTextureTypeBackground = 1,
    SKTextureTypeBullet = 2,
    SKTextureTypePlayerPlane = 3,
    SKTextureTypeSmallFoePlane = 4,
    SKTextureTypeMediumFoePlane = 5,
    SKTextureTypeBigFoePlane = 6,
    SKTextureTypeFlyBullet = 7,
    SKTextureTypeFlyBomb = 8
};

//纹理
@interface SKSharedAtles : SKTextureAtlas

+ (SKTexture *)textureWithBomb;

+ (SKTexture *)textureWithSKTextureTypeBulletType:(NSInteger )type;

+ (SKTexture *)textureWithType:(SKTextureType)type;

+ (SKAction *)playerPlaneAction;

+ (SKAction *)playerPlaneBlowupAction;

+ (SKAction *)hitActionWithFoePlaneType:(SKFoePlaneType)type;

+ (SKAction *)blowupActionWithFoePlaneType:(SKFoePlaneType)type;

@end
