//
//  ViewController.m
//  StringQuartetInfinity
//
//  Created by Halldór Eldjárn on 20/01/15.
//  Copyright (c) 2015 Halldór Eldjárn. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>
#import <AVFoundation/AVFoundation.h>

@interface ViewController ()

@property UIWebView *webView;

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.webView = [[UIWebView alloc] initWithFrame:self.view.bounds];
    
    self.webView.scrollView.scrollEnabled = NO;
    self.webView.scrollView.bounces = NO;
    self.webView.allowsInlineMediaPlayback = YES;
    self.webView.mediaPlaybackRequiresUserAction = NO;
    self.webView.scrollView.zoomScale = 0.5;
    self.webView.scalesPageToFit = YES;
    
    [self.view addSubview:self.webView];
    
    NSString *resourcePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"WebContent"];
    
    NSURL *url = [NSURL fileURLWithPath:resourcePath];
    
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];
    
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    CGFloat zoom = 0.8;
    
    webView.scrollView.minimumZoomScale = zoom;
    webView.scrollView.maximumZoomScale = zoom;
    webView.scrollView.zoomScale = zoom;
}

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation
{
    self.webView.frame = self.view.bounds;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
