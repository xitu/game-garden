//
//  GameViewController.m
//  SpriteKitSimpleGame
//
//  Created by caohanchao on 2017/3/8.
//  Copyright © 2017年 chc. All rights reserved.
//

#import "GameViewController.h"
//#import "GameScene.h"
#import "MyScene.h"
#import "SKMainScene.h"
@interface GameViewController ()

@property (nonatomic,strong)SKView *skView;
@property (nonatomic,strong)UILabel *lb_score;
@property (nonatomic,strong)UIButton *btn_strat;

@property (nonatomic,strong)SKMainScene *scene;

@property (nonatomic,strong)UIButton *leftBtn;

@property (nonatomic,strong) UIButton *button1;
@property (nonatomic,strong) UIButton *button2;

@property (nonatomic, strong) UIStackView *stackView;

@end

@implementation GameViewController

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    
//    [self initAll];
//    [self btn_strat];
}

- (void)viewDidLoad {
    [super viewDidLoad];
/*
    // Load the SKScene from 'GameScene.sks'
    GameScene *scene = (GameScene *)[SKScene nodeWithFileNamed:@"GameScene"];
    
    // Set the scale mode to scale to fit the window
    scene.scaleMode = SKSceneScaleModeAspectFill;
    
    SKView *skView = (SKView *)self.view;
    
    // Present the scene
    [skView presentScene:scene];
    
    skView.showsFPS = YES;
    skView.showsNodeCount = YES;
*/
    
    
    [self initAll];
//    [self btn_strat];
    
}

- (SKMainScene *)scene {
    if (!_scene) {
        _scene = [SKMainScene sceneWithSize:self.skView.bounds.size];
        _scene.scaleMode = SKSceneScaleModeAspectFill;
    }
    return _scene;
}

- (void)initAll {
    [self.view addSubview:self.skView];
    
    //Create and configure the scene
    [self.skView presentScene:self.scene];
    
    self.scene.paused = YES;
    
    UIImage *image = [UIImage imageNamed:@"BurstAircraftPause"];
    
    self.leftBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    self.leftBtn.frame = CGRectMake(10, 25, image.size.width,image.size.height);
    [self.leftBtn setBackgroundImage:image forState:UIControlStateNormal];
    [self.leftBtn addTarget:self action:@selector(isPause:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.leftBtn];
    
    NSArray *levelArray = @[@"简单",@"中等",@"困难"];
    for (int i = 0; i<levelArray.count; i++) {
        UIButton *button = [[UIButton alloc]init];
        button.tag = 1000+i;
        [button setTitle:levelArray[i] forState:UIControlStateNormal];
        [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        [button.layer setBorderWidth:2.0];
        [button.layer setCornerRadius:15.0];
        [button.layer setBorderColor:[[UIColor grayColor] CGColor]];
        [button addTarget:self action:@selector(levelButtonAction:) forControlEvents:UIControlEventTouchUpInside];
        [self.stackView addArrangedSubview:button];
    }

    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(gameOver) name:@"gameOverNotification" object:nil];
    
    UIView *pauseView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.frame), 200)];
    self.button1 = [[UIButton alloc]init];
    [self.button1 setFrame:CGRectMake(CGRectGetWidth(self.view.frame) / 2 - 100,50,200,30)];
    [self.button1 setTitle:@"继续" forState:UIControlStateNormal];
    [self.button1 setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [self.button1.layer setBorderWidth:2.0];
    [self.button1.layer setCornerRadius:15.0];
    [self.button1.layer setBorderColor:[[UIColor grayColor] CGColor]];
    [self.button1 addTarget:self action:@selector(continueGame:) forControlEvents:UIControlEventTouchUpInside];
    self.button1.hidden = YES;
    [pauseView addSubview:self.button1];
    
    self.button2 = [[UIButton alloc]init];
    [self.button2 setFrame:CGRectMake(CGRectGetWidth(self.view.frame) / 2 - 100,100,200,30)];
    [self.button2 setTitle:@"重新开始" forState:UIControlStateNormal];
    [self.button2 setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [self.button2.layer setBorderWidth:2.0];
    [self.button2.layer setCornerRadius:15.0];
    [self.button2.layer setBorderColor:[[UIColor grayColor] CGColor]];
    [self.button2 addTarget:self action:@selector(restart:) forControlEvents:UIControlEventTouchUpInside];
    self.button2.hidden = YES;
    [pauseView addSubview:self.button2];
    
    pauseView.center = self.view.center;
    
    [self.view addSubview:pauseView];
    
    [self.view addSubview:self.stackView];
    self.stackView.frame = CGRectMake(0, 0, self.view.frame.size.width-100, 40*3 + 14*3);
    self.stackView.center = self.view.center;
}

- (void)gameOver{
    UIView *backgroundView =  [[UIView alloc]initWithFrame:self.view.bounds];
    UIButton *button = [[UIButton alloc]init];
    [button setBounds:CGRectMake(0,0,200,30)];
    [button setCenter:backgroundView.center];
    [button setTitle:@"重新开始" forState:UIControlStateNormal];
    [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [button.layer setBorderWidth:2.0];
    [button.layer setCornerRadius:15.0];
    [button.layer setBorderColor:[[UIColor grayColor] CGColor]];
    [button addTarget:self action:@selector(restart:) forControlEvents:UIControlEventTouchUpInside];
    [backgroundView addSubview:button];
    [backgroundView setCenter:self.view.center];
    [self.view addSubview:backgroundView];
}



- (void)isPause:(UIButton *)btn {
    self.leftBtn.enabled = NO;
    
    ((SKView *)self.view).paused = YES;
    
    self.button1.hidden = NO;
    self.button2.hidden = NO;
    
    self.scene.paused = YES;
}

- (void)restart:(UIButton *)button{
    [button.superview removeFromSuperview];
//    ((SKView *)self.view).paused = NO;
    self.scene.paused =NO;
    self.leftBtn.enabled = YES;
    
    [[NSNotificationCenter defaultCenter]postNotificationName:@"restartNotification" object:nil];
}

- (void)start:(UIButton *)button {
    self.scene.paused = YES;
}

- (void)continueGame:(UIButton *)button{
    [button.superview removeFromSuperview];
//    ((SKView *)self.view).paused = NO;
    self.scene.paused =NO;
    self.leftBtn.enabled = YES;
}

- (void)levelButtonAction:(UIButton *)button {
    if (button.tag == 1000) {
        self.scene.config = [GlobalConfig selectedLevel:DifficultyLevelSimple];
    } else if (button.tag == 1001) {
        self.scene.config = [GlobalConfig selectedLevel:DifficultyLevelMedium];
    } else {
        self.scene.config = [GlobalConfig selectedLevel:DifficultyLevelDifficult];
    }
    self.scene.paused = NO;
    self.stackView.hidden = YES;
}

- (BOOL)shouldAutorotate {
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return UIInterfaceOrientationMaskAllButUpsideDown;
    } else {
        return UIInterfaceOrientationMaskAll;
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (SKView *)skView {
    if (!_skView) {
        _skView = [[SKView alloc] initWithFrame:self.view.bounds];
        _skView.showsFPS = YES;
        _skView.showsNodeCount = YES;
    }
    return _skView;
}

- (UILabel *)lb_score {
    if (!_lb_score) {
        _lb_score = [[UILabel alloc] initWithFrame:CGRectMake(0, 20, self.view.frame.size.width, 20)];
        _lb_score.text = @"分数：0";
        _lb_score.font = [UIFont systemFontOfSize:15];
        _lb_score.textAlignment = NSTextAlignmentCenter;
        _lb_score.textColor = [UIColor colorWithRed:0.91 green:0.22 blue:0.10 alpha:1.00];
    }return _lb_score;
}

- (UIButton *)btn_strat {
    if (!_btn_strat) {
        _btn_strat = [UIButton buttonWithType:UIButtonTypeCustom];
        _btn_strat.frame = CGRectMake(0, 100, self.view.frame.size.width, 40);
        [_btn_strat setBackgroundColor:[UIColor blackColor]];
        [_btn_strat setTitle:@"开始游戏" forState:0];
        [_btn_strat addTarget:self action:@selector(start:) forControlEvents:UIControlEventTouchUpInside];
        [_skView addSubview:_btn_strat];
    }
    return _btn_strat;
}

- (UIStackView *)stackView {
    if (!_stackView) {
        _stackView = [[UIStackView alloc] init];
        _stackView.axis = UILayoutConstraintAxisVertical;
        _stackView.distribution = UIStackViewDistributionFillEqually;
        _stackView.spacing = 5;
        _stackView.alignment = UIStackViewAlignmentFill;
    }
    return _stackView;
}

@end
