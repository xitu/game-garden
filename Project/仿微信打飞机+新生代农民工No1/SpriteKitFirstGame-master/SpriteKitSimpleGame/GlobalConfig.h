//
//  GlobalConfig.h
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2022/3/23.
//  Copyright © 2022 chc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIkit.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, DifficultyLevel) {
    DifficultyLevelSimple,
    DifficultyLevelMedium,
    DifficultyLevelDifficult,
};

@interface GlobalConfig : NSObject

+ (GlobalConfig *)selectedLevel:(DifficultyLevel)level;

@property (nonatomic, assign, readonly) CGFloat bulletSpeed; /** 子弹速度 */

@property (nonatomic, assign, readonly) CGFloat smallPlaneSpeed;  /** 小飞机速度 */

@property (nonatomic, assign, readonly) CGFloat mediumPlaneSpeed;  /** 中飞机速度 */

@property (nonatomic, assign, readonly) CGFloat bigPlaneSpeed;  /** 大飞机速度 */

@end

NS_ASSUME_NONNULL_END
