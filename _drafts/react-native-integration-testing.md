extends: post.liquid

title:   React Native Integration Testing with Async AVA and Appium (+ CI)
date:    06 Jun 2016 10:00:00 +0100
route:   blog
---

In this post I'd like to introduce my approach to React Native Integration testing.

> I will focus on iOS integration testing for now.

## Preparing your build

You will need to provide Appium with a version of your app to run with tests.
Instructions for getting started with the different platforms are on the Appium page (http://appium.io/slate/en/master/?javascript#running-tests).

> I had troubles getting `xcodebuild` to work until I found [this issue](https://github.com/facebook/react-native/issues/5487)

## Running appium

```
npm install appium -g
```

Start appium to run the test.

```
appium --session-override
```

```
npm install ava --save-dev
```

```
npm install wd --save-dev
```

## Running the tests

To run the test simply enter

```
ava --serial
```

## Adding a screenshot for error diagnosis

## Travis configuration

### Adding a screenshot for error diagnosis

## Bonus: 
