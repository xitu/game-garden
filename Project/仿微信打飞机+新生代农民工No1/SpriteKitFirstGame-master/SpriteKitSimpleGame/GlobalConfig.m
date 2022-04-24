//
//  GlobalConfig.m
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2022/3/23.
//  Copyright © 2022 chc. All rights reserved.
//

#import "GlobalConfig.h"

@interface GlobalConfig ()

@property (nonatomic, assign) CGFloat bulletSpeed; /** 子弹速度 */

@property (nonatomic, assign) CGFloat smallPlaneSpeed;  /** 小飞机速度 */

@property (nonatomic, assign) CGFloat mediumPlaneSpeed;  /** 中飞机速度 */

@property (nonatomic, assign) CGFloat bigPlaneSpeed;  /** 大飞机速度 */

@end

@implementation GlobalConfig

+ (GlobalConfig *)selectedLevel:(DifficultyLevel)level {
    GlobalConfig *config = [GlobalConfig new];
    switch (level) {
        case DifficultyLevelSimple:
        {
            config.bulletSpeed = 0.25;
            config.smallPlaneSpeed = 2;
            config.mediumPlaneSpeed = 4;
            config.bigPlaneSpeed = 5;
        }
            break;
        case DifficultyLevelMedium:
        {
            config.bulletSpeed = 0.30;
            config.smallPlaneSpeed = 1.5;
            config.mediumPlaneSpeed = 3.5;
            config.bigPlaneSpeed = 4.5;
        }
            break;
        case DifficultyLevelDifficult:
        {
            config.bulletSpeed = 0.45;
            config.smallPlaneSpeed = 1;
            config.mediumPlaneSpeed = 3;
            config.bigPlaneSpeed = 4;
        }
            break;
        default:
            break;
    }
    return config;
}

@end
