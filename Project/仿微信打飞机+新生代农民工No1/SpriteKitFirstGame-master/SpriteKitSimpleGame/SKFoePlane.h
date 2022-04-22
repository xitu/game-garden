//
//  SKFoePlane.h
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/9.
//  Copyright © 2017年 chc. All rights reserved.
//

#import <SpriteKit/SpriteKit.h>

typedef NS_ENUM(int, SKFoePlaneType) {
    
    SKFoePlaneTypeBig = 1,
    SKFoePlaneTypeMedium = 2,
    SKFoePlaneTypeSmall = 3
};

@interface SKFoePlane : SKSpriteNode

@property (nonatomic,assign) int hp; //血量

@property (nonatomic,assign) SKFoePlaneType type;

+ (instancetype)createBigPlane;

+ (instancetype)createMediumPlane;

+ (instancetype)createSmallPlane;

@end
