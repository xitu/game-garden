//
//  MyScene.h
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/8.
//  Copyright © 2017年 chc. All rights reserved.
//

#import <SpriteKit/SpriteKit.h>

@protocol MySceneDelegate <NSObject>

-(void)gameOver:(SKScene *)scene;
-(void)getScore:(int)score;

@end

@interface MyScene : SKScene

@property (nonatomic,weak)id<MySceneDelegate> overDelegate;

@end
