//
//  SKParachute.h
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/10.
//  Copyright © 2017年 chc. All rights reserved.
//

#import <SpriteKit/SpriteKit.h>

typedef NS_ENUM(int, SKParachuteType) {
    
    SKParachuteTypeBomb = 1,
    SKParachuteTypeBullet = 2
};

@interface SKParachute : SKSpriteNode

@property (nonatomic,assign)SKParachuteType type;

+ (instancetype)createFlyBomb;

+ (instancetype)createFlyBullet;

@end
