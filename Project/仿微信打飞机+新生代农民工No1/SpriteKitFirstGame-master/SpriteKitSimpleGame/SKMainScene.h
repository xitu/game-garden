//
//  SKMainScene.h
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/9.
//  Copyright © 2017年 chc. All rights reserved.
//

#import <SpriteKit/SpriteKit.h>
#import "GlobalConfig.h"
// 角色类别
typedef NS_ENUM(uint32_t, SKRoleCategory){
    SKRoleCategoryBullet = 1,   //0001
    SKRoleCategoryFoePlane = 4,   //0100
    SKRoleCategoryPlayerPlane = 8,  //1000
    SKRoleCategoryParachute = 16       //1000 1000
};

@interface SKMainScene : SKScene


@property (nonatomic, strong) GlobalConfig *config;

@end
